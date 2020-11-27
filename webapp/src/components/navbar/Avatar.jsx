import { Avatar as MuiAvatar, Button, Menu } from '@material-ui/core';
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
      <Button onClick={handleClick}>
        <MuiAvatar alt={user.givenName} src={user.imageUrl}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
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
