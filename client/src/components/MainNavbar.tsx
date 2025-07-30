
'use client';

import CartModal from '@/components/CartPage/CartModal';
import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginDrawer from './UserPage/LoginModal';
import RegisterDrawer from './UserPage/RegisterModal';

export default function MainNavbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Auth store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthFromStorage = useAuthStore((state) => state.setAuthFromStorage);

  // Auth modal store
  const { isLoginOpen, isRegisterOpen, openLogin, closeAll } = useAuthModalStore();

  // Cart store
  const items = useCartStore((state) => state.items);
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const router = useRouter();

  // Витягуємо auth з localStorage
  useEffect(() => {
    setAuthFromStorage();
  }, [setAuthFromStorage]);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/user');
    } else {
      openLogin();
    }
  };

  return (
    <>
      <nav className="flex w-full justify-between p-3">
        <div className="uppercase flex gap-6">
          <Link href="/" className="hover:text-zinc-700 transition-all">LOGO</Link>
          <Link href="/goods" className="hover:text-zinc-700 transition-all">Товари</Link>
          <Link href="/about" className="hover:text-zinc-700 transition-all">Про нас</Link>
        </div>

        <div className="flex relative gap-5">
          <button
            onClick={handleClick}
            className={`hover:text-zinc-700 transition-all relative z-10 ${
              isAuthenticated ? 'text-orange-500' : 'text-gray-700'
            }`}
          >
            <User2Icon />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-zinc-700 transition-all"
          >
            <ShoppingCart />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Модальні вікна */}
        {isLoginOpen && <LoginDrawer open={isLoginOpen} onClose={closeAll} />}
        {isRegisterOpen && <RegisterDrawer open={isRegisterOpen} onClose={closeAll} />}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </nav>
    </>
  );
}
