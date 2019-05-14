import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class Login extends Component{
    constructor(){
        super();

        this.state={
            user:{                
                email:'',
                password:''
                // RememberMe:false
            },
            touched:{
                email:false,
                password:false 
            },
            loggedInStatus:false,
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
        touched[e.target.name]=true;
        this.setState({
            touched
        })
    }

    validate(){
        const errors={};
        const {user}=this.state;

        if(!user.email){
            errors.email='Email is requried';
        }
        if(!user.password){
            errors.password='Password is requried';
        }
        // if (!RememberMe) {
        //     errors.RememberMe = 'You must agree to terms';
        // }
        return{
            errors,
            isValid:Object.keys(errors).length===0
        }
    }

    onSubmit(e){
        e.preventDefault();
        
        var formBody = [];
        
    
        for (var property in this.state.user) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(this.state.user[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
      
        formBody = formBody.join("&");
        console.log(formBody)
         //API Call
      
         fetch('/api/users/login', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
        .then(resp => resp.json())
        .then(user=> { 
          console.log(JSON.stringify(user))
          alert("Your login successfully completed.")
          
          localStorage.setItem("token",user.token)
          this.setState({
              user:{
                      email:'',
                      password:'',
                      // RememberMe:false
              },
              touched:{
                  email:false,
                  password:false
              },
              loginCompleted:true
          })
        })
        .catch((err)=>{
          console.log(JSON.stringify(err))
         // this.props.onLoginComplete(false)
          alert("Failed to login, Please try again");
        })
      
      }
    render(){
        if(this.state.loginCompleted){
            return(
                <Redirect to="/"/>
            )
        }
        else{
            const {user, touched} = this.state;
            const {errors, isValid} = this.validate();
        return(
            <div className="container my-5">
                <div className="row">
                    <div className="col-sm-6 mx-auto col-md-4">
                        <h1 className="text-center login-title">Sign in</h1>
                        <div className="account-wall">
                            <form className="form-signin" onSubmit={this.onSubmit}>
                                <label htmlFor="inputEmail" className="sr-only">Email</label>
                                <div>
                                    <input name="email" value={this.state.user.email} onChange={this.onChange} onBlur={this.onBlur} type="text" id="inputEmail" className="form-control" placeholder="Email address" required/>
                                    {this.state.email && !! this.state.errors.email && <span>{this.state.errors.email}</span>}
                                </div>

                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <div>
                                    <input name="password" value={this.state.user.password} onChange={this.onChange} onBlur={this.onBlur} type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                                    {this.state.password && !!this.state.errors.password && <span>{this.state.errors.password}</span>}
                                </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            <label>
                                <input type="checkbox" checked={this.state.user.rememberMe} onChange={this.onChange} name="rememberMe"/> Remember                                
                            </label>
                            <a href="#" className="pull-right mt-3 need-help">Need help? </a><span className="clearfix"></span>
                            </form>
                        </div>
                        <a href="/register" className="text-center new-account">Create an account </a>
                    </div>
                </div>
            </div>
        )
    }
    }
}

export default Login;