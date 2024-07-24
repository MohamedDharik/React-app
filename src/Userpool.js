 import { CognitoUserPool } from "amazon-cognito-identity-js";

 const poolData={
    UserPoolId: "us-east-1_KlXChSndl",
    ClientId: "7eh9so3mhogsjgarv2uljm9g4f"
 }

 export default new CognitoUserPool(poolData); 