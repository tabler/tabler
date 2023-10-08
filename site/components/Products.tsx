'use client';

import { getProductVariants, getProducts, getVariants } from '@/lib/lemon-squeezy';
import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState(null)  


  useEffect(() => {
    fetchProducts()
  }, []);  

  const fetchProducts = async () => {
    //const productVariants = await getProductVariants('111125')
    //console.log(productVariants)

    const products = await getProducts()
    setProducts(products)   
    console.log(products)
    
    // const variants = await getVariants()
    // console.log(variants)
    //console.log(productVariants)
  };  

  return (
    <div>
      {
        products && 
        products.data.map(product => {
          return <div>{product.attributes.name}</div>
        })
      }
    </div>
  );
}

