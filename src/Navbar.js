import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Calculator from './Calculator';
import ExchangeTable from './ExchangeTable';
import './Navbar.css';

function Navigation() {
  const [options, setOptions] = useState('');
  
  fetch('https://api.frankfurter.app/currencies').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request was either a 404 or 500');
  }).then((data) => {
    let optionItems = Object.entries(data).map(([key, value]) => ({ ['value']: key, ['label']: value }));
    setOptions(optionItems);
  }).catch((error) => {
    console.log(error);
  });




  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Container className="d-flex flex-nowrap align-items-center">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="logo pe-3" />
            <h5 className="pt-1">Crumb Currency</h5>
            </Container>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-end mt-1">
              <Nav.Link as={Link} to="/" className="header-link">Currency Calculator</Nav.Link>
              <Nav.Link as={Link} to="/exchangetable" className="header-link">Exchange Table</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Calculator options={options} />}></Route>
        <Route path="/exchangetable" element={<ExchangeTable options={options} />}></Route>
      </Routes>
    </>
  );
}

export default Navigation;