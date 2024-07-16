import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-third min-w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-white text-7xl animate-bounce">Quiz Case</h1>
        <Link href={'quiz'} className="text-white border border-white py-2 px-5 rounded-lg  transition-all duration-500 ease-in-out hover:py-4 hover:px-10"> Quiz'e Başla</Link>
      </div>
    </div>
  );

}
