import React from "react";

import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Home } from "react-feather";
import { CustomeArticleParser } from '../../utils/customArticleParser';
import { useSelector } from "react-redux";
import Head from "next/head";
import { GetWebSiteTitle } from "../../services/mainpageService";
import { GetAboutPageAboutUs } from "../../services/aboutpageService";

const AboutUs = ({aboutpageData, webSiteTitle}) => {

    return (
        <>
            <Head>
                <title> درباره ما |  {webSiteTitle}</title>
            </Head>
            <BreadcrumbsItem to='/' href='/'><Home size={"16px"}/> </BreadcrumbsItem>
            <BreadcrumbsItem to='/aboutUs' href='/aboutUs'>درباره ما </BreadcrumbsItem>
            <div className="container-xxl py-4">
                <div className="col-12 aboutus">
                    <div className="row about-title pb-2">
                        <div className="co-md-12">
                            <h5>{aboutpageData.AboutUsTitle}</h5>
                        </div>
                    </div>
                    <div className="row about-content">
                        <div className="col-md-12 text-justify">
                            {aboutpageData.AboutUsText ? (<CustomeArticleParser content={aboutpageData.AboutUsText} />) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;


// get webSiteTitle , aboutpageData 
export const getStaticProps = async () => {
  
    let webSiteTitle = "";
    let aboutpageData = {};
  
    const data = await GetWebSiteTitle();
    webSiteTitle= data.data;
  
    const data1  = await GetAboutPageAboutUs();
    aboutpageData = data1.data;

    return {
      props: {
        webSiteTitle: webSiteTitle,
        aboutpageData: aboutpageData,
      },
      revalidate: 60, // In seconds
    };
  };
  