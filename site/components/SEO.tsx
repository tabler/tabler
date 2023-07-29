import React from 'react';
import Head from 'next/head';

const SEO = (props) => {
  const { title, description, image } = props;
  return (
    <Head>
      <title>{title} | App</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
    </Head>
  );
};

export default SEO;
