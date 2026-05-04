import React from 'react'
import { product_type } from '../interface'
type Props = {
  product: product_type;
}
const Card = ({ product }: Props) => {
  return (
    <div>
      <img src={product.image} alt="" />
      <h2>{product.id}</h2>
      <p>{product.discription}</p>
    </div>
  )
}

export default Card