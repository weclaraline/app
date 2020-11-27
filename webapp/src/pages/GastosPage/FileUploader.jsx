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
  const [fileUUID, setFileUUID] = useState();
  const [concept, setConcept] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);

  async function uploadFile(file_upload) {
    const data = new FormData();   
    let userId   = await getCurrentLoggedUserInfo();
    data.append('xml', file_upload);
    data.append('uid', userId.googleId);
    axios
      .post('http://localhost:3000/upload', data, {
      })
      .then((res) => {
        setFileUUID(res.data.uuid);
        setConcept(res.data.concept);
        setDescription(res.data.description);
        setTotal(res.data.total);
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
            </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={4}>
        <Grid item md={4}>
            <Button variant="contained" component="label" color="primary">
              SELECCIONAR FACTURA
              <input
                type="file"
                hidden
                onChange={(event) => uploadFile(event.target.files[0])}                
              />
            </Button>
            </Grid>
        </Grid>
        <p>
            {fileUUID} {concept} {description} {total}
        </p>
      </Container>
    </Paper>
  );
};

export default FileUploader;
