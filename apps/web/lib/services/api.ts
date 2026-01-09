import { env } from "@/lib/env/client.mjs";
import { validatePromise } from "@/lib/validate";
import { ackValidator } from "@/lib/validators/ack";
import type { RouteRevalidate } from "@/lib/validators/system";

type ApiOptions = RequestInit;

export const api = async (resource: string, options: ApiOptions = {}) => {
    const host = `${env.NEXT_PUBLIC_SITE_URL}/api`;
    const origin = env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${host}/${resource}`, {
        credentials: "include",
        ...options,
        headers: { Origin: origin, ...options.headers },
    });
    const type = response.headers.get("Content-Type");
    if (!response.ok)
        throw type?.includes("application/json")
            ? await response.json()
            : await response.text();
    if (type?.includes("application/json")) return response.json();
    else if (type?.includes("application/vnd.apache.arrow.file"))
        return response.arrayBuffer();
    else return response.text();
};

// system

export const apiHealth = (apiOptions?: ApiOptions) => {
    return validatePromise(api("health", apiOptions), ackValidator);
};

type RouteRevalidateRequest = RouteRevalidate;
export const routeRevalidate = (
    request: RouteRevalidateRequest,
    apiOptions?: ApiOptions,
) => {
    return validatePromise(
        api("revalidate", {
            method: "POST",
            body: JSON.stringify(request),
            ...apiOptions,
        }),
        ackValidator,
    );
};
