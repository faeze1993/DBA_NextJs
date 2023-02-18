import { isNull } from "lodash";
import Head from "next/head";
import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Home } from "react-feather";
import Link from "next/link";
import { GetWebSiteTitle } from "../../services/mainpageService";
import { GetAllAuthors } from "../../services/authorService";


const Authors = ({ webSiteTitle, authorsList }) => {


    return (
        <>
            <section className="term-categories container-xxl">

                <Head>
                    <title> نویسندگان | {webSiteTitle}</title>
                </Head>
                <BreadcrumbsItem to='/' href='/'><Home size={"16px"} /></BreadcrumbsItem>
                <BreadcrumbsItem to='/authors' href='/authors'>نویسندگان </BreadcrumbsItem>

                <div className="row  mt-3">

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <section className="">

                            <div className="row author">
                                {authorsList.map(author => (

                                    <div key={author.Id} class="col-lg-3 mb-2">
                                        <figure class="card__thumb mb-0">
                                            {author.ImageUrl ?
                                                <img src={author.ImageUrl} alt="Picture by Kyle Cottrell" class="card__image" />
                                                :
                                                <img src="/images/jj.jpg" alt="Picture by Kyle Cottrell" class="card__image" />
                                            }

                                            <figcaption class="card__caption">
                                                <h2 class="card__title">{author.FullName}</h2>
                                                {isNull(!author.Description) && <p class="card__snippet">{author.Description.length > 100 ? author.Description.slice(0, 100) + "..." : author.Description}</p>}
                                                <Link href={`/authors/${author.ID}/${author.FullName.replace(" ", "_").replace(/ /g, "_")}/`} class="card__button"> مشاهده رزومه</Link>
                                            </figcaption>
                                        </figure>
                                    </div>


                                    // </div>
                                ))}
                            </div>

                            {/* <Paginate totalItems={authors.length} currentPage={currentPage} perPage={perPage} onPageChange={handleChangePage} /> */}

                        </section>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Authors;


export const getStaticProps = async () => {


    const webSiteTitle = await GetWebSiteTitle();
    const allAuthors = await GetAllAuthors();


    return {
        props: {
            webSiteTitle: webSiteTitle.data,
            authorsList: allAuthors.data
        },
    };
};
