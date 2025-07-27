'use client';

import { useCartStore } from '@/store/useCartStore';
import { useMutation } from '@apollo/client';
import { Minus, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, } from '../../../graphql/cart/getCart';

interface Props {
  productId: number;
}

export default function CartItemControls({ productId }: Props) {
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);
  const remove = useCartStore((state) => state.removeItem);
  const quantity = useCartStore((state) =>
    state.items.find((item) => item.productId === productId)?.quantity || 0
  );

  const [updateCartItem] = useMutation(UPDATE_CART_QUANTITY);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    const newQty = quantity + 1;
    increase(productId);
    await updateCartItem({ variables: { productId, quantity: newQty } });
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return handleRemove();
    const newQty = quantity - 1;
    decrease(productId);
    await updateCartItem({ variables: { productId, quantity: newQty } });
  };

  const handleRemove = async () => {
    setLoading(true);
    remove(productId);
    await removeFromCart({ variables: { productId } });
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
        disabled={loading}
      >
        <Minus size={16} />
      </button>

      <span className="min-w-[24px] text-center">{quantity}</span>

      <button
        onClick={handleIncrease}
        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
        disabled={loading}
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

