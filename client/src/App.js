import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const App = () => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputs = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSent = () => {
    axios.post("https://simple-form-my-first-node-app.herokuapp.com/send_email", customer);
  };

  const addCustomer = (e) => {
    e.preventDefault();
    handleSent();
    axios.post("https://simple-form-my-first-node-app.herokuapp.com/addCustomer", customer);
  };

  return (
    <Form className="my-5 mx-5">
      <Form.Group as={Row}>
        <Form.Label column sm={2} className="mb-3">
          Meno
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            placeholder="Zadaj krstné meno"
            name="firstName"
            value={customer.firstName}
            onChange={handleInputs}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2} className="mb-3">
          Priezvisko
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="text"
            placeholder="Zadaj priezvisko"
            name="lastName"
            value={customer.lastName}
            onChange={handleInputs}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm={2} className="mb-3">
          Email
        </Form.Label>
        <Col sm={6}>
          <Form.Control
            type="email"
            placeholder="Zadaj email"
            name="email"
            value={customer.email}
            onChange={handleInputs}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={addCustomer}>
            Odoslať
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default App;
