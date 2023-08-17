import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

//make the state UNION type
type CheckState = "checking" | "hasToken" | "noToken";

//make a interface that allows us to pass in children
interface WithTokenProps {
  children: ReactNode;
}

const WithToken = (props: WithTokenProps) => {
  //get the data
  const [currentChecked, setChecked] = useState<CheckState>("checking");

  //run once
  useEffect(() => {
    const tokenFromUrls = localStorage.getItem("token");
    if (!tokenFromUrls) {
      setChecked("noToken");
    } else {
      setChecked("hasToken");
    }
  }, []);

  if (currentChecked === "checking") {
    return (
      <div>
        <p>Checking Auth...</p>
      </div>
    );
  }
  // if there is no tooken, redirect to the log in page
  if (currentChecked === "noToken") {
    return (
      <div>
        <p>
          your are not log in.Log in <Link href="/login">Log in </Link>
        </p>
      </div>
    );
  }

  if (currentChecked === "hasToken") {
    return <>{props.children}</>;
  } else {
    return null;
  }
};

export default WithToken;
