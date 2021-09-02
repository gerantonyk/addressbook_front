import React, { useEffect, useState } from "react"
import { useQuery,useMutation} from "@apollo/client";
import {GET_CONTACT,GET_CONTACTS } from "../Graphql/Queries";
import {UPDATE_CONTACT,CREATE_CONTACT} from "../Graphql/Mutations";
import { useHistory } from "react-router";
import BackButton from "./BackButton";
import {
Input,
Text,
Box,
Heading,
Button,
Alert,
AlertIcon
} from "@chakra-ui/react"

export default function ContactForm({contactId,userId}) {

  const emptyContact = {
    name:'',
    lastname:'',
    email: '',
    address: '',
    phone:   '',
    birthday:''
  }
  const [contact, setContact] = useState(emptyContact)
  const [errors, setErrors] = useState(emptyContact)
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
      const obj={}
      for (const property in data.contact) {
        if (data.contact[property]!==null) {
          obj[property] = data.contact[property]
        }
      }
      setContact({...contact,...obj});
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

  function goBack() {
    push('/contacts/'+userId)
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
      if (window.confirm("Are you sure you want to update this contact?")) {
        updateContact({variables: {id: parseInt(contactId),data}})} 
      }
    else {
      if (window.confirm("Are you sure you want to create this contact?")) {
        createContact({variables: {id: parseInt(userId),data}}) 
      }
    }
    refetch()
    goBack()
  }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    const errorvalues = Object.values(errors).filter(v=>v);
    // const inputs =  Object.keys(contact)
  return (
    <div align="center">
      <Box bgGradient="linear(to-t, teal.200, teal.500)" w="100%" p={4} color="white">
        <BackButton onClick={goBack}></BackButton>
        <Heading>New contact</Heading>
      </Box>
      <Box h="80px" w="100%">
        {errorvalues.map((v,i)=>
        <Alert status="error" key={i} h={5}>
        <AlertIcon w={4} h={4} />
        {v}
        </Alert>
        )}
      </Box>
      <Box w="40%" >
        <form onSubmit={onSubmit} >
          {/* {       
            inputs.map(i=><>
              <label name= {i} htmlFor={i}>{i}:</label>
              <input  onChange={handleChange} value={contact[i]} id={i} type = 'text' placeholder = '' name={i}></input> 
              </>
              )} */}
          <Text name= 'name' htmlFor='name'>Name:</Text>
          <Input  onChange={handleChange} value={contact.name} id='name' type = 'text' placeholder = '' name='name'></Input>
          <Text name= 'lastname' htmlFor='lastname'>Lastname:</Text>
          <Input  onChange={handleChange} value={contact.lastname} id='lastname' type = 'text' placeholder = '' name='lastname'></Input>
          <Text name= 'email' htmlFor='email'>Email:</Text>
          <Input  onChange={handleChange} value={contact.email} id='email' type = 'text' placeholder = '' name='email'></Input>
          <Text name= 'address' htmlFor='address'>Address:</Text>
          <Input  onChange={handleChange} value={contact.address} id='address' type = 'text' placeholder = '' name='address'></Input>      
          <Text name= 'phone' htmlFor='phone'>Phone:</Text>
          <Input  onChange={handleChange} value={contact.phone} id='phone' type = 'text' placeholder = '' name='phone'></Input>
          <Text name= 'birthday' htmlFor='birthday'>Birthday:</Text>
          <Input onChange={handleChange} value={contact.birthday} id='birthday' type = 'date' placeholder = '' name='birthday' min="1930-01-01"
              max="2055-12-31"></Input>
          {!errorvalues.length && contact.name?<Button m="5" type='submit' value='submit'>Submit</Button>:<></>}
        </form>
      </Box>
    </div>
  
  )
}