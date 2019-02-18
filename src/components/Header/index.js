import React, { Component } from "react";

//Material Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class Header extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            { this.props.title }
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
