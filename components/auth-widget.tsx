import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

function AuthWidget() {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [menuVisible, setMenuVisible] = useState(false);
  const ref = useRef(null);
  const [, setShowFallbackIcon] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div
          ref={ref}
          className="flex flex-col items-center bg-white pl-4 rounded-3xl drop-shadow-2xl cursor-pointer"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <div className="flex w-full gap-3 items-center justify-end">
            <span className="text-md font-bold text-gray-700">
              Salut, {user.given_name}!{" "}
            </span>
            <button className="h-8 w-8 text-green-600">
              {setShowFallbackIcon ? (
                <UserCircleIcon />
              ) : (
                <picture>
                  <source srcSet={user.picture} type="image/jpeg" />
                  <img
                    alt="The profile image from your social account you logged in with (Google etc.)"
                    className="rounded-full"
                    src={user.picture}
                    onError={() => setShowFallbackIcon(true)}
                  />
                </picture>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-1 mr-3 bg-white pl-4 rounded-3xl drop-shadow-2xl"
          onClick={loginWithRedirect}
        >
          <span className="text-md font-bold text-gray-600">Login</span>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </button>
      )}
      {menuVisible && (
        <div
          className={`mt-1 divide-y transition
                opacity-0 ${menuVisible && "opacity-100"}`}
          onBlur={() => setMenuVisible(false)}
        >
          <ul className="flex flex-col gap-2 py-1 text-md list-none">
            <li>
              <Link
                href="/my-communities"
                className="block px-4 py-1 hover:bg-gray-50 bg-white rounded-3xl"
              >
                Comunităţile mele
              </Link>
            </li>
            <li>
              <Link
                href="/admins-code-of-conduct"
                className="block px-4 py-1 hover:bg-gray-50 bg-white rounded-3xl"
              >
                Code of conduct
              </Link>
            </li>
            <li>
              <a
                onClick={() => {
                  console.log("LOGGINGOUT");
                  logout({
                    returnTo: process.env.NEXT_PUBLIC_WEB_APP_BASE_URL,
                  });
                }}
                className="block text-red-800 cursor-pointer px-4 py-1 hover:bg-gray-50 bg-white rounded-3xl"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default AuthWidget;
