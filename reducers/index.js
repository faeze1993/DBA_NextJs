import { combineReducers } from "redux";
import { aboutpageReducer } from "./aboutpage";
import { articleReducer, responseFromServer, searchValueReducer } from "./article";
import { articleForDashboardReduser, articleMenuReduser, articlesForArchiveReduser, articleForMainPageReduser,articleTypesReduser, authorArticlesReduser, articleDropdownListReduser } from "./articles";
import { authorReducer, authorsReducer } from "./authors";
import { breadCrumbReducer } from "./breadCrumb";
import { commentListReducer, commentReducer } from "./comment";
import { conectUsListReducer } from "./conectUs";
import { fileBreadCrumbListReducer, fileNodeListReducer } from "./file";
import { footerReducer } from "./footer";
import { logoImageReducer, mainPageKeyWordReduser, mainpageReducer, webSiteTitleReducer } from "./mainpage";
import { panelReducer } from "./panel";
import { panelMenuListReducer, panelMenuReducer } from "./panelMenu";
import { productListForPanelReducer, productListReducer, productValueLabelListReducer } from "./product";
import { productRequestListForPanelReducer } from "./productRequest";
import { sliderReducer } from "./slider";
import { ticketListForPanelReducer, ticketListReducer } from "./ticket";
import { userListReducer, userReducer,rolesReducer } from "./user";
import { userFileListReducer } from "./userFiles";

export const reducers = combineReducers({
    articlesForArchive: articlesForArchiveReduser,
    articlesForDashboard: articleForDashboardReduser,
    articlesFoMainPage: articleForMainPageReduser,
    articleTypes: articleTypesReduser,
    article: articleReducer,
    responseFromServer: responseFromServer,
    user:userReducer,
    panelValues: panelReducer,
    slider: sliderReducer,
    mainPage: mainpageReducer,
    footer: footerReducer,
    aboutpage: aboutpageReducer,
    breadCrumbList: breadCrumbReducer,
    articleMenu: articleMenuReduser,
    articleComment: commentReducer,
    mainPageKeyWord: mainPageKeyWordReduser,
    searchValue: searchValueReducer,
    fileNodeList: fileNodeListReducer,
    fileBreadCrumbList:fileBreadCrumbListReducer,
    userList : userListReducer,
    commentsList: commentListReducer,
    roles: rolesReducer,
    conectUsList: conectUsListReducer,
    panelMenu: panelMenuReducer,
    panelMenuList: panelMenuListReducer,
    logoImage: logoImageReducer,
    authors: authorsReducer,
    author:authorReducer,
    authorArticles:authorArticlesReduser,
    ticketList: ticketListReducer,
    userfileList: userFileListReducer ,
    ticketListForPanel: ticketListForPanelReducer,
    webSiteTitle: webSiteTitleReducer,
    productList: productListReducer,
    productForPanel: productListForPanelReducer,
    productValueLabelList: productValueLabelListReducer,
    productRequestListForPanel:productRequestListForPanelReducer,
    articleDropdownList: articleDropdownListReduser
})