import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
//import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalGastos(props) {
  let { fileUUID } = props;
  let { concept } = props;
  let { description } = props;
  let { total } = props;
  let { openModal } = props;

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  // console.log(fileUUID)
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.openModal);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {fileUUID}
      <p id="simple-modal-description">{concept}</p>
      <p id="simple-modal-description">{description}</p>
      <p id="simple-modal-description">{total}</p>
      <button
        variant="contained"
        component="label"
        color="primary"
        onClick={() => handleAccept()}
      >
        Aceptar
      </button>
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
};
