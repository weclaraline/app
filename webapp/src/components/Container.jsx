import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingLeft: '15px',
      paddingRight: '15px',
      [theme.breakpoints.up('md')]: {
        paddingLeft: '30px',
        paddingRight: '30px',
      },
    },
  })
);

const Container = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
