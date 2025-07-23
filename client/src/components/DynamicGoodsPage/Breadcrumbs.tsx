"use client"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';

interface BasicBreadcrumbsProps {
  productTitle: string;
}

export default function BasicBreadcrumbs({ productTitle }: BasicBreadcrumbsProps) {
  return (
   <div className='max-w-[1280px] mx-auto'>
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <NextLink href="/" passHref>
          <p>Головна</p>
        </NextLink>
        <Typography sx={{ color: 'text.primary' }}>
          {productTitle}
        </Typography>
      </Breadcrumbs>
    </div>
   </div>
  );
}