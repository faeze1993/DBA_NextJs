import React from "react";
import { Clipboard, Coffee, FileText, Home, Users } from "react-feather";
import { useSelector } from "react-redux";
import  Link  from "next/link";
import {NavLink}  from "../utils/NavLink";

const MainNav = () => {

    const logoImage = useSelector(state => state.logoImage);
    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-3">
            <div className="container-xxl pb-2" style={{borderBottom:"1px solid #e6e6e6"}}>
               
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
                    <ul className="navbar-nav justify-content-center my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
                        <li className="nav-item">
                            <NavLink href="/" exact className="nav-link" activeClassName="main-color"><Home /> صفحه اصلی</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/archive" className="nav-link" activeClassName="main-color" ><FileText /> مقالات</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/authors" className="nav-link" activeClassName="main-color"><Users /> نویسندگان</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink to="/discuss" className="nav-link" activeClassName="main-color"><Coffee /> تالار گفت و گو</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to="/courses" className="nav-link dropdown-toggle" activeClassName="main-color" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" > <Clipboard /> سری های آموزشی</NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                <li><a className="dropdown-item" href="#">اموزش 1</a></li>
                                <li><a className="dropdown-item" href="#">اموزش 2</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">اموزش 3</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                            <NavLink to="/" className="nav-link" activeClassName="main-color" tabIndex="-1" aria-disabled="true">همکاری با ما</NavLink>

                        </li> */}
                    </ul>

                </div>
                <Link className="navbar-brand me-0" href="/">
                    {logoImage && <img src={logoImage} style={{width: "110px"}}/>}
                </Link>
            </div>
        </nav>
    )
}

export default MainNav;