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

// export const GET_CONTACTS = gql`
// query {
//   user(id:3) {
//     contacts {
//       id,
//       name,
//       lastname,
//       address,
//       phone,
//       birthday 
//     }
//   }
// }
// `;


export const GET_CONTACTS = gql`
query user($id: Int) {
  user(id: $id) {
    contacts {
      id,
      name,
      lastname,
      address,
      phone,
      birthday 
    }
  }
}
`;