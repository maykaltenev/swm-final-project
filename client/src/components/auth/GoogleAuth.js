import {  GoogleLogin, GoogleLogout } from "react-google-login";
import React, { useState } from 'react'

const  {REACT_APP_CLIENTID} = process.env; 

function GoogleAuth() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [url, setUrl] = useState("");
const [loginStatus, setLoginStatus] = useState(false);

const responseGoogle = (response) => {
console.log("the response is:",response)
  setName(response.profileObj.name);
  setEmail(response.profileObj.email);
  setUrl(response.profileObj.imageUrl);
  setLoginStatus(true);
};

const logout = () => {
  console.log("logout");
  setLoginStatus(false);
};

  return (
    <div>
       
      {!loginStatus && (
        <GoogleLogin
       clientId={REACT_APP_CLIENTID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
       {loginStatus && (
        <div>
          <h2>Welcome {name}</h2>
          <h2>Email: {email}</h2>
          <img src={url} alt={name} />
          <br />
          <GoogleLogout
             clientId={REACT_APP_CLIENTID} 
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      )} 
     
    </div>
  )
}

export default GoogleAuth