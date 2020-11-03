import formData from "attestation-derogatoire-de-deplacement/src/form-data.json";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { stripHTMLTags } from "../utils/utils";

export const CODES = {
  travail: "Travail 💼",
  achats: "Achats 🛍",
  sante: "Santé 💊",
  famille: "Famille 👨‍👩‍👦",
  handicap: "handicap 👨‍🦼",
  sport_animaux: "Déplacements brefs 🐕",
  convocation: "Convocation judiciaire ou administrative ⚖️",
  missions: "Missions d'intérêt général 🚧",
  enfants: "Enfant 👶🏻"
};

export function Reasons({ selectReason }) {
  const reasons = formData[2][4].items;

  return reasons.map((reason, index) => (
    <Grid item key={index}>
      <Tooltip title={stripHTMLTags(reason.label)}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            selectReason(reason.code);
          }}
        >
          {CODES[reason.code]}
        </Button>
      </Tooltip>
    </Grid>
  ));
}
