import React from "react";
import { Typography, Button } from "@material-ui/core";

export default function Info({ handleClear }) {
  return (
    <React.Fragment>
      <Typography variant="h6">
        COVID-19 ATTESTATION DE DÉPLACEMENT DÉROGATOIRE
      </Typography>
      <br />
      <br />
      <Typography variant="body2">
        Cette application a été créée dans le but de faciliter la génération des
        attestations de déplacement dérogatoire.
      </Typography>
      <br />
      <br />
      <Typography variant="body2">
        En aucun cas l'auteur ne peut être tenu pour responsable en cas du
        non/mauvais fonctionnement de ce générateur.
      </Typography>
      <br />
      <br />
      <Typography variant="body2">
        <b>A UTILISER A BON ESCIENT ET A VOTRE PROPRE RISQUE.</b>
      </Typography>
      <br />
      <br />
      <Typography variant="body2">
        Toutes les données sont stockées localement.
        <br />
        Le générateur est le même que celui utilisé sur le site officiel.
        <br />
        Le code source de ce service est consultable sur{" "}
        <a
          href="https://github.com/RedFish/generateur-attestation"
          alt="code source"
        >
          GitHub
        </a>
      </Typography>
      <br />
      <br />
      <Button color="secondary" onClick={handleClear}>
        Effacer toutes mes données
      </Button>
    </React.Fragment>
  );
}
