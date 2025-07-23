import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      firstName
      secondName
      nicname
      email
      avatarURL
      birthDay
      sex
      role
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      id
      firstName
      secondName
      nicname
      avatarURL
      birthDay
      sex
      email
    }
  }
`;