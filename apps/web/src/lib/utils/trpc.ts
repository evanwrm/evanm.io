import { AppRouter } from "@/lib/server/routers/app";
import { createTRPCReact } from "@trpc/react-query";

// export const trpc = createTRPCNext<AppRouter>({
//     config() {
//         // https://trpc.io/docs/links
//         const url = `${getBaseUrl()}/api/trpc`;
//         const links = [
//             loggerLink({
//                 enabled: opts =>
//                     env.NEXT_PUBLIC_NODE_ENV === "development" ||
//                     (opts.direction === "down" && opts.result instanceof Error)
//             }),
//             splitLink({
//                 condition(op) {
//                     return op.context.skipBatch === true;
//                 },
//                 true: httpLink({ url }),
//                 false: httpBatchLink({ url, maxURLLength: 2048 })
//             })
//         ];

//         return {
//             links,
//             transformer: superjson,
//             queryClientConfig: { defaultOptions: { queries: { staleTime: Infinity } } }
//         };
//     },
//     ssr: false
// });

// TODO: Temporary until rsc is officially supported
// https://github.com/trpc/next-13/blob/main/client/trpcClient.tsx
export const trpc = createTRPCReact<AppRouter>({
    unstable_overrides: {
        useMutation: {
            async onSuccess(opts) {
                await opts.originalFn();
                await opts.queryClient.invalidateQueries();
            }
        }
    }
});
