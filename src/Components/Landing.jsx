import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'   
import { useQuery} from "@apollo/client";
import { GET_USERS } from "../Graphql/Queries";
import { Box,Button,Heading,Select } from "@chakra-ui/react"

export default function Landing() {
  const [user, setUser] = useState(''); 
  const {loading, data,error } = useQuery(GET_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.users);
      setUser(data.users[0].id)
    }
  }, [data]);
  function onChange(user) {
    setUser(user)
  }
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
  
    <div align="center">
 
      <Box bgGradient="linear(to-t, teal.200, teal.500)" w="100%" p={4} color="white">
        <Heading>Select an user</Heading>
      </Box>

      
      
      <Select size="md" m={10} w={"50%"} onChange={(e)=>onChange(e.target.value)} value={user}>
            {users && users.map((u,id) => <option id ={u.id} key={u.id} value={u.id}>{u.email}</option>)}
      </Select> 
      {user?<Link to={'/contacts/'+user}>                 
        <Button type="button" bg="teal" color="white"  m={2}>Log in</Button>  
      </Link>:<></>}
      
    </div>
    
    )
};