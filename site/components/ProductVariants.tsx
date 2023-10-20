'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getProductVariants } from '@/lib/lemon-squeezy';
import Icon from '@/components/Icon';

export default function ProductVariants({ productId }: { productId: string }) {
  const [productVariants, setProductVariants] = useState<any>(null)  

  useEffect(() => {
    fetchProductsVariants(productId)
  }, []);  

  const fetchProductsVariants = async (productId: string) => {
    const productVariants = await getProductVariants(productId)
    setProductVariants(productVariants)
  };

  const formatLemonPrice = (price: number) => {
    const priceString = price.toString();
    const dollars = priceString.substring(0, priceString.length-2);
    const cents = priceString.substring(priceString.length-2);
    if (cents === '00') return dollars;
    return `${dollars}.${cents}`;
  }

  const formatLemonVariantDescription = (description: string) => {
    if (!description) return;
    const pricingFeatures = description
      .replaceAll('<p>','')
      .replaceAll('</p>','')
      .split('<br>')
    return <ul className="pricing-features">
      {
        pricingFeatures.map((pricingFeature) => (
          <li key={pricingFeature}>
            <Icon name="check" className="text-green mr-2" />
            {pricingFeature}
          </li>
        ))
      }
    </ul>
  }  

  const isFeatured = (variant) => {
    return variant.attributes.interval === 'year' && variant.attributes.is_subscription
  }   
  
  const handleVariantPick = (id) => {
    console.log(id)
  }  
  
  return (
    <div className="pricing">
      {
      productVariants &&
      productVariants.data.map(variant => (
        <div key={variant.id} className={clsx('pricing-card', { featured: isFeatured(variant) })}>
          {
            isFeatured(variant) &&
            <div className="pricing-label">
              <div className="label label-primary label-sm">Popular</div>
            </div>
          }

          <h4 className="pricing-title">{variant.attributes.name}</h4>

          <div className="pricing-price">
            <span className="pricing-price-currency">$</span>
            { formatLemonPrice(variant.attributes.price) }
            {
              variant.attributes.is_subscription &&
              <div className="pricing-price-description">
                <div>per {variant.attributes.interval}</div>
              </div>
            }
          </div>

          {formatLemonVariantDescription(variant.attributes.description)}

          <div className="pricing-btn">
            <a
              href="#"
              className={clsx('btn btn-block', {
                'btn-primary': isFeatured(variant) || productVariants.data.length === 1
              })}
              onClick={() => handleVariantPick(variant.id)}
            >
              Get started
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
