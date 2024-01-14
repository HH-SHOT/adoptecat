import { useEffect, useState } from "react";
import { Cat } from "../models/Cat";
import { getCatById } from "../server/catServer";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { AdoptionForm } from "../models/AdoptionForm";
import { postAdoption } from "../server/adoptionService";

export function CatAdoptionForm(){
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [cat, setCat] = useState<Cat | null>(null);
    const [formValues, setFormValues] = useState<AdoptionForm>({
        firstName: '',
        lastName: '',
        hasChildren: false,
        hasOtherPets: false,
        phoneNumber: '',
        email: '',
        aboutSelf: ''
    });

    const { id } = useParams();

    useEffect(() => {
        if(id !== undefined){
            getCatById(Number(id)).then((cat) => { setCat(cat)});
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if(type === 'checkbox'){
            setFormValues(prev => ({
                ...prev,
                [name] : (e.target as HTMLInputElement).checked
            }));
        }
        else{
            setFormValues(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        postAdoption(formValues);
        setFormSubmitted(true);
    }

    return(
        <div className="CatAdoptionForm">
            <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                    { formSubmitted ? <Alert>One of our team members will get back with you as soon as possible, thanks!</Alert> : 
                <Form onSubmit={onSubmit}>
                <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleChange}
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                            type="tel"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890" 
                        />
                        <Form.Text className="text-muted">
                            Format: 123-456-7890
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            pattern="\S+@\S+\.\S+" 
                        />
                        <Form.Text className="text-muted">
                            Format: email@domain.com
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="aboutSelf">
                        <Form.Label>About Yourself</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            name="aboutSelf"
                            value={formValues.aboutSelf}
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Check 
                        type="checkbox"
                        id="hasChildren"
                        label="Do you have children?"
                        name="hasChildren"
                        checked={formValues.hasChildren}
                        onChange={handleChange} 
                    />

                    <Form.Check 
                        type="checkbox"
                        id="hasOtherPets"
                        label="Do you have other pets?"
                        name="hasOtherPets"
                        checked={formValues.hasOtherPets}
                        onChange={handleChange} 
                    />

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                        }
                </Col>
                <Col lg={3}></Col>
            </Row>
        </div>
    )
}