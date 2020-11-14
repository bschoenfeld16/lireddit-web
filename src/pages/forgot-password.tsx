import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Button } from "@chakra-ui/button";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Box } from "@chakra-ui/layout";

export const ForgotPassword: React.FC<{}> = () => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setComplete(true);
                }}>
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>if account exists, we have sent you an email</Box>
                    ) : (
                        <Form>
                            <InputField
                                label="Email"
                                name="email"
                                placeholder="email"
                                type="email"
                            />
                            <Button
                                mt={4}
                                color="teal"
                                isLoading={isSubmitting}
                                type="submit"
                                colorScheme="teal">
                                forgot password
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
