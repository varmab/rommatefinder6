import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer'
import NewRequest from '../components/NewRequest';

const NewRequestPage=()=>{
    return(
        <React.Fragment>
            <Header/>
            <NewRequest/>
            <Footer/>
        </React.Fragment>
    )
}

export default NewRequestPage;