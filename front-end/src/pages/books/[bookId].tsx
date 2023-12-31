import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookProgress } from "../components/BookList";
import WithToken from "../components/Withtoken";
import NavBar from "../components/NavBar";
import Image from "next/image";
import StartReadingFunction from "../components/StartReading";

export interface Book {
  id: number;
  title: string;
  coverImgUrl: string;
  author: string;
  pageCount: number;
  bookProgress: BookProgress[];
}

const BookPage = () => {
  const [getBook, setBook] = useState<Book | null>(null);
  // Get the router
  const router = useRouter();
  // From the router get the part of the URL we want (inside of query)
  const bookIdFromUrl = router.query.bookId;

  useEffect(() => {
    // Check if the value from the router.query already exists
    if (bookIdFromUrl === undefined) {
      // if not stop (empty return)
      return;
    }
    // Create a function that uses axios (and thus is async)
    const getBookFromApi = async () => {
      const response = await axios.get(
        `http://localhost:3007/books/${bookIdFromUrl}`
      );
      // Store the data of the response inside our memory
      setBook(response.data);
      console.log("check data");
    };
    // CALL the function
    getBookFromApi();
  }, [bookIdFromUrl]); // when 'bookIdFromUrl' change it run again

  if (getBook === null) {
    return <div>Loading ...</div>;
  }

  let totalProgress = 0;
  for (let i = 0; i < getBook.bookProgress.length; i++) {
    const currentProgress = getBook.bookProgress[i];
    totalProgress = currentProgress.pageProgress;

    // if (getBook.bookProgress.length===0){
    //     return("No progress")
    // }
  }

  return (
    <>
      <NavBar />
      <div>
        <h1> {getBook.title} </h1>
        <Image
          src={getBook.coverImgUrl}
          alt="book picture"
          width={300}
          height={300}
        />
        <h2>Author: {getBook.author}</h2>
        <p>Pagecount:{getBook.pageCount} pages</p>
        <p>Currently {getBook.bookProgress.length} user(s) reading</p>

        {getBook.bookProgress.length === 0 ? (
          <p> Average pageProgress: No progress</p>
        ) : (
          <p>
            Average pageProgress: {totalProgress / getBook.bookProgress.length}
          </p>
        )}
        <div>
          <WithToken>
            {/* <button > Start reading book</button> */}
            <StartReadingFunction />
          </WithToken>
        </div>
      </div>
    </>
  );
};

export default BookPage;
