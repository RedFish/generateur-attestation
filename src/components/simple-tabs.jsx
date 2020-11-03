import React, { useMemo, useCallback } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  tabContent: { padding: 20, minHeight: 620 }
});

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.tabContent}>{children}</div>}
    </div>
  );
}

export default function SimpleTabs({ tabs }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(
    parseInt(localStorage.getItem("currentTab")) || 0
  );

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
    localStorage.setItem("currentTab", newValue);
  }, []);

  const handleChangeIndex = useCallback((index) => {
    setValue(index);
    localStorage.setItem("currentTab", index);
  }, []);

  const tabElements = useMemo(() => tabs(handleChangeIndex), [
    tabs,
    handleChangeIndex
  ]);

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabElements.map((tab, index) => (
            <Tab key={index} label={tab.title} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabElements.map((tab, index) => (
          <TabPanel
            key={index}
            value={value}
            index={index}
            dir={theme.direction}
          >
            {tab.content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </React.Fragment>
  );
}
