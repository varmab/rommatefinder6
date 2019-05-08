import React from 'react'

const Login=()=>{
    return(
        <section className="contacts-2">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <h3>Login</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <label className="h6">E-mail</label>
                            <input type="text" className="form-control"/>
                            <label className="h6">Password</label>
                            <input type="text" className="form-control"/>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;