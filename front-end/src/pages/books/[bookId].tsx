import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookProgress } from "../components/BookList";
import WithToken from "../components/Withtoken";
import NavBar from "../components/NavBar";
import { z } from "zod";

export interface Book {
  id: number;
  title: string;
  coverImgUrl: string;
  author: string;
  pageCount: number;
  bookProgress: BookProgress[];
}



const BookPage = () => {
  const [getBook, setBook] = useState<null | Book>(null);
  // Get the router
  const router = useRouter();
  // From the router get the part of the URL we want (inside of query)
  const bookIdFromUrl = router.query.bookId;
  useEffect(() => {
    console.log("starting the effect");
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
  }, [bookIdFromUrl]); // Look at 'bookIdFromUrl' and if it changes run again
  // waiting for the request to complete

  if (getBook === null) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <NavBar />
      <div>
        <h1> {getBook.title} </h1>
        <img src={getBook.coverImgUrl} alt="book picture" />
        <h2>Author: {getBook.author}</h2>
        <p>Pagecount:{getBook.pageCount} pages</p>
        <p>Amount of bookProgress:{getBook.bookProgress.length}</p>
        <div>
          <WithToken>
            <button> Start reading book</button>
          </WithToken>
        </div>
      </div>
    </>
  );
};

export default BookPage;
