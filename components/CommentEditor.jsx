import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Editor from "react-markdown-editor-lite";
import * as ReactMarkdown from 'react-markdown';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { Image } from "react-feather";
import { isNull, isUndefined } from "lodash";
import { GetRelativeUrl, saveImageFile } from "../services/articleService";
import { errorMessage, warningMessage } from "../utils/message";
import SimpleReactValidator from "simple-react-validator";
import { SaveArticleComment } from "../services/commentService";
import { getArticleComment } from "../actions/comment";
// @ts-ignore
// import Recaptcha from 'react-google-invisible-recaptcha';

const CommentEditor = ({ showDialog, closeDialog, comment, isReplay }) => {

    const [, forceUpdate] = useState();
    const refRecaptcha = useRef(null);

    const [Id, setId] = useState();
    const [ArticleId, setArticleId] = useState();
    const [CommentText, setCommentText] = useState();
    const [Comment_ReplyID, setComment_ReplyID] = useState();
    const [IsReplyByAdmin, setIsReplyByAdmin] = useState();
    const [ImageUrl, setImageUrl] = useState();
    const [ImageFile, setImageFile] = useState();

    const dispatch = useDispatch();


    useEffect(() => {
        // console.info("isReplay",isReplay,comment);
        if (!isReplay) {
            setId(comment.Id);
            setCommentText(comment.Description);
            setArticleId(comment.ArticleId);
            setComment_ReplyID(comment.Comment_ReplyID);
            setIsReplyByAdmin(comment.IsReplyByAdmin);
        }

        return () => {
            setId(null);
            setCommentText();
        }
    }, [comment])

    const mdEditor = useRef(null);
    const mdParser = new MarkdownIt(
        {
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value
                    } catch (__) { }
                }
                return '' // use external default escaping
            }
        }
    );

    Editor.use(emoji)

    const handleSubmit = async event => {
        event.preventDefault();


        try {
            if (validation.current.allValid()) {
                if (mdEditor.current) {
                    setCommentText(mdEditor.current.getMdValue());
                }
                let model = {
                    Id,
                    Description: CommentText,
                    IsConfirm: comment.IsConfirm,
                    IsReplyByAdmin: isReplay ? true: comment.IsReplyByAdmin,
                    ArticleId:comment.ArticleId,
                    Comment_ReplyID: isReplay ? comment.Id :comment.Comment_ReplyID,
                }

                refRecaptcha.current.execute();
                const data = await SaveArticleComment(model);
                if (data.data.Status == "success") {
                    setCommentText(null);
                    warningMessage(data.data.Message);
                    var commentmodel = {
                        ArticleId: comment.ArticleId,
                        perSection: 5,
                        currentSection: 1,
                    };
                    dispatch(getArticleComment(commentmodel))
                    closeDialog();
                } else {
                    errorMessage("خطایی رخ داده است");
                }

            } else {
                validation.current.showMessages();
                forceUpdate(1);
            }
        }
        catch (ex) {
            // console.log(ex)
        }
    }

    const validation = useRef(
        new SimpleReactValidator(
            {
                messages: {
                    required: "پر کردن این فیلد الزامی می باشد",
                    string: "این فیلد باید با حروف پر شود",
                    min: "حداقل تعداد کاراکتر رعایت نشده است",
                    max: "حداکثر تعداد کاراکتر رعایت نشده است",
                    email: "الگوی وارد شده صحیح نمی باشد"
                },
                element: message => <span style={{ color: 'red' }}>{message}</span>
            }
        )
    )

    function renderHTML(text) {
        // Using markdown-it
        return mdParser.render(text);
        // Using react-markdown
        return React.createElement(ReactMarkdown, {
            source: text,
        });
    }

    const handleEditorChange = ({ html, text }) => {
        // const newValue = text.replace(/\d/g, "");
        setCommentText(text);
    };


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

    const onResolvedRecaptcha = () => {
        //    alert( 'ری کپچا شما را انسان تشخیص داد، ولی انگار اشتباه کرده. انسان باش، درست مشخصاتتو وارد کن!'/* + refRecaptcha.current.getResponse()*/);
    }
    return (
        <Modal
            show={showDialog}
            onHide={closeDialog}
            backdrop="static"
            keyboard={false}
            size="xl"
        >

            <Modal.Body>
                <div className="inner form-layer">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row pb-2">
                            <div className="col-sm-12">

                                <Editor
                                    ref={mdEditor}
                                    value={CommentText}
                                    style={{
                                        height: "250px"
                                    }}
                                    onChange={handleEditorChange}
                                    renderHTML={renderHTML}
                                    onImageUpload={handleImageUpload}
                                />
                            </div>
                        </div>
                        {/* <Recaptcha
                            ref={refRecaptcha}
                            sitekey={'6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0'}
                            onResolved={() => onResolvedRecaptcha()} 
                            /> */}
                        <button className="btn text-white main-background-color-btn btn-block w-100 mb-1" > ثبت</button>
                    </form>
                    <button className="btn btn-gray text-white w-100" onClick={closeDialog}> انصراف</button>
                </div>
            </Modal.Body>

        </Modal>
    );
}

export default CommentEditor;
