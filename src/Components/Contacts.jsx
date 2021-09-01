import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'   
import { useQuery} from "@apollo/client";
import { GET_CONTACTS } from "../Graphql/Queries";

export default function Contacts({userId}) {
  const [contacts, setContacts] = useState([]); 
  const {loading, data } = useQuery(GET_CONTACTS,{ variables:{id:parseInt(userId)}});

  useEffect(() => {
    if (data) {
      console.log(data.user.contacts)
      setContacts(data.user.contacts);
    }
  }, [data]);


return (
  <div>
    <h1>Bienvenido</h1>
    {userId}
  </div>
)};