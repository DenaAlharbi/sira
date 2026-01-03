import React from 'react';
import { motion } from 'framer-motion';

export default function TemplateCard({ template, onOpen }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: '0 6px 18px rgba(0,0,0,.08)' }}
      whileTap={{ scale: 0.98 }}
      className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden cursor-pointer hover:shadow"
      onClick={onOpen}
    >
      <div className={`h-40 w-full ${template.color} flex items-end`}>
        {/* Placeholder image area with gradient background */}
        <div className="p-4 w-full bg-black/20 text-white font-semibold" style={{ backdropFilter: 'blur(0.5px)' }}>
          {template.title}
        </div>
      </div>
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full border border-gray-200" style={{ color: '#4C1D95' }}>
          {template.category}
        </span>
        <p className="mt-2 text-sm font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>
          {template.title}
        </p>
      </div>
    </motion.div>
  );
}
