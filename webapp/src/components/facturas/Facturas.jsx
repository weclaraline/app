import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import ConceptoDeduciblesComponent from '../facturas/ConceptoDeduciblesComponent';
import FAQEnlacesComponent from '../facturas/FAQEnlacesComponent';
import UserData from './UserData';

const useStyles = makeStyles((theme) => {
  const { main } = theme.palette.primary;
  const { overline, h1 } = theme.typography;
  return {
    detailsContainer: {
      margin: theme.spacing(2),
    },
    headerRow: {
      height: '200px',
      background: main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      alignContent: 'center',
      justifyContent: 'center',
      color: 'white',
      background: 'transparent',
    },
    header: {
      h1,
    },
    overline: {
      overline,
    },
  };
});

const Facturas = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.facturasContainer}>
      <Grid
        data-testid="title_banner"
        item
        className={classes.headerRow}
        xs={12}
      >
        <Paper elevation={0} className={classes.paper}>
          <Typography variant={'h4'}>Guía para solicitar facturas.</Typography>
          <Typography variant={'h6'}>
            Sigue los pasos para que fácilmente...
          </Typography>
        </Paper>
      </Grid>
      <Grid container spacing={3} className={classes.detailsContainer}>
        <Grid item xs={12} lg={12}>
          <Card>
            <UserData />
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Card>
            <ConceptoDeduciblesComponent />
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <FAQEnlacesComponent />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Facturas;
