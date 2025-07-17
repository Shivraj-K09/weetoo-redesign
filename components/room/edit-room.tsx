import bcrypt from "bcryptjs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type RoomUpdateData = {
  name: string;
  privacy: "public" | "private";
  symbol: string;
  password?: string | null;
  updatedAt: string;
};

export type EditRoomFormProps = {
  roomId: string;
  initialName: string;
  initialPrivacy: "public" | "private";
  initialSymbol: string;
  initialUpdatedAt: string;
  onRoomUpdated: (data: RoomUpdateData) => void;
  onCancel?: () => void;
};

export function EditRoomForm({
  roomId,
  initialName,
  initialPrivacy,
  initialSymbol,
  initialUpdatedAt,
  onRoomUpdated,
  onCancel,
}: EditRoomFormProps) {
  const [name, setName] = useState(initialName);
  const [privacy, setPrivacy] = useState<"public" | "private">(initialPrivacy);
  const [symbol, setSymbol] = useState(initialSymbol);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);

  // Allowed symbols from dropdown (no hardcoding)
  const allowedSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

  useEffect(() => {
    setName(initialName);
    setPrivacy(initialPrivacy);
    setSymbol(initialSymbol);
  }, [initialName, initialPrivacy, initialSymbol]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    // Basic validation (no hardcoding)
    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }
    if (!symbol || !allowedSymbols.includes(symbol)) {
      setError("Please select a valid symbol.");
      return;
    }
    if (privacy === "private" && !password) {
      setError("Password is required for private rooms.");
      return;
    }
    setLoading(true);
    let hashedPassword = null;
    if (privacy === "private" && password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    // Use PATCH API route for backend validation and concurrency
    const response = await fetch("/api/trading-rooms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: roomId,
        name: name.trim(),
        symbol,
        privacy,
        password: privacy === "private" ? hashedPassword : null,
        updatedAt,
      }),
    });
    const result = await response.json();
    setLoading(false);
    if (response.status === 409) {
      setError(
        result.error ||
          "Room was updated elsewhere. Please refresh and try again."
      );
      return;
    }
    if (!response.ok) {
      setError(result.error || "Failed to update room.");
      return;
    }
    setUpdatedAt(result.updatedAt);
    onRoomUpdated({
      name,
      privacy,
      symbol,
      password: privacy === "private" ? hashedPassword : null,
      updatedAt: result.updatedAt,
    });
    if (onCancel) onCancel();
    // toast is handled in parent
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="room-name">Room Name</Label>
          <Input
            id="room-name"
            placeholder="Room Name"
            className="h-10 !bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="room-privacy">Room Privacy</Label>
          <Select
            value={privacy}
            onValueChange={(v) => setPrivacy(v as "public" | "private")}
            disabled={loading}
          >
            <SelectTrigger className="h-10" id="room-privacy">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {privacy === "private" && (
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="room-password">Room Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Room Password"
              className="h-10 !bg-transparent pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="room-password"
              required={privacy === "private"}
              disabled={loading}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="symbol">Symbol</Label>
        <Select value={symbol} onValueChange={setSymbol} disabled={loading}>
          <SelectTrigger className="h-10" id="symbol">
            <SelectValue placeholder="Select a symbol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
            <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
            <SelectItem value="BNBUSDT">BNBUSDT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <DialogFooter className="mt-9">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (onCancel) onCancel();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
