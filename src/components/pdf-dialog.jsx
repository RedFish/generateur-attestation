import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import { IconButton, CircularProgress, Paper } from "@material-ui/core";
import { GetApp, OpenInNew } from "@material-ui/icons";
import { saveAs } from "file-saver";
import moment from "moment";
import { Pagination } from "@material-ui/lab";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "gray",
    height: "100%"
  },
  iframe: {
    width: "100%",
    height: "100%"
  },
  pagination: {
    position: "absolute",
    margin: 20,
    padding: 8,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PDFDialog({ url, blob, handleClose }) {
  const classes = useStyles();
  const contentWrapperRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  //Reset view
  useEffect(() => {
    if (url) {
      setNumPages(null);
      setPageNumber(1);
    }
  }, [url]);

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(1);
    setNumPages(numPages);
  }

  return (
    <Dialog
      fullScreen
      open={!!url}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Aperçu
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => window.open(url)}
            aria-label="new tap"
          >
            <OpenInNew />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() =>
              saveAs(
                blob,
                `attestation_${moment().format("YYYYMMDD_HHmmss")}.pdf`
              )
            }
            aria-label="download"
          >
            <GetApp />
          </IconButton>
          <Button color="inherit" onClick={handleClose}>
            Fermer
          </Button>
        </Toolbar>
      </AppBar>
      {/*Not working on Android : <iframe
        src={url}
        type="application/pdf"
        className={classes.iframe}
        title="Aperçu"
      ></iframe>*/}
      <div ref={contentWrapperRef} className={classes.content}>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<CircularProgress color="inherit" size={20} />}
        >
          <Page
            height={
              contentWrapperRef.current
                ? contentWrapperRef.current.getBoundingClientRect().height
                : undefined
            }
            width={
              contentWrapperRef.current
                ? contentWrapperRef.current.getBoundingClientRect().width
                : undefined
            }
            pageNumber={pageNumber}
            renderMode="canvas"
          />
        </Document>
        <Paper className={classes.pagination} elevation={2}>
          <Pagination
            page={pageNumber}
            count={numPages}
            color="primary"
            shape="rounded"
            onChange={(e, number) => {
              setPageNumber(number);
            }}
          />
        </Paper>
      </div>
    </Dialog>
  );
}
