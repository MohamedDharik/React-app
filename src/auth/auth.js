
import { CognitoUserPool,AuthenticationDetails,CognitoUser } from "amazon-cognito-identity-js";
import { updateUserAttributes } from 'aws-amplify/auth';
import  {poolData} from './Userpool.js';

const Datapool= new CognitoUserPool({
    UserPoolId:poolData.UserPoolId,
    ClientId:poolData.ClientId,
})

export function signUp(email,password){
    return new Promise((resolve, reject) => {
        Datapool.signUp(
          
          email,
          password,
          [],
          null,
          (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result.user)
          }
        )
      })
}

export function signIn(email,password){
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: Datapool,
        })
        const authenticationDetails = new AuthenticationDetails({
          Username: email,
          Password: password,
        })
    
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result)
          },
          onFailure: (err) => {
            reject(err)
          },
        })
      })
}

export function signOut(){}

export function getSession() {
    const cognitoUser = Datapool.getCurrentUser()
    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error("No user found"))
        return
      }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
          return
        }
        resolve(session)
      })
    })
  }

  export async function handleUpdateEmailAndNameAttributes(
    updatedName,
    updatedphone_number,
    
  ) {
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          phone_number: updatedphone_number,
          name: updatedName,
        },
      });
      
      console.log(attributes);
    } catch (error) {
      console.log(error);
    }
  }

export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
      const cognitoUser = Datapool.getCurrentUser()
  
      if (!cognitoUser) {
        reject(new Error("No user found"))
        return
      }
  
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err)
          return
        }
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err)
            return
          }
          const userData = attributes.reduce((acc, attribute) => {
            acc[attribute.Name] = attribute.Value
            return acc
          }, {})
  
          resolve({ ...userData, username: cognitoUser.username })
        })
      })
    })
  }