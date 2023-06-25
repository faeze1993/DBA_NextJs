import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../actions/article';
import { CustomeArticleParser } from '../../utils/customArticleParser';
import { Calendar, Clock, CornerLeftUp, CornerRightDown, Edit, Edit2, Eye, PenTool, Tag, Watch } from 'react-feather';
import Comment from '../../components/Comment';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import { IsLogin } from '../../services/userService';
import Link from 'next/link';
import { getBreadCrumbListOnArticleId } from '../../actions/breadCrumb';
import { isEmpty, isNull, isUndefined, round } from 'lodash';
import CommentList from '../../components/CommentList';
import Notfound from '../../components/NotFound';
import PuffLoader from "react-spinners/PuffLoader";
import Prism from 'prismjs';
import 'prismjs/components/prism-sql'
import { GetAllArticleforArticlePath, GetAllArticleTrees, GetArticle } from '../../services/articleService';
import { GetBreadCrumbListOnArticleId } from '../../services/breadCrumService';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetWebSiteTitle } from '../../services/mainpageService';
import ArticleLayout from '../../layout/ArticleLayout'
import MainLayout from '../../layout/MainLayout'
import Script from 'next/script'

const Article = ({ response, article, webSiteTitle }) => {

    const articleComment = useSelector(state => state.articleComment);
    const router = useRouter();
    const id = router.query.slug[0];
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {

        // dispatch(getAllArticleMenu())
    }, [])


    const token = localStorage.getItem("token");
    useEffect(() => {
        // if (token != null) {
        //     try {
        //         IsLogin(token)
        //             .then(response => {
        //                 if (response.status === 200) {
        //                     setIsLogin(true);
        //                 } else {

        //                 }
        //             }).catch(err => {
        //                 //console.log(err);

        //             })

        //     }
        //     catch (ex) {

        //     }
        // }
        // var model = {
        //     ArticleId: id,
        //     perSection: 5,
        //     currentSection: 1,
        // };
        // dispatch(getArticleComment(model));
        // dispatch(getSingleArticle(id, token));
        dispatch(getBreadCrumbListOnArticleId(id));
        // dispatch(saveArticleVisit(id));
        handleAllActionAfterInteractive()
    }, [article.Body, id])

    function handleAllActionAfterInteractive(){
        highlightCode();
        setCopyButton();
        keepSidbarState();
        handleShowImageModal();
    }

    function highlightCode() {
        if (!isUndefined(article.Body)) {
            Prism.highlightAll();
        }

    };

    function setCopyButton() {
        // debugger
        var codeBlocks = document.querySelectorAll('pre.language-sql');
        codeBlocks.forEach(function (codeBlock) {
            // console.info("codeBlock.firstChild", codeBlock.firstChild.ariaLabel);
            if (codeBlock.firstChild.ariaLabel != "Copy code  clipboard") {
                var copyButton = document.createElement('div');
                copyButton.className = 'copy';
                copyButton.ariaLabel = 'Copy code  clipboard';
                copyButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span>';


                codeBlock.prepend(copyButton);

                copyButton.addEventListener('click', function () {
                    var code = codeBlock.querySelector('code').innerText.trim();
                    // window.navigator.clipboard.writeText(code);
                    if ('clipboard' in window.navigator) {
                        window.navigator.clipboard.writeText(code);
                    } else {
                        let textArea = document.createElement("textarea");
                        textArea.value = code;
                        // make the textarea out of viewport
                        textArea.style.position = "fixed";
                        textArea.style.left = "-999999px";
                        textArea.style.top = "-999999px";
                        document.body.appendChild(code);
                        textArea.focus();
                        textArea.select();
                        return new Promise((res, rej) => {
                            // here the magic happens
                            document.execCommand('copy') ? res() : rej();
                            textArea.remove();
                        });
                    }
                    copyButton.innerHTML = '<span>Copied</span>';
                    var fourSeconds = 4000;

                    setTimeout(function () {
                        copyButton.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></span>';
                    }, fourSeconds);
                });
            }
        });
    };

    function keepSidbarState() {
        //تمامی مواردی که کلاس اکتیو را دارند حذف کن
        var deactivelist = document.getElementsByClassName("active-border")
        if (deactivelist.length > 0) {
            for (let index = 0; index < deactivelist.length; index++) {
                const element = deactivelist[index];
                element.classList.remove("active-border");
            }
        }
        debugger
        var ullist = document.getElementsByClassName("child-nav")
        if (ullist.length > 0) {
            for (let index = 0; index < ullist.length; index++) {
                const element = ullist[index];
                element.classList.remove("show");
            }
        }

        var a = document.getElementById(id);
        if (!isNull(a)) {
            a.classList.add("active-border")
            var els = [];
            while (a) {
                els.unshift(a);
                a = a.parentNode;
            }

            els.forEach(function (el) {
                if (el.localName == "ul") {
                    el.classList.add("show");
                }
            });
        }
    };

    function handleShowImageModal() {
        if (!isUndefined(article.Body)) {
            ///////////
            var imageBlocks = document.querySelectorAll('img.zoom-img-class');
            imageBlocks.forEach(function (imgBlock) {
                // console.info("codeBlock.firstChild", codeBlock.firstChild.ariaLabel);
                imgBlock.classList.add("zoomicon")
                imgBlock.addEventListener('click', function () {
                    var modal = document.getElementById("imgZoomModal");
                    var modalImg = document.getElementById("img02");
                    modal.style.display = "block";
                    modal.style.zIndex = "99999";

                    modalImg.src = imgBlock.src;

                });

            });

        };
    };

    const handleCloseImageModal = () => {
        var modal = document.getElementById("imgZoomModal");
        modal.style.display = "none";
    };

    function getDateago(updateDate) {
        var lastyear = (updateDate / 30) / 12 >= 1 ? round((updateDate / 30) / 12) + " " + "سال" : "";
        var lastmonth = (updateDate / 30) % 12 >= 1 ? round((updateDate / 30) % 12) + " " + "ماه" : "";
        var lastday = (updateDate >= 1 && updateDate <= 29) ? round(updateDate) + " " + "روز" : "";
        return `${lastyear} ${lastmonth} ${lastday}`
    };

    const popoverLeft = (
        <Popover id="popover-positioned-left" >
            <div className='refrence-container p-3'>
                {!isEmpty(article.Refrences) && JSON.parse(article.Refrences).map((item, i) => (
                    <div key={i} className='refrence-item pb-1'>
                        <a href={item.Link} target="_blank" rel="noreferrer">{item.Title}</a>
                    </div>
                ))}
            </div>
        </Popover>
    );

    const popoverLeft2 = (
        <Popover id="popover-positioned-left" >
            <div className='Authorinfo-container px-3 pt-3 d-flex'>
                <div className='Authorinfo_image'>
                    {isNull(article.AuthorImage)
                        ? <img className='w-100' src={'../images/writer.jpg'} />
                        : <img src={article.AuthorImage} />
                    }
                </div>
                <div className='Authorinfo_data d-flex ms-2'>
                    <div>
                        <h6>{article.AuthorName}</h6>
                        <p>{article.AuthorEmail}</p>
                    </div>
                </div>
            </div>
            <div className='Authorinfo_data px-3 pb-3 pt-1'>
                <p style={{ whiteSpace: "pre-line;" }}>{article.AuthorDescription}</p>
            </div>
        </Popover>
    );
    if (!response) {
        return (
            <div className='d-flex justify-content-center mt-4'>
                <PuffLoader color={"rgb(39 103 169)"} loading={!response} size={250} />
            </div>
        )
    } else if (response && isUndefined(article.Body)) {
        return <Notfound />
    } else {
        return (
            <>
                <Script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
                    integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
                    crossorigin="anonymous"
                    strategy="afterInteractive"
                    onLoad={handleAllActionAfterInteractive}
                ></Script>
                <div className="col-md-12 col-sm-12 col-12 pull-left">
                    {article.Name &&
                        <Head>
                            <title>{article.Name} |{webSiteTitle}</title>
                            <meta name="keywords" content={article.KeyWordsList}></meta>
                            <meta name="author" content={article.AuthorName}></meta>
                            <meta property="og:type" content="article" />
                            <meta property="og:title" content={article.Name} />
                            <meta property="og:image" content="https://masterdba.ir/DBA_DIRECTORY/panel/DBA123.png" />
                            <meta property="og:description" content={article.Summery} />
                        </Head>}

                    <header className='px-3'>
                        <div className='row mb-3'>
                            {article.Article_PreID &&
                                <div className='col'>
                                    <Link className='btn btn-pre' href={`/article/${article.Article_PreID}/${article.Article_PreName?.replace(" ", "_").replace(/ /g, "_")}`}><CornerRightDown /> {article.Article_PreName} </Link>
                                </div>
                            }
                            {article.Article_NextID &&
                                <div className='col d-flex justify-content-end'>
                                    <Link className='btn btn-next' href={`/article/${article.Article_NextID}/${article.Article_NextName?.replace(" ", "_").replace(/ /g, "_")}`}>{article.Article_NextName} <CornerLeftUp /></Link>
                                </div>
                            }

                        </div>
                        <div className='row'>
                            <div className='col-md-12 article-title-container pb-2'>
                                <h2 className='article-Title' style={{ fontSize: "24px" }}> {article.Name} </h2>
                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-11'>
                                <ul className='article-data mb-2 d-lg-flex'>
                                    <li className='me-3 mb-2 mb-lg-auto'><Calendar className='me-2' size="18px" /> {article.UploadDate}</li>
                                    {article.UpdateDate != 0 &&
                                        <li className='me-3  mb-2 mb-lg-auto' title='تاریخ ویرایش'><Clock className='me-2' size="18px" />
                                            {getDateago(article.UpdateDate)}
                                        </li>
                                    }
                                    <li className='me-3  mb-2 mb-lg-auto'><Watch className='me-2' size="18px" /> {article.TimeToRead} دقیقه برای مطالعه</li>
                                    <li className='me-3  mb-2 mb-lg-auto'><Eye className='me-2' size="18px" />تعداد بازدید <span>{article.Views > 1000 ? article.Views / 1000 + " " + "هزار" : article.Views}</span></li>
                                    <li className='me-3  mb-2 mb-lg-auto d-none d-xl-block'>
                                        <OverlayTrigger trigger="hover" placement="left" rootClose overlay={popoverLeft2}>
                                            <div>
                                                <Edit2 className='me-2' size="18px" /><Link href={`/authors/${article.AuthorId}/${article.AuthorName.replace(" ", "_").replace(/ /g, "_")}`}> <span className='authorname'>{article.AuthorName}</span></Link>
                                            </div>
                                        </OverlayTrigger>
                                    </li>
                                    <li className='me-3 mb-2 mb-lg-auto d-block d-xl-none'>
                                        <Edit2 className='me-2' size="18px" /><Link href={`/authors/${article.AuthorId}/${article.AuthorName.replace(" ", "_").replace(/ /g, "_")}`}> <span className='authorname'>{article.AuthorName}</span></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-1'>
                                {(isLogin) &&
                                    <span>
                                        <Link href={`/dashboard/articleeditorpage/${article.ParentId}/${article.Id}`} target='_blank'>
                                            <Edit size="18px" />
                                        </Link>

                                    </span>
                                }
                            </div>
                        </div>
                        <hr className='my-0'></hr>
                    </header>


                    <section className="term-description">

                        {article.Body ? (<CustomeArticleParser content={article.Body} />) : null}

                    </section>

                    <footer className='px-4' style={{ clear: "both" }}>
                        {!isEmpty(article.Refrences) &&
                            <div className='col-12 pb-3'>
                                <OverlayTrigger trigger="click" placement="left" rootClose overlay={popoverLeft}>
                                    <span className='pointer bold main-color'>مشاهده منابع</span>
                                </OverlayTrigger>
                            </div>
                        }

                        <div className='col-12'>
                            {article.KeyWordsList ? article.KeyWordsList.map((item, i) => (
                                <span key={i} onClick={e => { dispatch(setSearchValue(item)); window.scrollTo(0, 0) }} className='article-tag pointer' ><Tag size={"14px"} className='me-1' />{item}</span>

                            )) : null}
                        </div>
                    </footer>

                    {isLogin
                        ? <Comment articleId={id} />
                        : <div className='mt-3 text-center alert alert-info' role="alert" ><span className='font-bold' >برای ثبت نظر باید وارد شوید</span></div>}

                    <CommentList articleId={id} articleComment={articleComment} islogin={isLogin} />

                    <div id="imgZoomModal" className="image-modal" >
                        <span className="close" onClick={handleCloseImageModal}>&times;</span>
                        <img className="image-modal-content" id="img02" />
                    </div>
                </div>
            </>

        );
    }
}
export default Article;

export const getStaticPaths = async () => {

    const allArticles = await GetAllArticleforArticlePath();

    let paths = allArticles.data.map((post) => ({
        params: { slug: [`${post.Id}`, `${post.Name.replace(" ", "_").replace(/ /g, "_")}`] },
    }))

    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
    const article = await GetArticle(params.slug[0]);
    const webSiteTitle = await GetWebSiteTitle();
    const breadCrumbListOnArticleId = await GetBreadCrumbListOnArticleId(params.id);

    return {
        props: {
            response: article.data.testfromserver,
            article: article.data?.Article,
            webSiteTitle: webSiteTitle.data
        },
    };
}

Article.getLayout = function (page) {
    return <MainLayout><ArticleLayout>{page}</ArticleLayout></MainLayout>;
};

