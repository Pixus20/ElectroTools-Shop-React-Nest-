'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="mx-auto">
      <Header />
      <motion.main
        className="p-4 min-h-screen bg-amber-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
