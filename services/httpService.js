import axios from "axios";
import { toast } from "react-toastify";
import https from 'https'
// import XMLData from '../../src/Settings.xml';
// import XMLParser from 'react-xml-parser';


export async function getBaseUrl() {
    var response = await axios.get(XMLData, { "Content-Type": "application/xml; charset=utf-8" })
    var url = ''
    var xml = new XMLParser().parseFromString(response.data);
    //console.info("xml", xml.getElementsByTagName('domain'))
    const domains = xml.getElementsByTagName('domain');
    var currentdomain = window.location.origin;
    //console.info("currentdomain", currentdomain);
    //console.info("window.location.origin", window.location.origin);

    domains.forEach(domain => {
        var attributes = domain.attributes;
        if (attributes.value == currentdomain) {
            
            url = attributes.apiaddress;
        }
    });
    //console.info("url url url", url);
    return url;
}
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  })
const axiosInstance = axios.create({
    // baseURL: API_END_POINTS.BASE_URL+AsyncStorage.getItem('dealerNo'),
    httpsAgent 
});
//    axiosInstance.defaults.timeout = 10000000;
axiosInstance.interceptors.request.use(
    async config => {
        config.baseURL = "https://localhost:44323/"/*await getBaseUrl()*/;
        //console.info("config", config);
        return config;
    },
    error => Promise.reject(error)
);


axiosInstance.interceptors.response.use(null, error => {
    const expectedErrors = error.response && error.response.status == 401 
    if(expectedErrors){
        // history.push("/")
        // toast.error("خطای احراز هویت", {
        //     position: "bottom-left",
        //     closeOnClick: true
        // });
    }

    return Promise.reject(error);
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
export default axiosInstance;
