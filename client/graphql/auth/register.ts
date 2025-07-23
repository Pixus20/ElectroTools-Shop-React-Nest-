import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;