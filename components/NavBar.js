import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">B</div>
          <div className="text-lg font-semibold">Bigly Courses</div>
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          <Link href="#" className="text-sm text-slate-600 hover:text-slate-900">Courses</Link>
          <Link href="#" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" className="ml-4 inline-block px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">Deploy</a>
        </nav>
      </div>
    </header>
  );
}
