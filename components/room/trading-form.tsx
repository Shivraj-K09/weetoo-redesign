"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export function TradingForm() {
  const [orderType, setOrderType] = useState("limit"); // 'limit' or 'market'
  const [marginMode, setMarginMode] = useState("cross"); // 'cross' or 'isolated'
  const [leverage, setLeverage] = useState(1); // Default leverage
  const [showMarginModal, setShowMarginModal] = useState(false);
  const [showLeverageModal, setShowLeverageModal] = useState(false);
  const [orderPrice, setOrderPrice] = useState("50000");
  const [orderQuantity, setOrderQuantity] = useState("0");

  return (
    <div className="flex flex-col h-full bg-background text-xs text-foreground p-2 overflow-y-auto custom-scrollbar">
      {/* Top Controls: Margin Mode and Leverage */}
      <div className="flex justify-between items-center mb-3">
        <div className="relative w-1/2 pr-1">
          <Button
            variant="secondary"
            onClick={() => setShowMarginModal(true)}
            className="flex items-center justify-between gap-1 py-1.5 px-3 w-full text-xs font-medium"
          >
            Cross <span className="text-muted-foreground">▼</span>
          </Button>
          <Dialog open={showMarginModal} onOpenChange={setShowMarginModal}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Choose Margin Mode</DialogTitle>
                <DialogDescription>
                  Make changes to your margin mode here. Click confirm when
                  you&apso;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <RadioGroup
                  defaultValue={marginMode}
                  onValueChange={(value: "cross" | "isolated") =>
                    setMarginMode(value)
                  }
                  className="flex flex-row space-x-4"
                >
                  <div
                    className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      marginMode === "cross"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                    onClick={() => setMarginMode("cross")}
                  >
                    <RadioGroupItem
                      value="cross"
                      id="cross"
                      className="sr-only"
                    />
                    <Label htmlFor="cross" className="cursor-pointer">
                      Cross
                    </Label>
                  </div>
                  <div
                    className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      marginMode === "isolated"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                    onClick={() => setMarginMode("isolated")}
                  >
                    <RadioGroupItem
                      value="isolated"
                      id="isolated"
                      className="sr-only"
                    />
                    <Label htmlFor="isolated" className="cursor-pointer">
                      Isolated
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                If the loss exceeds the total holding (60%), it will be
                liquidated.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                When changed, all positions and unfilled orders for the current
                item will be affected.
              </p>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setShowMarginModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowMarginModal(false)}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-1/2 pl-1">
          <Button
            variant="secondary"
            onClick={() => setShowLeverageModal(true)}
            className="flex items-center justify-between gap-1 py-1.5 px-3 w-full text-xs font-medium"
          >
            {leverage}x <span className="text-muted-foreground">▼</span>
          </Button>
          <Dialog open={showLeverageModal} onOpenChange={setShowLeverageModal}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Adjust Leverage</DialogTitle>
                <DialogDescription>
                  Make changes to your leverage here. Click confirm when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <label className="block text-sm font-medium text-foreground mb-4">
                  Leverage
                </label>
                <Input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full text-center text-lg mb-4"
                  min="1"
                  max="100"
                />
                <Slider
                  defaultValue={[leverage]}
                  max={100}
                  step={1}
                  onValueChange={(value: number[]) => setLeverage(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-muted-foreground text-xs mt-2">
                  <span>1x</span>
                  <span>10x</span>
                  <span>20x</span>
                  <span>30x</span>
                  <span>40x</span>
                  <span>50x</span>
                  <span>60x</span>
                  <span>70x</span>
                  <span>80x</span>
                  <span>100x</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                It can be multiplied by up to x50 by default, and can be
                multiplied by x100 when using items.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Add or subtract the quantity ratio that can be ordered based on
                the amount held.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                When changed, all positions and unfilled orders for the current
                item will be affected.
              </p>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setShowLeverageModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowLeverageModal(false)}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Order Type Tabs */}
      <div className="flex border-b border-border mb-3">
        <button
          className={`px-4 py-2 text-xs font-medium ${
            orderType === "limit"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setOrderType("limit")}
        >
          Limit
        </button>
        <button
          className={`px-4 py-2 text-xs font-medium ${
            orderType === "market"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground"
          }`}
          onClick={() => setOrderType("market")}
        >
          Market
        </button>
      </div>

      {/* Order Inputs */}
      <div className="flex flex-col gap-3 mb-3">
        <div>
          <label className="block text-muted-foreground mb-1 text-xs">
            {orderType === "limit" ? "Price (USDT)" : "Price (USDT)"}
          </label>
          <div className="flex items-center bg-secondary border border-border rounded-md px-3 py-1.5">
            <Input
              type={orderType === "limit" ? "number" : "text"}
              value={orderType === "limit" ? orderPrice : "Market Price"}
              onChange={(e) => setOrderPrice(e.target.value)}
              readOnly={orderType === "market"}
              className="w-full bg-transparent border-0 p-0 h-6 text-xs focus-visible:ring-0"
            />
            <span className="text-muted-foreground text-xs">USDT</span>
          </div>
        </div>

        <div>
          <label className="block text-muted-foreground mb-1 text-xs">
            {orderType === "limit"
              ? "Quantity (BTCUSDT)"
              : "Quantity (BTCUSDT)"}
          </label>
          <div className="flex items-center bg-secondary border border-border rounded-md px-3 py-1.5">
            <Input
              type="number"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              className="w-full bg-transparent border-0 p-0 h-6 text-xs focus-visible:ring-0"
            />
            <span className="text-muted-foreground text-xs">BTCUSDT</span>
          </div>
        </div>

        {orderType === "limit" && (
          <div>
            <label className="block text-muted-foreground mb-1 text-xs">
              Amount (USDT)
            </label>
            <div className="flex items-center bg-secondary border border-border rounded-md px-3 py-1.5">
              <Input
                type="number"
                defaultValue="0"
                className="w-full bg-transparent border-0 p-0 h-6 text-xs focus-visible:ring-0"
              />
              <span className="text-muted-foreground text-xs">USDT</span>
            </div>
          </div>
        )}
      </div>

      {/* Percentage Buttons */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {[10, 25, 50, 75, 100].map((percent) => (
          <Button
            key={percent}
            variant="outline"
            size="sm"
            className="w-full text-xs py-1 h-7"
          >
            {percent}%
          </Button>
        ))}
      </div>

      {/* Trading Info */}
      <div className="flex flex-col gap-1.5 mb-3 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Fee:</span>
          <span>0.05%</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Leverage:</span>
          <span>{leverage}x</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Position Size (BTCUSDT):</span>
          <span>0.000000</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Initial Margin (USDT):</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Liquidation (Long):</span>
          <span className="text-red-500">30000.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Liquidation (Short):</span>
          <span className="text-green-500">70000.00</span>
        </div>
      </div>

      {/* Account Summary */}
      <div className="flex flex-col gap-1.5 mb-3 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Total Asset Value (USDT):</span>
          <span>100000.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Total Balance (USDT):</span>
          <span>100000.00</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Available Balance (USDT):</span>
          <span>99000.00</span>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-background pt-2 mt-auto border-t border-border">
        <div className="flex gap-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9 text-xs font-medium">
            Buy / Long
          </Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white h-9 text-xs font-medium">
            Sell / Short
          </Button>
        </div>
      </div>
    </div>
  );
}
