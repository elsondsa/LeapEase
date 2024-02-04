import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/Capture.PNG';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        {/* <Typography component={Link} to="/" className={classes.heading} variant="h5" align="center">LEAP AD Tools</Typography> */}
        <img className={classes.image} src={memories} alt="icon" height="50" />
        <Typography style={{ fontFamily: 'Comic Sans MS' }}>One stop solution for LEAP APP Development</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        <Button style={{ right: 4 }} component={Link} to="/designGuidelines" variant="contained" color="primary">Design </Button>
        <Button style={{ right: 4 }} component={Link} to="/requestFramer" variant="contained" color="primary">Request Framer</Button>
        <Button style={{ right: 4 }} component={Link} to="/codeEditor" variant="contained" color="primary">Code Editor</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;