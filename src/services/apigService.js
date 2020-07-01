import apigClientFactory from "aws-api-gateway-client";

export default apigClientFactory.newClient({
  invokeUrl: `${process.env.REACT_APP_API_URL}`,
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});
