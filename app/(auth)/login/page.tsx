import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Login | Weetoo",
  description: "Login to your Weetoo account",
};

export default function Login() {
  return (
    <div className="container mx-auto py-10 h-screen">
      <div className="border w-full h-full shadow-lg flex">
        <div className="w-full h-full">1</div>
        <Separator className="h-full" orientation="vertical" />
        <div className="w-full h-full">2</div>
      </div>
    </div>
  );
}
