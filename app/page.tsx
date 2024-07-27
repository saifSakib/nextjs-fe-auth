import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const font = Poppins({
  subsets:['latin'],
  weight:['600']
})
export default function Home() {
  return (
    <main className="flex justify-center items-center h-full bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-white text-6xl drop-shadow-md",font.className)}>
            AUTH
        </h1>
        <p className="text-white text-lg">
          Authentication Service
        </p>
        <div>
          <LoginButton>
            <Button variant='secondary' size='lg'>
              Login
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
