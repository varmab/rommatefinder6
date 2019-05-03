import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer'
import Login from '../components/Login';

const LoginPage=()=>{
    return(
        <React.Fragment>
            <Header/>
            <Login/>
            <Footer/>
        </React.Fragment>
    )
}

export default LoginPage;