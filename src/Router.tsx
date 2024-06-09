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
import Testimonials from "./screens/Testimonials";


const App = () => {

    return (
        <BrowserRouter>
            <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/next-week" element={<FoodMenu/>}/>
                        <Route path="/suppliers" element={<SupplierList/>}/>
                        <Route path="/faq" element={<Faqs/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/testimonials" element={<Testimonials/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path="*" element={<div>Page not found</div>}/>
                    </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
