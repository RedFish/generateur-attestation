import "./App.css";
import { generatePdf } from "attestation-derogatoire-de-deplacement/src/js/pdf-util";
import pdfBase from "attestation-derogatoire-de-deplacement/src/certificate.pdf";
import { Grid, Paper, Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useObjectUrl from "./utils/use-object-url";
import SimpleTabs from "./components/simple-tabs";
import Info from "./components/info";
import History from "./components/history";
import Form from "./components/form";
import { isProfileCompleted, blobToBase64 } from "./utils/utils";
import { Reasons } from "./components/reasons";
import ErrorBoundary from "./components/error-boundary";
import PDFDialog from "./components/pdf-dialog";

const PROFILE_INIT = {
  firstname: "",
  lastname: "",
  birthday: "",
  placeofbirth: "",
  address: "",
  zipcode: "",
  city: ""
};

function App() {
  const [objectURL, object, setObject] = useObjectUrl();
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || PROFILE_INIT
  );
  const [histortItems, setHistortItems] = useState(
    JSON.parse(localStorage.getItem("histortItems")) || []
  );
  const [editProfile, setEditProfile] = useState(!isProfileCompleted(profile));

  //Edit profil mode
  const toggleEditProfile = () => {
    setEditProfile((b) => !b);
  };

  //Save profile to local storage
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  //Save histortItems to local storage
  useEffect(() => {
    localStorage.setItem("histortItems", JSON.stringify(histortItems));
  }, [histortItems]);

  //Handle form changes
  const onChangeProfile = (event) => {
    setProfile((p) => ({ ...p, [event.target.name]: event.target.value }));
  };

  const openHistortItem = async (item) => {
    if (!item) return;

    const res = await fetch(item.base64);
    const blob = await res.blob();
    setObject(blob);
  };

  return (
    <Paper className="App">
      <ErrorBoundary>
        <SimpleTabs
          tabs={(handleChangeIndex) => [
            {
              title: "Info",
              content: (
                <Info
                  handleClear={() => {
                    localStorage.clear();
                    setEditProfile(true);
                    setProfile(PROFILE_INIT);
                    setHistortItems([]);
                    handleChangeIndex(1);
                  }}
                />
              )
            },
            {
              title: "Générer",
              content: (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  spacing={3}
                >
                  <Form
                    editProfile={editProfile}
                    toggleEditProfile={toggleEditProfile}
                    profile={profile}
                    onChangeProfile={onChangeProfile}
                  />
                  {!editProfile && (
                    <React.Fragment>
                      <Divider />
                      <Reasons
                        selectReason={async (reason) => {
                          const creationInstant = new Date();
                          const datesortie = creationInstant.toLocaleDateString(
                            "fr-FR"
                          );
                          const heuresortie = creationInstant
                            .toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                            .replace(":", "h");

                          const item = {
                            ...profile,
                            birthday: new Date(
                              Date.parse(profile.birthday)
                            ).toLocaleDateString("fr-FR"),
                            datesortie,
                            heuresortie
                          };
                          const blob = await generatePdf(item, reason, pdfBase);
                          const base64 = await blobToBase64(blob);

                          const histortItem = { ...item, reason, base64 };

                          setHistortItems((items) => [
                            histortItem,
                            ...items.filter((value, index) => index < 5)
                          ]);
                          handleChangeIndex(2);
                          openHistortItem(histortItem);
                        }}
                      />
                    </React.Fragment>
                  )}
                </Grid>
              )
            },
            {
              title: "Historique",
              content: (
                <History
                  histortItems={histortItems}
                  setHistortItems={setHistortItems}
                  openHistortItem={openHistortItem}
                />
              )
            }
          ]}
        />

        <PDFDialog
          url={objectURL}
          blob={object}
          handleClose={() => {
            setObject(null);
          }}
        />
      </ErrorBoundary>
    </Paper>
  );
}

export default App;
