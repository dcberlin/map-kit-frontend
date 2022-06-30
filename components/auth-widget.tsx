import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

function AuthWidget() {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const ref = React.useRef(null);
  const [showFallbackIcon, setShowFallbackIcon] = React.useState(false);

  const onClickOutside = () => setMenuVisible(false);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div className="fixed right-5 top-5">
      {isAuthenticated ? (
        <div ref={ref} className="flex flex-col">
          <div className="flex gap-3 items-center justify-end">
            <span className="text-sm">Salut, {user.given_name}!</span>
            <button
              className="h-10 w-10 text-green-600"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              {setShowFallbackIcon ? (
                <UserCircleIcon />
              ) : (
                <img
                  className="rounded-full"
                  src={user.picture}
                  onError={() => setShowFallbackIcon(true)}
                />
              )}
            </button>
          </div>
          {menuVisible && (
            <div
              className="z-10 mt-2 bg-white drop-shadow-2xl rounded divide-y w-44"
              onBlur={() => setMenuVisible(false)}
            >
              <ul className="py-1 text-sm">
                <li>
                  <Link href="/my-communities">
                    <a className="block px-4 py-2 hover:bg-gray-100">
                      Comunităţile mele
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() =>
                      logout({
                        returnTo: process.env.NEXT_PUBLIC_WEB_APP_BASE_URL,
                      })
                    }
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button className="flex items-center gap-1" onClick={loginWithRedirect}>
          <span className="text-sm">Login</span>
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
        </button>
      )}
    </div>
  );
}

export default AuthWidget;
