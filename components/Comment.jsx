import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SaveArticleComment } from "../services/commentService";
import { errorMessage, successMessage, warningMessage } from "../utils/message";
import Editor from "react-markdown-editor-lite";
import * as ReactMarkdown from 'react-markdown';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { getArticleComment } from "../actions/comment";
import { GetRelativeUrl, saveImageFile } from "../services/articleService";
import { isEmpty } from "lodash";

const Comment = ({ articleId }) => {

    const [Description, setDescription] = useState("");
    const dispatch = useDispatch();
    const panelMenu = useSelector(state => state.panelMenu);

    useEffect(() => {
    }, [articleId])

    const mdEditor = useRef(null);
    const mdParser = new MarkdownIt(
        {
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre className="hljs"><code>' +
                            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            '</code></pre>';
                    } catch (__) { }
                }

                return '<pre className="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
            }
        }
    );

    Editor.use(emoji)

    const handleEditorChange = ({ html, text }) => {
        // const newValue = text.replace(/\d/g, "");
        // console.log(newValue);
        // console.log('text.replace(/\d/g, ""),', text.replace(/\d/g, ""));
        setDescription(text);
    };

    function renderHTML(text) {
        // Using markdown-it
        return mdParser.render(text);
        // Using react-markdown
        return React.createElement(ReactMarkdown, {
            source: text,
        });
    }

    const handleImageUpload = async (file) => {
        //در این مرحله یک در خواست به سمت سرور ارسال می گردد
        //فایل غکس ذخیره می شود و ادرس فیزیکی در مختوا جایگزین می گردد


        let formData = new FormData();
        formData.append("File", file);
        formData.append("directoryName", "articles");

        const { data } = await saveImageFile(formData);

        if (data.Status == "success") {
            const result = await GetRelativeUrl(data.Data);
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(result.data.Data);
                };
                reader.readAsDataURL(file);
            });
        } else {
            errorMessage("افزودن عکس مورد نظر دچار مشکل شده است. لطفا دوباره تلاش کنید.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmpty(Description)) {
            let model = {
                ArticleId: articleId,
                Description
            }


            const data = await SaveArticleComment(model);
            if (data.data.Status == "success") {
                setDescription("");
                panelMenu.length > 0 
                ? successMessage("نظر شما با موفقیت ثبت شد")
                : warningMessage("نظر شما با موفقیت ثبت شد. بعد از تایید توسط کارشناسان به اشتراک گذاشته می شود.");
                var commentmodel = {
                    ArticleId: articleId,
                    perSection: 5,
                    currentSection: 1,
                };
                dispatch(getArticleComment(commentmodel));
            } else {
                errorMessage("خطایی رخ داده است");
            }
        }

        else {
            errorMessage("نظر خود را در ویرایشگر وارد نمایید");
        }
    }


    return (
        <>
            <section className="user-comments">
                <header><h3> نظرات کاربران </h3></header>
                <div className="inner">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-md-12 col-sm-12 col-12">
                                <div className=" mb-2">
                                    {/* <textarea
                                        className="form-control"
                                        placeholder="متن نظر"
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea> */}
                                    <Editor
                                        ref={mdEditor}
                                        // value={Body}
                                        style={{
                                            height: "200px"
                                        }}
                                        value={Description}
                                        onChange={handleEditorChange}
                                        renderHTML={renderHTML}
                                        onImageUpload={handleImageUpload}
                                        custom-html-style
                                    />
                                </div>

                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" className="btn main-background-color-btn text-white"> ثبت دیدگاه </button>
                            </div>
                        </div>
                    </form>


                </div>
            </section>
        </>
    );
}

export default Comment;