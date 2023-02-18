import { isUndefined } from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Home } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toFarsiNumber } from "../../utils/convertToFarsiNumber";
import Notfound from "../../components/NotFound";
import Pagination from "../../components/Pagination";
import PuffLoader from "react-spinners/PuffLoader";
import Head from "next/head";
import { GetAllAuthors, GetPublisherProfileData } from "../../services/authorService";
import { GetAllArticlesOnAuthrId } from "../../services/articleService";
import { GetWebSiteTitle } from "../../services/mainpageService";

const AuthorPage = ({ webSiteTitle, author, authorArticles }) => {

    const [perPage] = useState(9);

    console.info("authorArticles",authorArticles);

    return (
        <section className="term-categories container-xxl">

            <Head>
                <title> نویسندگان |  {webSiteTitle}</title>
                <meta name="author" content={author.FullName}></meta>
            </Head>
            <BreadcrumbsItem to='/' href='/'><Home size={"16px"} /></BreadcrumbsItem>
            <BreadcrumbsItem to='/authors' href='/authors'>نویسندگان </BreadcrumbsItem>
            {/* <BreadcrumbsItem to={`/authorpage/${author.ID}/${author.FullName.replace(" ", "_").replace(/ /g, "_")}`} href={`/authorpage/${author.ID}/${author.FullName.replace(" ", "_").replace(/ /g, "_")}`}>{author.FullName} </BreadcrumbsItem> */}

            <div className="row my-3">
                <div className="col-md-3 mb-2">
                    <div className="author-data">
                        <div className="">
                            {author.ImageUrl ?
                                <img className="authordata-image" src={author.ImageUrl} />
                                : <img className="authordata-image" src={'/images/jj.jpg'} />}
                            <h4>{author.FullName}</h4>
                            <h6>{author.Email}</h6>
                            <p>{author.Description}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 author-articles " style={{ position: "relative" }}>
                    <div className="row mb-5" >
                        {authorArticles?.length > 0 ? authorArticles?.map(article => (
                            <div key={article.Id} className="col-lg-4 col-md-4 col-sm-6 col-xs-12 term-col p-2">
                                <Link href={`/article/${article.Id}/${article.Name.replace(" ", "_").replace(/ /g, "_")}`}>
                                    <div className="card">
                                        <div className="article-title">
                                            <h5 className="card-title my-0">{article.Name.length > 80 ? article.Name.slice(0, 80) + "..." : article.Name}</h5>
                                        </div>
                                        <div className="article-summery">
                                            <p className="card-text mb-0">{article.Summery ? article.Summery.length > 200 ? article.Summery.slice(0, 200) + "..." : article.Summery : null}</p>
                                            <div className="article-footer d-flex">
                                                <div className="col"><span className="article-author pe-2">{article.AuthorName}</span></div>
                                                {/* <div className="col"><span className="article-author pe-2">{article.Views}</span></div> */}
                                                <div className="col text-end"><small className="text-muted"> {toFarsiNumber(article.UploadDate)}</small></div>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        )) : <span style={{ position: "absolute", top: "190px" }}><p className="text-center bold" >برای نویسنده مورد نظر مقاله ای یافت نشد</p></span>}
                    </div>
                    {/* <div className="row" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                        {authorArticles.ItemList?.length > 0 && <Pagination
                            className="pagination-bar justify-content-center "
                            currentPage={currentPage}
                            totalCount={authorArticles.TotalItems}
                            pageSize={perPage}
                            onPageChange={handleChangePage}
                        />}
                    </div> */}
                </div>
            </div>
        </section>
    )


}

export default AuthorPage;

export const getStaticPaths = async () => {
    const allAuthors = await GetAllAuthors();

    const paths = allAuthors.data.map((author) => ({
        params: {
            slug:[ `${author.ID}`, `${author.FullName.replace(" ", "_").replace(/ /g, "_")}`],
        },
    }));

    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {

    const webSiteTitle = await GetWebSiteTitle();
    const allArticlesOnAuthrId = await GetAllArticlesOnAuthrId({ AuthorId: params.slug[0] });
    const publisherProfileData = await GetPublisherProfileData(params.slug[0])

    return {
        props: {
            webSiteTitle: webSiteTitle.data,
            author:publisherProfileData.data,
            authorArticles:  allArticlesOnAuthrId.data 
        },
    };
};
