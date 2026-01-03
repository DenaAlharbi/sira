import React from 'react';

function CardPreview() {
  return (
    <div className="border rounded-sm p-4 bg-white shadow-sm w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Card</span>
        <span className="text-sm font-mono text-gray-500">Visa</span>
      </div>
      <div className="h-6 bg-gray-200 rounded mb-2" />
      <div className="flex items-center justify-between">
        <div className="w-20 h-4 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default function PaymentStage({ onComplete, onClose }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="text-lg font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>
        Payment Required
      </div>
      <p className="text-sm text-gray-600 text-center max-w-md">
        This is a mock Stripe-style payment flow. Enter a card to continue.
      </p>

      <CardPreview />

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded border border-gray-200 text-sm" onClick={onClose}>Cancel</button>
        <button className="px-6 py-2 rounded bg-[#FB923C] text-white text-sm" onClick={onComplete}>Pay $0.00</button>
      </div>

      <div className="mt-6 w-full max-w-md text-xs text-gray-500 text-center">
        This is a simulated flow to illustrate the UI transitions and state management.
      </div>
    </div>
  );
}
