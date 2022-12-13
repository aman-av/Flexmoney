import React, { useEffet, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from './Login';
import Home from './Home';
function App() {
  return (
    <div className="App">
      <Container fluid>
			<BrowserRouter>

				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route path="/home" element={<Home  />} />
					
				</Routes>
				{/* <Footer /> */}
			</BrowserRouter>
		</Container>
    </div>
  );
}

export default App;
