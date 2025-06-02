import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

export function CreateRoom() {
  const [privacy, setPrivacy] = useState("public");
  const [category, setCategory] = useState("regular");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto cursor-pointer">
          <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-background border border-border rounded-lg p-0 shadow-none">
        <DialogHeader className="px-6 pt-6 pb-2 gap-1">
          <DialogTitle className="font-semibold flex items-center gap-2 text-lg text-foreground">
            Create Trading Room
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up your trading room details below.
          </DialogDescription>
        </DialogHeader>
        <div className="border-b border-border mx-6" />
        <form className="px-6 py-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="room-name"
                className="font-medium text-sm text-foreground mb-1"
              >
                Room Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="room-name"
                placeholder="Enter room name"
                required
                className="text-sm h-10"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="privacy"
                className="font-medium text-sm text-foreground mb-1"
              >
                Privacy
              </Label>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger id="privacy" className="w-full text-sm h-10">
                  <SelectValue placeholder="Select privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {privacy === "private" && (
              <div className="flex flex-col gap-1 md:col-span-2 animate-fade-in relative">
                <Label
                  htmlFor="room-password"
                  className="font-medium text-sm text-foreground mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="room-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter room password"
                  required
                  className="text-sm pr-10 h-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-10 text-muted-foreground hover:text-foreground focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="symbol"
              className="font-medium text-sm text-foreground mb-1"
            >
              Symbol
            </Label>
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger id="symbol" className="w-full text-sm h-10">
                <SelectValue placeholder="Select symbol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                <SelectItem value="BNBUSDT">BNBUSDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="category"
              className="font-medium text-sm text-foreground mb-1"
            >
              Room Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full text-sm h-10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular Room</SelectItem>
                <SelectItem value="voice">Voice Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Room</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
