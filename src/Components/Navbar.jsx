import React from 'react';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import './components.css';

const useStyles = makeStyles({
    header: {
        backgroundColor: '#212121',
    },
    spacing :{
        
            display: 'flex',
            justifyContent: 'Right',
            alignItems: 'Right',
            fontSize: '18px',
        color:'white'
           
        

        
    },
   
  });

const Navbar = () => {
    const classes = useStyles();
    return (
        <AppBar className={classes.header} position="static">
            <Toolbar className={classes.spacing}>
                
					  <ul>
						  <NavLink to={`/`}> Logout</NavLink> 
						  
					  </ul>
            
            
                
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;