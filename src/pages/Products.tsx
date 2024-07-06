// src/components/Products.tsx

import { useEffect, useState } from 'react';

import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { IProduct } from '@/types/globalTypes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addProduct, setPriceRange, toggleStatus } from '@/redux/features/productSlice';


export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  console.log(products)
  const priceRange = useAppSelector(
    (state) => state.products.priceRange
  );
  // const [data, setData] = useState<IProduct[]>([]);
  const status = useAppSelector((state) => state.products.status);

    // useEffect(() => {
    //   fetch('./data.json')
    //     .then((res) => res.json())
    //     .then((data) => setData(data));
    // }, []);

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  const handleStatusChange = () => {
    dispatch(toggleStatus());
  };

  let productsData = products;

  if (status) {
    productsData = products.filter(
      (item) => item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = products.filter((item) => item.price < priceRange);
  }

  return (
    <div className="grid grid-cols-12 space-x-5 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" onCheckedChange={handleStatusChange} />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[priceRange]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
    </div>
  );
}
