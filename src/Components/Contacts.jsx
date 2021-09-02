import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'   
import { useQuery} from "@apollo/client";
import { GET_CONTACTS } from "../Graphql/Queries";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../Graphql/Mutations";
import Pagination from "./Pagination";


export default function Contacts({userId}) {

  const [currentPage,setCurrentPage] = useState('1')
  const [contactsPerPage] = useState('2')
  const [contacts, setContacts] = useState([]); 
  const {loading, data,refetch } = useQuery(GET_CONTACTS,{ variables:{id:parseInt(userId)}});
  const [deleteContact, { error }] = useMutation(DELETE_CONTACT,{
    refetchQueries: [
      GET_CONTACTS 
    ],
  });
  

  useEffect(() => {
    console.log(data)
    if (data) {
      if (data.user){setContacts(data.user.contacts)};
    }
  }, [data]);

function deleteContactWrapper(contactId) {
  deleteContact({variables: {id: parseInt(contactId)}})
  refetch()
}

function paginate(pageNumber) {
  setCurrentPage(pageNumber)
}

if (loading) return 'Submitting...';
if (error) return `Submission error! ${error.message}`;

const indexOfLastContact  = currentPage * contactsPerPage
const indexOfFirstContact = indexOfLastContact - contactsPerPage
const currentContacts     = contacts.slice(indexOfFirstContact,indexOfLastContact)

return (
  <div>
    <div>
      <h1>Bienvenido</h1>
      {userId}
    </div>
    <div align="center">
    <Link to={'/contact/'+userId+'/newcontact'}><button >new</button></Link>
      <table>
        <thead align="left">
          <tr>
            <th>name</th>
            <th>lastname</th>
            <th>phone</th>
            <th>email</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map(c => {
            return (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.lastname}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>                        
                <td><button value={c.id} onClick={(e) => {deleteContactWrapper(e.target.value)}}>eliminar</button></td>
                <td><Link to={'/contact/'+userId+'/'+c.id}><button value={c.id}>modificar</button></Link></td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
    </div>
    <Pagination
        contactsPerPage={contactsPerPage}
        totalContacts={contacts.length}
        paginate={paginate}
      />
  </div>
)};




