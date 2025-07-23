import { gql } from '@apollo/client';

export const GET_ALL_RESPONSES = gql`
  query GetAllResponses {
    getAllResponses {
      id
      responceText
      likes
      createdAt
      user {
        nicname
      }
    }
  }
`;