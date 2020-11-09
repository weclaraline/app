import GoogleLogin from "react-google-login";
import "./Login.css";

const responseGoogle = (response) => {
  console.log(response);
};

function Login() {
  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img
          class="login-logo"
          id="prompt-logo-center"
          src="https://patio-static-4c2daf01-ca97-41a7-a458-2fc04e6c57bf.s3.amazonaws.com/Patio+Logo.svg"
          alt="Welcome"
        />
      </div>
      <div className="login-details">
        <h2>Weclaraline</h2>
        <p>Tu declaracion de impuestos mas facil que nunca</p>
      </div>
      <div className="login-button-container">
        <GoogleLogin
          clientId="903919404222-hb622tgshpbbj1fudcp4hlgkuc9fh027.apps.googleusercontent.com"
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
