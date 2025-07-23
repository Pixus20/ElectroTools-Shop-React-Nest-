import { gql } from "@apollo/client";

export const GET_AVERAGE_RATING = gql`
  query GetAverageRating($productId: Int!) {
    getAverageRating(productId: $productId) {
      average
      count
    }
  }
`;