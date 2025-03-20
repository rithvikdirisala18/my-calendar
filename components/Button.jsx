/* components/Button.jsx */
export default function GlowingButton({ text = "See More" }) {
    return (
      <button className="group relative h-16 w-64 border border-gray-600 text-left text-white font-bold p-3 rounded-lg overflow-hidden
        bg-neutral-800 hover:border-rose-300 before:absolute before:w-12 before:h-12 before:right-1 before:top-1
        before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20
        after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg
        hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:after:-right-8 duration-500"
      >
        {text}
      </button>
    );
  }
  