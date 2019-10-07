import React from 'react';
import { Link } from 'gatsby';
import { window } from 'browser-monads';
import logo from '../../images/LogoMakr_7TR2Nf.png';
import './nav.css';

const Nav = () => (
    <nav>
        <div className='nav_items'>
            <a className='nav_item_left' href="/">
                <img src={logo} alt="Streaming Halloween logo" className="nav_item_logo" />
            </a>
            <Link className={window.location.href.indexOf('contact') > 0 ? "nav_item_link active" : "nav_item_link"}
                // does contact exist at this url? if it does, we use the class name active, and if it doesn't, we just use the regular class
                to="/contact"> Contact </Link>
            <Link className={window.location.href.indexOf('blog') > 0 || window.location.href.indexOf('category') > 0 ? "nav_item_link active" : "nav_item_link"}
                // if blog or category exists at this url, use active class, if not use regular class
                to="/blog"> Blog </Link>
            {/* <Link className={window.location.href.indexOf('about') > 0 ? "nav_item_link active" : "nav_item_link"}
                to="/about"> About </Link>
            <Link className={window.location.href.indexOf('credits') > 0 ? "nav_item_link active" : "nav_item_link"}
                to="/credits"> Credits </Link> */}
        </div>
    </nav>
)

export default Nav;