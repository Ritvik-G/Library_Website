import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../Media/logo.png';
import aiisc from '../../Media/aiisc.png';
import library from '../../Media/libraries.jpg';
import vertical from '../../Media/vertical_bar.png'
import './navbar.css';

function navbar(){
    return(
        <>
                <Navbar key='md' variant="light">
                <Container fluid className='navbar'>
                    <Navbar.Brand href="/#">
                        <img className='navbar-image' src={logo}/>
                        <img className='vertical-bar' src={vertical}/>
                        <img className='navbar-image2' src={aiisc}/>
                        <img className='navbar-image3' src={library}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                    <Navbar.Offcanvas 
                    id={`offcanvasNavbar-expand-md`} 
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`} 
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                        University of South Carolina
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 ">
                        <Nav.Link href="/">Home</Nav.Link>
                        &emsp; &emsp; &emsp;
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                </Navbar>
        </>
    );
}

export default navbar;