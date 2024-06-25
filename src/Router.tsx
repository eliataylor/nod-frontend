import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';

import { useAppSelector } from './app/hooks'
import { selectAuth } from './features/auth/authSlice'

import Login from './screens/auth/Login'

import FoodMenu from './screens/FoodMenu';
import Home from './screens/Home';
import About from './screens/About';
import Faqs from './screens/Faqs';
import SupplierList from './screens/SupplierList';
import Contact from './screens/Contact';
import Checkout from './screens/Checkout';
import Layout from "./theme/Layout";
import Partners from "./screens/Partners";
import StartOrder from "./screens/StartOrder";
import NotReady from "./screens/NotReady";
import ProgramForm from "./components/ProgramForm";
import dayjs from "dayjs";
import CreateAccount from "./screens/auth/CreateAccount";

const App = () => {

    const { user } = useAppSelector(selectAuth)

    const isNewUser = (user: any) => {
        const MINUTES_SINCE_JOINED_CONSIDERED_NEW = 5
        const age = dayjs().diff(dayjs(user.date_joined), 'minutes')
        return age < MINUTES_SINCE_JOINED_CONSIDERED_NEW
    }


    const redirectAfterLogin = () => {
        return '/app/profile'
    }

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route
                        path="/auth/*"
                        element={
                            user ? (
                                <Navigate to={redirectAfterLogin()} />
                            ) : (
                                <Outlet />
                            )
                        }
                    >
                        <Route path="login" element={<Login />} />
                        <Route path="create-account" element={<CreateAccount />} />
                    </Route>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>

                    <Route path="/menus" element={<StartOrder/>}/>
                    <Route path="/menus/calendar" element={<FoodMenu />}/>

                    <Route path="/menus/postpartum-plan" element={<FoodMenu />}/>
                    <Route path="/menus/postpartum-gift" element={<FoodMenu />}/>

                    <Route path="/menus/next-week/pricing" element={<ProgramForm program_name={'CREATE YOUR MEAL PROGRAM'} />}/>
                    <Route path="/menus/postpartum-plan/pricing" element={<ProgramForm program_name={'BUILD YOUR POSTPARTUM MEAL PROGRAM'} />}/>

                    <Route path="/menus/next-week/servings" element={<FoodMenu />}/>
                    <Route path="/menus/postpartum-plan/servings" element={<FoodMenu />}/>

                    <Route path="/menus/postpartum-gift" element={<FoodMenu/>}/>

                    <Route path="/checkout" element={<Checkout/>}/>

                    <Route path="/suppliers" element={<SupplierList/>}/>
                    <Route path="/faq" element={<Faqs/>}/>
                    <Route path="/partners" element={<Partners/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*" element={<NotReady title={'Missing this page'} />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
