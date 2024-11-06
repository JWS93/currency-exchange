import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Calculator from './Calculator';
import ExchangeTable from './ExchangeTable';
import './Navbar.css';

function Navigation() {
  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="justify-content-start">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="logo" />
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
        <Route path="/" element={<Calculator />}></Route>
        <Route path="/exchangetable" element={<ExchangeTable />}></Route>
      </Routes>
    </>
  );
}

export default Navigation;