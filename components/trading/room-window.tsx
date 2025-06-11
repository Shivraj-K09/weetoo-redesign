"use client";

import type React from "react";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface TradingRoomWindowProps {
  roomName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
}

export function TradingRoomWindow({
  roomName,
  isOpen,
  onClose,
}: TradingRoomWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [isMaximizing, setIsMaximizing] = useState(false);

  // Calculate initial centered position
  const initialWindowState = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
        isMaximized: false,
      };
    }

    // Get screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate responsive dimensions
    let width = Math.min(1200, screenWidth - 32); // 16px padding on each side
    let height = Math.min(800, screenHeight - 32);

    // For mobile devices, use full width and height
    if (screenWidth < 768) {
      width = screenWidth;
      height = screenHeight;
    }

    // Center the window
    const centerX = Math.max(0, (screenWidth - width) / 2);
    const centerY = Math.max(0, (screenHeight - height) / 2);

    return {
      x: centerX,
      y: centerY,
      width,
      height,
      isMaximized: screenWidth < 768, // Auto maximize on mobile
    };
  }, []);

  const [windowState, setWindowState] =
    useState<WindowState>(initialWindowState);
  const [previousState, setPreviousState] = useState<WindowState | null>(null);
  const windowPositionRef = useRef({
    x: initialWindowState.x,
    y: initialWindowState.y,
  });

  // Update position ref when window state changes
  useEffect(() => {
    windowPositionRef.current = { x: windowState.x, y: windowState.y };
  }, [windowState.x, windowState.y]);

  // Reset closing state when window is closed
  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  // Hide scrollbars when window is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle dragging with direct DOM manipulation for smoother movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState.isMaximized && windowRef.current) {
        // Direct DOM manipulation for smoother dragging
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;

        // Update position directly in the DOM for immediate feedback
        windowRef.current.style.left = `${newX}px`;
        windowRef.current.style.top = `${newY}px`;

        // Store position for state update on mouse up
        windowPositionRef.current = { x: newX, y: newY };
      }

      if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();

        let newWidth = windowState.width;
        let newHeight = windowState.height;
        let newX = windowPositionRef.current.x;
        let newY = windowPositionRef.current.y;

        if (resizeDirection.includes("right")) {
          newWidth = Math.max(400, e.clientX - rect.left);
          windowRef.current.style.width = `${newWidth}px`;
        }
        if (resizeDirection.includes("left")) {
          const diff = rect.left - e.clientX;
          if (rect.width + diff >= 400) {
            newWidth = rect.width + diff;
            newX = e.clientX;
            windowRef.current.style.width = `${newWidth}px`;
            windowRef.current.style.left = `${newX}px`;
            windowPositionRef.current.x = newX;
          }
        }
        if (resizeDirection.includes("bottom")) {
          newHeight = Math.max(300, e.clientY - rect.top);
          windowRef.current.style.height = `${newHeight}px`;
        }
        if (resizeDirection.includes("top")) {
          const diff = rect.top - e.clientY;
          if (rect.height + diff >= 300) {
            newHeight = rect.height + diff;
            newY = e.clientY;
            windowRef.current.style.height = `${newHeight}px`;
            windowRef.current.style.top = `${newY}px`;
            windowPositionRef.current.y = newY;
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
        // Update state only once at the end of drag/resize for better performance
        setWindowState((prev) => ({
          ...prev,
          x: windowPositionRef.current.x,
          y: windowPositionRef.current.y,
          width: windowRef.current?.offsetWidth || prev.width,
          height: windowRef.current?.offsetHeight || prev.height,
        }));
      }

      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      document.body.style.cursor = isResizing
        ? getResizeCursor(resizeDirection)
        : "move";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging, isResizing, windowState.isMaximized, resizeDirection]);

  const getResizeCursor = (direction: string) => {
    if (direction.includes("top") && direction.includes("left"))
      return "nw-resize";
    if (direction.includes("top") && direction.includes("right"))
      return "ne-resize";
    if (direction.includes("bottom") && direction.includes("left"))
      return "sw-resize";
    if (direction.includes("bottom") && direction.includes("right"))
      return "se-resize";
    if (direction.includes("top") || direction.includes("bottom"))
      return "ns-resize";
    if (direction.includes("left") || direction.includes("right"))
      return "ew-resize";
    return "default";
  };

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleMaximize = () => {
    setIsMaximizing(true);

    setTimeout(() => {
      if (windowState.isMaximized) {
        // Restore
        if (previousState) {
          setWindowState(() => ({ ...previousState, isMaximized: false }));
          windowPositionRef.current = {
            x: previousState.x,
            y: previousState.y,
          };
          setPreviousState(null);
        }
      } else {
        // Maximize
        setPreviousState(windowState);
        setWindowState((prev) => ({
          ...prev,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          isMaximized: true,
        }));
        windowPositionRef.current = { x: 0, y: 0 };
      }

      setTimeout(() => setIsMaximizing(false), 200);
    }, 50);
  };

  const handleClose = () => {
    onClose();
  };

  const handleTitleBarDoubleClick = () => {
    handleMaximize();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" style={{ overflow: "hidden" }}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Window */}
            <motion.div
              ref={windowRef}
              className={cn(
                "absolute bg-background border border-border shadow-2xl overflow-hidden",
                windowState.isMaximized ? "rounded-none" : "rounded-lg",
                "sm:rounded-lg" // Keep rounded corners on larger screens
              )}
              style={{
                left: windowState.x,
                top: windowState.y,
                width: windowState.width,
                height: windowState.height,
                zIndex: 1000,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: isMaximizing ? [1, 1.02, 1] : 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.15,
                scale: { duration: 0.2, ease: "easeInOut" },
              }}
              layout
              layoutId="trading-window"
            >
              {/* Resize Handles - Only show on desktop */}
              {!windowState.isMaximized && window.innerWidth >= 768 && (
                <>
                  {/* Top */}
                  <div
                    className="absolute top-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-blue-500/20"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top")}
                  />
                  {/* Bottom */}
                  <div
                    className="absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-blue-500/20"
                    onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
                  />
                  {/* Left */}
                  <div
                    className="absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-blue-500/20"
                    onMouseDown={(e) => handleResizeMouseDown(e, "left")}
                  />
                  {/* Right */}
                  <div
                    className="absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-blue-500/20"
                    onMouseDown={(e) => handleResizeMouseDown(e, "right")}
                  />
                  {/* Corners */}
                  <div
                    className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
                  />
                  <div
                    className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
                    onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
                    onMouseDown={(e) =>
                      handleResizeMouseDown(e, "bottom-right")
                    }
                  />
                </>
              )}

              {/* Title Bar */}
              <div
                ref={titleBarRef}
                className={cn(
                  "flex items-center justify-between h-12 px-4 bg-muted/30 border-b border-border select-none",
                  !windowState.isMaximized &&
                    window.innerWidth >= 768 &&
                    "cursor-move",
                  windowState.isMaximized ? "rounded-none" : "rounded-t-lg",
                  "sm:rounded-t-lg" // Keep rounded corners on larger screens
                )}
                onMouseDown={handleTitleBarMouseDown}
                onDoubleClick={handleTitleBarDoubleClick}
              >
                {/* Window Title */}
                <div className="flex items-center gap-3 pointer-events-none">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#549BCC] via-[#63b3e4] to-[#7cc3f0] rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <span className="font-medium text-sm truncate max-w-[200px] sm:max-w-none">
                    {roomName}
                  </span>
                </div>

                {/* Window Controls */}
                <div className="flex items-center pointer-events-auto">
                  {/* Maximize/Restore - Only show on desktop */}
                  {window.innerWidth >= 768 && (
                    <button
                      onClick={handleMaximize}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded"
                      aria-label={
                        windowState.isMaximized ? "Restore" : "Maximize"
                      }
                    >
                      {windowState.isMaximized ? (
                        <Minimize2 className="h-3 w-3" />
                      ) : (
                        <Maximize2 className="h-3 w-3" />
                      )}
                    </button>
                  )}

                  {/* Close */}
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors rounded"
                    aria-label="Close"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="h-[calc(100%-3rem)] bg-background overflow-auto">
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background">
                  <div className="text-center space-y-6 max-w-md mx-auto p-4 sm:p-8">
                    {/* Room Icon */}
                    <div className="relative mx-auto">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#549BCC] via-[#63b3e4] to-[#7cc3f0] rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl sm:text-2xl font-bold">
                          W
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="space-y-3">
                      <h1 className="text-xl sm:text-2xl font-bold">
                        {roomName}
                      </h1>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Welcome to your trading room
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Connected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                          <span>Live data</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
