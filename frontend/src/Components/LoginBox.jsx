/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function LoginBox({
  username,
  password,
  readOnly,
  handleTextInputChange,
  handleFormSubmit,
}) {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex items-center justify-center text-center">
        <div className="my-10">
          <div className="text-4xl">Login</div>
          <div className="bg-slate-600 rounded-xl m-6 py-6 px-8 mobile-s:px-10">
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-1 gap-2 w-60 mobile-s:w-64 sm:w-72"
            >
              <label className="block text-left">
                <span className="text-xl">Username</span>
                <input
                  type="text"
                  name="username"
                  className="mt-2 block w-full rounded-2xl px-2 py-1 bg-slate-400 text-slate-900 focus:outline outline-slate-800 outline-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none"
                  placeholder=""
                  value={username}
                  readOnly={readOnly}
                  disabled={readOnly}
                  onChange={handleTextInputChange}
                />
              </label>
              <label className="block text-left">
                <span className="text-xl">Password</span>
                <input
                  type="password"
                  name="password"
                  className="mt-2 block w-full rounded-2xl px-2 py-1 bg-slate-400 text-slate-900 focus:outline outline-slate-800 outline-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none"
                  placeholder=""
                  value={password}
                  readOnly={readOnly}
                  disabled={readOnly}
                  onChange={handleTextInputChange}
                />
              </label>
              <button
                type="submit"
                className="relative my-4 flex-shrink-0 bg-slate-800 text-white text-lg font-semibold py-2 px-4 rounded-2xl hover:shadow-lg hover:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-400 disabled:opacity-50 disabled:cursor-wait"
                disabled={readOnly}
              >
                Login
                {readOnly && (
                  <div className="absolute inset-0 flex justify-end items-center">
                    <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-300" />
                  </div>
                )}
              </button>
              <div className="border-t mb-2" />
              <div className="text-lg">
                No account?{" "}
                <Link to="/register" className="underline text-slate-900">
                  Create one
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
