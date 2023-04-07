import "./login-style.css";
import "./styles.css";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function LoginPage() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  var persistUser = null;
  // user = JSON.parse(window.localStorage.getItem('user'));

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      Cookies.set("authenticated", 'true');
      console.log("LOGGED IN");
      setUser(codeResponse);
      window.localStorage.setItem('user', JSON.stringify(codeResponse));
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  
  useEffect(() => {
    if (user) {
      var data = JSON.parse(window.localStorage.getItem('user'));
      if(data === null){
        data = user;
      }
      // setUser(JSON.parse(window.localStorage.getItem('user')));
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          Cookies.set("user_email", res.data.email);
          Cookies.set('authenticated', 'true')
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    window.localStorage.setItem('user', null);
    googleLogout();
    setProfile([]);
    Cookies.set("user_email", 'false');
    Cookies.set("authenticated", 'false');
    console.log(Cookies.get('authenticated'));
  };

  return (
    <div
      style={{
        color: "black",
        marginTop: 100,
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "100%",
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2 style={{ text: "center" }}>Login to Sprints with Google</h2>
      <br />
      <br />
      {profile.length !== 0 ? (
        <div>
          {console.log(profile)}
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div>
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;