import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Navbar,Container,NavbarBrand,Row,Col,Nav,NavItem,NavLink} from 'react-bootstrap';
//  import { useNavigate } from 'react-router-dom';


function header(){


    return(
        <>
        <Navbar className="bg-primary navbar-dark  mt-0">
            <Container>
                <NavbarBrand className="navbar-brand text-light"href='#' onClick={(e)=>e.preventDefault()} >
                Key Share
                </NavbarBrand>
                <button className='navbar-toggler' id='navbar-btn'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse.navbar-collapse' navbar toggler ='#navbar-btn'>
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand xs-6">
                            {/*link part */}
                            </Col>
                            <Col className="collapse-close xs-6">
                            <button className="navbar-toggler"></button>
                            </Col>
                            <Col className="collapse-close xs-6">
                            <button className="navbar-toggler" id='navbar-btn'>
                                <span/>
                                <span/>
                            </button>
                            </Col>
                        </Row>
                    </div>
                    <Nav className='' navbar>
                        <NavItem >
                            <NavLink className='text-light' href='#' onClick={(e)=>e.preventDefault()}>
                                About us
                                <span className='sr-only'></span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='text-light' href='#' onClick={(e)=>e.preventDefault()}>
                                Solutions
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='text-light' href='#' onClick={(e)=>e.preventDefault()}>
                                Contact
                            </NavLink>
                        </NavItem>
                       
                          
                           
                    </Nav>
                </div>
            </Container>
        </Navbar>
        </>
    );
}

export default header;