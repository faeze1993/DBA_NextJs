import React from "react";
import Link from "next/link";
import { Users } from "react-feather";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Products = ({ aboutpageData }) => {

    const productData = useSelector(state => state.productList)
    console.info("productData", productData);

    useEffect(() => {


    }, [])


    return (
        <div className="d-flex justify-content-center" style={{ borderRadius: "5px", backgroundColor: "rgb(237, 237, 237)" }}>
            <div class="container-xxl text-center ">
                <div className="row mt-3">
                    <Users color="gray" size={60} className="mb-2 d-inline-block" />
                    <h4 class="styls">خدمات ما</h4>
                </div>

                <div class="row mx-auto my-auto justify-content-center">
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlay
                        autoPlaySpeed={4000}
                        centerMode={false}
                        className="py-3"
                        containerClass="container-with-dots"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                                breakpoint: {
                                    max: 3000,
                                    min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                            },
                            mobile: {
                                breakpoint: {
                                    max: 464,
                                    min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                            },
                            tablet: {
                                breakpoint: {
                                    max: 1024,
                                    min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={true}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                    >
                        {productData.length > 0 && productData.map((item, i) => (
                            <div key={i} className="col col-md card mx-2 card--styles">
                                <div className="card-img-top d-flex justify-content-center">
                                    <img src={item.ImageUrl} alt="img"
                                        className="rounded-circle mt-3" style={{ width: "130px", height: "130px;" }} />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className=" ">{item.Title}</h5>
                                    <p className=" " style={{ lineHeight: "1.5rem",textAlign:"center",minHeight: "90px" }}>
                                        {item.Description.length > 180 ? item.Description.substring(0,180) + "...": item.Description}
                                    </p>
                                    <Link href={"/productdemoform"} className="btn btn-primary stretched-link color--button">درخواست دمو</Link>
                                </div>
                            </div>
                        ))
                        }
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Products;