import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditPersonne from "./components/personne/edit.component";
import PersonneList from "./components/personne/list.component";
import CreatePersonne from "./components/personne/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Crud App
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/personne/create" element={<CreatePersonne />} />
            <Route path="/personne/edit/:id" element={<EditPersonne />} />
            <Route exact path='/' element={<PersonneList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
