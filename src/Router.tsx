import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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


const App = () => {

    return (
        <BrowserRouter>
            <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>

                        <Route path="/menus" element={<StartOrder/>}/>
                        <Route path="/menus/next-week" element={<FoodMenu />}/>

                        <Route path="/menus/postpartum-plan" element={<FoodMenu/>}/>
                        <Route path="/menus/postpartum-gift" element={<FoodMenu/>}/>

                        <Route path="/menus/next-week/pricing" element={<ProgramForm program_name={'CREATE YOUR MEAL PROGRAM'} />}/>
                        <Route path="/menus/postpartum-plan/pricing" element={<ProgramForm program_name={'BUILD YOUR POSTPARTUM MEAL PROGRAM'} />}/>

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
