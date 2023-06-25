import { React, useContext } from 'react';
import { context } from '../../contexts/user/context';
import BarLoader from "react-spinners/BarLoader";
import { useSelector } from 'react-redux';
import { User, Phone, Lock, Linkedin, Facebook, Twitter } from 'react-feather';
import { useEffect } from 'react';
import Head from 'next/head';
import { NavLink } from "../../utils/NavLink";
import UserContext from "../../contexts/user/userContext";
import MainLayout from '../../layout/MainLayout';

const Register = () => {

    const SITE_KEY = "6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0";
    const registerContext = useContext(context);
    const webSiteTitle = useSelector(state => state.webSiteTitle);

    const {
        // UserName, setUsername,
        FName, setFName,
        // LName, setLName,
        // Email, setEmail,
        Password, setPassword,
        RepeatPassword, setRepeatPassword,
        Mobile, setMobile,
        Loading,
        // refRecaptcha,
        // onResolvedRecaptcha,
        // Register,
        registerValidation,
        handleRegister
    } = registerContext;

    useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
            const isScriptExist = document.getElementById(id);

            if (!isScriptExist) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                script.id = id;
                script.onload = function () {
                    if (callback) callback();
                };
                document.body.appendChild(script);
            }

            if (isScriptExist && callback) callback();
        }

        // load the script by passing the URL
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
            console.log("Script loaded!");
        });
    }, []);

    // if(!isEmpty(user)) return <Redirect to="/"/>
    return (
        <main className="client-page" >
            <div className='row px-0 container-xxl register_container'>
                <div className='col-md-8 col-12'>
                    <div className="register-form my-5">

                        <header className='text-center pb-4'>
                            <h2 className='bold'> عضویت در سایت </h2>
                            {/* <div className='d-flex justify-content-center my-3'>
                                <div className='p-2'><Facebook/></div>
                                <div className='p-2'><Linkedin/></div>
                                <div className='p-2'><Twitter/></div>
                            </div> */}
                        </header>

                        <Head>
                            <title>عضویت |  {webSiteTitle} </title>
                        </Head>

                        <div className="form-layer">

                            <form autocomplete="off" onSubmit={e => handleRegister(e)}>
                                <div className="form-account mb-1">
                                    <span className="search-icon">
                                        <User color="rgb(39 103 169)" />
                                    </span>
                                    <input autocomplete="false" type="text" className="form-control" id="floatingInput" placeholder="نام و نام خانوادگی " aria-describedby="fName"
                                        name="FName"
                                        value={FName}
                                        onChange={e => {
                                            setFName(e.target.value);
                                            registerValidation.current.showMessageFor('FName')
                                        }}
                                    />
                                </div>
                                {registerValidation.current.message("FName", FName, 'required|string')}

                                <div className="form-account mb-1">
                                    <span className="search-icon">
                                        <Phone color="rgb(39 103 169)" />
                                    </span>
                                    <input autocomplete="false" type="text" className="form-control" id="floatingInput" placeholder="شماره موبایل " aria-describedby="mobile"
                                        name="Mobile"
                                        value={Mobile}
                                        onChange={e => {
                                            setMobile(e.target.value);
                                            registerValidation.current.showMessageFor('Mobile')
                                        }} />
                                </div>
                                {registerValidation.current.message("Mobile", Mobile, 'required|min:11|max:11|integer')}
                                <div className="form-account mb-1">
                                    <span className="search-icon">
                                        <Lock color="rgb(39 103 169)" />
                                    </span>
                                    <input autocomplete="false" type="password" className="form-control" id="floatingInput" placeholder="رمز عبور " aria-describedby="password"
                                        name="Password"
                                        value={Password}
                                        onChange={e => {
                                            setPassword(e.target.value);
                                            registerValidation.current.showMessageFor('Password')
                                        }} />
                                </div>
                                {registerValidation.current.message("Password", Password, 'required|min:8')}
                                <div className="form-account mb-1">
                                    <span className="search-icon">
                                        <Lock color="rgb(39 103 169)" />
                                    </span>
                                    <input autocomplete="false" type="password" className="form-control" id="floatingInput" placeholder="تکرار رمز عبور " aria-describedby="RepeatPassword"
                                        name="RepeatPassword"
                                        value={RepeatPassword}
                                        onChange={e => {
                                            setRepeatPassword(e.target.value);
                                            registerValidation.current.showMessageFor('RepeatPassword')
                                        }}
                                    />
                                </div>
                                {registerValidation.current.message("RepeatPassword", RepeatPassword, 'required')}

                                {/* <Recaptcha
                                    ref={refRecaptcha}
                                    sitekey={'6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0'}
                                    onResolved={() => onResolvedRecaptcha(Register)}
                                    onRejected={() => alert("reject")}
                                /> */}
                                <div className="d-grid gap-2">
                                    <button className="btn main-background-color-btn text-white" >عضویت در سایت</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className='col-md-4 d-none d-md-flex register-info'>
                    <div className='register-info-content px-3'>
                        <span className='register-info-content_icon p-3 mb-5'><User size={50} /></span>
                        <h3 className='bold pb-2'>ایجاد حساب کاربری در سایت DBA </h3>
                        <p className='pb-2'>به سادگی با کلیک بر روی دکمه ورود به حساب کاربری خود وارد شوید</p>
                        <NavLink href="/account/login" ><span className="btn btn-outline-light"> ورود</span></NavLink>
                    </div>
                </div>
            </div>

            {Loading && <div className="preloader"><BarLoader color="rgb(39 103 169);" width={"100%"} loading={Loading} speedMultiplier={0.5} /></div>}
        </main>
    );
}

export default Register;

Register.getLayout = function (page) {
    return <MainLayout><UserContext>{page}</UserContext></MainLayout>
};