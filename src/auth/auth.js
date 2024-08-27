
import { CognitoUserPool,AuthenticationDetails,CognitoUser } from "amazon-cognito-identity-js";

import  {poolData} from './Userpool.js';
// import { Component } from "react";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";


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

// export function forgetPassword(username){
//   return new Promise((resolve, reject) => {
//     const cognitoUser = new CognitoUser({
//       Username: username,
//       Pool: Datapool,
//     })

//     cognitoUser.forgotPassword({
//       onSuccess: () => {
//         resolve()
//       },
//       onFailure: (err) => {
//         reject(err)
//       },
//     })
//   })
// }

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


  // update function

//  class UpdateUserAttributes extends Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         currentPhoneNumber :"",
//         newPhoneNumber :""
//       }

//       this.data ={
//         UserPoolId:poolData.UserPoolId,
//         ClientId:poolData.ClientId,
//       }

//       this.userPool = new CognitoUserPool(this.data)
//       this.currentUser = this.userPool.getCurrentUser();
//     }

//     isAuthenticated(){
//       return this.currentUser != null;
//     }

//     handleUpdateAttributes = () =>{
//       const{currentPhoneNumber,newPhoneNumber}=this.state;

//       if(this.isAuthenticated()){
//         this.currentUser.getSession((err,session) => {
//           if(err){
//             console.log("Error getting session:");
//             return;
//           }
//           if(!session.isValid()){
//             console.log("Session is not valid");
//             return;
//           }

//           const attributeList =[];

//           if(currentPhoneNumber != newPhoneNumber){
//             const phoneAttribute = new CognitoUserAttribute({
//               Name:"phone_number",
//               Value:newPhoneNumber
//             });
//             attributeList.push(phoneAttribute);
//           }
//           if(attributeList.length >0){
//             this.currentUser.updateAttributes(attributeList, (err,result)=>{
//               if(err){
//                 console.log("Error updating attributes",err);
//               }
//               else{
//                 console.log("Attribute added successfully",result)
//               }
//             })
//           }
//           else{
//             console.log("no attribute available")
//           }
//         })
//       }
//     }
//   }