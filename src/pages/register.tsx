import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({ options: values });
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        // worked
                        await router.push("/");
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            label="Username"
                            name="username"
                            placeholder="username"
                        />
                        <Box mt={4}>
                            <InputField
                                label="Email"
                                name="email"
                                placeholder="email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            color="teal"
                            isLoading={isSubmitting}
                            type="submit"
                            colorScheme="teal">
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
