import { env } from "@/lib/env/client.mjs";
import { validatePromise } from "@/lib/validate";
import { ackValidator } from "@/lib/validators/ack";
import { RouteRevalidate } from "@/lib/validators/system";

type ApiOptions = RequestInit;

export const api = async <T = any>(resource: string, options: ApiOptions = {}): Promise<T> => {
    const host = `${env.NEXT_PUBLIC_SITE_URL}/api`;
    const response = await fetch(`${host}/${resource}`, {
        method: "GET",
        credentials: "include",
        ...options,
        headers: {
            Origin: env.NEXT_PUBLIC_SITE_URL,
            ...(options.headers || {})
        }
    });
    const result = response.headers.get("Content-Type")?.includes("application/json")
        ? await response.json()
        : await response.text();
    return response.ok ? result : Promise.reject(result);
};

// system

export const apiHealth = (apiOptions?: ApiOptions) => {
    return validatePromise(api("health", apiOptions), ackValidator);
};

type RouteRevalidateRequest = RouteRevalidate;
export const routeRevalidate = (request: RouteRevalidateRequest, apiOptions?: ApiOptions) => {
    return validatePromise(
        api("revalidate", {
            method: "POST",
            body: JSON.stringify(request),
            ...apiOptions
        }),
        ackValidator
    );
};
