
export default function Footer() {
  return (
    <footer className="w-full p-4 bg-indigo-600 text-white text-center text-sm md:text-base">
      &copy; {new Date().getFullYear()} TinyLink. All rights reserved.
    </footer>
  );
}
