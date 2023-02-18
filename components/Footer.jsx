import react from "react";
import { Mail, Phone } from "react-feather";
import Link from "next/link";

const Footer = ({footerData}) => {
    return (
        <footer className="main-footer">
            <div className="top-footer">
                <div className="container-xxl pt-2" style={{borderTop:"1px solid #e6e6e6"}}>
                    {/* <div className="row">

                    </div>
                    <hr/> */}
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <section className="list">
                                <header><h4> درباره  دی بی ای</h4></header>
                                <p>
                                    {footerData.FooterAboutUsText}
                                </p>
                            </section>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <section className="list">
                                <header><h4> بخش های سایت</h4></header>
                                <ul className="footeritemlist">
                                    <li><Link href="">قوانین و مقررات</Link></li>
                                    <li><Link href="/authors">نویسندگان </Link></li>
                                    <li><Link href="/aboutUs">درباره ما </Link></li>
                                    <li><Link href="/contactus">همکاری با ما</Link></li>
                                </ul>
                            </section>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <section className="list">
                                <header><h4> ارتباط با ما</h4></header>
                                <p>شما میتوانید با استفاده از یکی از راه‌های زیر با ما ارتباط برقرار کنید</p>
                                <ul className="footeritemlist">
                                    <li><Mail color="#0f70b7"/> <span  className="ms-2">{footerData.Fax}</span></li>
                                    <li><Phone  color="#0f70b7"/> <span className="ms-2"> {footerData.Tel}</span></li>
                                </ul>
                            </section>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="bottom-footer p-1">
                <div className="container-xxl font-12">
                    <p className="text-center mb-0">
                    کليه حقوق محصولات و محتوای اين سایت متعلق به مستر دی بی ای می باشد و هر گونه کپی برداری از محتوا و محصولات سایت غیر مجاز و بدون رضایت ماست
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;