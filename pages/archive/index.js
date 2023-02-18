import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomBreadCrumb from "../../utils/CustomBreadcrumb";
import { getBreadCrumbListOnArticleId, setBreadCrumbList } from "../../actions/breadCrumb";
import { isEmpty, isNull, isUndefined } from "lodash";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import Articles from "../../components/Articles";
import { GetAllArticleTrees, GetAllArticles2 } from "../../services/articleService";

const Archive = ({ articles }) => {
    const router = useRouter();
    const { text, issearch } = router.query;

    const [perPage] = useState(12);
    const [currentPage, setcurrentPage] = useState(1);
    const [currentArticleParent, setcurrentArticleParent] = useState(null);

    const dispatch = useDispatch();

    // const articles = useSelector(state => state.articlesForArchive)

    // useEffect(() => {

    //     if (!isUndefined(router.query.detail) && !isNull(router.query.detail)) {
    //         // console.log(location.state.detail); 
    //         dispatch(getBreadCrumbListOnArticleId(router.query.detail));
    //         dispatch(setBreadCrumbList([]));
    //         var paginatModel = {
    //             perpage: 12,
    //             currntpage: currentPage,
    //             skip: 0
    //         }
    //         var model = {
    //             Id: location.state.detail,
    //             paginetedata: paginatModel
    //         }
    //         dispatch(getArticlesForArchive(model))
    //     } else {
    //         dispatch(setBreadCrumbList([]));
    //         var paginatModel = {
    //             perpage: 12,
    //             currntpage: currentPage,
    //             skip: 0
    //         }
    //         var model = {
    //             Id: null,
    //             paginetedata: paginatModel
    //         }

    //         dispatch(getArticlesForArchive(model))
    //     }

    // }, [text])

    const handleChangePage = page => {
        setcurrentPage(page);
        var paginatModel = {
            perpage: 12,
            currntpage: page,
            skip: 0
        }
        var model = {
            Id: currentArticleParent?.Id,
            paginetedata: paginatModel
        }
        dispatch(getArticlesForArchive(model))
    }



    const handleClickArticle = (article) => {
        // setcurrentArticleParent(article);
        // if (article.ArticleTypeId == 1) {
        //     setcurrentPage(1);
        //     var paginatModel = {
        //         perpage: 12,
        //         currntpage: 1,
        //         skip: 0
        //     }
        //     var model = {
        //         Id: article.Id,
        //         paginetedata: paginatModel
        //     }
        //     dispatch(getArticlesForArchive(model))
        // }
        // handleBreadCrumb(article)
    }

    const handleBreadCrumb = (article) => {

        dispatch(getBreadCrumbListOnArticleId(article.Id))

    }

    return (
        <>
            <section className="term-categories container-xxl">

                <CustomBreadCrumb />

                <div className="row" style={{ position: "relative" }}>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-5">

                        <section className="terms-items" >

                            <div className="row">
                                {articles.length > 0 && <Articles articles={articles} handleClickArticle={handleClickArticle} />}
                            </div>

                        </section>

                    </div>

                    <div className="row" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                        {articles.ItemList?.length > 1 && <Pagination
                            className="pagination-bar justify-content-center "
                            currentPage={currentPage}
                            totalCount={articles.TotalItems}
                            pageSize={perPage}
                            onPageChange={handleChangePage}
                        />}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Archive;

export async function getStaticProps() {
    let articles = [];

    const { data } = await GetAllArticles2();
    articles = data;

    return {
        props: {
            articles,
        },
    };
}




