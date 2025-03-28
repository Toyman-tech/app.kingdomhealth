"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface TransactionDetailsProps {
  amount: number;
  status: string;
  dateTime: string;
  name: string;
  accountNumber: string;
  bank: string;
  transactionId: string;
}

export default function TransactionDetails({
  amount,
  status,
  dateTime,
  name,
  accountNumber,
  bank,
  transactionId,
}: TransactionDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg max-w-md w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">Transaction Details</h2>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold mb-2">${amount}</div>
        <span className="bg-[#E8FFF7] text-[#00B087] px-3 py-1 rounded-full text-sm">
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Date & Time</span>
          <span className="font-medium">{dateTime}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Name</span>
          <span className="font-medium">{name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Account Number</span>
          <span className="font-medium">{accountNumber}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Bank</span>
          <span className="font-medium">{bank}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Transaction ID</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{transactionId}</span>
            <button
              onClick={() => copyToClipboard(transactionId)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}