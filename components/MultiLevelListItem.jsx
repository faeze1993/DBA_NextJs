import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronLeft } from "react-feather";
import MultiLevelList from "./MultiLevelList";
import { setBreadCrumbList } from "../actions/breadCrumb";
import _ from "lodash";
import { CustomArticleNavLink } from "../utils/CustomArticleNavLink";

export default function MultiLevelListItem({ listItem }) {
  const dispatch = useDispatch();
  const articleMenu = useSelector((state) => state.articleMenu);
  const handleBreadCrumb = (article) => {
    let breadCrumbList = recursiveBreadCrumbFunction(article, articleMenu);

    localStorage.setItem("breadCrumbList", JSON.stringify(breadCrumbList));
    dispatch(setBreadCrumbList(breadCrumbList));
  };

  function recursiveBreadCrumbFunction(item, items) {
    let breadCrumbList = [];
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (_.isEqual(item, element)) {
        let breadCrumbItem = {
          Id: element.ID,
          ParentId: element.ParentID,
          Name: element.Name,
        };
        breadCrumbList.push(breadCrumbItem);
        break;
      } else if (element.Childs.length > 0) {
        let breadCrumbItem = {
          Id: element.ID,
          ParentId: element.ParentID,
          Name: element.Name,
        };
        breadCrumbList.push(breadCrumbItem);
        recursiveBreadCrumbFunction(item, element.Childs);
      } else {
        breadCrumbList = [];
        continue;
      }
    }
    return breadCrumbList;
  }
  return (
    <li className="w-100">
      {listItem.Childs.length == 0 && (
        <CustomArticleNavLink
          href={`/article/${listItem.ID}/${listItem.Name.replace(
            " ",
            "_"
          ).replace(/ /g, "_")}`}
          id={item.ID}
          activeClassName="active-border"
          onClick={() => handleBreadCrumb(listItem)}
        >
          {listItem.Name}
        </CustomArticleNavLink>
      )}
      {listItem.Childs.length > 0 && (
        <>
          <a
            class="accordion-heading"
            data-toggle="collapse"
            data-target={`#submenu${listItem.ID}`}
            /*aria-expanded="true" */ aria-expanded="false"
          >
            <span class="pull-left">
              <ChevronLeft size={"16px"} />
            </span>
            <span class="nav-header-primary">{listItem.Name}</span>
          </a>

          <ul
            class="nav nav-list collapse child-nav"
            id={`submenu${listItem.ID}`}
          >
            <MultiLevelList list={listItem.Childs} />
          </ul>
        </>
      )}
    </li>
  );
}
