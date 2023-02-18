import react, { useRef } from "react";
import { useEffect } from "react";
import moment from 'jalali-moment'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, successMessage } from "../utils/message";
import { getArticleComment } from "../actions/comment";
import { Edit, Trash2 } from "react-feather";
import { DeleteComment, GetArticleComment } from "../services/commentService";
import CommentEditor from "./CommentEditor";
import { CustomeArticleParser } from "../utils/customArticleParser";


const CommentList = ({ articleId, articleComment, islogin }) => {

    const dispatch = useDispatch();
    // const articleComment = useSelector(state => state.articleComment)
    // console.info("articleComment1", articleComment);
    const user = useSelector(state => state.user);
    const [commentList, setCommentList] = useState([]);
    const [perSection] = useState(5);
    const [currentSection, setCurrentSection] = useState(2);
    const [IsReplay, setIsReplay] = useState(false)
    const [CurrentComment, setCurrentComment] = useState(null);
    const [CommentEditorDialog, setCommentEditorDialog] = useState(false);

    useEffect(() => {
        // var model = {
        //     ArticleId: articleId,
        //     perSection: perSection,
        //     currentSection: currentSection,
        // };
        // dispatch(getArticleComment(model));
        setCommentList(articleComment);
    }, [articleId, articleComment])


    const handleDeleteComment = async (commentId) => {

        const { data } = await DeleteComment(commentId);
        if (data.Status == "success") {
            successMessage(" با موفقیت حذف  شد");
            var commentmodel = {
                ArticleId: articleId,
                perSection: 5,
                currentSection: 1,
            };
            dispatch(getArticleComment(commentmodel));
        }
    }

    const handleEditComment = (comment) => {
        setCurrentComment(comment);
        setCommentEditorDialog(true);
    }

    const handleReplayComment = (comment) => {
        setIsReplay(true);
        setCurrentComment(comment);
        setCommentEditorDialog(true);
    }

    const closeCommentEditorDialog = () => {
        setIsReplay(false);
        setCurrentComment(null);
        setCommentEditorDialog(false);
    }

    const hendleCommentDisplay = async () => {
        setCurrentSection(currentSection + 1);
        var model = {
            ArticleId: articleId,
            perSection: perSection,
            currentSection: currentSection,
        };

        const data = await GetArticleComment(model);
        // console.info("articleComment data", data);
        // console.info("articleComment2", commentList.concat(data.data));
        setCommentList(commentList.concat(data.data));
    }

    return (
        <>
            <div className="comment-list pb-4">
                {commentList.length > 0 && commentList.filter(x => x.Comment_ReplyId == null).map((item) => (
                    <div key={item.Id} className={`comment-row  ${item.IsConfirm ? "" : "comment-notconfirm"}`}>
                        <div>
                            {item.UserImage
                                ? <img className="userimage" src={item.UserImage} />
                                : <img className="userimage" src="/images/jess-bailey-q10VITrVYUM-unsplash.jpg" />
                            }
                        </div>

                        <div className="commentbox left-col">
                            <div className="d-flex">
                                <h3> {item.FullName}</h3>
                                {item.UserId != user.ID && user.IsAdmin &&
                                    <span className="ps-3" onClick={() => handleReplayComment(item)}>
                                        <img src="/images/326683_all_reply_icon.svg" style={{ width: "30px", cursor: "pointer" }} />
                                    </span>
                                }
                            </div>
                            {item.UserId == user.ID
                                ? <div className="d-flex">
                                    <span>{moment(item.Date, 'YYYY/MM/DD' ).locale('fa').format('YYYY/MM/DD')}</span>&nbsp; &nbsp; | &nbsp; &nbsp;
                                    <span onClick={() => handleEditComment(item)}><Edit className="comment-edit" size={18} /></span>
                                    <span onClick={() => handleDeleteComment(item.Id)}><Trash2 className="comment-delete" size={18} /></span>
                                </div>
                                : <span>{moment(item.Date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span>
                            }
                            <p className="word-wrap">
                                {item.Description ? (<CustomeArticleParser content={item.Description} />) : null}
                            </p>
                            {
                                commentList.filter(el => el.Comment_ReplyId == item.Id).map((replay, i) => (
                                    <div key={i} className="comment-row admin-replay">
                                        {replay.UserImage
                                            ? <img className="userimage" src={replay.UserImage} />
                                            : <img className="userimage" src="/images/jess-bailey-q10VITrVYUM-unsplash.jpg" />
                                        }

                                        <div className="left-col">
                                            <h3> {replay.FullName} </h3>
                                            {replay.UserId == user.ID
                                                ? <div className="d-flex">
                                                    <span>{replay.PersianDate}</span>&nbsp; &nbsp; | &nbsp; &nbsp;
                                                    <span onClick={() => handleEditComment(replay)}><Edit className="comment-edit" size={18} /></span>
                                                    <span onClick={() => handleDeleteComment(replay.Id)}><Trash2 className="comment-delete" size={18} /></span>
                                                </div>
                                                : <span>{replay.PersianDate}</span>
                                            }
                                            <p>
                                                {replay.Description ? (<CustomeArticleParser content={replay.Description} />) : null}
                                            </p>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                ))}
            </div>
            {commentList.length >= 5 &&
                <div className="pb-4">
                    <button className="btn btn-light" onClick={hendleCommentDisplay}>مشاهده نظرات بیشتر ...</button>
                </div>}
            {CurrentComment && <CommentEditor showDialog={CommentEditorDialog} closeDialog={closeCommentEditorDialog} comment={CurrentComment} isReplay={IsReplay} />}
        </>
    );
}

export default CommentList;