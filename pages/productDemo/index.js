import React, { useState, useRef } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Home } from "react-feather";
import SimpleReactValidator from "simple-react-validator";
import { errorMessage, successMessage } from "../../utils/message";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getProductList } from "../../actions/product";
import { useEffect } from "react";
import { SaveProductRequest } from "../../services/productRequestService";
import Head from "next/head";

const ProductDemoForm = ({ location }) => {

    const webSiteTitle = useSelector(state => state.webSiteTitle);
    const productList = useSelector(state => state.productValueLabelList)

    const dispatch = useDispatch();

    const [FullName, setFullName] = useState("");
    const [Mobile, setMobile] = useState("");
    const [SelectedProducts, setSelectedProducts] = useState([]);
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


    useEffect(() => {
        dispatch(getProductList())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (validation.current.allValid()) {

                var model = {
                    FullName,
                    Mobile,
                    Products: JSON.stringify(SelectedProducts),
                    Description
                }

                console.info("model",model);
                const { data } = await SaveProductRequest(model);
                console.log("data", data);
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
        setSelectedProducts([]);
        setMobile("");
    }
    return (
        <>
            <Head>
                <title> ثبت درخواست پروژه|  {webSiteTitle}</title>
            </Head>
            <BreadcrumbsItem to='/' href='/'><Home size={"16px"} /></BreadcrumbsItem>
            <BreadcrumbsItem to='/contactus' href='/contactus'>درخواست پروژه</BreadcrumbsItem>
            <div className="container-xxl py-4">
                <div className="col-12 contactUs">
                    <div className="row about-title pb-2">
                        <div className="co-md-12">
                            درخواست پروژه
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
                                        placeholder="موبایل"
                                        aria-label="default input example"
                                        value={Mobile}
                                        onChange={(e) => { setMobile(e.target.value); validation.current.showMessageFor('Mobile') }}
                                    />
                                </div>
                                {validation.current.message("Mobile", Mobile, 'required')}
                                <div className="col-auto  mb-2">
                                    <Select options={productList} isMulti onChange={(e) => { setSelectedProducts(e); validation.current.showMessageFor('SelectedProducts') }} />
                                </div>
                                {validation.current.message("Subject", SelectedProducts, 'required')}
                                <div className="col-auto  mb-2">
                                    <textarea class="form-control"
                                        re type="text"
                                        placeholder="توضیحات"
                                        aria-label="default input example"
                                        style={{ resize: "vertical" }}
                                        value={Description}
                                        rows="6"
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
                            <img src="../images/undraw_remotely_2j6y.svg" />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDemoForm;