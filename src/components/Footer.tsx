import { Link } from "react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full pt-10 pb-2 bg-linear-to-b from-transparent to-black">
      <div className="container w-11/12 md:w-8/12 mx-auto text-center">
        <p className="py-4 text-xs text-center text-gray-400">
          <Link to={"https://maciejwasiak.com/"}>maciejwasiak.com</Link> &copy;{" "}
          {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
