import React, { useState } from 'react';
import axios from 'axios';

import {getCurrentLoggedUserInfo} from '../../utils/LogIn'

import {
  Paper,
  Grid,
  Container,
  makeStyles,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: '30px',
    },
  })
);

const FileUploader = () => {
  const classes = useStyles();
  const [file, setFile] = useState();

  const handleChangeFile = async (value) => {
    setFile(value);
    console.log(await getCurrentLoggedUserInfo())
    console.log('getCurrentLoggedUserInfo()')
  };

  function uploadFile() {
    const data = new FormData();
    data.append('xml', file);
    axios
      .post('http://localhost:3000/upload', data, {
      })
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Typography variant="h5" gutterBottom>
              Facturas
            </Typography>
            <Button variant="contained" component="label">
              SELECCIONAR FACTURA
              <input
                type="file"
                hidden
                onChange={(event) => handleChangeFile(event.target.files[0])}
              />
            </Button>
          </Grid>
          <Grid item md={3}>
            <Button variant="contained" color="primary" component="label" onClick={uploadFile}>
              CARGAR FACTURA
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default FileUploader;
