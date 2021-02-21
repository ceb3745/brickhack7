import React from 'react';
import './styles/AppRouter.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Home from './pages/Home';
  import Media from './pages/Media';
  import banner from './media/photos/banner.png';
  import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

  const linkStyles = { textDecoration: 'none', color: 'black' };

  const AppRouter = () => {
    return (
        <Router>
          <div>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">brickhack7 project</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/media">Media</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="bannerContainer">
              <img src={banner} style={{width: '100%'}}/>
            </div>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/media">
                <Media />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
          <div className="footer">
            <div>footer</div>
          </div>
        </Router>
        
      );
  }

  export default AppRouter;