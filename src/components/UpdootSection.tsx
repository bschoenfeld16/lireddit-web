import React from "react";
import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
    post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            mr={4}>
            <IconButton
                onClick={() => console.log("yo")}
                aria-label="updoot post"
                icon={<ChevronUpIcon />}
                boxSize="24px"
            />
            {post.points}
            <IconButton
                aria-label="downdoot post"
                icon={<ChevronDownIcon />}
                boxSize="24px"
            />
        </Flex>
    );
};

export default UpdootSection;
