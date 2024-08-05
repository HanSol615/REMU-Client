import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImg from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function BrandExample() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/main');
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
  };

  return (
    <>
      <NavStyle>
        <Navbar className="bg-body-tertiary">
          <Container className="d-flex justify-content-between">
            <Navbar.Brand onClick={handleLogoClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <img
                src={LogoImg}
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
            <Button variant="outline-primary" onClick={handleMyPageClick}>
              My Page
            </Button>
          </Container>
        </Navbar>
      </NavStyle>
    </>
  );
}

const NavStyle = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export default BrandExample;
