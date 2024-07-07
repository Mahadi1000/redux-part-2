// src/components/Products.tsx

import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard';

import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProduct } from '@/redux/features/productSlice';


export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  console.log(products)
 
  const [data, setData] = useState<IProduct[]>([]);
  // const status = useAppSelector((state) => state.products.status);

    useEffect(() => {
      fetch('./data.json')
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);


  return (
    <div className="flex justify-around items-center flex-wrap space-x-5 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  );
}
