import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { addUser } from "../../actions/user";
import ForgetPassDialog from "../../components/ForgetPassDialog";
import VerifyCodDialog from "../../components/VerifyCodDialog";
import { GetUserData, loginUser, registerUser, VerifyCaptchaResponse } from "../../services/userService";
import { errorMessage, successMessage } from "../../utils/message";
import { context } from "./context";


const UserContext = ({ children, history }) => {

    const SITE_KEY = "6LepF-MeAAAAABMWi7tyymnbuWZjc7p7p9WLX2A0";

    const [UserName, setUsername] = useState("");
    const [FName, setFName] = useState("");
    const [LName, setLName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [RepeatPassword, setRepeatPassword] = useState("");
    const [Mobile, setMobile] = useState("");
    const [ShowVerifyCodeDialog, setShowVerifyCodeDialog] = useState(false);
    const [ShowForgetPassDialog, setShowForgetPassDialog] = useState(false);
    const [ShowDuplicateUsernameDialog, setDuplicateUsernameDialog] = useState(false);

    const [ForgetPass, setForgetPass] = useState(false)
    const [Loading, setLoading] = useState(false);
    const [, forceUpdate] = useState();

    const dispatch = useDispatch();
    const loginValidation = useRef(
        new SimpleReactValidator(
            {
                messages: {
                    required: "پر کردن این فیلد الزامی می باشد",
                    string: "این فیلد باید با حروف پر شود",
                    min: "حداقل 8 کاراکتر وارد نمایید",
                    max: "حداکثر تعداد کاراکتر رعایت نشده است",
                    email: "الگوی وارد شده صحیح نمی باشد"
                },
                element: message => <span style={{ color: 'red' }}>{message}</span>
            }
        )
    )

    const registerValidation = useRef(
        new SimpleReactValidator(
            {
                messages: {
                    required: "پر کردن این فیلد الزامی می باشد",
                    string: "این فیلد باید با حروف پر شود",
                    min: "حداقل 8 کاراکتر وارد نمایید",
                    max: "حداکثر تعداد کاراکتر رعایت نشده است",
                    email: "الگوی وارد شده صحیح نمی باشد"
                },
                element: message => <span style={{ color: 'red' }}>{message}</span>
            }
        )
    )

    const closVerifyCodeDialog = () => { setShowVerifyCodeDialog(false); ForgetPass ? history.push(`/forgetPass/${UserName}`) : history.push("/login") };
    const cancelVerifyCodeDialog = () => { setShowVerifyCodeDialog(false) };
    const closForgetPassDialog = (username, forgetpass) => { setShowForgetPassDialog(false); setUsername(username); setForgetPass(forgetpass); setShowVerifyCodeDialog(true) };
    const cancelForgetPassDialog = () => { setShowForgetPassDialog(false) };

    const Login = async (token) => {

        //موقت
        // var model = {
        //     CaptchaToken: token
        // }
        // const { data } = await VerifyCaptchaResponse(model);
        // debugger
        if (/*data.Success == true && data.score >= 0.6*/true) {
            var user = JSON.parse(localStorage.getItem("user"));
            try {
                const { data } = await loginUser(user);
                setLoading(false);
                // console.info("data---",data);
                if (data.expires_in > 0) {
                    successMessage("کاربر با موفقیت وارد شد");
                    localStorage.setItem("token", data.access_token)
                    localStorage.removeItem("user");
                    getUserData(data.access_token);
                    resetStates();
                    history.replace('/')
                } else if (data.expires_in < 0) {
                    localStorage.removeItem("user");
                    errorMessage("مشکلی پیش آمده");
                }
            } catch (error) {
                setLoading(false);
                errorMessage("نام کاربری یا رمز عبور اشتباه است");
            }
        } else {
            setLoading(false);
            errorMessage("شما ربات تشخیص داده شده اید");
        }


    }
    const handleLogin = async e => {
        e.preventDefault();
        const user = {
            UserName,
            Password
        }

        try {
            if (loginValidation.current.allValid()) {
                
                setLoading(true);
                localStorage.setItem("user", JSON.stringify(user));
                // window.grecaptcha.ready(() => {
                //     window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
                //         Login(token);
                //     });
                // });
                Login("")//موقت
            } else {

                loginValidation.current.showMessages();
                forceUpdate(1);
            }

        } catch (ex) {
            setLoading(false);
            errorMessage(" در فرآیند تایید اعتبار کپتچا مشکلی رخ داده است، لطفا از اتصال  دستگاه خود به شبکه اطمینان حاصل نمایید و مجددا تلاش کنید ");
        }

    }

    const handleYesResponse = () => {
        setDuplicateUsernameDialog(false);
        setShowForgetPassDialog(true);
    }

    const handleForgetPass = async e => {
        e.preventDefault();
        setShowForgetPassDialog(true);
    }

    const handleRegister = async e => {
        e.preventDefault();

        const user = {
            // UserName,
            FName,
            // LName,
            // Email,
            Mobile,
            Password,
            RepeatPassword
        }

        try {
            // console.info("user ddd", user);
            if (registerValidation.current.allValid()) {
                if (Password == RepeatPassword) {
                    setLoading(true);
                    localStorage.setItem("user", JSON.stringify(user));
                    window.grecaptcha.ready(() => {
                        window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
                            Register(token);
                        });
                    });

                } else {
                    errorMessage(" رمز عبور و تکرار رمز عبور باید برابر باشند")
                }

            } else {
                registerValidation.current.showMessages();
                forceUpdate(1)
            }

        } catch (ex) {
            setLoading(false);
            // errorMessage("مشکلی پیش آمده" + ex)
            errorMessage(" در فرآیند تایید اعتبار کپتچا مشکلی رخ داده است، لطفا از اتصال  دستگاه خود به اینترنت اطمینان حاصل نمایید و مجددا تلاش کنید ");
        }

    }

    const Register = async (token) => {
        var model = {
            CaptchaToken: token
        }
        const { data } = await VerifyCaptchaResponse(model);
        if (data.Success == true && data.score >= 0.6) {
            var user = JSON.parse(localStorage.getItem("user"));
            // console.info("user 222", user);
            const { data } = await registerUser(user);
            setLoading(false);
            if (data.Status == 'success') {
                successMessage(" پیامکی حاوی کد تایید برای شما ارسال گردید");
                setUsername(user.Mobile.substring(1))
                setShowVerifyCodeDialog(true)
                localStorage.removeItem("user");
            }
            //این سناریو حذف گردیده است
            // else if (data.Status == 'duplicate') {
            //     setDuplicateUsernameDialog(true);
            //     localStorage.removeItem("user");
            // } 
            else {
                errorMessage(data.Message);
                localStorage.removeItem("user");
            }
        }
        else {
            setLoading(false);
            errorMessage("شما ربات تشخیص داده شده اید");
        }
    }
    const getUserData = async token => {
        try {
            const { data } = await GetUserData(token);
            dispatch(addUser(data));

        } catch (ex) {
            errorMessage("مشکلی پیش آمده" + ex)
        }
    }

    const resetStates = () => {
        setUsername("");
        setFName("");
        setLName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setMobile("");
    }
    return (
        <context.Provider value={{
            UserName, setUsername,
            FName, setFName,
            // LName, setLName,
            // Email, setEmail,
            Password, setPassword,
            RepeatPassword, setRepeatPassword,
            Mobile, setMobile,
            loginValidation,
            registerValidation,
            Loading,
            // refRecaptcha,
            // onResolvedRecaptcha,
            // Login,
            // Register,
            handleLogin,
            handleForgetPass,
            handleRegister
        }}>

            <VerifyCodDialog showDialog={ShowVerifyCodeDialog} closeDialog={closVerifyCodeDialog} cancelDialog={cancelVerifyCodeDialog} useName={UserName} />
            <ForgetPassDialog showDialog={ShowForgetPassDialog} closeDialog={closForgetPassDialog} cancelDialog={cancelForgetPassDialog} />
            {/* <DuplicateUsernameDialog showDialog={ShowDuplicateUsernameDialog} closeDialog={closDuplicateUsernameDialog} handleYes={handleYesResponse} cancelDialog={cancelShowDuplicateUsernameDialog} useName={UserName} /> */}
            {children}
        </context.Provider>
    );
}

export default UserContext;