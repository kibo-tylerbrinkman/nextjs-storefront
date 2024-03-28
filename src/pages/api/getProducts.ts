import getConfig from 'next/config'

import { RESTFetch } from '@/lib/api/util/fetch-gql'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await RESTFetch('api/commerce/catalog/storefront/products', 'GET')

    res.status(200).json({ items: products?.items })
  } catch (error) {
    console.error(error)
    const message = 'An unexpected error ocurred'
    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
