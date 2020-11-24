import GoogleLogin from "react-google-login";
import "./Login.css";
import React from "react";


const responseGoogle = (response) => {
  console.log(response);
};

function Login() {
  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img
          className="login-logo"
          id="prompt-logo-center"
          src="https://patio-static-4c2daf01-ca97-41a7-a458-2fc04e6c57bf.s3.amazonaws.com/Patio+Logo.svg"
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
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
