import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      success
      orderId
      message
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query OrdersByStatus($statuses: [OrderStatus!]!) {
    ordersByStatus(statuses: $statuses) {
      id
      status
      amount
      quantity
      orderId
      createdAt
      user {
        firstName
        email
      }
      product {
        name
      }
    }
  }
`;


export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: Int!) {
    order(id: $id) {
      id
      orderId
      status
      amount
      quantity
      createdAt
      user {
        firstName
        email
      }
      product {
        name
        description
      }
    }
  }
`;