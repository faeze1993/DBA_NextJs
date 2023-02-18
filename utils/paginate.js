import _ from 'lodash';


export const paginate = (articles, currentPage, perPage) => {
    // console.info("articles, currentPage, perPage",articles, currentPage, perPage);
    const startIndex = (currentPage - 1) * perPage;
    return _(articles)
        .slice(startIndex)
        .take(perPage)
        .value();
}