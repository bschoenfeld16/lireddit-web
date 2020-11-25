import React from "react";
import {
    useDeletePostMutation,
    useMeQuery,
    usePostsQuery,
} from "../generated/graphql";
import Layout from "../components/Layout";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import { Button, IconButton } from "@chakra-ui/button";
import UpdootSection from "../components/UpdootSection";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
    const { data, loading, fetchMore, variables } = usePostsQuery({
        variables: {
            limit: 15,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });
    if (!loading && !data) {
        return <div>query failed for some reason</div>;
    }

    const { data: meData } = useMeQuery();
    const [deletePost] = useDeletePostMutation();

    return (
        <Layout>
            {!data && loading ? (
                <div>loading...</div>
            ) : (
                <Stack spacing={8}>
                    {data!.posts.posts.map((p) =>
                        !p ? null : (
                            <Flex
                                key={p.id}
                                p={5}
                                shadow="md"
                                borderWidth="1px">
                                <UpdootSection post={p} />
                                <Box flex={1}>
                                    <NextLink
                                        href="/post/[id]"
                                        as={`/post/${p.id}`}>
                                        <Link>
                                            <Heading fontSize="xl">
                                                {p.title}
                                            </Heading>
                                        </Link>
                                    </NextLink>
                                    <Text> posted by {p.creator.username}</Text>
                                    <Flex align="center">
                                        <Text flex={1} mt={4}>
                                            {p.textSnippet}
                                        </Text>
                                        {p.creator.id !==
                                        meData?.me?.id ? null : (
                                            <IconButton
                                                ml="auto"
                                                colorScheme="red"
                                                icon={<DeleteIcon />}
                                                aria-label="Delete Post"
                                                onClick={() => {
                                                    deletePost({
                                                        variables: { id: p.id },
                                                    });
                                                }}
                                            />
                                        )}
                                    </Flex>
                                </Box>
                            </Flex>
                        )
                    )}
                </Stack>
            )}
            {data && data.posts.hasMore ? (
                <Flex>
                    <Button
                        onClick={() => {
                            fetchMore({
                                variables: {
                                    limit: variables?.limit,
                                    cursor:
                                        data?.posts.posts[
                                            data.posts.posts.length - 1
                                        ].createdAt,
                                },
                                // updateQuery: (
                                //     previousValue,
                                //     { fetchMoreResult }
                                // ): PostsQuery => {
                                //     if (!fetchMoreResult) {
                                //         return previousValue as PostsQuery;
                                //     }
                                //     return {
                                //         __typename: "Query",
                                //         posts: {
                                //             __typename: "PaginatedPosts",
                                //             hasMore: (fetchMoreResult as PostsQuery)
                                //                 .posts.hasMore,
                                //             posts: [
                                //                 ...(previousValue as PostsQuery)
                                //                     .posts.posts,
                                //             ],
                                //         },
                                //     };
                                // },
                            });
                        }}
                        isLoading={loading}
                        m="auto"
                        my={8}>
                        Load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default Index;
