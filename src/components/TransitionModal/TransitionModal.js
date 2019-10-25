import React, { useState, useContext, useEfefct } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal , Backdrop } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import AppActions from '../../actions/AppActions';
import {AppContext} from '../../context/AppContext';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const TransitionModal = () => {
    const [state , dispatch] = useContext(AppContext)
    const classes = useStyles();


    const handleClose = () => {
      AppActions.handleModal( dispatch , false , null )
    };

  if(!state.showModal){ return null}

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={state.showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {state.modalContent}
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionModal;