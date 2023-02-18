import React from "react";
import  TopNav  from '../components/TopNav'
import  MainNav  from '../components/MainNav'
import { useSelector } from "react-redux";
import { NavLink } from "../utils/NavLink";
import Footer from "../components/Footer";
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'

const MainLayout = props => {

    const webSiteTitle = useSelector(state => state.webSiteTitle);

    const footerData = useSelector(state => state.footer)
    const keyWords = useSelector(state => state.mainPageKeyWord)

    return (
        <>

            <div className="main-container">
                <TopNav />
                <MainNav />
                <div className="container">
                    <div className="col-12 breadcrumbsfinalProps">
                        <Breadcrumbs
                            separator={<span className="px-2">/</span>}
                            item={NavLink}
                            finalProps={{
                                style: { color: '#aeaeae' }
                            }}
                        />
                    </div>
                </div>
                <main id="home-page">
                    {props.children}
                </main> 
                {footerData ? <Footer footerData={footerData} /> : null}
            </div>
        </>
    );
}

export default MainLayout;