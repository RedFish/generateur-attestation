import formData from "attestation-derogatoire-de-deplacement/src/form-data.json";
import React, { useState, useMemo } from "react";
import { Grid, Button, TextField, Avatar, makeStyles } from "@material-ui/core";
import { isProfileCompleted, getEmptyFields } from "../utils/utils";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles({
  preview: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default function Form({
  editProfile,
  toggleEditProfile,
  profile,
  onChangeProfile
}) {
  const classes = useStyles();
  const [errorFields, setErrorFields] = useState([]);

  //Extract user form data
  const formDataUser = useMemo(() => {
    return [...formData[0], ...formData[1]].map((data) => {
      //Assign correct type
      if (["birthday"].includes(data.key)) {
        return { ...data, type: "date" };
      } else return data;
    });
  }, []);

  return editProfile ? (
    <React.Fragment>
      {formDataUser.map(
        ({
          key,
          type,
          label,
          placeholder,
          autocomplete,
          minlength,
          maxlength,
          min,
          max,
          pattern,
          inputmode,
          ...props
        }) => {
          return (
            <Grid item key={key}>
              <TextField
                fullWidth
                variant="outlined"
                label={label}
                placeholder={placeholder}
                name={key}
                type={type}
                error={errorFields.includes(key)}
                onChange={onChangeProfile}
                value={profile[key]}
                autoComplete={autocomplete}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  minLength: minlength,
                  maxLength: maxlength,
                  inputMode: inputmode,
                  min,
                  max,
                  pattern
                }}
              />
            </Grid>
          );
        }
      )}
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (!isProfileCompleted(profile)) {
              setErrorFields(getEmptyFields(profile));
              return;
            } else {
              toggleEditProfile();
            }
          }}
        >
          Valider
        </Button>
      </Grid>
    </React.Fragment>
  ) : (
    <Grid
      className={classes.preview}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Avatar>
          {profile.firstname[0]}
          {profile.lastname[0]}
        </Avatar>
      </Grid>
      <Grid item>
        {profile.firstname} {profile.lastname}
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="contained"
          endIcon={<Edit />}
          onClick={toggleEditProfile}
        >
          Editer
        </Button>
      </Grid>
    </Grid>
  );
}
