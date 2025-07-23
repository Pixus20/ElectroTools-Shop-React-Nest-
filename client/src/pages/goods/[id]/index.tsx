import DymanicMain from '@/components/DynamicGoodsPage/DynamicMain';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../../../../graphql/product/getProductById';
import { client } from '../../../../lib/apolloClient';


export default function GoodsByID({ product }: { product: any }) {
  return <DymanicMain product={product} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_ALL_PRODUCTS });

  const paths = data.products.map((product: { id: number }) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const { data } = await client.query({
      query: GET_PRODUCT_BY_ID,
      variables: { id: parseInt(id) },
      context: {
        headers: {
          'x-apollo-operation-name': 'GetProductById',
        },
      },
    });

    if (!data || !data.product) {
      return { notFound: true };
    }

    return {
      props: {
        product: data.product,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { notFound: true };
  }
};
