import qs from "qs";
import { API_URL } from "./constants";

export interface APIResponse<T = unknown> {
    data: DataAPIResponse<T> | DataAPIResponse<T>[];
    meta: Record<string, unknown>;
}
export interface DataAPIResponse<T = unknown> {
    id: number;
    attributes: T;
}

export interface StrapiTimestamp {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

export interface APIFetcher<P = any> {
    <T = P>(
        path: string,
        urlParamsObject?: any,
        options?: RequestInit,
        flattenData?: boolean
    ): Promise<T>;
}
export interface ServiceFetcher<P = any> {
    <T = P>(urlParamsObject?: any, options?: RequestInit, flattenData?: boolean): Promise<T>;
}

export const fetchAPI: APIFetcher = async <T>(
    path: string = "",
    urlParamsObject: any = {},
    options: RequestInit = {},
    flattenData: boolean = true
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

    return flattenData ? flattenResponse(data) : (data as any);
};

export const getAPIURL = (path = "") => {
    return `${API_URL}${path}`;
};

// Flatten response
const flattenArray = <T>(array: DataAPIResponse<T>[]) => {
    return array.map(data => flattenResponse(data));
};
const flattenAttributes = <T>(data: DataAPIResponse<T>) => {
    const attrs: Record<string, unknown> = {};
    for (const key in data.attributes) {
        attrs[key] =
            typeof data.attributes[key] === "object"
                ? flattenResponse(data.attributes[key])
                : data.attributes[key];
    }
    return {
        id: data.id,
        ...attrs
    };
};
export const flattenResponse = <T>(data: any): T => {
    if (Array.isArray(data)) return flattenArray(data) as any;
    if (data?.attributes) return flattenAttributes(data) as any;
    if (data?.data !== undefined) return flattenResponse(data.data) as any;

    return data as any;
};
