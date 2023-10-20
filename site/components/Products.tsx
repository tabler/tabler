'use client';

import { getProducts } from '@/lib/lemon-squeezy';
import { useState, useEffect } from 'react';
import ProductVariants from './ProductVariants';

export default function Products() {
  const [products, setProducts] = useState<any>(null)  

  useEffect(() => {
    fetchProducts()
  }, []);  

  const fetchProducts = async () => {
    const products = await getProducts()
    setProducts(products)   
  };

  const formatLemonProductDescription = (description: string) => {
    if (!description) return;
    return description
      .replaceAll('<p>','')
      .replaceAll('</p>','')
  }    

  return (<>{
    products && 
    products.data.map(product => {
      return <section key={product.id} className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="page-title">{product.attributes.name}</h2>
            <p className="section-description">
              {formatLemonProductDescription(product.attributes.description)}
            </p>
          </div>

          <ProductVariants productId={product.id}/>
        </div>
      </section>
    })
  }</>);
}

