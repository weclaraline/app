import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "903919404222-hb622tgshpbbj1fudcp4hlgkuc9fh027.apps.googleusercontent.com";

function Logout() {
  const onSucces = (response) => {
    alert("Logut made succesfully");
    console.log(response);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="logout"
        onLogoutSuccess={onSucces}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
