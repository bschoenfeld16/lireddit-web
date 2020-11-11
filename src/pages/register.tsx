import React from "react";
import {Form, Formik} from 'formik'
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button";

interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <Formik initialValues={{username: "", password: ""}}
                    onSubmit={values => console.log(values)}>
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            label="Username"
                            name="username"
                            placeholder="username"/>
                        <Box mt={4}>
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="password"
                                type="password"/>
                        </Box>
                        <Button mt={4}
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
    )
};

export default Register