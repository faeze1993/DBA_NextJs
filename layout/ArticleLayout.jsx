import React, { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import MultiLevelList from "../components/MultiLevelList";
import CustomBreadCrumb from "../utils/CustomBreadcrumb";
import { isNull } from "lodash";
import { GetAllArticleMenu } from "../services/articleService";
import { getAllArticleMenu } from "../actions/articles";

const ArticleLayout = ({ children }) => {

  const articleMenu = useSelector((state) => state.articleMenu);
  console.info("articleMenu",articleMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllArticleMenu());
  }, []);

  return (
    <section className="term-content container-xxl pt-3">
      <CustomBreadCrumb />
      <div className="row justify-content-center mt-4">
        <div className="col-lg-3 col-md-4 stickymode">
          <div className="term-image mb-3">
            <nav>
              <ul className="nav nav-list" style={{ display: "inherit" }}>
                {articleMenu && <MultiLevelList list={articleMenu} />}
              </ul>
            </nav>
          </div>
        </div>
        <hr className="d-md-none" style={{ width: "90%" }} />
        <div
          className="col-lg-9 col-md-8 col-sm-12 col-12 pull-left"
          style={{ zIndex: "9" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
export default ArticleLayout;

// export async function getStaticProps() {

//     const articlesmenu = await GetAllArticleMenu();

//     return {
//         props: {
//             articlesmenu: articlesmenu.data
//         },
//     };
// }
