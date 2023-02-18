import React from "react";
import Link from "next/link";

const AdvertiseSlider = ({ sliderData }) => {
    console.info("sliderData",sliderData)
    return (
        <div className="container-xxl">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {sliderData.map((item) => (
                        <div key={item.Id} className={`${item.IsActive ? "carousel-item active" : "carousel-item"}`} >
                            <Link href={item.LinkUrl}>
                                <img src={item.ImageUrl} className="d-block w-100" alt={item.Name} />
                            </Link >

                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    );
}

export default AdvertiseSlider;