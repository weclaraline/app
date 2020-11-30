import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WifiOffIcon from '@material-ui/icons/WifiOff';

import { Grid, Typography, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import ServiceAPI from '../../api/ServiceAPI';

function getModalStyle() {
  const top = 52;
  const left = 52;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  gridItemConcept: {
    marginTop: '20px',
    marginBottom: '20px', 
    textAlign: 'left',
  },
  gridItemTotal: {
    marginTop: '20px',
    marginBottom: '20px',     
    textAlign: 'right',
  },
  invoiceCorrectIcon: {
    fontSize: 70,
  },
  textareaDescription: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '25px',
  },
  infoNoticeIcon: {
    fontSize: 15,
    marginTop: '-10px',
  },
  gridItemInfoIcon: {
    marginTop: '3px',
  },
  textAlmostMax: {
    lineHeight: '1.2',    
  },
  acceptButton: {
    marginTop: '20px',
  }
}));

export default function ModalGastos(props) {
  let { fileUUID } = props;
  let { concept } = props;
  let { total } = props;
  let { openModal } = props;
  let { status } = props;
  let { observations } = props;


  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.openModal);  
  const [descriptionValue, setDescriptionValue] = React.useState(props.description)

  const handleChangeDescription = (event) => {
    setDescriptionValue(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
    setDescriptionValue('');
  };

  const handleAccept = () => {
    
    setOpen(false);

    const api = new ServiceAPI();
    const data = new FormData();    

    data.append('status', 'save');
    data.append('description', descriptionValue);
    data.append('uuid', fileUUID);
    
    api
      .createRequest()
      .post('invoices/commit', data, {})
      .then(() => {
        setOpen(false);
        setDescriptionValue('');        
      })
      .catch((err) => {
        status = 'error';
        setDescriptionValue(String(err)); 
        setOpen(true);
      });    

    observations = [];
  };


  let bodyTitleIcon = '';
  let bodyConceptTotal = '';
  let bodyDescription = '';
  let bodyBalance = '';
  let bodyButtonMethod = handleClose;
  
  if (status == 'error') {
    bodyTitleIcon = (
      <div>
        <WifiOffIcon className={classes.invoiceCorrectIcon}/>
        <Typography variant="h5">
            {descriptionValue}
        </Typography>
        <Typography variant="body">
          Por favor revisa tu conexión a internet.
        </Typography>
      </div>  
    ); 


  } else if (status == 'notok') {
    bodyTitleIcon = (
      <div>
        <ErrorIcon className={classes.invoiceCorrectIcon}/>
        <Typography variant="h6">
            <Box fontWeight="fontWeightBold">
              Factura Incorrecta
            </Box>
        </Typography>
      </div>
    ); 
    bodyConceptTotal = (
      <Grid container spacing={3}>
          <Grid item xs={7} className={classes.gridItemConcept} >
            <Box fontWeight="fontWeightBold">
              Concepto:
            </Box>
            {concept}
          </Grid>
          <Grid item xs className={classes.gridItemTotal}>
            <Box fontWeight="fontWeightBold">
              Total:
            </Box>  
            {total}                      
          </Grid>          
      </Grid>
    );


  } else if (status == 'ok') {
    bodyTitleIcon = (
      <div>
        <CheckCircleIcon className={classes.invoiceCorrectIcon} color="primary" />
        <Typography variant="h6" color="primary">
            <Box fontWeight="fontWeightBold">
              Factura Correcta
            </Box>
        </Typography>
      </div>
    ); 
    bodyConceptTotal = (
      <Grid container spacing={3}>
          <Grid item xs={7} className={classes.gridItemConcept} >
            <Box fontWeight="fontWeightBold">
              Concepto:
            </Box>
            {concept}
          </Grid>
          <Grid item xs className={classes.gridItemTotal}>
            <Box fontWeight="fontWeightBold">
              Total:
            </Box>  
            {total}                      
          </Grid>          
      </Grid>
    );
    bodyDescription = (
      <TextField multiline rowsmin={4} rowsmax={4} rows={3}
        variant='outlined'       
        placeholder='Agrega una descripción'
        className={ classes.textareaDescription }
        value={descriptionValue}
        onChange={handleChangeDescription}
      />
    );
    bodyBalance = (
      <Box fontWeight="fontWeightBold">
          Saldo total deducible por gastos médicos:
          <Typography variant="h6">
            $ {total}
          </Typography>
      </Box>      
    );

    // Sample
    observations = [
      //{description: 'Ya casi alcanzas el monto máximo deducible en este concepto ($XX,000.00)'}
    ]

    bodyButtonMethod = handleAccept;
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {bodyTitleIcon}
      {bodyConceptTotal}
      {bodyDescription}
      {bodyBalance}

      {observations.map((observation, index) => {
        return (
          <Grid container id="label-almost-max" key={index}>
            <Grid item xs />
            <Grid item xs={6}>          
                <Grid container spacing={2}>
                  <Grid item xs={1} className={classes.gridItemInfoIcon}>
                    <InfoIcon className={classes.infoNoticeIcon} />
                  </Grid>
                  <Grid item xs> 
                  <Typography variant="caption" className={classes.textAlmostMax}>
                    {observation.description}
                  </Typography>                          
                  </Grid>
                </Grid>            
                </Grid>
            <Grid item xs />
          </Grid>
        );
      })}

      <Button variant="contained" component="label" color="primary"
        onClick={() => bodyButtonMethod()}
        className={classes.acceptButton}
      >
        Aceptar
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

ModalGastos.propTypes = {
  fileUUID: PropTypes.string,
  concept: PropTypes.string,
  description: PropTypes.string,
  total: PropTypes.string,
  openModal: PropTypes.bool,
  status: PropTypes.string,
  observations: PropTypes.array,
};
