import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [personne, setPersonne] = useState([])

    useEffect(()=>{
        fetchPersonne() 
    },[])

    const fetchPersonne = async () => {
        await axios.get(`https://localhost:8000/api/personne`).then(({data})=>{
            setPersonne(data)
        })
    }

    const deletePersonne = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`https://localhost:8000/api/personne/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchPersonne()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>
                    Create Personne
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Email</th>
                                    <th>Compte</th>
                                    <th>Nom</th>
                                    <th>choisis_portef</th>
                                    <th>adress_portef</th>
                                    <th>lieu</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    personne.length > 0 && (
                                        personne.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.nom}</td>
                                                <td>{row.prenom}</td>
                                                <td>{row.compte}</td>
                                                <td>{row.choisis_portef}</td>
                                                <td>{row.adress_portef}</td>
                                                <td>{row.description}</td>
                                                <td>{row.lieu}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/personne/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deletePersonne(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}