import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    product(id: $id) {
      id
      name
      imgURL
      shortDescr
      fullDescr
      price
      category
      color
      season
      quantity
      createdAt
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      imgURL
      color
      price
      season
    }
  }
`;

