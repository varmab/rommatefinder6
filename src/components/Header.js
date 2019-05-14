import React, {Component} from 'react';
import {
    Redirect
} from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props);

        this.state={
            logoutStatus:false,
            userName:''
        }
        this.getLoggedInUser=this.getLoggedInUser.bind(this)
    }

    getLoggedInUser(){
       fetch('/api/user/me', {
           method:'get',
           headers:{
               'Accept':'application/json',
               'x-access-token':localStorage.getItem("token")
           }
       })
       .then(resp=>resp.json())
       .then(user=>{
           this.setState({
               userName:user.userName
           })
       })
       .catch((err)=>{
           console.log(JSON.stringify(err))
       })
    }

    logout(){
        fetch('/api/users/logout',{
            method: 'get',
            headers:{
                'Accept': 'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(auth=>{
            localStorage.setItem("token",auth.token)

            this.setState({
                logoutStatus:true
            })
        })
        .catch((err)=>{
            console.log(JSON.stringify(err))
            alert("Failed to register, Please try again");
        })
    }

    componentDidMount(){
        var token=localStorage.getItem("token");
        if(token){
            this.getLoggedInUser();
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            loginStatus:newProps.loginStatus
        })
    }

    render(){
        var token=localStorage.getItem("token");
        console.log(token)

        if(this.state.logoutStatus){
            return(<Redirect to="/login"/>)
        }

        return(
            <section className="header">
                <nav className="navbar navbar-expand-md navbar-expand-lg navbar-dark">
                
                    <a className="navbar-brand" href="/">Room Search</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                    {
                        (token!='null')?
                        (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/myrequests">My Request</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" onClick={this.logout.bind(this)}>Logout</a>
                                </li>
                            </ul>
                        )
                        :
                        (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>                                   
                            </ul>
                        )
                    }
                    </div>
                </nav>
            </section>
        )
    }
}

export default Header;