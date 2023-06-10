import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar:{
    marginRight:theme.spacing(3),
    width: "45px",
    backgroundColor: "blue",

  },

}));

export default function Prueba(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar  caria-label="recipe" className={classes.avatar} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {props.letra[0]}
      </Avatar>
    </div>
  );
}
