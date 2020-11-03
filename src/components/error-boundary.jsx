import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      //render fallback UI
      return (
        <React.Fragment>
          <Typography variant="h6">Une erreur est survenue</Typography>
          <Typography variant="body1">
            N'hésitez pas à contribuer sur GitHub pour améliorer cette
            application
          </Typography>

          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Relancer l'application
          </Button>
        </React.Fragment>
      );
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}
