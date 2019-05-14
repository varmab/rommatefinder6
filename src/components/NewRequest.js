import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

class NewRequest extends Component{
    constructor(){
        super();

        this.state={
            request:{
                description:'',
                city:'',
                location:'',
                phone:'',
                gender:'',
                rent:'',
                numberofRoommates:'',
                agreeToTerms:false
            },
            touched:{
                description:false,
                city:false,
                location:false,
                phone:false,
                gender:false,
                rent:false,
                numberofRoommates:false
            },
            requestCompleted:false
        }
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.validate=this.validate.bind(this);
    }

    onChange(e){
        //e-form, target-field
        const target=e.target;
        const value=target.type === 'checkbox' ? target.checked : target.value;
        const targetName=target.name;
        console.log(targetName + " " + value)

        let request = Object.assign({}, this.state.request);
        request[targetName] = value;

        this.setState({
            request
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
        const {request} = this.state;

        if (!request.description) {
            errors.description = 'Description  is required';
        }
        if (!request.city) {
            errors.city = 'City is required';
        }    
        if (!request.location) {
            errors.location = 'Location is required';
        }
        if (!request.phone) {
            errors.phone = 'Phone is required';
        }
        if (!request.gender) {
            errors.gender = 'Gender is required';
        }
        if (!request.rent) {
            errors.rent = 'Rent is required';
        }
        if (!request.numberofRoommates) {
            errors.numberofRoommates = 'NumberofRoommates is required';
        }
        if(!request.agreeToTerms){
            errors.agreeToTerms = 'You must agree the terms';
        }
        return{
            errors,
            isValid:Object.keys(errors).length === 0
        };
    }

    onSubmit(e){
        e.preventDefault();

        var formBody = [];

        for(var property in this.state.request){
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(this.state.request[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody)

        //API Call
        fetch('/api/roommaterequests',{
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token':localStorage.getItem("token")
            },
            body: formBody
        })
        .then(resp => resp.json())
        .then(request => {
            alert("Thank You, Your Request is Posted Successfully")
            this.setState({
                request:{
                    description:'',
                    city:'',
                    location:'',
                    phone:'',
                    gender:'',
                    rent:'',
                    numberofRoommates:'',
                    agreeToTerms:false
                },
                touched:{
                    description:false,
                    city:false,
                    location:false,
                    phone:false,
                    gender:false,
                    rent:false,
                    numberofRoommates:false
                },
                requestCompleted:true
            })
        })
        .catch((err)=>{
            console.log(JSON.stringify(err))
            alert("Failed to register, Please try again");
        })
    }
    render(){
        if(this.state.requestCompleted){
            return(
               <Redirect to ="/"/>
            )
        }
        else{
            const {request, touched} = this.state;
            const {errors, isValid} = this.validate();
    
            return(
                <form className="form-signin" onSubmit={this.onSubmit}>
                  
                    <h1 className="h3 mb-3 font-weight-normal section-title">Roommate Request</h1>
                    <label htmlFor="description" className="sr-only">Description </label>
                    <div>
                        <input name="description" type="text" value={this.state.request.description} onChange={this.onChange} onBlur={this.onBlur} className="form-control" placeholder="Description"/>
                        {touched.description && !!errors.description && <span>{errors.description}</span>}
                    </div>
                    <label htmlFor="city" className="sr-only">City</label>
                    <div className="mt-3">
                        <input name="city" value={this.state.request.city} onChange={this.onChange} onBlur={this.onBlur} type="text" id="city" className="form-control" placeholder="city"/>
                        {touched.city && !!errors.city && <span>{errors.city}</span>}
                    </div>
                    <label htmlFor="location" className="sr-only">Location</label>
                    <div className="mt-3">
                        <input name="location" value={this.state.request.location} onChange={this.onChange} onBlur={this.onBlur} type="text" id="location" className="form-control" placeholder="location"/>
                        {touched.location && !!errors.location && <span>{errors.location}</span>}
                    </div>
                    <label htmlFor="phone" className="sr-only">phone</label>
                    <div className="mt-3">
                        <input name="phone" value={this.state.request.phone} onChange={this.onChange} onBlur={this.onBlur} type="text" id="phone" className="form-control" placeholder="Phone"/>
                        {touched.phone && !!errors.phone && <span>{errors.phone}</span>}
                    </div>
                  
                    <label htmlFor="Gender" className="sr-only">Gender</label>
                    <div className="mt-3">
                        <input name="gender" value={this.state.request.gender} onChange={this.onChange} onBlur={this.onBlur} type="text" id="Gender" className="form-control" placeholder="Gender"/>
                        {touched.gender && !!errors.gender && <span>{errors.gender}</span>}
                    </div>
                  
                    <label htmlFor="Rent" className="sr-only">Rent</label>
                    <div className="mt-3">
                        <input name="rent" value={this.state.request.rent} onChange={this.onChange} onBlur={this.onBlur} type="text" id="rent" className="form-control" placeholder="Rent"/>
                        {touched.rent && !!errors.rent && <span>{errors.rent}</span>}
                    </div>
                    <label htmlFor="NumberofRoomamates" className="sr-only">Rent</label>
                    <div className="mt-3">
                        <input name="numberofRoommates" value={this.state.request.numberofRoommates} onChange={this.onChange} onBlur={this.onBlur} type="text" id="numberofRoommates" className="form-control" placeholder="numberofRoommates"/>
                        {touched.numberofRoommates && !!errors.numberofRoommates && <span>{errors.numberofRoommates}</span>}
                    </div>
    
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" checked={this.state.request.agreeToTerms} onChange={this.onChange} name="agreeToTerms"/> I agree to terms and conditions
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="Submit" disabled={!isValid}>Post a Request</button>
                </form>
            ) 
        }
    }
}

export default NewRequest;