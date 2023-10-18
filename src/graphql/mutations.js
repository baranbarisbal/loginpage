import { gql } from "@apollo/client";

export const MY_MUTATION = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      email
      id
      firstName
      lastName
      token
      newUser
      user {
        id
      }
    }
  }
`;
