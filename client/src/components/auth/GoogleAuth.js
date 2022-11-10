import React, { useState, useEffect } from 'react';
import {Link }from "react-router-dom"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

function GoogleAuth() {
    const [ profile, setProfile ] = useState([]);
    const  {REACT_APP_CLIENTID} = process.env; 
    
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: {REACT_APP_CLIENTID},
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
       console.log("the response is", res)
       setProfile(res.profileObj)
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };
    console.log("the profile is:",profile)
    return (
        <div>
         
               { profile ? (
                <div>
                    <img src={profile.imageUrl} alt="useravathar" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={REACT_APP_CLIENTID} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <>
                <GoogleLogin
                    clientId={REACT_APP_CLIENTID}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
                <a href="http://localhost:5000/api/auth/google">Link to</a>
               
                </>
            )}
        </div>
    );
}
export default GoogleAuth