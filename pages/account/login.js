import React, { useContext } from "react";
import { context } from "../../contexts/user/context";
import { NavLink } from "../../utils/NavLink";
import { User, Phone, Lock, Linkedin, Facebook, Twitter } from 'react-feather';
import { Eye } from "react-feather";
import BarLoader from "react-spinners/BarLoader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Head } from "next/document";
import UserContext from "../../contexts/user/userContext";
import MainLayout from '../../layout/MainLayout';


const Login = () => {

    const SITE_KEY = "6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0";
    const webSiteTitle = useSelector(state => state.webSiteTitle);
    const loginContext = useContext(context);

    const {
        UserName, setUsername,
        Password, setPassword,
        loginValidation,
        Loading,
        handleLogin,
        handleForgetPass
    } = loginContext;

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

    const handleToggleShowPass = (e) => {
        e.preventDefault();
        const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#password");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        togglePassword.innerHTML = password.getAttribute("type") === "text"
            ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
            :
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
    }

  
    return (
        <main className="client-page" >
            <div className='row px-0 container-xxl register_container'>
                <div className='col-md-8 col-12'>
                    <div className="register-form my-5" >

                        <header className='text-center pb-4'>
                            <h2 className='bold'> ورود به سایت </h2>
                        </header>

                        <Head>
                            <title>ورود |{webSiteTitle}</title>
                        </Head>

                        <div className="form-layer">

                            <form autocomplete="off" onSubmit={e => handleLogin(e)}>

                                <div className="form-account  mb-3">
                                    <span className="search-icon">
                                        <User color="rgb(39 103 169)" />
                                    </span>
                                    <input autocomplete="false"  type="text" name="UserName"  className="form-control" placeholder="نام کاربری" aria-describedby="username"
                                        value={UserName}
                                        onChange={e => {
                                            setUsername(e.target.value);
                                            // loginValidation.current.showMessageFor('UserName')
                                        }} />
                                </div>
                                {/* {loginValidation.current.message("UserName", UserName, 'required')} */}
                                <div className="form-account  mb-3">
                                        <span className="search-icon">
                                            <Lock color="rgb(39 103 169)" />
                                        </span>
                                        <input autocomplete="false"  type="password" id="password" className="noborder w-100" 
                                        aria-describedby="password"
                                        placeholder="رمز عبور" 
                                            name="Password"
                                            value={Password}
                                            onChange={e => {
                                                setPassword(e.target.value);
                                                // loginValidation.current.showMessageFor('Password')
                                            }} />

                                        <span className="toggleshowpass" id="togglePassword" onClick={(e) => handleToggleShowPass(e)}><Eye size={18} color={'gray'}/></span>
                                </div>
                                {/* {loginValidation.current.message("Password", Password, 'required')} */}

                                {/* <Recaptcha
                                    ref={refRecaptcha}
                                    sitekey={'6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0'}
                                    onResolved={() => onResolvedRecaptcha(Login)}
                                /> */}
                                <div className="d-grid gap-2 py-3">
                                    <button className="btn main-background-color-btn text-white" >ورود به سایت</button>
                                </div>

                            </form>

                            <div className="link text-center">
                                <span className="forgetpass" onClick={handleForgetPass} >رمز عبور خود را فراموش کرده اید؟</span>
                            </div>
                        </div>

                    </div>
                    {/* <div className="container-content my-3 text-center" style={{ background: "#ededed" }}>
                        <span>عضو نیستید؟</span>&nbsp;<NavLink href="/register" ><span className="main-color">ثبت نام</span></NavLink>
                    </div> */}
                </div>
                <div className='col-md-4 d-none d-md-flex register-info'>
                    <div className='register-info-content px-3'>
                        <span className='register-info-content_icon p-3 mb-5'><User size={50} /></span>
                        <h3 className='bold pb-2'>ورود به حساب کاربری در سایت DBA </h3>
                        <p className='pb-2'>به سادگی با کلیک بر روی دکمه ورود به حساب کاربری خود وارد شوید</p>
                        <NavLink href="/register" ><span className="btn btn-outline-light"> ثبت نام</span></NavLink>
                    </div>
                </div>
            </div>

            {Loading && <div className="preloader"><BarLoader color="rgb(39 103 169);" width={"100%"} loading={Loading} speedMultiplier={0.5} /></div>}

        </main>
    );
}

export default Login;


Login.getLayout = function (page) {
    return <MainLayout><UserContext>{page}</UserContext></MainLayout>;
};