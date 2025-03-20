/* components/TaskCard.jsx */
export default function TaskCard({ title, description }) {
    return (
      <div className="group relative w-80 h-72 bg-black text-white rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center
        before:absolute before:top-0 before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-blue-400 via-pink-400 to-orange-500
        before:transition-all before:duration-500 before:hover:h-44 before:hover:scale-95 before:hover:rounded-b-2xl">
        
        <div className="w-28 h-28 bg-blue-700 mt-8 rounded-full border-4 border-black z-10 group-hover:scale-150 group-hover:-translate-x-24
          group-hover:-translate-y-20 transition-all duration-500"></div>
        
        <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
          <span className="text-2xl font-semibold">{title}</span>
          <p className="text-gray-400">{description}</p>
        </div>
        
        <button className="bg-blue-700 px-4 py-1 text-white rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500">
          Open
        </button>
      </div>
    );
  }
  