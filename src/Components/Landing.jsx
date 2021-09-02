import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'   
import { useQuery} from "@apollo/client";
import { GET_USERS } from "../Graphql/Queries";



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
  
    <div className= 'vacio'>
 
    <br></br>
    <br></br>
      <h1>Select an user</h1>
      
      <br></br>
      <br></br>

      <select onChange={(e)=>onChange(e.target.value)} value={user}>
            {users && users.map((u,id) => <option id ={u.id} key={u.id} value={u.id}>{u.email}</option>)}
      </select> 
      {user?<Link to={'/contacts/'+user}>                 
        <button type="button">¡Ingresar!</button>  
      </Link>:<></>}
      
    </div>
    
    )
};