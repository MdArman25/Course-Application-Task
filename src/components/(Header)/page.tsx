"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname() || "/"; // Provide a default value for pathname

  return (
    <div className="max-w-screen-2xl h-fit">
      <nav className="bg-indigo-900 shadow text-white dark:bg-gray-800">
        <div className="container flex items-center justify-center py-2 gap-5 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link href="/" className="w-fit pr-20">
            <Image
              className="border-2"
              src="/Logo.png"
              width={50}
              height={100}
              alt="VectorStock"
            />
          </Link>

          <NavItem href="/" currentPath={pathname}>
            Home
          </NavItem>
          <NavItem href="/About" currentPath={pathname}>
            About
          </NavItem>
          <NavItem href="/Course" currentPath={pathname}>
            Course
          </NavItem>
          <NavItem href="/Shop" currentPath={pathname}>
            Shop
          </NavItem>
          <NavItem href="/Event" currentPath={pathname}>
            Event
          </NavItem>
          <NavItem href="/Contact" currentPath={pathname}>
            Contact
          </NavItem>
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavItem = ({ href, currentPath, children }: NavItemProps) => {
  const isActive = href === currentPath;

  return (
    <Link href={href} passHref>
      <div
        // whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
        // whileTap={{ scale: 0.9 }}
        className={`text-white ${
          isActive
            ? "font-bold text-amber-500 border-b-2 border-amber-300"
            : "hover:text-amber-400 border-b-2 border-transparent"
        } dark:text-gray-200 hover:border-amber-300 mx-1.5 sm:mx-6`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Navbar;
