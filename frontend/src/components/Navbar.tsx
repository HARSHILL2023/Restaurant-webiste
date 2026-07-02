'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-5 md:px-12 h-[72px] bg-ever-dark/95 backdrop-blur-[14px] border-b border-ever-border">
      <Link href="/" className="nav-logo">
        The <span>Ever</span> House <span className="veg-dot"></span>
      </Link>
      <ul className="flex gap-1 list-none">
        <li>
          <Link href="/">
            <button className={`bg-transparent border-none cursor-pointer font-inter text-[11px] md:text-xs font-medium tracking-[1.5px] uppercase px-[10px] md:px-[18px] py-2.5 rounded transition-colors duration-200 ${pathname === '/' ? 'text-ever-terracotta bg-ever-terracotta/10' : 'text-ever-text-muted hover:text-ever-cream'}`}>
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link href="/menu">
            <button className={`bg-transparent border-none cursor-pointer font-inter text-[11px] md:text-xs font-medium tracking-[1.5px] uppercase px-[10px] md:px-[18px] py-2.5 rounded transition-colors duration-200 ${pathname === '/menu' ? 'text-ever-terracotta bg-ever-terracotta/10' : 'text-ever-text-muted hover:text-ever-cream'}`}>
              Menu
            </button>
          </Link>
        </li>
        <li>
          <Link href="/reserve">
            <button className={`border-none cursor-pointer font-inter text-[11px] md:text-xs tracking-[1.5px] uppercase px-[10px] md:px-[18px] py-2.5 rounded transition-colors duration-200 bg-ever-terracotta text-ever-dark font-semibold hover:bg-ever-terra-light`}>
              Reserve a Table
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
