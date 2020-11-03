import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { CODES } from "./reasons";
import { Delete, Visibility } from "@material-ui/icons";
import ConfirmDialog from "./confirm-dialog";

export default function History({
  histortItems,
  setHistortItems,
  openHistortItem
}) {
  const [itemIndexToDelete, setItemIndexToDelete] = useState(null);

  return histortItems.length === 0 ? (
    <React.Fragment>
      <br />
      <br />
      <Typography variant="body2">L'historique est vide</Typography>
      <br />
      <br />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <List>
        {histortItems.map((item, index) => (
          <ListItem key={index} onClick={() => openHistortItem(item)}>
            <ListItemAvatar>
              <Avatar>
                {item.firstname[0]}
                {item.lastname[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={CODES[item.reason]}
              secondary={`${item.datesortie} à ${item.heuresortie}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  openHistortItem(item);
                }}
                edge="end"
                aria-label="show"
              >
                <Visibility />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setItemIndexToDelete(index);
                }}
                edge="end"
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <ConfirmDialog
        title={"Etes vous sur de vouloir supprimer cette attestation ?"}
        open={itemIndexToDelete !== null}
        handleDismiss={() => {
          setItemIndexToDelete(null);
        }}
        handleConfirm={() => {
          setHistortItems((histortItems) => {
            const res = [...histortItems];
            res.splice(itemIndexToDelete, 1);
            return res;
          });
          setItemIndexToDelete(null);
        }}
      />
    </React.Fragment>
  );
}
