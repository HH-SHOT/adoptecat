import { Card } from "react-bootstrap";
import { Cat } from "../models/Cat";
import '../components/css/petcard.css';
import { Link } from "react-router-dom";

interface CatCardProps{
    cat : Cat
}

export function CatCard(props:CatCardProps){
    return(
        <Card>
            <Card.Img variant="top" src={`img/${props.cat.image}`}></Card.Img>
            <Card.Body>
                <Card.Title>{props.cat.name} ({props.cat.breed})</Card.Title>
                {props.cat.description}
            </Card.Body>
            <Card.Footer>
                <Link to={`/adoptions/${props.cat.id}`} className="btn btn-primary ml-2">Adopt Me</Link>
                <Link to={`/details/${props.cat.id}`} className="btn btn-secondary ml-2">Details</Link>
            </Card.Footer>
        </Card>
    )
}