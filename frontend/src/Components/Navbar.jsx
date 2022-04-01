/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import NavbarButton from "./NavbarButton";

const Navbar = ({ page, visitors, isLogin }) => {
  return (
    <nav className="bg-slate-700 mx-auto px-4 fixed z-10 top-0 w-full flex items-center justify-between h-16">
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="space-x-4 text-gray-300 py-2 text-lg">網路攻防實習</div>
        <div className="ml-6 flex space-x-4">
          <Link to="/">
            <NavbarButton name="About" selected={page === "About"} />
          </Link>
          <Link to="/chat">
            <NavbarButton name="Chat" selected={page === "Chat"} />
          </Link>
          <a className="px-3 py-2 text-lg">Visitors: {visitors}</a>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div className="flex space-x-4">
          {isLogin ? (
            <>
              <NavbarButton name="Settings" selected={false} />
              <NavbarButton name="Logout" selected={false} />
            </>
          ) : (
            <>
              <NavbarButton name="Login" selected={false} />
              <NavbarButton name="Sign Up" selected={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
