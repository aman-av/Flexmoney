import React,{useEffect,useState} from "react";
import { Container, Form, Button, Tabs, Tab, Toast, Alert } from 'react-bootstrap';
// import instance from "../helpers/instance";
import axios from 'axios'

import { useNavigate } from "react-router-dom";

// const instance = axios.create({ withCredentials: true });
// import instance from './../helpers/instance'
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  // const Toastcomp = () => {
  //   return (
    //     // <div className="position-relative">
    //       <Toast show={show} onClose={toggleShow} position="middle-center">
    //         <Toast.Header>
    //           <img
    //             src="holder.js/20x20?text=%20"
    //             className="rounded me-2"
    //             alt=""
    //             />
    //           <strong className="me-auto">Bootstrap</strong>
    //           <small>11 mins ago</small>
    //         </Toast.Header>
    //         <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    //       </Toast>
    //     // </div>
    //   );
    // }
    const navigate = useNavigate();
    
  const handler2 = async (e) => {
    e.preventDefault();
    let data = {
      name:name,
      email: email,
      password: password,
      age:age
      
    }
    const res = await axios.post('/signup', data);
    console.log(res);
    if(res.data.auth===true)
    navigate('/home')
  }
  

  const handler = async(e) => {
    e.preventDefault();
    let data = {

      email: loginemail,
      password: loginpassword,

    }
    const res = await axios.post('/login', data);
    console.log(res);
     if(res.data.auth===true)
    navigate('/home')
    // console.log(res);
  }
 

  return (
    <Container style={{marginTop:"10%"}}>
      {/* <Toastcomp /> */}
       <Toast show={show} onClose={toggleShow} position="right">
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
              />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      <div>
      <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="login" title="login">
          <Form onSubmit={e=>handler(e)}>
            <Form.Group className="mb-3" controlId="loginemail">
                <Form.Label>Email address</Form.Label>
              
                <Form.Control validated="true" type="email" placeholder="Enter email" required onChange={e=>setLoginEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginpassword">
                <Form.Label>Password</Form.Label>
                <Form.Control validated="true" type="password" placeholder="Password" required onChange={e=>setLoginPassword(e.target.value) } />
            </Form.Group>
            <Button variant="primary" type="submit" validated="true"  >
                Submit
            </Button>
          </Form>
      </Tab>
      <Tab eventKey="signup" title="signup">
          <Form onSubmit={e=>handler2(e)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control validated="true"  type="text"placeholder="Name" required onChange={e=>setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control validated="true" type="email" placeholder="Enter email" required onChange={e=>setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control validated="true" type="password" placeholder="Password" minLength={8} required onChange={e=>setPassword(e.target.value) } />
          </Form.Group>
        
          
          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control validated="true"  type="number" min="18" max="65" placeholder="age ( 18 to 65)" required onChange={e=>setAge(e.target.value)}/>
          </Form.Group>
        
          
         
          <Button variant="primary" type="submit" validated="true"  >
            Submit
          </Button>
      </Form>
      </Tab>
      {/* <Tab eventKey="contact" title="Contact" disabled> */}
        {/* <Sonnet /> */}
      {/* </Tab> */}
    </Tabs>
    </div>

    </Container>
  );
}

export default Login;

