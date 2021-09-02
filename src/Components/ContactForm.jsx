import React, { useEffect, useState } from "react"
import { useQuery,useMutation} from "@apollo/client";
import {GET_CONTACT,GET_CONTACTS } from "../Graphql/Queries";
import {UPDATE_CONTACT,CREATE_CONTACT} from "../Graphql/Mutations";
import { useHistory } from "react-router";

export default function ContactForm({contactId,userId}) {

  const emptyContact = {
    name:'',
    lastname:'',
    address: '',
    phone:   '',
    birthday:'',
    email: '',
  }
  const [contact, setContact] = useState(emptyContact)
  const [errors, setErrors] = useState({...emptyContact,
    name:contactId?'':'Must have a value',
    birthday:contactId?'':'Must be a valid Date',
  })
  const {push} = useHistory()
  const {loading, data,refetch,error} = useQuery(GET_CONTACT,{ variables:{id:parseInt(contactId)||0}});
  const [updateContact] = useMutation(UPDATE_CONTACT,{
    refetchQueries: [
      GET_CONTACTS 
    ],
  });

  const [createContact] = useMutation(CREATE_CONTACT,{
    refetchQueries: [
      GET_CONTACTS 
    ],
  });

  useEffect((contact) => {
    if (data && data.contact ) {
      console.log("Entro aca")      
      const obj={}
      for (const property in data.contact) {
        if (data.contact[property]!==null) {
          obj[property] = data.contact[property]
        }
      }
      // console.log('Obje',obj)
      setContact({...contact,...obj});
      // console.log(data.contact)
      // console.log('contacts',contact)
    }
  }, [data]);

  function validate(e) {
    var error=''
    if (e.target.name === "name") {
      if (!e.target.value) 
      error='Name must have a value'
    }
    if (e.target.name === "email") {
      if(!/\S+@\S+\.\S+/g.test(e.target.value) && e.target.value  ) 
      error='Email must be valid '
    }
    if (e.target.name === "phone") {
      if(!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g.test(e.target.value)  && e.target.value) 
      error='Phone number must be valid '
    }


    return error
  }

  function handleChange(e) {
    setContact({...contact,[e.target.name]:e.target.value}) 
    setErrors({...errors,[e.target.name]:validate(e)}) 
  }

  function onSubmit(e) {
    e.preventDefault()
    const data=
      {
        name:    contact.name,
        lastname:contact.lastname,
        address: contact.address,
        phone:   contact.phone,
        email:   contact.email,
        birthday:contact.birthday
      }

    if (contactId ){
      updateContact({variables: {id: parseInt(contactId),data}})} 
    else {
      createContact({variables: {id: parseInt(userId),data}}) 
    }
    refetch()
    push('/contacts/'+userId)


  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  console.log('estos son los errores',errors)
  const errorvalues = Object.values(errors).filter(v=>v);
  return (
    <div>
    <div>
      <ul>
          {errorvalues.map((v,i)=><li key={i}>{v}</li>)}
      </ul>
    </div>
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
        {!errorvalues.length?<input type='submit' value='submit'></input>:<></>}
      </form>
    </div>
  
  )
}