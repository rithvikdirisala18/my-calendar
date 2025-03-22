import Link from "next/link";
import { CalendarHeartIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center shadow-md bg-zinc-900">
      <Link href='/'>
      <h1 className="text-2xl font-bold text-orange-400 flex items-center">
        My Calendar <CalendarHeartIcon className="ml-2"/>
      </h1>
      </Link>
      <div className="flex gap-4">
        <Link href='/signup'>
          <button className="px-4 py-2 border rounded-md border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-200 transform hover:scale-105">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
        <button className="px-4 py-2 border rounded-md border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition-all duration-200 transform hover:scale-105">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
