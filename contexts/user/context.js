import { createContext } from "react";

export const context = createContext({
    UserName: "",
    setUsername: () => { },
    FName: "",
    setFName: () => { },
    Password: "",
    setPassword: () => { },
    RepeatPassword: "",
    setRepeatPassword: () => { },
    Mobile: "",
    setMobile: () => { },
    Policy: "",
    setPolicy: () => { },
    Loading: "",
    handleLogin: () => { },
    handleForgetPass: () => { },
    handleRegister: () => { }
})