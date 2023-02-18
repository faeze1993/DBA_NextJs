import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { Grid, LogIn, LogOut, User, UserCheck } from "react-feather";
import SearchTool from "../components/Search";
import { NavLink } from "../utils/NavLink";


const TopNav = () => {

    const user = useSelector(state => state.user);
    const panelMenu = useSelector(state => state.panelMenu);


    return (

        <div className="nav-layer">

            <div className="container-xxl">

                <nav className="py-2">
                    <div className="row">
                        <div className="col-md-3 align-items-center d-flex">
                            <ul className="m-0 ps-0">
                                <li>
                                    <NavLink href="/aboutUs" activeClassName="main-color"> درباره ما </NavLink>
                                    <NavLink href="/contactUs" activeClassName="main-color"> تماس با ما </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <SearchTool />
                        </div>
                        <div className="col-md-3">
                            <div className="clientarea">
                                {!isEmpty(user) ? (
                                    <>
                                        <div className="loggein ">
                                            <span className=" dropdown " style={{display:"inline-block"}}>
                                                <a className="nav-link dropdown-toggle" activeClassName="main-color" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >  <User /></a>
                                                <ul className="dropdown-menu p-2" aria-labelledby="navbarScrollingDropdown">
                                                    <li className="d-block pb-1 text-center">
                                                        {user.FullName}
                                                    </li>
                                                    <li className="d-block pb-1"><hr className="dropdown-divider" /></li>
                                                    {panelMenu.length > 0 ? (
                                                        <li className="d-block pb-1">
                                                            <Grid className="pe-1" />
                                                            <NavLink href="/dashboard" className="dropdown-item d-inline" activeClassName="main-color"> پنل ادمین </NavLink>
                                                        </li>
                                                    ) : null}
                                                    <li className="d-block pb-1">
                                                        <UserCheck className="pe-1" />
                                                        <NavLink href="/userProfile" className="dropdown-item  d-inline">
                                                            حساب شخصی من
                                                        </NavLink>
                                                    </li>
                                                    <li className="d-block pb-1"><hr className="dropdown-divider" /></li>
                                                    <li className="d-block">
                                                        <LogOut className="pe-1" />
                                                        <NavLink href="/logout" className="dropdown-item d-inline">
                                                            خروج
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </span>
                                            <NavLink href="/" className="font-14">
                                                پروفایل من
                                            </NavLink>


                                          
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        <div className="signin">
                                            <LogIn className="pe-1" />
                                            <NavLink href="/login" activeClassName="main-color"> ورود </NavLink> &nbsp; | &nbsp;
                                            <NavLink href="/register" activeClassName="main-color"> عضویت </NavLink>
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </div>

    )
}

export default TopNav;