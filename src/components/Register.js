import React from 'react'

const Register=()=>{
    return(
        <section className="contacts-2">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <h3>Register</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <label className="h6">Name</label>
                            <input type="text" className="form-control"/>
                            <label className="h6">E-mail</label>
                            <input type="text" className="form-control"/>
                            <label className="h6">Phone</label>
                            <input type="text" className="form-control"/>
                            <label className="h6">Password</label>
                            <input type="text" className="form-control"/>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;