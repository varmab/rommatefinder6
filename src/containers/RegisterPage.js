import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer'
import Register from '../components/Register';

const RegisterPage=()=>{
    return(
        <React.Fragment>
            <Header/>
            <Register/>
            <Footer/>
        </React.Fragment>
    )
}

export default RegisterPage;