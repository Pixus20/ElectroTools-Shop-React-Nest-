'use client';
import { motion } from 'framer-motion';
import { DollarSign, ShieldCheck, Wrench } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <motion.div
      className="my-16 px-6 bg-orange-500 text-white py-12 rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-10">Чому обирають нас</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Wrench className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold flex items-center gap-2">Широкий асортимент</h3>
          <p className="mt-2">У нас є все — від побутових дрилів до професійних перфораторів.</p>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold flex items-center gap-2">Гарантія та сервіс</h3>
          <p className="mt-2">Офіційна гарантія на всю продукцію та швидке обслуговування.</p>
        </div>
        <div className="flex flex-col items-center">
          <DollarSign className="w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold flex items-center gap-2">Низькі ціни</h3>
          <p className="mt-2">Працюємо напряму з виробниками — без зайвих націнок.</p>
        </div>
      </div>
    </motion.div>
  );
}
