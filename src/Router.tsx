import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FoodMenu from './FoodMenu';
import Home from './Home';
import About from './About';
import Faqs from './Faqs';
import Suppliers from './Suppliers';
import Contact from './Contact';
import Layout from "./Layout";


const App = () => {

    return (
        <BrowserRouter>
            <Layout>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/next-week" element={<FoodMenu/>}/>
                        <Route path="/suppliers" element={<Suppliers/>}/>
                        <Route path="/faq" element={<Faqs/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="*" element={<div>Page not found</div>}/>
                    </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
