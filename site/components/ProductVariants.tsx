'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getProductVariants } from '@/lib/lemon-squeezy';
import Icon from '@/components/Icon';
import { useSession } from 'next-auth/react';

export default function ProductVariants({ productId }: { productId: string }) {
  const { data: session } = useSession();
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
  
  const createCheckoutLink = (variantSlug) => {
    const url = new URL(`https://buy.tabler.io/checkout/buy/${variantSlug}?embed=1`)
 
    if (!session?.user) return ''
 
    const email = session?.user?.email
    const name = session?.user?.name
    // const userId = session?.userId
 
    // url.searchParams.append('checkout[custom][user_id]', userId)
    if (email) url.searchParams.append('checkout[email]', email)
    if (name) url.searchParams.append('checkout[name]', name)
 
    return url.toString()
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
              href={createCheckoutLink(variant.attributes.slug)}
              className={clsx('btn btn-block', {
                'btn-primary': isFeatured(variant) || productVariants.data.length === 1
              })}
            >
              Get started
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
