import React from 'react';
import {
  Paper,
  Grid,
  Container,
  makeStyles,
  createStyles,
  Typography,
} from '@material-ui/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: '30px',
    },
  })
);

const Graphs = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Gastos médicos
            </Typography>
            <CircularProgressbar value={35} text={`${35}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Seguros
            </Typography>
            <CircularProgressbar value={55} text={`${55}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Colegiaturas
            </Typography>
            <CircularProgressbar value={39} text={`${39}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Total
            </Typography>
            <CircularProgressbar value={33} text={`${33}%`} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Graphs;
