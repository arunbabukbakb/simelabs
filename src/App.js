import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import Graph from './views/graph'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Interceptor from "./helpers/interceptor";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  footer: {
    top: 'auto',
    bottom: 0,
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className="App">
       <Interceptor />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Machine Test - Arun Babu
          </Typography>
        </Toolbar>
      </AppBar>
      <Graph />
      <AppBar position="fixed" className={classes.footer}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
           
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
