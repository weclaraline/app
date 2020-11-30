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
              KPI
            </Typography>
            <CircularProgressbar value={55} text={`${55}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              KPI
            </Typography>
            <CircularProgressbar value={55} text={`${55}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              KPI
            </Typography>
            <CircularProgressbar value={55} text={`${55}%`} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              KPI
            </Typography>
            <CircularProgressbar value={55} text={`${55}%`} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Graphs;
