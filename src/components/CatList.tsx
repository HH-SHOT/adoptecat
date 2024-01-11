import { useEffect, useState } from "react";
import { Cat } from "../models/Cat";
import { getCats } from "../server/catServer";
import { Col, Row } from "react-bootstrap";
import { CatCard } from "./CatCard";

export default function CatList() {
    const [cats, setCats] = useState<Cat[]>([]);

    useEffect(() => {
        getCats().then((cats) =>setCats(cats));
    }, []);

    return (
        <div className="CatList">
            <Row>
            {cats.map((cat) => (<Col lg={4}><CatCard cat={cat} /></Col>))}
            </Row>
        </div>
    )
} 