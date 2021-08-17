import { Flex, Heading } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import axios from "axios";
import Cookie from "js-cookie";

const GoogleWrapper = styled(Flex)`
  background-color: white;
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black !important;
    font-weight: bold !important;
  }
`;

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${URL}`,
    data: body,
  });

const Index = () => {
  const router = useRouter();

  const onSuccess = (response) => {
    const access_token = response.accessToken;
    axiosApiCall("oauth/google", "post", { access_token }).then((res) => {
      const { user, token } = res.data;
      Cookie.set("token", token);
      router.push("/");
    });
  };
  return (
    <Flex
      flexDirection="column"
      align="center"
      justify="center"
      bg="green.800"
      height="100vh"
    >
      <Heading maxW="800px" color="white" textAlign="center">
        Google Oauth in Next.js, Node.js, and Express Application
      </Heading>
      <GoogleWrapper width="300px" marginTop="3rem">
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          buttonText="sign up with Google"
          onSuccess={onSuccess}
          onFailure={() => {}}
        />
      </GoogleWrapper>
    </Flex>
  );
};

export default Index;
