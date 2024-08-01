import { Row,Col } from "react-bootstrap";
import Sidebar from '../components/sidebar.jsx'

export default function Analysis(){
    return (
        <>
        <Row>
            <Col>
            <Sidebar></Sidebar>
            </Col>
        
        <Col className='col-10 card rounded-2 border vh-100  mt-2'>
        <h2>welcome to Analytics</h2>
        </Col>
        
        </Row>
        </>
    );
}