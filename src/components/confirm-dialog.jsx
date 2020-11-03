import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fade from "@material-ui/core/Fade";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({
  title,
  open,
  handleDismiss,
  handleConfirm
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleDismiss}
    >
      <DialogTitle id="alert-dialog-slide-title">Attention</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDismiss} color="primary">
          Non
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
