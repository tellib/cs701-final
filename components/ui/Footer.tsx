// Footer
// Created by Berk

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center items-center gap-2 p-2 bg-gray-200">
        <p className="text-sm text-gray-600">© Allen Chen & Berk Tellioglu</p>
        <Link
          href="https://github.com/tellib/cs701-final"
          className="text-sm text-blue-500 hover:underline"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
