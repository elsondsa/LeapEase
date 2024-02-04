
import React from 'react';
import { AppBar, Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Info from './components/Info/Info'
import MainPage from './MainPage'
import useStyles from './styles';
import designGuidelines from "./components/designGuidelines/designGuidelines";
import codeEditor from "./components/codeEditor/codeEditor";



const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <div className={classes.component}>
          <span
            style={{
              position: "fixed",
              bottom: 4,
              right: 4,
              color: "#00000070",
              zIndex: 9999999,
              fontSize: 10,
              fontFamily: "OpenSansRegular"
            }}
          >
            {`LEAP AD, V-0.0.1, LeapEase Innovators`}
          </span>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/requestFramer" exact component={Home} />
            <Route path="/designGuidelines" exact component={designGuidelines} />
            <Route path="/codeEditor" exact component={codeEditor} />
            <Route path="/info" exact component={Info} />
          </Switch>
        </div>
      </Container>
    </BrowserRouter>
  )
}

export default App;