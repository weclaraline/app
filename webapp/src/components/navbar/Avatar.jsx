import { Avatar as MuiAvatar, IconButton, Menu } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Logout from '../logout/Logout';
import { getCurrentLoggedUserInfo } from '../../utils/LogIn';

const Avatar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await getCurrentLoggedUserInfo();
      setUser(userInfo);
    };
    
    getUser();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props}>
      <IconButton size="small" onClick={handleClick}>
        <MuiAvatar alt={user.givenName} src={user.imageUrl}/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        anchorReference={null}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Logout />
      </Menu>
    </div>
  );
};

export default Avatar;
