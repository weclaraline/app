import { Avatar as MuiAvatar, Button, Menu } from '@material-ui/core';
import React, { useState } from 'react';
import Logout from '../logout/Logout';

const Avatar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props}>
      <Button onClick={handleClick}>
        <MuiAvatar />
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
