import React, {ChangeEvent, ReactElement, useState} from 'react';
import {Button, CircularProgress, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {EntityTypes, FieldTypeDefinition, NavItem, NAVITEMS, RelEntity} from "../types/types";
import AutocompleteField from "./AutocompleteField";
import ApiClient from "../../ApiClient";
import AutocompleteMultipleField from "./AutocompleteMultipleField";
import ImageUpload, {Upload} from "./ImageUpload";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useNavigate} from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import {isDayJs} from "../../Utils";
import ProviderButton from "../../allauth/socialaccount/ProviderButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

dayjs.extend(utc)

interface GenericFormProps {
    fields: FieldTypeDefinition[];
    original?: EntityTypes;
    navItem: NavItem;
    onSubmit?: (entity: EntityTypes) => void;
    onUpdate?: (entity: EntityTypes, field_name: string) => void;
    actionButtons?: { [key: string]: boolean }
}

const GenericForm: React.FC<GenericFormProps> = ({
                                                     fields,
                                                     navItem,
                                                     original,
                                                     onUpdate,
                                                     onSubmit,
                                                     actionButtons = {'submit': true, 'delete': true}
                                                 }) => {

    const eid = original && typeof original['id' as keyof EntityTypes] !== 'undefined' ? original['id' as keyof EntityTypes] : 0;
    // @ts-ignore
    const [entity, setEntity] = useState<EntityTypes>(original ? original : {id: 0});
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const navigate = useNavigate()
    const [syncing, setSyncing] = useState<boolean>(false);

    const handleChange = (name: string, value: any) => {
        const newEntity = {...entity}
        // @ts-ignore
        newEntity[name] = value
        setEntity(newEntity);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        handleChange(name, value)
    };

    const handleTimeChange = (newValue: Dayjs | null, name: string) => {
        handleChange(name, newValue)
    };

    const handleSelect = (value: RelEntity[] | RelEntity | null, name: string) => {
        handleChange(name, value)
    };

    const handleImage = (selected: Upload, field_name: string, index: number) => {
        handleChange(field_name, selected.file)
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this?")) {
            const apiUrl = `${navItem.api}/${eid}`
            setSyncing(true)
            const response = await ApiClient.delete(apiUrl);
            setSyncing(false)
            if (response.success) {
                navigate(navItem.screen)
                alert('Submitted deleted');
            } else if (response.error) {
                // @ts-ignore
                setErrors(response.error)
            }
        }
    }

    const handleSubmit = async () => {
        let response = null;

        const tosend: any = {id: eid};
        let hasImage = false;
        for (let key in entity) {
            let val: any = entity[key as keyof EntityTypes];
            let was: any = original ? original[key as keyof EntityTypes] : null;
            if (JSON.stringify(was) === JSON.stringify(val)) {
                continue;
            }
            if (val instanceof Blob) {
                hasImage = true;
            }

            if (isDayJs(val)) {
                const field = fields.find(f => f.machine === key)
                if (field && field.field_type === 'date') {
                    val = val.format("YYYY-MM-DD")
                } else {
                    val = val.format()
                }
            } else if (Array.isArray(val)) {
                val = val.map(v => v.id)
            } else if (val && typeof val === 'object' && val.id) {
                val = val.id
            }
            tosend[key as keyof EntityTypes] = val
        }
        if (Object.keys(tosend).length === 1) {
            return alert("You haven't changed anything")
        }

        const formData: EntityTypes | FormData = tosend;
        const headers: any = {
            'accept': 'application/json'
        }
        if (hasImage) {
            const formData = new FormData()
            for (let key in tosend) {
                // @ts-ignore
                formData.append(key, tosend[key])
            }
            headers["Content-Type"] = `multipart/form-data`
        } else {
            headers["Content-Type"] = "application/json"
        }

        setSyncing(true)
        if (eid > 0) {
            response = await ApiClient.patch(`${navItem.api}/${eid}`, formData, headers);
        } else {
            response = await ApiClient.post(navItem.api, formData, headers);
        }
        setSyncing(false)
        if (response.success && response.data) {
            const newEntity = response.data as EntityTypes
//            navigate(`/forms${navItem.screen}/${newEntity.id}/edit`)
            navigate(`${navItem.screen}/${newEntity.id}`)
//            alert('Submitted successfully');
            setErrors({})
            return
        }
        if (response.error) {
            // @ts-ignore
            setErrors(response.error)
        }
    };

    function renderField(field: FieldTypeDefinition, error: string[] | undefined) {
        const baseVal: any = entity[field.machine as keyof EntityTypes]

        let input: ReactElement | null = null;
        if (field.field_type === 'enum') {
            input = <TextField
                fullWidth
                select
                name={field.machine}
                label={field.singular}
                type={field.data_type}
                value={baseVal}
                onChange={handleInputChange}
                error={typeof error !== 'undefined'}
            >
                {field.options && field.options.map(opt => <MenuItem key={field.machine + opt.id} value={opt.id}>
                    <ListItemText primary={opt.label}/>
                </MenuItem>)}

            </TextField>
        } else if (field.field_type === 'boolean') {
            input = <FormControlLabel
                control={
                    <Checkbox
                        checked={baseVal}
                        value={baseVal}
                        onChange={handleInputChange}
                    />
                }
                label={field.singular}
            />
        } else if (field.field_type === 'date_time') {
            input = <DateTimePicker
                format="MMMM D, YYYY h:mm A"
                label={field.singular}
                sx={{width: '100%'}}
                value={typeof baseVal === 'string' ?
                    dayjs(baseVal).local()
                    : baseVal}
                onChange={(newVal) => handleTimeChange(newVal, field.machine)}/>
        } else if (field.field_type === 'date') {
            input = <DatePicker
                format="MMMM D, YYYY"
                label={field.singular}
                sx={{width: '100%'}}
                value={typeof baseVal === 'string' ?
                    dayjs(baseVal).local()
                    : baseVal}
                onChange={(newVal) => handleTimeChange(newVal, field.machine)}/>
        } else if (field.field_type === 'provider_url') {
            const id = field.machine === 'link_spotify' ? 'spotify' : 'applemusic'
            input = <ProviderButton
                connected={baseVal ? true : false}
                provider={{name: field.singular, id: id}}
            />
        } else if (field.field_type === 'image') {
            input = <ImageUpload onSelect={handleImage} index={0}
                                 field_name={field.machine}
                                 selected={baseVal}
            />
        } else if (field.data_type === 'RelEntity') {
            const subUrl = NAVITEMS.find(nav => nav.type === field.relationship);
            input = field?.cardinality && field?.cardinality > 1 ?
                <AutocompleteMultipleField type={field.relationship || ""}
                                           search_fields={subUrl?.search_fields || []}
                                           onSelect={handleSelect}
                                           field_name={field.machine}
                                           field_label={field.plural}
                                           selected={!baseVal ? [] : (Array.isArray(baseVal) ? baseVal : [baseVal])}
                />
                :
                <AutocompleteField type={field.relationship || ""}
                                   search_fields={subUrl?.search_fields || []}
                                   onSelect={handleSelect}
                                   field_name={field.machine}
                                   field_label={field.singular}
                                   selected={baseVal}/>

        } else {
            input = <TextField
                fullWidth
                name={field.machine}
                label={field.singular}
                type={field.data_type}
                value={baseVal}
                onChange={handleInputChange}
                error={typeof error !== 'undefined'}
            />
        }
        return input
    }

    function errToString(err: any) {
        if (!err) return null;
        return Array.isArray(err) ? err.join(', ') : err
    }


    const errorcopy = {...errors}
    return (
        <Grid container spacing={2}>
            {fields.map((field) => {
                if (field.field_type === 'id_auto_increment') return null
                let error: string[] | undefined = errors[field.machine]
                if (error) {
                    delete errorcopy[field.machine]
                }
                return <Grid item xs={12} key={field.machine}>
                    {renderField(field, error)}
                    {error && <Typography variant="body2" color="error">{errToString(error)}</Typography>}
                </Grid>
            })}

            {Object.values(errorcopy).length > 0 && Object.values(errorcopy).map((err, i) => {
                const errstr = errToString(err);
                return <Typography variant="body2" key={errstr} color="error">{errstr}</Typography>
            })}

            <Grid container item xs={12} justifyContent={'space-between'}>
                {actionButtons['submit'] &&
                    <Button onClick={handleSubmit}
                            disabled={syncing}
                            startIcon={syncing ? <CircularProgress size={'small'} color={'primary'}/> : undefined}
                            variant="contained" color="primary">
                        Save
                    </Button>
                }

                {actionButtons['delete'] && eid > 0 && <Button
                    disabled={syncing}
                    startIcon={syncing ? <CircularProgress size={'small'} color={'primary'}/> : undefined}
                    onClick={handleDelete} variant="outlined" color="inherit">
                    Delete
                </Button>}
            </Grid>
        </Grid>
    );
};

export default GenericForm;