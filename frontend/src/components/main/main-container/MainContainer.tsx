"use client"

import Card from '@/components/ui/Card'
import React, { useEffect, useState } from 'react'
import { product_type } from '@/components/interface'

const fetchData = async (url: string): Promise<product_type> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('response error');
  }
  const data: product_type = await response.json();
  return data;
};

const url = 'http://localhost:8000/api/products/{id}/download';


const MainContainer = () => {
  const [product, setProduct] = useState<product_type | null>(null);

  useEffect(()=>{
    fetchData(url).then(setProduct).catch(console.error);
  },[]);
  return (
    <div>
      {product && <Card product={product}/>}
    </div>
  )
}

export default MainContainer