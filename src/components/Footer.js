import React from 'react'

const Footer=()=>{
    return(
        <footer className="footer-2 bg-midnight-blue">
            <div className="container">
                <nav className="pull-left">
                    <ul>
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">Company</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div className="social-btns pull-right">
                    <a href="#">
                        <div className="fui-vimeo"></div>
                        <div className="fui-vimeo"></div>
                    </a>
                    <a href="#">
                        <div className="fui-facebook"></div>
                        <div className="fui-facebook"></div>
                    </a>
                    <a href="#">
                        <div className="fui-twitter"></div>
                        <div className="fui-twitter"></div>
                    </a>
                </div>
                <div className="additional-links">
                    Be sure to take a look at our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;