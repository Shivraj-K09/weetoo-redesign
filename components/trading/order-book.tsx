"use client";

import { useState } from "react";

export function OrderBook() {
  const [activeTab, setActiveTab] = useState("orderBook");

  const orderBookData = {
    buy: [
      { price: "106838.41", amount: "0.015540", total: "6.081260" },
      { price: "106838.22", amount: "0.000230", total: "6.065720" },
      { price: "106837.96", amount: "0.054030", total: "6.065490" },
      { price: "106837.69", amount: "0.065060", total: "6.011460" },
      { price: "106837.68", amount: "0.182550", total: "5.946400" },
      { price: "106837.67", amount: "0.000490", total: "5.763850" },
    ],
    sell: [
      { price: "106837.20", amount: "0.557140", total: "0.557140" },
      { price: "106837.19", amount: "0.000620", total: "0.557760" },
      { price: "106836.74", amount: "0.000060", total: "0.557820" },
      { price: "106836.45", amount: "0.000100", total: "0.557920" },
      { price: "106836.44", amount: "0.031570", total: "0.589490" },
      { price: "106835.77", amount: "0.000230", total: "0.589720" },
    ],
  };

  const recentTradesData = [
    { price: "106837.20", qty: "0.000370", time: "16:21:32" },
    { price: "106837.20", qty: "0.003440", time: "16:21:31" },
    { price: "106837.21", qty: "0.000880", time: "16:21:31" },
    { price: "106837.20", qty: "0.000290", time: "16:21:30" },
    { price: "106837.20", qty: "0.022920", time: "16:21:30" },
    { price: "106837.20", qty: "0.000060", time: "16:21:29" },
    { price: "106837.21", qty: "0.000170", time: "16:21:29" },
    { price: "106837.20", qty: "0.000060", time: "16:21:28" },
    { price: "106837.21", qty: "0.000410", time: "16:21:27" },
    { price: "106837.20", qty: "0.000080", time: "16:21:27" },
    { price: "106837.21", qty: "0.002110", time: "16:21:27" },
    { price: "106837.20", qty: "0.005700", time: "16:21:26" },
    { price: "106837.20", qty: "0.000090", time: "16:21:25" },
    { price: "106837.20", qty: "0.002430", time: "16:21:24" },
    { price: "106837.20", qty: "0.000200", time: "16:21:24" },
    { price: "106837.20", qty: "0.000730", time: "16:21:24" },
    { price: "106837.21", qty: "0.000280", time: "16:21:23" },
    { price: "106837.20", qty: "0.002340", time: "16:21:23" },
    { price: "106837.20", qty: "0.000050", time: "16:21:22" },
    { price: "106837.20", qty: "0.000090", time: "16:21:22" },
    { price: "106837.20", qty: "0.000360", time: "16:21:22" },
    { price: "106837.20", qty: "0.000460", time: "16:21:21" },
    { price: "106837.21", qty: "0.004960", time: "16:21:21" },
    { price: "106837.21", qty: "0.001740", time: "16:21:21" },
    { price: "106837.21", qty: "0.002020", time: "16:21:20" },
    { price: "106837.21", qty: "0.000090", time: "16:21:20" },
    { price: "106837.21", qty: "0.000350", time: "16:21:20" },
    { price: "106837.20", qty: "0.000950", time: "16:21:19" },
    { price: "106837.21", qty: "0.000060", time: "16:21:19" },
    { price: "106837.21", qty: "0.000250", time: "16:21:19" },
    { price: "106837.21", qty: "0.005000", time: "16:21:18" },
  ];

  return (
    <div className="flex flex-col h-full bg-background text-xs">
      <div className="flex border-b border-border justify-between items-center px-2">
        <div className="flex">
          <button
            className={`px-4 py-2 ${
              activeTab === "orderBook"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("orderBook")}
          >
            호가창
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "recentTrades"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("recentTrades")}
          >
            최근거래
          </button>
        </div>

        {activeTab === "orderBook" && (
          <div className="relative">
            <select className="appearance-none bg-secondary border border-border text-foreground py-1 px-2 rounded pr-8">
              <option>0.01</option>
              <option>0.1</option>
              <option>1</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {activeTab === "orderBook" && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="grid grid-cols-3 text-muted-foreground p-2 text-sm border-b border-border">
            <span>Price (USDT)</span>
            <span className="text-right">Amount (BTC)</span>
            <span className="text-right">Total</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
            {orderBookData.buy.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 p-2 hover:bg-muted-foreground/10"
              >
                <span className="text-red-500">{item.price}</span>
                <span className="text-right">{item.amount}</span>
                <span className="text-right">{item.total}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-2 my-1 bg-muted rounded">
              <span className="text-green-500 font-bold">106837.21</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-3 h-3 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                />
              </svg>

              <span className="text-foreground">1687.20</span>
              <span className="text-green-500">(1.60%)</span>
            </div>
            {orderBookData.sell.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 p-2 hover:bg-muted-foreground/10"
              >
                <span className="text-green-500">{item.price}</span>
                <span className="text-right">{item.amount}</span>
                <span className="text-right">{item.total}</span>
              </div>
            ))}
          </div>

          {/* Buy/Sell Ratio Indicator - Fixed at bottom */}
          <div className="sticky bottom-0 left-0 right-0">
            <div className="flex w-full h-3">
              <div className="bg-green-500" style={{ width: "32.94%" }}></div>
              <div className="bg-red-500" style={{ width: "67.06%" }}></div>
            </div>
            <div className="flex justify-between text-muted-foreground text-[13px] mt-2">
              <div className="flex items-center gap-1">
                <span className="text-green-100 flex items-center justify-center aspect-square bg-green-500/50 w-5 h-5">
                  B
                </span>
                <span>32.94%</span>
              </div>
              <div className="flex items-center gap-1">
                <span>67.06%</span>
                <span className="text-red-100 flex items-center justify-center aspect-square bg-red-500/50 w-5 h-5">
                  S
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recentTrades" && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="grid grid-cols-3 text-muted-foreground p-2 text-sm border-b border-border">
            <span>Price (USDT)</span>
            <span className="text-right">Qty (BTC)</span>
            <span className="text-right">Time</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
            {recentTradesData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 p-2 hover:bg-muted-foreground/10"
              >
                <span
                  className={
                    item.price.endsWith("1") ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.price}
                  {item.price.endsWith("1") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3 inline-block ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                  {item.price.endsWith("0") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3 inline-block ml-1 rotate-180"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-right">{item.qty}</span>
                <span className="text-right text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
