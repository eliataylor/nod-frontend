import React, {ChangeEvent, useRef, useState} from 'react';
import {StyledBadge, UploadArea} from "../../theme/StyledFields";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import {Typography} from "@mui/material";
import {EditOutlined} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

export interface Upload {
    id?: string;
    url: string;
    file?: Blob;
}

interface ImageUploadProps {
    field_name: string;
    index: number;
    selected: string;
    onSelect: (image: Upload, field_name: string, index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onSelect, selected, index, field_name}) => {
    const [image, setImage] = useState<Upload | null>(selected ? {url: selected} : null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            const id = `${file.name}-${file.lastModified}`; // Generate ID based on file name and last modified time
            const newImage = {id, url, file};
            setImage(newImage);
            onSelect(newImage, field_name, index);
        }
    };

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const Wrapper = image ? Grid : UploadArea

    return (
        <Wrapper sx={{textAlign: 'center'}}>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id="icon-button-file"
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
            />

            {image ?
                <StyledBadge
                    overlap="circular"
                    onClick={handleIconClick}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={<EditOutlined color="secondary" fontSize={'small'}/>}
                >
                    {field_name === 'profile_picture' ?
                        <Avatar sx={{width: 125, height: 125}}
                                alt={'preview'}
                                src={image.url}/>
                        :
                        <Avatar sx={{width: '100%', height: 125}}
                                alt={'preview'}
                                variant={'rounded'}
                                src={image.url}/>
                    }
                </StyledBadge>
                :
                <label htmlFor="icon-button-file">
                    <IconButton
                        onClick={handleIconClick}
                        aria-label="upload picture">
                        <AddCircleOutlineSharpIcon sx={{color: '#868484'}}/>
                    </IconButton>
                    <Typography variant="caption">Upload a Photo</Typography>
                </label>
            }
        </Wrapper>
    );
};

export default ImageUpload;
