import { gql } from "@apollo/client";

export const MY_QUERY = gql`
  query Query($userId: ID, $email: String) {
    User(id: $userId, email: $email) {
      firstName
    }
  }
`;
