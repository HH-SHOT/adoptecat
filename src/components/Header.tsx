import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header(){
    return(
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src="/img/PetFinderLogo.png" width="80" height={80}></img>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-center w-100">
                    <h1 className="text-center text-white">adopteunchat!</h1>
                </Nav>
            </Container>
        </Navbar>
    )
}