import { env } from "@/lib/env/client.mjs";
import { StrapiQueryParameters } from "@/lib/validators/strapi/strapi-query-parameters";
import { stringify } from "qs";

export interface APIResponse<T = unknown> {
    data: DataAPIResponse<T> | DataAPIResponse<T>[];
    meta: Record<string, unknown>;
}
export interface DataAPIResponse<T = unknown> {
    id: number;
    attributes: T;
}

export const api = async <T>(
    path: string = "",
    urlParamsObject: StrapiQueryParameters = {},
    options: RequestInit = {},
    flattenData: boolean = true
): Promise<T> => {
    const mergedOptions: RequestInit = {
        headers: { "Content-Type": "application/json" },
        ...options
    };

    const queryString = stringify(urlParamsObject);
    const requestUrl = getAPIURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
        console.error(response.statusText);
        throw new Error("An error occured fetching API data, please try again");
    }
    const data: APIResponse<any> = await response.json();

    return flattenData ? flattenResponse(data) : (data as any);
};

export const getAPIURL = (path = "") => {
    return `${env.NEXT_PUBLIC_STRAPI_URL}${path}`;
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
