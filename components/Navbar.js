import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center shadow-md bg-white">
      <h1 className="text-2xl font-bold text-primaryBlue flex items-center">
        My Calendar <span className="ml-2">📅</span>
      </h1>
      <div className="flex gap-4">
        <Link href="#">
          <button className="border px-4 py-2 rounded-md hover:bg-vibrantTeal text-primaryBlue border-primaryBlue">
            Sign Up
          </button>
        </Link>
        <Link href="#">
          <button className="px-4 py-2 rounded-md bg-primaryBlue text-white hover:bg-vibrantTeal">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
