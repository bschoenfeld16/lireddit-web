import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        keyArgs: [],
                        merge(
                            existing: PaginatedPosts | undefined,
                            incoming: PaginatedPosts
                        ): PaginatedPosts {
                            return {
                                ...incoming,
                                posts: [
                                    ...(existing?.posts || []),
                                    ...incoming.posts,
                                ],
                            };
                        },
                    },
                },
            },
        },
    }),
});

function MyApp({ Component, pageProps }: any) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ColorModeProvider
                    options={{
                        initialColorMode: "dark",
                    }}>
                    <CSSReset />
                    <Component {...pageProps} />
                </ColorModeProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
