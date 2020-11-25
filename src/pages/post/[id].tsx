import React from "react";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import Layout from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/layout";

export const Post: React.FC = ({}) => {
    const router = useRouter();
    const intId =
        typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
    const { data, error, loading } = usePostQuery({
        skip: intId === -1,
        variables: {
            id: intId,
        },
    });
    if (loading) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data?.post) {
        return (
            <Layout>
                <Box>could not find post</Box>
            </Layout>
        );
    }
    return (
        <Layout>
            <Heading mb={4}>{data.post.title}</Heading>
            {data.post.text}
        </Layout>
    );
};

export default Post;
