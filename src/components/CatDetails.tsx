import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cat } from "../models/Cat";
import { getCatById } from "../server/catServer";
import { Card, Col, Row } from "react-bootstrap";

export function CatDetails(){
    const { id } = useParams();
    const [cat, setCat] = useState<Cat | null>(null);

    useEffect(() => {
        if(id !== undefined){
            getCatById(Number(id)).then((cat) => {setCat(cat)})
        }
    }, [id]);

    return(
        <div className="PetDetails">
            { cat && 
            <Row>
                <Col lg={2}></Col>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={4}>
                                    <img src={`/img/${cat.image}`}></img>
                                </Col>
                                <Col lg={8}>
                                <Card.Title>{cat.name}</Card.Title>
                                <Card.Text>{cat.breed} - {cat.isBoy ? 'Boy' : 'Girl' }</Card.Text>
                                <Card.Text>{cat.description}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2}></Col>
            </Row> }
        </div>
    )
}