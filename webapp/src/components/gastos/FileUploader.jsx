import {
  Button, Container,

  createStyles, Grid,

  makeStyles, Paper,




  Typography
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { InvoiceUploadService } from "../../api/";
import ModalGastos from './ModalGastos';


const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: '30px',
    },
  })
);

const FileUploader = () => {
  const classes = useStyles();
  const [fileUUID, setFileUUID] = useState('');
  const [openModal, setOpenModal] = React.useState(false);
  
  const [invoiceConcept, setInvoiceConcept] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [invoiceTotal, setInvoiceTotal] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [invoiceObservations, setInvoiceObservations] = useState([]);

  async function uploadFile(event) {
    let file_upload = event.target.files[0];
    let userId = await getCurrentLoggedUserGoogleId();
    
    const data = new FormData();    
    
    data.append('xml', file_upload);
    data.append('uid', userId.googleId);
    
    setOpenModal(false);

    setInvoiceObservations([]);

    try {
      const invoiceUploadService = new InvoiceUploadService(data);
      const invoiceUploadServiceResponse = await invoiceUploadService.make();
      
      const {
        uuid,
        analysisResult,
        concept,
        description,
        total
      } = invoiceUploadServiceResponse;

      setFileUUID(uuid);
      setInvoiceStatus(analysisResult.status);
      setInvoiceObservations(analysisResult.observations);
      setInvoiceConcept(concept);
      setInvoiceDescription(description);
      setInvoiceTotal(total);
      setOpenModal(true);
      event.target.value = null;
      
    } catch(error){
      setStatus('error');
      setOpenModal(true);
      event.target.value = null;
    }
  }

  return (
    <Paper className={classes.container}>
      {
        <ModalGastos
          fileUUID={fileUUID}
          concept={invoiceConcept}
          description={invoiceDescription}
          total={invoiceTotal}
          openModal={openModal}
          status={invoiceStatus}
          observations={invoiceObservations}
        ></ModalGastos>
      }
      <Container>
        <Grid container spacing={4}>
          <Grid item xs className={classes.expensesInovicesTitle}>
            <Typography variant="h6" gutterBottom>
              <Box fontWeight="fontWeightBold">
                Facturas
              </Box>
            </Typography>
            <Button variant="contained" component="label" color="primary">
              SELECCIONAR FACTURA
              <input
                type="file"
                hidden
                onChange={(event) => uploadFile(event)}
              />
            </Button>            
          </Grid>
          <Grid item xs>
            <Typography variant="h6" gutterBottom>
              <Box fontWeight="fontWeightBold">
                Últimas facturas añadidas
              </Box>
            </Typography>
          </Grid>
        </Grid>
        
      </Container>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={4}>
          </Grid>
        </Grid>
      </Container>
      </Paper>
  );
};

export default FileUploader;
