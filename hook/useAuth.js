import React,{createContext, useContext} from "react";
import * as Google from "expo-auth-session"

const AuthContext = createContext({});

const config = {
    androidClientId:"679645096836-hk12ep2qpaorsnseoqa2vh0hq8htv318.apps.googleusercontent.com",
    iosClientId:"679645096836-8ek87f9v7047a8itbnctqmphvekkq4eu.apps.googleusercontent.com",
    webClientId:"679645096836-775l66pkib93nmrlgf8thqpokgmig79d.apps.googleusercontent.com",
    scopes:["profile","email"],
    permissions:["public_profile","email","gender","location"],
}

export const AuthProvider = ({children}) => {

    const signInWithGoogle = async() =>{
     Google.logInAsync(config).then(async(logInResult) => {
        if(logInResult.type === "success"){
            console.log("SUCCESS")
        }
     }).catch((error)=>{
        console.log("Api call error");
     });
    }
    return (
        <AuthContext.Provider
        value={{
            user:null,
            signInWithGoogle
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth(){
    return useContext(AuthContext);
}