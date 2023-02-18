import React, { useState, useRef } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Home } from "react-feather";
import SimpleReactValidator from "simple-react-validator";
import { SaveConectUs } from "../../services/ContentUsService";
import { errorMessage, successMessage } from "../../utils/message";
import { useSelector } from "react-redux";
import Head from "next/head";
import { GetWebSiteTitle } from "../../services/mainpageService";

const ContactUs = ({webSiteTitle}) => {


    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Subject, setSubject] = useState("");
    const [Description, setDescription] = useState("");

    const [, forceUpdate] = useState();

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (validation.current.allValid()) {

                var model = {
                    FullName,
                    Email,
                    Subject,
                    Description
                }

                const { data } = await SaveConectUs(model);
                // console.log("data", data);
                if (data.Status == "success") {
                    successMessage("پیام شما با موفقیت ثبت شد");
                    resetStates();
                } else {
                    errorMessage("مشکلی پیش آمده");
                }
            } else {
                validation.current.showMessages();
                forceUpdate(1);
            }

        } catch (ex) {
            errorMessage("مشکلی پیش آمده" + ex);
        }
    }

    const resetStates = () => {
        setFullName("");
        setDescription("");
        setSubject("");
        setEmail("");
    }
    return (
        <>
            <Head>
                <title> تماس با ما |  {webSiteTitle}</title>
            </Head>
            <BreadcrumbsItem to='/'><Home size={"16px"}/></BreadcrumbsItem>
            <BreadcrumbsItem to='/contactus'>تماس با ما </BreadcrumbsItem>
            <div className="container-xxl py-4">
                <div className="col-12 contactUs">
                    <div className="row about-title pb-2">
                        <div className="co-md-12">
                            تماس با ما
                        </div>
                    </div>
                    <div className="row about-content">
                        <div className="col-md-6 ">
                            <form onSubmit={handleSubmit}>
                                <div className="col-auto mb-2">
                                    <input class="form-control"
                                        type="text"
                                        placeholder="نام و نام خانوادگی"
                                        aria-label="default input example"
                                        value={FullName}
                                        onChange={(e) => { setFullName(e.target.value); validation.current.showMessageFor('FullName') }} />
                                </div>
                                {validation.current.message("FullName", FullName, 'required')}
                                <div className="col-auto  mb-2">
                                    <input class="form-control"
                                        type="text"
                                        placeholder="ایمیل"
                                        aria-label="default input example"
                                        value={Email}
                                        onChange={(e) => { setEmail(e.target.value); validation.current.showMessageFor('Email') }}
                                    />
                                </div>
                                {validation.current.message("Email", Email, 'required')}
                                <div className="col-auto  mb-2">
                                    <input class="form-control"
                                        type="text"
                                        placeholder="موضوع"
                                        aria-label="default input example"
                                        value={Subject}
                                        onChange={(e) => { setSubject(e.target.value); validation.current.showMessageFor('Subject') }}
                                    />
                                </div>
                                {validation.current.message("Subject", Subject, 'required')}
                                <div className="col-auto  mb-2">
                                    <textarea class="form-control"
                                        re type="text"
                                        placeholder="توضیحات"
                                        aria-label="default input example"
                                        style={{ resize: "vertical" }}
                                        value={Description}
                                        onChange={(e) => { setDescription(e.target.value); validation.current.showMessageFor('Description') }}
                                    />
                                </div>
                                {validation.current.message("Description", Description, 'required')}
                                <div class="d-grid gap-2">
                                    <button class="btn main-background-color-btn text-white" type="submit">ثبت</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 ">
                            <img src="../images/undraw-contact.svg" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUs;


// get webSiteTitle  
export const getStaticProps = async () => {
  
    let webSiteTitle = "";
  
    const data = await GetWebSiteTitle();
    webSiteTitle= data.data;

    return {
      props: {
        webSiteTitle: webSiteTitle
      },
      revalidate: 60, // In seconds
    };
  };
  