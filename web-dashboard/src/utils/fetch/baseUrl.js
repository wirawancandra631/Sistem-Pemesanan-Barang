import axios from "axios";
export const BASEURL = (import.meta.env.MODE == "development") ? "http://localhost:3000/dashboard-api/v2" : "http://31.97.187.107/server/";
export const BASEURLAUTH = `${BASEURL}/auth`;
export const BASEURLBRANDPRODUCT = `${BASEURL}/brand-product`;
export const BASEURLCATEGORYPRODUCT = `${BASEURL}/category-product`;
export const BASEURLPRODUCT = `${BASEURL}/product`;
export const BASEURLPRODUCTRECOMENDATION = `${BASEURL}/product-recomendation`;
export const BASEURLPRODUCTDISCOUNT = `${BASEURL}/product-discount`;
export const BASEURLCUSTOMER = `${BASEURL}/customer`;
export const BASEURLUSERPROFIL = `${BASEURL}/user-app`;
export const BASEURLDASHBOARDINFORMATION = `${BASEURL}/dashboard-information`;
export const BASEURLBANNERPROMOTION = `${BASEURL}/banner-promotion`;
const axiosAuth = axios.create({ baseURL: BASEURL });
axiosAuth.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearear ${localStorage.getItem("token")}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
axiosAuth.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status == 401) {
            return window.location.href = "/auth";
        }
        return Promise.reject(error);
    }
);
export { axiosAuth };
