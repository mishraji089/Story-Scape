import axios from "axios";

export const axiosInstance = axios.create({}); // ceate se koi bhi call karsakte hai chahe post ho get ya update

export const apiConnector = (method, url, bodyData, header, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: header ? header : null,
        params: params ? params: null,
    })
} 