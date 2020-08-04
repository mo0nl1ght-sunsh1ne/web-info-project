import React from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Wave from 'react-wavify';
import "./Home.css";

export const Home = () => (
  <div className="home">

  {/*create header */}
   <header className = "Hydrohomies">
     <h1> Hydrohomies</h1> 
     <p className = "smallheader">We are water</p>
    </header>

{/*tagline for the website*/}
    <div className = "wave">
      <div className = "tagline">
        <span> Don't </span>
        <br></br>
        let life
        <br></br>
        slip through the
        <br></br>
        drain
      </div>

{/*create form for login and sig up options */}
      <div className = "form-wrapper">
        <h2 className = "formheader"> Welcome to hydrohomies</h2>
        <br></br>
        <Form className = "landing">
          <Form.Group controlId="formBasicEmail">
             <Form.Label className = "form1">New to hydrohmies</Form.Label>
{/*create links to signup and login page */}
             <a href = "./SignUp">
              <Button variant="outline-secondary" size = "lg" >Create an account</Button>
            </a>
          </Form.Group>
          <br></br>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className = "form2">Already a member</Form.Label>
            <a href = "./Login">
              <Button variant="outline-secondary" size = "lg" >Log In</Button>
            </a>
          </Form.Group>
        </Form>
      </div>
      <br></br>

{/*create wave for page */}

  <Wave className = "bottomwave" fill="url(#gradient)" options={{ points: 3, speed: 0.27, amplitude: 40, height: 40}}>
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop offset="10%"  stopColor="#2196f3" />
      <stop offset="90%" stopColor="#57E0E5" />
    </linearGradient>
  </defs>
</Wave>
    </div>
  </div>
);
