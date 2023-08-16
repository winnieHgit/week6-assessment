import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);

  const router = useRouter();
  
  const handleClick = () => {
    console.log("check check");
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  //get the token from the localstorage when it loads>>useEffect
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    console.log("TOKEN", tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage); //if found it, put it in the state
    }
  }, []);

  return (
    <div>
      <ul>
        <li>
          <nav>
            <Link href="/">Home</Link>
            {token ? (
              <>
                <p>
                  <Link href="/progress">Progress</Link>
                </p>
                <button onClick={handleClick}>Logout</button>
              </>
            ) : (
              <>
                <p>
                  <Link href="/login">Log In</Link>
                </p>
                <p>
                  <Link href="/register">Register</Link>
                </p>
              </>
            )}
          </nav>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
