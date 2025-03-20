export default function Navbar() {
    return (
      <nav
        className="w-full px-6 py-4 flex justify-between items-center shadow-md"
        style={{ backgroundColor: "var(--bright-orange)", color: "white" }}
      >
        <h1 className="text-2xl font-bold">My Calendar 📅</h1>
        <div className="flex gap-4">
          <button
            className="border px-4 py-2 rounded-md hover:bg-white"
            style={{ borderColor: "white", color: "white", backgroundColor: "transparent" }}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 rounded-md hover:bg-orange-500"
            style={{ backgroundColor: "white", color: "var(--bright-orange)" }}
          >
            Login
          </button>
        </div>
      </nav>
    );
  }
  