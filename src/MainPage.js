import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { Button, TextField, InputLabel, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));


function Home() {
  const classes = useStyles();
  const history = useHistory();


  return (
    <div>
      <Typography>Welcome to LEAP AD tools. Here you will find all tools useful for your Application development. Have a good ride. Thanks!</Typography>
    </div>
  );
};

export default Home;