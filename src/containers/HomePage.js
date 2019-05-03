import React from 'react'
import Header from '../components/Header';
import Requests from '../components/Requests';
import Footer from '../components/Footer'

const HomePage=()=>{
    return(
        <React.Fragment>
            <Header/>
            <Requests/>
            <Footer/>
        </React.Fragment>
    )
}

export default HomePage;