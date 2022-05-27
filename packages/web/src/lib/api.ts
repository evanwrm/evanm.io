import qs from "qs";
import { API_URL } from "./constants";

export interface APIResponse<T = unknown> {
    data: DataAPIResponse<T> | DataAPIResponse<T>[];
    meta: Record<string, unknown>;
}
export interface DataAPIResponse<T = unknown> {
    attributes: T;
}

export interface APIFetcher<P = any> {
    <T = P>(
        path: string,
        urlParamsObject?: any,
        options?: RequestInit,
        mapData?: boolean
    ): Promise<T>;
}
export interface ServiceFetcher<P = any> {
    <T = P>(urlParamsObject?: any, options?: RequestInit, mapData?: boolean): Promise<T>;
}

export const fetchAPI: APIFetcher = async <T>(
    path: string = "",
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
): Promise<T> => {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = getAPIURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    const data: APIResponse<any> = await response.json();

    return mapData ? mapAPIData(data) : data;
};

export const getAPIURL = (path = "") => {
    return `${API_URL}${path}`;
};

export const mapAPIData = <T>(response: APIResponse<T>): T | T[] => {
    const data = response.data;

    if (Array.isArray(data)) return data.map(item => item.attributes);
    return data.attributes;
};
