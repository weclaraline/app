import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { MenuItem } from '@material-ui/core';

import { clearCurrentLoggedUserInfo } from '../../utils/LogIn';

const clientId =
  '903919404222-hb622tgshpbbj1fudcp4hlgkuc9fh027.apps.googleusercontent.com';

function Logout() {
  const onSucces = async () => {
    await clearCurrentLoggedUserInfo();
    window.location.reload();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onSucces}
        render={(renderProps) => (
          <MenuItem {...renderProps}>Cerrar sesión</MenuItem>
        )}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
