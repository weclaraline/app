import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import Notifications from './Notifications';
import Avatar from './Avatar';
import Logo from '../../assets/logo.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      flexWrap: 'wrap',
    },
    logo: {
      marginRight: '50px',
      width: '40px',
      [theme.breakpoints.down('md')]: {
        marginRight: 'auto',
      },
    },
    navigation: {
      display: 'flex',
      marginRight: 'auto',
      '& a': {
        color: '#fff',
        textTransform: 'uppercase',
        display: 'block',
        padding: '1.8rem 2.5rem',
        textDecoration: 'none',
        position: 'relative',
        '&.selected:after, &:hover:after': {
          opacity: 1,
        },
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '3px',
          backgroundColor: '#fff',
          opacity: 0,
          transition: 'all 0.3s ease-in-out',
        },
      },
      [theme.breakpoints.down('md')]: {
        flex: '0 0 100%',
        order: 2,
        marginTop: '20px',
        '& a': {
          padding: 0,
          '&:first-of-type': {
            marginRight: '20px',
          },
        },
      },
    },
    avatar: {
      marginLeft: '30px',
    },
    actions: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        order: 1,
      },
    },
  })
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={classes.toolbar}>
        <img src={Logo} alt="Weclaraline" className={classes.logo} />
        <nav className={classes.navigation}>
          <NavLink to="/facturas" activeClassName="selected">
            <Typography variant="subtitle1">Facturas</Typography>
          </NavLink>
          <NavLink to="/mis-gastos" activeClassName="selected">
            <Typography variant="subtitle1">Mis gastos</Typography>
          </NavLink>
        </nav>
        <div className={classes.actions}>
          <Notifications />
          <Avatar className={classes.avatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
