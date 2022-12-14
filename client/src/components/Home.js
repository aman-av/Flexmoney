import React,{useState,useEffect} from "react";
import { Form, Button, Container, Row,Table,Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
function Home() {

   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const [show1, setShow1] = useState(false);
  const [batchstring, setBatchstring] = useState('6-7 AM');
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [batch, setBatch] = useState(1);
  const handleslot = async () => {
    let ch = false;
    const res = await axios.post('/changeslot', { timeslot: timeslot });
    if (res.data.auth !== undefined && res.data.auth === false)
      navigate('/');
    else if(res.data=='changed'){
      { console.log(timeslot); ch = true; console.log(batch); setCanchanged(false); }
    }
    else {
      setCanchanged(true);
    }
    if (ch === true)
      setBatch(timeslot);
  }
  useEffect(() => {
    if (batch == 1)
      setBatchstring('6-7 AM');
    else if (batch == 2)
      setBatchstring('7-8 AM');
    else if (batch == 3)
      setBatchstring('8-9 AM');
    else if(batch==4)
      setBatchstring('5-6 PM');
  }, [batch]);
  
  const makepaymentfunc = async () => {
    const res = await axios.post('/payment');
    if (res.data. auth === true)
    {
      setArrears(0);
      setLastpayment(0);
      }
    console.log(res);
  }
  const getdetail = async() => {
    
    const res = await axios.get('/getdetail');
    console.log(res)
    if (res.data.auth !== undefined && res.data.auth === false)
      navigate('/');
    if (res.data.exists === false)
    {
      setArrears(0);
      setLastpayment(500);
      setCanchanged(true);
      setBatch(1);
      }
    else {
      
      setBatch(res.data.data.timeslot);
      console.log(res);
    let d1 = new Date();
    let d2 = new Date(res.data.data.lastpayment);
    let d3 = new Date(res.data.data.lastchanged);
    // console.log(v);
    let count1 = (d1.getFullYear() - d2.getFullYear()) * 12 + (d1.getMonth() - d2.getMonth(0)) ;
    let count2 = (d1.getFullYear() - d3.getFullYear()) * 12 + (d1.getMonth() - d3.getMonth(0));
    if (count2 > 0)
    setCanchanged(true);
    else setCanchanged(false);
    console.log('chan-', count2);
    if (count1 > 0)
    setLastpayment(500);
    setArrears(Math.max((count1 - 1) * 500, 0));
  }
  }
  useEffect(() => {
    
    getdetail();
   
  }, []);
  
  const [arrears, setArrears] = useState(0);
  const [timeslot, setTimeslot] = useState(1);
  const [canchanged, setCanchanged] = useState(true);
  const [lastpayment, setLastpayment] = useState(0);
  
  let d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const navigate = useNavigate();
  
  const logout = async() => {
    const res = await axios.delete('/logout');
    console.log(res);
    if (res.data.auth === false) navigate('/');
  }
  return <div>
    <Container>
      <div style={{textAlign:"end",marginTop:"1%"}}>

    <Button onClick={logout}>Logout</Button>
      </div>
    <h1>Yoga Class Registration Form</h1>
    
       
        

        <div>
            <Table striped bordered hover>
             
          <tbody>
             <tr>
                  <td>Time Slot</td>
              <td>
                {batchstring}
                </td>
              </tr>
                <tr>
                  <td>Arrears</td>
                <td>{arrears}</td>
              </tr>
              <tr>
                  <td>{`${months[d.getMonth()]}'s payable amount `}</td>
                <td>{ lastpayment}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{arrears+lastpayment}</td>
              </tr>
              </tbody>
            </Table>  
        </div>
      <div>
        
      <Button style={{marginRight:"1%"}} variant="primary" onClick={handleShow1}>
        Make payment
      </Button>
       {/* <Button variant="primary" onClick={setShow1(true)}>
        Launch demo modal
      </Button> */}

      <Button disabled={ !canchanged} onClick={handleShow}>
        Change Time slot
      </Button>
      </div>

       <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Slip</Modal.Title>
        </Modal.Header>
        <Modal.Body><Table><thead>
          <tr><td>Total payable :</td>
            <td>{arrears + lastpayment}</td></tr>
        </thead>
        </Table></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose1(); makepaymentfunc(); }}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preference Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
             <Form.Group className="mb-3" controlId="timeslot"   >
            <Form.Label>Select Time Slot</Form.Label>
            <Form.Select disabled={ !canchanged} value={timeslot} onChange={e=>setTimeslot(e.target.value)} aria-label="Default select example">
              <option value="1" disabled={batch===1}>6-7 AM</option>
              <option value="2" disabled={batch===2}>7-8 AM</option>
              <option value="3" disabled={batch===3}>8-9 AM</option>
              <option value="4" disabled={batch===4}>5-6 PM</option>
              </Form.Select>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleClose(); handleslot(); }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

     


    </Container>
  </div>;
}

export default Home;
