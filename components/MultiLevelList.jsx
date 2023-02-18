import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreadCrumbListOnArticleId } from "../actions/breadCrumb";
import MultiLevelListItem from "./MultiLevelListItem";
import _ from "lodash";
import { NavLink } from "../utils/NavLink";

export default function MultiLevelList({ list }) {
  const dispatch = useDispatch();

  const handleBreadCrumb = (article) => {
    dispatch(getBreadCrumbListOnArticleId(article.ID));
  }
  return (
    <>
      {list.map((item) => (
        <>
          {item.Childs.length == 0 && <li className="w-100" onClick={() => handleBreadCrumb(item)}><NavLink href={`/article/${item.ID}/${item.Name.replace(" ","_").replace(/ /g,"_")}`} id={item.ID} activeClassName="active-border" aria-expanded="true">{item.Name}</NavLink></li>}
          {item.Childs.length > 0 && <MultiLevelListItem listItem={item} />}
        </>
      ))}
    </>
  );
}

