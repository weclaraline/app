import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  makeStyles,
  createStyles,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Notifications as NotificationIcon } from '@material-ui/icons';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      padding: 0,
    },
  })
);

const Notifications = ({ notifications = [] }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        className={classes.button}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationIcon />
        </Badge>
      </IconButton>
      {notifications.length > 0 && (
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification}>
                <ListItemText primary={notification} />
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </>
  );
};

export default Notifications;
