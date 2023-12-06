import prisma from '@/lib/prisma'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'

const ls = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY as string)

export const dynamic = 'force-dynamic' // Don't cache API results

async function getPlans() {

  const params = { include: ['product'] as Array<'product' | 'files'>, perPage: 50 }

  let hasNextPage = true;
  let page = 1;

  let variants = [] as {}[]
  let products = [] as Record<string, any>

  while (hasNextPage) {
    const resp = await ls.getVariants(params);
    
    variants = variants.concat(resp['data'])
    products = products.concat(resp['included'])

    if (resp['meta']['page']['lastPage'] > page) {
      page += 1
      params['page'] = page
    } else {
      hasNextPage = false
    }
  }

  // Nest products inside variants
  const prods = {};
  for (let i = 0; i < products.length; i++) {
    prods[products[i]['id']] = products[i]['attributes']
  }
  for (let i = 0; i < variants.length; i++) {
    variants[i]['product'] = prods[variants[i]['attributes']['product_id']]
  }

  // Save locally
  let variantId,
      variant,
      product,
      productId

  for (let i = 0; i < variants.length; i++) {

    variant = variants[i]

    if ( !variant['attributes']['is_subscription'] ) {
      console.log('Not a subscription')
      continue
    }

    if ( String(variant['product']['store_id']) !== process.env.LEMON_SQUEEZY_STORE_ID ) {
      console.log(`Store ID ${variant['product']['store_id']} does not match (${process.env.LEMON_SQUEEZY_STORE_ID})`)
      continue
    }

    variantId = parseInt(variant['id'])
    product = variant['product']
    productId = parseInt(variant['attributes']['product_id'])

    // Get variant's Price objects
    let prices = await ls.getPrices({ variantId: variantId, perPage: 100 })
    // The first object is the latest/current price
    let variant_price = prices['data'][0]['attributes']['unit_price']
    variant = variant['attributes']

    const updateData = {
      productId: productId,
      name: product['name'],
      variantName: variant['name'],
      status: variant['status'],
      sort: variant['sort'],
      description: variant['description'],
      price: variant_price, // display price in the app matches current Price object in LS
      interval: variant['interval'],
      intervalCount: variant['interval_count'],
    }
    const createData = { ...updateData, variantId}

    try {
      await prisma.plan.upsert({
        where: {
          variantId: variantId
        },
        update: updateData,
        create: createData
      })
    } catch (error) {
      console.log(variant)
      console.log(error)
    }
  }
}

export default async function Page() {
  await getPlans()
  
  return (
    <p>
      Done!
    </p>
  )
}