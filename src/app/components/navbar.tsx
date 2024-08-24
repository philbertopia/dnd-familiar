import Link from 'next/link';
import ExportToPDF from './exportToPDF';

const Navbar = () => {
  return (
    <nav className="">
      <div className="container mx-auto flex justify-between items-center mb-5">
        <div className="text-2xl font-bold">
          <Link href="/">🦄 Familiar</Link>
        </div>
        {/* <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link href="/Chat" className="hover:text-gray-400">Chat</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">Contact</Link>
          </li>
        </ul> */}
        <ExportToPDF />
      </div>
    </nav>
  );
};

export default Navbar;
