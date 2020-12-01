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
import { getCurrentLoggedUserGoogleId } from "../../utils/LogIn";
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
  const [invoiceStatus, setInvoiceUploadStatus] = useState('');
  const [invoiceObservations, setInvoiceObservations] = useState([]);

  async function prepareInvoiceFileUpload(event) {
    let file_upload = event.target.files[0];
    let googleId = await getCurrentLoggedUserGoogleId();
    
    const data = new FormData();    
    
    data.append('xml', file_upload);
    data.append('uid', googleId);
    
    setOpenModal(false);

    setInvoiceObservations([]);

    await uploadInvoiceFile(data);
    event.target.value = null;
  }

  const uploadInvoiceFile = async (data) => {
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
      setInvoiceUploadStatus(analysisResult.status);
      setInvoiceObservations(analysisResult.observations);
      setInvoiceConcept(concept);
      setInvoiceDescription(description);
      setInvoiceTotal(total);
      setOpenModal(true);
      
    } catch(error){
      setInvoiceUploadStatus('error');
      setOpenModal(true);
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
                onChange={(event) => prepareInvoiceFileUpload(event)}
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
