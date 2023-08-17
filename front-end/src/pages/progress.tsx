import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/router";
import NavBar from "./components/NavBar";
import WithToken from "./components/Withtoken";
import Link from "next/link";

interface BookUser {
  id: number;
  username: string;
}

interface BookList {
  id: number;
  title: string;
  coverImgUrl: string;
  author: string;
  pageCount: number;
}

interface UserProgressProps {
  id: number;
  bookId: number;
  book: BookList;
  userId: number;
  user: BookUser;
  pageProgress: number;
}

const UserProgress = () => {
  const [getUserProgress, setBUserProgress] = useState<
    UserProgressProps[] | null
  >(null);

  const router = useRouter();

  useEffect(() => {
    const getUserProgressfromApi = async (token: string) => {
      try {
        const response = await axios.get(`http://localhost:3007/bookprogress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Store the data of the response inside our memory
      setBUserProgress(response.data);
    } catch (error) {
      console.log("message:`Log in to see the progress`")
    };
    };
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/login");
      return;
    }

    getUserProgressfromApi(token);
  });

  if (getUserProgress === null) {
    return <div>Loading books...</div>;
  }

  return (
    <WithToken>
      <div>
        <NavBar />
        <h1>Your Current Book Progress</h1>

        {getUserProgress.map((userprogress: UserProgressProps) => {
          return (
            <div key={userprogress.id}>
              <div key={userprogress.bookId}>
              <Link href={`/books/${userprogress.bookId}`}>
              <h2>{userprogress.book.title}</h2>

              <Image
                src={userprogress.book.coverImgUrl}
                alt={`Image of ${userprogress.book.title}`}
                width={300}
                height={300}
              />
              </Link>
              </div>
              <p>BookProgress:{userprogress.pageProgress}</p>
              <p>
                Progress status: {userprogress.pageProgress}/
                {userprogress.book.pageCount} read
              </p>
            </div>
          );
        })}
      </div>
    </WithToken>
  );
};

export default UserProgress;
