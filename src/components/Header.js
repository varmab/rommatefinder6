import React from 'react'

const Header=()=>{
    return(
        <header className="header-3">
            <div className="container">
                <div className="row">
                    <nav className="navbar col-sm-12" role="navigation">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle"></button>
                            <a className="brand" href="#"><img src="startup/common-files/icons/Infinity-Loop@2x.png"
                                    width="50" height="50" alt=""/>Roommate Finder</a>
                        </div>
                        <div className="collapse navbar-collapse pull-right">
                            <ul className="nav pull-left">
                                <li><a href="/">HOME</a></li>
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/register">REGISTER</a></li>
                            </ul>
                            <form className="navbar-form pull-left">
                                <a className="btn btn-primary" href="/login">SIGN IN</a>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="header-background"></div>
        </header>
    )
}

export default Header;