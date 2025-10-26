export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="container py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Bigly Courses — Built with Next.js & Tailwind
      </div>
    </footer>
  );
}
