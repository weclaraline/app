import React from "react";
import { GoogleLogout } from "react-google-login";
import { clearCurrentLoggedUserInfo } from "../../utils/LogIn";

const clientId =
  "903919404222-hb622tgshpbbj1fudcp4hlgkuc9fh027.apps.googleusercontent.com";

function Logout() {
  const onSucces = async () => {
    await clearCurrentLoggedUserInfo();
    window.location.reload();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Cerrar sesión"
        onLogoutSuccess={onSucces}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
