// 'use client';

// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import Skeleton from '@mui/joy/Skeleton';
// import Typography from '@mui/joy/Typography';

// interface CommentProps {
//   authorName: string;
//   text: string;
//   isLoading: boolean;
// }

// export default function Comment({ authorName, text, isLoading }: CommentProps) {
//   if (isLoading) {
//     return (
//       <Card variant="outlined" sx={{ width: 'max(400px, 60%)', borderRadius: 0 }}>
//         <CardContent orientation="horizontal">
//           <Skeleton variant="rectangular" width={44} height={44} />
//           <div>
//             <Skeleton variant="text" width={100} />
//             <Skeleton level="body-sm" variant="text" width={200} />
//           </div>
//         </CardContent>
//         <CardContent sx={{ gap: 0.5, mt: 1 }}>
//           <Skeleton level="body-xs" variant="text" width="92%" />
//           <Skeleton level="body-xs" variant="text" width="99%" />
//           <Skeleton level="body-xs" variant="text" width="96%" />
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card variant="outlined"  sx={{ width: 'max(300px, 60%)', borderRadius: 0,  }}>
//       <CardContent orientation="horizontal">
//         <div className="w-11 h-11 rounded-full bg-gray-300" />
//         <div className="ml-3">
//           <Typography level="title-md">{authorName}</Typography>
//           <Typography level="body-sm">{text}</Typography>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




'use client';

import { gql, useQuery } from '@apollo/client';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

const GET_COMMENTS_BY_PRODUCT_ID = gql`
query GetComments($productId: Int!) {
  getResponsesByProductId(productId: $productId) {
    id
    responceText
    createdAt
    likes
    user {
      nicname
    }
  }
}
`;

interface CommentItem {
  id: number;
  responceText: string;
  user: {
    nicname: string;
  };
}

interface CommentProps {
  authorName: string;
  text: string;
  isLoading: boolean;
}

function Comment({ authorName, text, isLoading }: CommentProps) {
  if (isLoading) {
    return (
      <Card variant="outlined" sx={{ width: 'max(400px, 60%)', borderRadius: 0 }}>
        <CardContent orientation="horizontal">
          <Skeleton variant="rectangular" width={44} height={44} />
          <div>
            <Skeleton variant="text" width={100} />
            <Skeleton level="body-sm" variant="text" width={200} />
          </div>
        </CardContent>
        <CardContent sx={{ gap: 0.5, mt: 1 }}>
          <Skeleton level="body-xs" variant="text" width="92%" />
          <Skeleton level="body-xs" variant="text" width="99%" />
          <Skeleton level="body-xs" variant="text" width="96%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={{ width: 'max(300px, 60%)', borderRadius: 0 }}>
      <CardContent orientation="horizontal">
        <div className="w-11 h-11 rounded-full bg-gray-300" />
        <div className="ml-3">
          <Typography level="title-md">{authorName}</Typography>
          <Typography level="body-sm">{text}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

interface Props {
  productId: number;
}

export default function CommentList({ productId }: Props) {
  const { data, loading, error } = useQuery(GET_COMMENTS_BY_PRODUCT_ID, {
    variables: { productId },
  });

  if (loading) {
    return (
      <>
        <Comment authorName="" text="" isLoading />
        <Comment authorName="" text="" isLoading />
      </>
    );
  }

  if (error) return <p>Помилка завантаження коментарів: {error.message}</p>;

  const comments: CommentItem[] = data?.getResponsesByProductId || [];

  return (
    <div className="flex flex-col gap-4 mt-6">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          authorName={comment.user.nicname}
          text={comment.responceText}
          isLoading={false}
        />
      ))}
    </div>
  );
}
