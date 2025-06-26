import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Coins } from "lucide-react";

export function KorCoinsRechargeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full text-sm text-left cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors flex items-center gap-5"
        >
          <Coins className="w-4 h-4 text-muted-foreground" />
          <span>KOR Coins Recharge</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-2 flex items-center gap-2">
            <Coins className="w-5 h-5 text-muted-foreground" />
            KOR Coins Recharge
          </DialogTitle>
        </DialogHeader>
        {/* Add recharge form or content here in the future */}
      </DialogContent>
    </Dialog>
  );
}
