import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux'
import AdvertiseSlider from '../components/AdvertiseSlider'
import Articles from '../components/Articles'
import { GetAllSliders } from '../services/sliderService'
import { GetWebSiteTitle } from '../services/mainpageService'
import { GetAllArticlesForMainPage } from '../services/articleService'
import Products from '../components/Products'


//https://next-auth.js.org/tutorials/securing-pages-and-api-routes

export default function Home({slidersList, articlesList,productsList}) {

  const webSiteTitle = useSelector(state => state.webSiteTitle);
  const articleslist = useSelector(state => state.articlesFoMainPage)
  const slider = useSelector(state => state.slider)

  
  const handleClickArticle = (article) => {

  }

  return (
    <>
      <Head>
        <title>{webSiteTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {slidersList && <AdvertiseSlider sliderData={slidersList} />}

      <div className="new-article container-xxl pt-3">
        <h4>جدیدترین مقالات</h4>
        <div className="p-relative pb-4">
          <div className="rx-border-rectangle"></div>
          <div className="rx-border-rectangle-after"></div>
        </div>

        {articlesList.LatestArticles && <Articles articles={articlesList.LatestArticles} handleClickArticle={handleClickArticle} />}
      </div>
      <div className=" pb-4 container-xxl">
        {true ? <Products /> : null}

      </div>
      <div className="new-article container-xxl">
        <h4>پر بازدیدترین ها</h4>
        <div className="p-relative pb-4">
          <div className="rx-border-rectangle"></div>
          <div className="rx-border-rectangle-after"></div>
        </div>

        {articlesList.MostVisitedArticles && <Articles articles={articlesList.MostVisitedArticles} handleClickArticle={handleClickArticle} />}
      </div>
    </>
  )
}


// get slider , articles , product list
export const getStaticProps = async () => {
  
  let webSiteTitle = "";
  let sliders = [];
  let articles = [];
  let products = [];

  const data = await GetWebSiteTitle();
  webSiteTitle= data.data;

  const data1 = await GetAllSliders();
  sliders = data1.data;

  const  data2  = await GetAllArticlesForMainPage();
  articles = data2.data;

  return {
    props: {
      webSiteTitle: webSiteTitle,
      slidersList: sliders,
      articlesList: articles,
      productsList: products
    },
    revalidate: 60, // In seconds
  };
};
