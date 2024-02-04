import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import accountCircle from '@material-ui/icons/AccountCircle'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));


function Info() {

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">Team Information</Typography>
      <List component="nav" className={classes.root} aria-label="contacts">
        <ListItem button>
          <ListItemIcon>
            <accountCircle />
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <accountCircle />
          </ListItemIcon>
          <ListItemText inset primary="Eric Hoffman" />
        </ListItem>
      </List>

      <Typography>Welcome to LEAP AD tools. Here you will find all tools useful for your Application development. Have a good ride. Thanks!</Typography>
    </div>
  );
};

export default Info;