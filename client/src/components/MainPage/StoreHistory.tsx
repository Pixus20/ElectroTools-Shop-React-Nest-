'use client';
import { motion } from 'framer-motion';

export default function StoreHistory() {
  return (
    <motion.div
      className="bg-gray-100 p-6 rounded-lg my-16"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">Історія нашого магазину</h2>
      <p className="text-lg leading-relaxed">
        Все почалося у 2010 році з маленького гаража, де ми продавали перші електродрилі. З роками ми виросли до
        повноцінного магазину, де сьогодні представлено понад 1000 товарів. Наша мета — зробити якісний інструмент
        доступним кожному майстру, незалежно від досвіду.
      </p>
    </motion.div>
  );
}
