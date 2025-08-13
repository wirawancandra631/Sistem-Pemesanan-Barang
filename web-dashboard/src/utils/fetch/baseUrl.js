import axios from "axios";
export const BASEURL = "http://localhost:3000/dashboard-api";
export const BASEURLAUTH = `${BASEURL}/auth`;
export const BASEURLBRANDPRODUCT = `${BASEURL}/brand-product`;
export const BASEURLCATEGORYPRODUCT = `${BASEURL}/category-product`;
export const BASEURLPRODUCT = `${BASEURL}/product`;
export const BASEURLPRODUCTRECOMENDATION = `${BASEURL}/product-recomendation`;
export const BASEURLCUSTOMER = `${BASEURL}/customer`;
export const BASEURLUSERPROFIL = `${BASEURL}/user-profil`;
export const BASEDASHBOARDINFORMATION = `${BASEURL}/dashboard-information`;
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
