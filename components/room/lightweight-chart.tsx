import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  CandlestickData,
  CandlestickSeries,
  IPriceLine,
  MouseEventParams,
  Time,
} from "lightweight-charts";

interface OpenPosition {
  id: string;
  symbol: string;
  side: string;
  quantity: number;
  entry_price: number;
  initial_margin?: number;
  stop_loss?: number;
  take_profit?: number;
  entry_time?: number; // Add entry time for positioning
}

interface LightweightChartProps {
  candles: CandlestickData[];
  theme?: "light" | "dark";
  symbol: string;
  openPositions?: OpenPosition[];
  ticker?: {
    lastPrice: string;
    priceChange: string;
    priceChangePercent: string;
  };
}

const LightweightChart: React.FC<LightweightChartProps> = ({
  candles,
  theme = "light",
  symbol,
  openPositions = [],
  ticker,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ReturnType<IChartApi["addSeries"]> | null>(null);
  const priceLinesRef = useRef<IPriceLine[]>([]);
  const [hoveredPosition, setHoveredPosition] = useState<OpenPosition | null>(
    null
  );
  const [markerCoords, setMarkerCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  // Find the latest close price for live PNL
  useEffect(() => {
    if (candles && candles.length > 0) {
      setLatestPrice(candles[candles.length - 1].close);
    }
  }, [candles]);

  // Initialize chart (only runs once)
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: theme === "dark" ? "#0a0a0a" : "#fff" },
        textColor: theme === "dark" ? "#fff" : "#0a0a0a",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#333" : "#eee" },
        horzLines: { color: theme === "dark" ? "#333" : "#eee" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: "#444",
        shiftVisibleRangeOnNewBar: false, // Prevent auto-snap on update
      },
      rightPriceScale: { borderColor: "#444" },
      crosshair: {
        mode: 0, // Normal mode
      },
    });

    // Candlestick color options for dark trading style
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a", // green-600
      downColor: "#dc2626", // red-600
      borderUpColor: "#16a34a",
      borderDownColor: "#dc2626",
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
      borderVisible: false,
    });
    candleSeries.setData(candles);
    chart.timeScale().applyOptions({ barSpacing: 5 });
    seriesRef.current = candleSeries;

    // Responsive resize
    const handleResize = () => {
      if (container) {
        chart.resize(container.clientWidth, container.clientHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    chartRef.current = chart;

    return () => {
      window.removeEventListener("resize", handleResize);
      // Remove price lines
      if (seriesRef.current) {
        priceLinesRef.current.forEach((line) => {
          try {
            if (seriesRef.current) {
              seriesRef.current.removePriceLine(line);
            }
          } catch (error) {
            console.log("Error removing price line:", error);
          }
        });
      }
      chart.remove();
    };
  }, [theme]); // Only depend on theme for chart creation

  // Update candles data (preserves visible range)
  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;
    const chart = chartRef.current;
    const candleSeries = seriesRef.current;
    const timeScale = chart.timeScale();

    // Save current visible range
    const savedRange = timeScale.getVisibleLogicalRange();

    // Update data
    candleSeries.setData(candles);

    // Restore visible range to prevent snapping
    if (savedRange) {
      timeScale.setVisibleLogicalRange(savedRange);
    }
  }, [candles]);

  // Update position indicators (preserves visible range)
  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;
    const chart = chartRef.current;
    const candleSeries = seriesRef.current;
    const timeScale = chart.timeScale();

    // Debug: Log when openPositions changes
    console.log(
      "Chart: openPositions updated:",
      openPositions?.length,
      "positions"
    );

    // Save current visible range
    const savedRange = timeScale.getVisibleLogicalRange();

    // Remove old price lines
    if (seriesRef.current) {
      priceLinesRef.current.forEach((line) => {
        try {
          if (seriesRef.current) {
            seriesRef.current.removePriceLine(line);
          }
        } catch (error) {
          console.log("Error removing price line:", error);
        }
      });
    }

    // Clear the price lines ref
    priceLinesRef.current = [];

    // Create new position indicators
    const newPriceLines: IPriceLine[] = [];
    if (openPositions && openPositions.length > 0) {
      console.log(
        "Creating price lines for",
        openPositions.length,
        "positions"
      );
      openPositions.forEach((pos) => {
        const isLong = (pos.side ?? "").toLowerCase() === "long";
        const color = isLong ? "#16a34a" : "#dc2626";

        // Create a price line at the entry price with a distinctive style
        const pnl = calculatePNL(pos);
        const pnlText = pnl >= 0 ? `+$${pnl.toFixed(2)}` : `$${pnl.toFixed(2)}`;
        const priceLine = candleSeries.createPriceLine({
          price: pos.entry_price,
          color: color,
          lineWidth: 2,
          lineStyle: 1, // Dashed line
          axisLabelVisible: true,
          title: `${isLong ? "LONG" : "SHORT"} ${pos.quantity}\n${pnlText}`,
        });

        newPriceLines.push(priceLine);
      });
    } else {
      console.log("No open positions, not creating any position price lines");
    }

    // Add current price line if ticker data is available and no open position at that price
    if (
      ticker &&
      ticker.lastPrice &&
      !openPositions.some(
        (pos) => Math.abs(pos.entry_price - parseFloat(ticker.lastPrice)) < 0.01
      )
    ) {
      const currentPrice = parseFloat(ticker.lastPrice);
      // Use the exact same color logic as order-book.tsx
      const priceChange = parseFloat(ticker.priceChange);
      const currentPriceColor = priceChange >= 0 ? "#16a34a" : "#dc2626";

      const currentPriceLine = candleSeries.createPriceLine({
        price: currentPrice,
        color: currentPriceColor,
        lineWidth: 1,
        lineStyle: 0, // Solid line
        axisLabelVisible: false, // Hide the label
        title: "", // No title
      });

      newPriceLines.push(currentPriceLine);
    }

    // Update price lines ref with all lines (positions + current price)
    priceLinesRef.current = newPriceLines;

    // Restore visible range to prevent snapping
    if (savedRange) {
      timeScale.setVisibleLogicalRange(savedRange);
    }
  }, [openPositions, latestPrice, ticker]); // Update when price changes for real-time PNL

  // Handle position hover for tooltips
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;

    const handleMouseMove = (param: MouseEventParams<Time>) => {
      if (!param.time || !openPositions.length || !param.point) {
        // Clear tooltip if no positions or no time or no point
        setHoveredPosition(null);
        setMarkerCoords(null);
        return;
      }

      // Check if mouse is near any position
      const timeScale = chart.timeScale();

      openPositions.forEach((pos) => {
        const timeCoord = timeScale.timeToCoordinate(param.time!);

        if (timeCoord !== null) {
          const mouseX = param.point!.x;
          const mouseY = param.point!.y;

          // Try to get the price for the hovered series
          let currentPrice: number | undefined = undefined;
          type SeriesPricesMap = Map<
            ReturnType<IChartApi["addSeries"]>,
            number
          >;
          if (
            typeof param === "object" &&
            param !== null &&
            "seriesPrices" in param &&
            (param as { seriesPrices?: unknown }).seriesPrices instanceof Map &&
            seriesRef.current
          ) {
            currentPrice = (
              param as { seriesPrices: SeriesPricesMap }
            ).seriesPrices.get(seriesRef.current);
          } else if (
            "price" in param &&
            typeof (param as { price?: number }).price === "number"
          ) {
            currentPrice = (param as { price: number }).price;
          }
          if (currentPrice && Math.abs(currentPrice - pos.entry_price) < 100) {
            if (Math.abs(mouseX - timeCoord) < 50) {
              setHoveredPosition(pos);
              setMarkerCoords({ x: mouseX, y: mouseY });
              return;
            }
          }
        }
      });

      // If not near any position, hide tooltip
      setHoveredPosition(null);
      setMarkerCoords(null);
    };

    chart.subscribeCrosshairMove(handleMouseMove);

    return () => {
      chart.unsubscribeCrosshairMove(handleMouseMove);
    };
  }, [openPositions]);

  // Clear tooltip when no open positions
  useEffect(() => {
    if (!openPositions || openPositions.length === 0) {
      setHoveredPosition(null);
      setMarkerCoords(null);
    }
  }, [openPositions]);

  // Clear tooltip if hoveredPosition is no longer present in openPositions
  useEffect(() => {
    if (
      hoveredPosition &&
      !openPositions.some((pos) => pos.id === hoveredPosition.id)
    ) {
      setHoveredPosition(null);
      setMarkerCoords(null);
    }
  }, [openPositions, hoveredPosition]);

  // Calculate live PNL
  const calculatePNL = (position: OpenPosition) => {
    if (!latestPrice) return 0;
    const isLong = (position.side ?? "").toLowerCase() === "long";
    const priceDiff = latestPrice - position.entry_price;
    return isLong
      ? priceDiff * position.quantity
      : -priceDiff * position.quantity;
  };

  return (
    <div className="relative w-full h-full bg-background">
      <div className="absolute top-2 left-2 z-20 px-6 py-2 rounded-none bg-background border border-border flex items-center pointer-events-none select-none">
        <span className="text-sm font-semibold tracking-widest text-foreground uppercase">
          {symbol}
        </span>
      </div>

      {/* Position Tooltip */}
      {hoveredPosition &&
        markerCoords &&
        openPositions.some((pos) => pos.id === hoveredPosition.id) && (
          <div
            className="absolute z-30 bg-background border border-border shadow-lg rounded-lg p-3 pointer-events-none"
            style={{
              left: markerCoords.x + 10,
              top: markerCoords.y - 60,
              minWidth: "200px",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  (hoveredPosition.side ?? "").toLowerCase() === "long"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              <span className="font-semibold text-sm">
                {(hoveredPosition.side ?? "").toUpperCase()}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Position:</span>
                <span className="font-medium">
                  {(hoveredPosition.side ?? "").toUpperCase()}{" "}
                  {hoveredPosition.quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entry Price:</span>
                <span className="font-medium">
                  ${hoveredPosition.entry_price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Price:</span>
                <span className="font-medium">${latestPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Live PNL:</span>
                <span
                  className={`font-medium ${
                    calculatePNL(hoveredPosition) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {calculatePNL(hoveredPosition) >= 0 ? "+" : ""}$
                  {calculatePNL(hoveredPosition).toFixed(2)}
                </span>
              </div>
              {hoveredPosition.stop_loss && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stop Loss:</span>
                  <span className="font-medium text-red-500">
                    ${hoveredPosition.stop_loss.toFixed(2)}
                  </span>
                </div>
              )}
              {hoveredPosition.take_profit && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Take Profit:</span>
                  <span className="font-medium text-green-500">
                    ${hoveredPosition.take_profit.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default LightweightChart;
