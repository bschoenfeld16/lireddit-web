import React, { useState } from "react";
import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    const [loadingState, setLoadingState] = useState<
        "updoot-loading" | "downdoot-loading" | "not-loading"
    >("not-loading");
    const [, vote] = useVoteMutation();
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            mr={4}>
            <IconButton
                onClick={async () => {
                    setLoadingState("updoot-loading");
                    await vote({
                        postId: post.id,
                        value: 1,
                    });
                    setLoadingState("not-loading");
                }}
                isLoading={loadingState === "updoot-loading"}
                aria-label="updoot post"
                icon={<ChevronUpIcon />}
                boxSize="24px"
            />
            {post.points}
            <IconButton
                onClick={async () => {
                    setLoadingState("downdoot-loading");
                    await vote({
                        postId: post.id,
                        value: -1,
                    });
                    setLoadingState("not-loading");
                }}
                isLoading={loadingState === "downdoot-loading"}
                aria-label="downdoot post"
                icon={<ChevronDownIcon />}
                boxSize="24px"
            />
        </Flex>
    );
};

export default UpdootSection;
