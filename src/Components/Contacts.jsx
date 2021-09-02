import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'   
import { useQuery} from "@apollo/client";
import { GET_CONTACTS } from "../Graphql/Queries";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../Graphql/Mutations";
import Pagination from "./Pagination";
import BackButton from "./BackButton";
import { useHistory } from "react-router";
import { AddIcon,EditIcon,DeleteIcon} from '@chakra-ui/icons'
import { 
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Text
} from "@chakra-ui/react"

export default function Contacts({userId}) {

  const {push} = useHistory()
  const [currentPage,setCurrentPage] = useState('1')
  const [contactsPerPage] = useState('5')
  const [contacts, setContacts] = useState([]); 
  const {loading, data,refetch } = useQuery(GET_CONTACTS,{ variables:{id:parseInt(userId)}});
  const [deleteContact, { error }] = useMutation(DELETE_CONTACT,{
    refetchQueries: [
      GET_CONTACTS 
    ],
  });
  

  useEffect(() => {
    if (data) {
      if (data.user){setContacts(data.user.contacts)};
    }
  }, [data]);

function deleteContactWrapper(contactId) {
  if (window.confirm("Are you sure you want to delete this contact?")) {
    deleteContact({variables: {id: parseInt(contactId)}})
    refetch()
  }

}

function goBack() {
  push('/')
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
  <Box w="100%">
      <Box bgGradient="linear(to-t, teal.200, teal.500)" w="100%" p={4} color="white">
        <BackButton onClick={goBack}></BackButton>
        <Heading>Contacts</Heading>
      </Box>
      <Box  align="right" mt={2} w="100%">
        <Link to={'/contact/'+userId+'/newcontact'} align="left">
          <Button bg="teal.300" color="white" mr={2} >
            <HStack spacing="0.5rem">
              <Text >New Contact</Text> 
                <AddIcon w={6} h={6} /> 
              </HStack>
          </Button>

        </Link>      
      </Box>
      
    <div align="center">
    
      <Table variant="simple" size="sm">
        <Thead align="left">
          <Tr>
            <Th>name</Th>
            <Th>lastname</Th>
            <Th>phone</Th>
            <Th>email</Th>
            <Th>address</Th>
            <Th>birthday</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentContacts.map(c => {
            return (
              <Tr key={c.id}>
                <Td>{c.name}</Td>
                <Td>{c.lastname}</Td>
                <Td>{c.phone}</Td>
                <Td>{c.email}</Td>   
                <Td>{c.address}</Td>
                <Td>{c.birthday}</Td>                        
                <Td>
                  <Button value={c.id} onClick={(e) => {deleteContactWrapper(e.currentTarget.value)}}>
                    <DeleteIcon value={c.id} w={6} h={6} />  
                  </Button>
                </Td>
                <Td>
                  <Link to={'/contact/'+userId+'/'+c.id}>
                    <Button value={c.id}>
                      <EditIcon w={6} h={6} />                    
                    </Button>
                  </Link>
                </Td>
              </Tr>
            );
          })}

        </Tbody>
      </Table>
    </div>
    <Pagination
        contactsPerPage={contactsPerPage}
        totalContacts={contacts.length}
        paginate={paginate}
      />
  </Box>
)};




