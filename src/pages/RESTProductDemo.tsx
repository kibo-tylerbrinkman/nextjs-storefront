import React, { MouseEvent, useEffect, useState } from 'react'

const RESTProductDemo = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductData = async () => {
      const products = await fetch('/api/getProducts')
      const productData = await products.json()

      setProducts(productData.items)
    }
    getProductData()
  }, [products])

  return (
    <>
      {products.length &&
        products.map((p: any) => <li key={p.productCode}>{p.content?.productName}</li>)}
    </>
  )
}
export default RESTProductDemo
