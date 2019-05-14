import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Register extends Component{
    constructor(){
        super();

        this.state={
            user:{
                userName:'',
                phone:'',
                email:'',
                password:'',
                agreeToTerms:false
            },
            touched:{
                userName:false,
                phone:false,
                email:false,
                password:false
            },
            registrationCompleted:false
        }
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.validate=this.validate.bind(this);
    }
    onChange(e){
        //e->form, target->field
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const targetName = target.name;
        console.log(targetName + " " + value)

        const user = Object.assign({}, this.state.user);
        user[targetName] = value;

        this.setState({
            user
        })
    }

    onBlur(e){
        let touched = Object.assign({}, this.state.touched);
        touched[e.target.name] = true;
        this.setState({
            touched
        })
    }

    validate(){
        const errors = {};
        const {user} = this.state;

        if(!user.email){
            errors.email = 'Email is requried';
        }
        if(!user.userName){
            errors.userName = 'Name is requried';
        }
        if(!user.phone){
            errors.phone = 'Phone is requried';
        }
        if(!user.password){
            errors.password = 'Password is requried';
        }
        if(!user.agreeToTerms){
            errors.agreeToTerms = 'You must agree to terms';
        }

        return{
            errors,
            isValid: Object.keys(errors).length === 0
        };
    }

    onSubmit(e){
        e.preventDefault();
        
        var formBody = [];

        for(var property in this.state.user){
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(this.state.user[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");
        console.log(formBody)

        //API Call

        fetch('/api/users/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then(resp => resp.json())
        .then(user=> {
            alert("You have Registered Successfully.");
            localStorage.setItem("token",user.token)
            
            this.setState({
                user:{
                    userName:'',
                    phone:'',
                    email:'',
                    password:'',
                    agreeToTerms:false
                },
                touched:{
                    userName:false,
                    phone:false,
                    email:false,
                    password:false
                },
                registrationCompleted:true
            })
        })
        .catch((err)=>{
            console.log(JSON.stringify(err));
            alert("Failed to registered, Please try again");
        })
    }

    render(){
        if(this.state.registrationCompleted){
            return(
                <div>
                    <h3>Thank you, You're Successfully registered</h3>
                    <Link to="/new">Go to Dashboard</Link>
                </div>
            )
        }
        else{
            const {user, touched} = this.state;
            const {errors, isValid} = this.validate();
            
            return(
                <div className="container my-4">
                    <div className="row">
                        <div className="col-sm-6 mx-auto col-md-4">
                            <h1 className="text-center login-title">Register</h1>
                            <div className="account-wall">
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <label htmlFor="inputName" className="sr-only">User Name</label>
                                    <div>
                                        <input name="userName" type="text" value={this.state.user.name} onChange={this.onChange} onBlur={this.onBlur} className="form-control" placeholder="Full Name" required/>
                                        {touched.userName && !!errors.userName && <span>{errors.userName}</span>}
                                    </div>
                                    <label htmlFor="inputPhone" className="sr-only">Phone</label>
                                    <div>
                                        <input name="phone" value={this.state.user.phone} onChange={this.onChange} onBlur={this.onBlur} type="text" id="inputPhone" className="form-control" placeholder="Phone Number" required/>
                                        {touched.phone && !!errors.phone && <span>{errors.phone}</span>}
                                    </div>
                                    <label htmlFor="inputEmail" className="sr-only">Email</label>
                                    <div>
                                        <input name="email" value={this.state.user.email} onChange={this.onChange} onBlur={this.onBlur} type="text" id="inputEmail" className="form-control" placeholder="Email address" required/>
                                        {touched.email && !!errors.email && <span>{errors.email}</span>}
                                    </div>
                                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                                    <div>
                                        <input name="password" value={this.state.user.password} onChange={this.onChange} onBlur={this.onBlur} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                        {touched.password && !!errors.password && <span>{errors.password}</span>}
                                    </div>
                                    <label>
                                        <input type="checkbox" checked={this.state.user.agreeToTerms} onChange={this.onChange} name="agreeToTerms"/> I agree to terms and conditions
                                    </label>
                                    <button className="btn btn-lg btn-primary btn-block" type="Submit" disabled={!isValid}>Register</button>
                                </form>
                                <a href="/login" className="text-center registred">Click Here to login </a>
                            </div> 
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Register;