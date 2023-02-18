import { findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Home } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { Link} from "next/link";
import { getArticlesForArchive } from "../actions/articles";
import { getBreadCrumbListOnArticleId } from "../actions/breadCrumb";
import { useRouter } from "next/router";

const CustomBreadCrumb = (/*{article}*/) => {

    var items = useSelector(state => state.breadCrumbList);
    const dispatch = useDispatch();
    let router = useRouter();

    const params = router.query.slug;

    useEffect(() => {

    }, [])

    const handleclickBreadCrumb = (Id) => {
        if (params.id == Id)//اخرین ایتم از بریدکرامپ نباید قابل کلیک کردن باشد
            return;
        dispatch(getBreadCrumbListOnArticleId(Id));
        var paginatModel = {
            perpage: 12,
            currntpage: 1,
            skip: 0
        };
        var model = {
            Id: Id,
            paginetedata: paginatModel
        };

        dispatch(getArticlesForArchive(model));

        if (router.pathname.indexOf("article") == 1) {
            router.push({
                pathname: '/archive',
                query: { detail: Id }
            });

          
        };
    }


    return (
        <div className="">
            <ul className="d-flex custom-breadcrumb">
                {/* <li className='customBreadCrumbItem pe-2 font-bold'><Link href="/"><Home size={16} /></Link></li> */}
                <li onClick={() => handleclickBreadCrumb()} className='customBreadCrumbItem pe-2'> <ChevronLeft /> مقالات</li>
                {/* {items ? items.map((item) => (
                    <li onClick={() => handleclickBreadCrumb(item.Id)} className='customBreadCrumbItem pe-2'> <ChevronLeft />{`${item.Name}`}</li>
                )) : null} */}
            </ul>
        </div>
    );
}

export default CustomBreadCrumb;