import React, { useState } from 'react';
import Logout from '../logout/Logout';
import {
  Avatar as MuiAvatar,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';

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
        <MenuItem>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Avatar;
