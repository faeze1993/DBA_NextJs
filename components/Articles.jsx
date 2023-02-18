import React from "react";
import Link from "next/link";
import { Calendar, FileText } from 'react-feather';
import { toFarsiNumber } from "../utils/convertToFarsiNumber";
import { useSelector } from "react-redux";

const Articles = ({ articles, handleClickArticle }) => {

    return (
        <section className="terms-items py-3">

            <div className="row">
                {articles.map(article => (
                    <div key={article.Id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 term-col card-group pb-3">
                        {article.ArticleTypeId == 1
                            ?
                            <Link href={`/archive/${article.Id}/${article.Name.replace(" ", "_").replace(/ /g, "_")}`} className="w-100">
                                <div className="card" onClick={() => handleClickArticle(article)}>
                                    <div className="article-group">
                                        <h2>{article.Name}</h2>
                                        <h2>{article.LatinName}</h2>
                                        <div className="pt-3">
                                            <span className="numberofchild">{article.NumberOfChild} <FileText /></span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            : <Link href={`/article/${article.Id}/${article.Name.replace(" ", "_").replace(/ /g, "_")}`} className="w-100">
                                <div className="card" onClick={() => handleClickArticle(article)}>
                                    {/* <ShowImage image={article.ImageUrl} /> */}
                                    <div className="article-title">
                                        <h2 className="card-title my-0" title={article.Name} >{article.Name.length > 80 ? article.Name.slice(0, 80) + "..." : article.Name}</h2>
                                    </div>
                                    <div className="article-summery">
                                        <p className="card-text mb-0">{article.Summery ? article.Summery.length > 200 ? article.Summery.slice(0, 200) + "..." : article.Summery : null}</p>
                                        <div className="article-footer d-flex">
                                            <div className="col"><span className="article-author pe-2">{article.AuthorName}</span></div>
                                            {/* <div className="col"><span className="article-author pe-2">{article.Views}</span></div> */}
                                            <div className="col text-end"><span className="article-date"><small className="text-muted"> {toFarsiNumber(article.UploadDate)}</small></span></div>

                                        </div>
                                    </div>

                                </div>
                            </Link>}
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Articles

