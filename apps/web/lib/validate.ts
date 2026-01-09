import type { z } from "zod";

export async function validatePromise<T>(
    promise: Promise<unknown>,
    validator: z.ZodType<T>,
    defaultValue?: T,
): Promise<T> {
    try {
        return validator.parse(await promise);
    } catch (e) {
        console.warn(e);
        if (defaultValue !== undefined) return defaultValue;
        throw e;
    }
}
