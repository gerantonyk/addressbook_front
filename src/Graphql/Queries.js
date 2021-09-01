import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const GET_CONTACTS = gql`
query user($id: Int) {
  user(id: $id) {
    contacts {
      id,
      name,
      lastname,
      email,
      address,
      phone,
      birthday 
    }
  }
}
`;

export const GET_CONTACT = gql`
query contact($id:Int!) {
  contact(id:$id) {
    id,
    name,
    lastname,
    address,
    email,
    phone,
    birthday,
    address
  }
}
`;