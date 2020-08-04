import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {Map} from './Map';
import Card from "react-bootstrap/Card";

export const Dashboard = () => (
       
       <div>
           <Navbar bg="primary" variant="dark" expand="lg">
               <Navbar.Brand href="/dashboard" >Hydrohomies</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                   <Nav className="mr-auto">
                       <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                       <Nav.Link href="/profilePage">Profile</Nav.Link>
                       <NavDropdown title="Saved" id="basic-nav-dropdown">
                           <NavDropdown.Item href="./Fountains">Fountains</NavDropdown.Item>
                           <NavDropdown.Item href="./Routes">Routes</NavDropdown.Item>
                       </NavDropdown>
                   </Nav>

               </Navbar.Collapse>

               <Form inline>
                   <Button variant="outline-light" ><Nav.Link href="/">Logout</Nav.Link></Button>
               </Form>
           </Navbar>
           <Card >
               <h6 style={{textAlign: 'center', color: '#007bff'}}>(Click on the blue Marker to get direction from your current location.)</h6>
           <Map className="map"/>
           </Card>



        </div>
    )
