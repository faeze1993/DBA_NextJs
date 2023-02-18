import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getAllAuthors } from "../actions/authors";
import { getFooterContent } from "../actions/footer";
import { getLogImage, getMainPageKeyWord, getWebSiteTitle } from "../actions/mainPage";
import { getAllProducts } from "../actions/product";
import { reducers } from "../reducers";


export const store = createStore(
    reducers,
    compose(applyMiddleware(thunk))
)

//Initialize
store.dispatch(getFooterContent());
store.dispatch(getMainPageKeyWord());
store.dispatch(getLogImage());
store.dispatch(getWebSiteTitle());
store.dispatch(getAllProducts());