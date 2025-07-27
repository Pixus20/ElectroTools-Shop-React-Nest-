import { gql } from '@apollo/client';

export const GET_CART = gql`
  query GetCartItems {
    cartItems {
      id
      quantity
      product {
        id
        name
        price
        imgURL
      }
    }
  }
`;


export const ADD_TO_CART = gql`
mutation AddToCart($productId: Int!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
    product {
      id
      name
      price
    }
    quantity
  }
}
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: Int!) {
    removeFromCart(productId: $productId)
  }
`;


export const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity($productId: Int!, $quantity: Int!) {
    updateCartQuantity(productId: $productId, quantity: $quantity) {
      id
      quantity
      product {
        name
      }
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;