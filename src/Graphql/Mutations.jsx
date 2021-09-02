import { gql } from "@apollo/client";

export const DELETE_CONTACT= gql`
mutation DeleteContact($id: Int!) {
  deleteContact(id: $id) {
    name
  }
}
`;

// export const MODIFY_CONTACT= gql`
// mutation updateContact($id: Int!,$data:{}) {
//   updateContact($id: $id,data:$data) {
//     name
//   }
// }
// `;

export const UPDATE_CONTACT= gql`
mutation updateContact($id: Int!,$data:ContactCreateInput!)  {
  updateContact(id: $id, data:$data) {
    name
  }
}
`;

export const CREATE_CONTACT= gql`
mutation createContact($id: Int!,$data:ContactCreateInput!)  {
  createContact(id: $id, data:$data) {
    name
  }
}
`;