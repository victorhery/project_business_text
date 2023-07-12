import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreatePresonne() {
  const navigate = useNavigate();

  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [compte, setCompte] = useState("")
  const [choisis_portef, setChoisis_portef] = useState("")
  const [adress_portef, setAdress_portef] = useState("")
  const [lieu, setLieu] = useState("")
  const [image, setImage] = useState()
  const [validationError,setValidationError] = useState({})

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const createPersonne = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('nom', nom)
    formData.append('prenom', prenom)
    formData.append('email', email)
    formData.append('compte', compte)
    formData.append('choisis_portef', choisis_portef)
    formData.append('adress_portef', adress_portef)
    formData.append('lieu', lieu)
    formData.append('image', image)

    await axios.post(`https://localhost:8000/api/personne`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Ajouter renseignement</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createPersonne}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>NOM</Form.Label>
                            <Form.Control type="text" value={nom} onChange={(event)=>{
                              setNom(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>PRENOM</Form.Label>
                            <Form.Control type="text" value={prenom} onChange={(event)=>{
                              setPrenom(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control type="text" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>COMPTE</Form.Label>
                            <Form.Control type="text" value={compte} onChange={(event)=>{
                              setCompte(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>CHOISIS PORTEFEILLE</Form.Label>
                            <Form.Control as="textarea" rows={3} value={choisis_portef} onChange={(event)=>{
                              setChoisis_portef(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>ADRESSE PORTEFEILLE</Form.Label>
                            <Form.Control as="textarea" rows={3} value={adress_portef} onChange={(event)=>{
                              setAdress_portef(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>LIEU</Form.Label>
                            <Form.Control as="textarea" rows={3} value={lieu} onChange={(event)=>{
                              setLieu(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}