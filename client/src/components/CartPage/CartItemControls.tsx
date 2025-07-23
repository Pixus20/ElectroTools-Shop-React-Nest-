'use client';

import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
  productId: number;
}

export default function CartItemControls({ productId }: Props) {
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const remove = useCartStore((state) => state.removeItem);

  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    await remove(productId);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={() => decrease(productId)}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={() => increase(productId)}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
      >
        <Plus size={16} />
      </button>
      <button
        onClick={handleRemove}
        disabled={loading}
        className={`ml-4 text-red-500 hover:text-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Trash size={18} />
      </button>
    </div>
  );
}
