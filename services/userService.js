import http from './httpService';
import config from './config.json';

export const registerUser = user => {
    return http.post(`/Account/Register`, JSON.stringify(user));
}

export const loginUser = user => {

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", user.UserName);
    urlencoded.append("password", user.Password);


    return http.post(`/Login`, urlencoded
        , {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
}


export const IsLogin = token => {
    return http.get(`/Account/IsLogin`,{
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
}

export const LogOut = () => {
    return http.post(`/Account/LogOut`);
}

export const GetUserData = token => {
    return http.get(`/Account/GetUserData`, {
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
}

export const CheckVerifyCode = (code, username) => {
    return http.post(`/Account/CheckVerifyCode?checkVerifyCodeViewModel.Code=${code}&checkVerifyCodeViewModel.Username=${username}`)
}

export const CheckMobileNumber = (mobile) => {
    return http.post(`/Account/CheckMobileNumber?checkMobileNumberViewModel.Mobile=${mobile}`)
}

export const ResendVerifyCode = (username) => {
    return http.post(`/Account/GetVerifyCode?checkVerifyCodeViewModel.Username=${username}`)
}

export const SaveProfileImage = (formData) => {
    return http.post(`/Account/SaveProfileImage`,formData);
} 

export const EditUserAccount = (model) => {
    return http.post(`/Account/EditUserAccount`,model);
} 

export const ChangePasswordOnLoginMode = (model) => {
    return http.post(`/Account/ChangePassOnLoginMode`,model);
} 

export const ChangePassword = (model) => {
    return http.post(`/Account/ChangePassword`,model);
} 

export const VerifyCaptchaResponse = (model) => {
   
    return http.post(`/Account/VerifyCaptchaResponse`,model);
}