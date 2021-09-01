import React, { useEffect, useState } from "react"
import { useQuery,useMutation} from "@apollo/client";
import {GET_CONTACT } from "../Graphql/Queries";
import {UPDATE_CONTACT } from "../Graphql/Mutations";
import { useHistory } from "react-router";

export default function ContactForm({contactId,userId}) {
  
  const [contact, setContact] = useState({
    name:'',
    lastname:'',
    address: '',
    phone:   '',
    birthday:'',
    email: ''
  }); 
  const {push} = useHistory()
  const {loading, data } = useQuery(GET_CONTACT,{ variables:{id:parseInt(contactId)}});
  const [updateContact, { error }] = useMutation(UPDATE_CONTACT);
  useEffect((contact) => {
    if (data && data.contact) {
      const obj={}
      for (const property in data.contact) {
        if (data.contact[property]!==null) {
          obj[property] = data.contact[property]
        }
      }
      console.log('Obje',obj)
      setContact({...contact,...obj});
      console.log(data.contact)
      console.log('contacts',contact)
    }
  }, [data]);

  function handleChange(e) {
    setContact({...contact,[e.target.name]:e.target.value}) 
  }

  function onSubmit(e) {
    e.preventDefault()
    updateContact({variables: {id: parseInt(contactId),data:{
      name:contact.name,
      lastname:contact.lastname,
      address: contact.address,
      phone:   contact.phone,
      birthday:contact.birthday
    }}})
    push('/contacts'+userId)


  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  console.log('contac2',contact)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label name= 'name' htmlFor='name'>Name:</label>
        <input  onChange={handleChange} value={contact.name} id='name' type = 'text' placeholder = '' name='name'></input>
        <label name= 'lastname' htmlFor='lastname'>Lastname:</label>
        <input  onChange={handleChange} value={contact.lastname} id='lastname' type = 'text' placeholder = '' name='lastname'></input>
        <label name= 'email' htmlFor='email'>email:</label>
        <input  onChange={handleChange} value={contact.email} id='email' type = 'text' placeholder = '' name='email'></input>
        <label name= 'address' htmlFor='address'>address:</label>
        <input  onChange={handleChange} value={contact.address} id='address' type = 'text' placeholder = '' name='address'></input>      
        <label name= 'phone' htmlFor='phone'>phone:</label>
        <input  onChange={handleChange} value={contact.phone} id='phone' type = 'text' placeholder = '' name='phone'></input>
        <label name= 'birthday' htmlFor='birthday'>birthday:</label>
        <input  onChange={handleChange} value={contact.birthday} id='birthday' type = 'text' placeholder = '' name='birthday'></input>
        <input type='submit' value='submit'></input>
      </form>
    </div>
  
  )
}