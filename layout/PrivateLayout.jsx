import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminTopNav from "../admin/AdminTopNav";
import AdminSidebar from "../admin/AdminSidebar";
import {Breadcrumbs} from 'react-breadcrumbs-dynamic'

const PrivateLayout = ({ children }) => {

    
    const user = useSelector(state => state.user)
    const webSiteTitle = useSelector(state => state.webSiteTitle);

    return (
        <div >
            <Helmet>
                <title>داشبورد| {webSiteTitle}</title>
            </Helmet>
           

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <AdminSidebar user={user}/>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                    <Breadcrumbs
                        separator={<b style={{ color: "#bababa" }}> / &nbsp;</b>}
                        item={NavLink}
                        finalItem={'b'}
                        finalProps={{
                            style: { color: "#bababa" }
                        }}
                    />
                       {children}

                    </main>
                </div>
            </div>


            {/* </nav> */}




        </div>
    );
}

export default withRouter(PrivateLayout);