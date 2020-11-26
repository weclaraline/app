
import GoogleLogin from "react-google-login";
import "./Login.css";
import React from "react";
import { setCurrentLoggedUserInfo } from "../../utils/LogIn";
import { LogoBlue } from "../../assets/"

const onSucessResponse = async (response) => {
  await setCurrentLoggedUserInfo(response);
  window.location.reload();
}

const onFailureResponse = (response) => {
  console.log(response);
}

function Login() {
  return (
    <div data-testid="login_screen" className="login-container">
      <div className="login-logo-container">
        <img
          className="login-logo"
          id="prompt-logo-center"
          src={LogoBlue}
          width="100"
          alt="Welcome"
        />
      </div>
      <div className="login-details">
        <h2>Weclaraline</h2>
        <p>Tu declaración de impuestos mas fácil que nunca</p>
      </div>
      <div className="login-button-container">
        <GoogleLogin
          clientId="641440446360-vecianv30pv4vbsfnhc2rbk628vch2ae.apps.googleusercontent.com"
          buttonText="Continue whith Google"
          onSuccess={onSucessResponse}
          onFailure={onFailureResponse}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
