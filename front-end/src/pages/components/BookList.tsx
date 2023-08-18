import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export interface BookProgress {
  id: number;
  bookId: number;
  userId: number;
  pageProgress: number;
}

export interface BookListProps {
  id: number;
  title: string;
  coverImgUrl: string;
  author: string;
  pageCount: number;
  bookProgress: BookProgress[];
}

const TheBookList = () => {
  const [getBookList, setBookList] = useState<BookListProps[]>([]);

  //sort by name/popularity
  const [getFilter, setFilter] = useState<"name" | "popularity">("name");

  //get the code for sorting alohabetically from "https://stackoverflow.com/questions/47998188/how-to-sort-an-object-alphabetically-within-an-array-in-react-js"

  const sortByName = (a: BookListProps, b: BookListProps) =>
    a.title.localeCompare(b.title);

  const sortByPopularity = (a: BookListProps, b: BookListProps) =>
    b.bookProgress.length - a.bookProgress.length;

  const getBooksFromApi = async () => {
    try {
      const response = await axios.get(`http://localhost:3007/books`);

      const bookDefaultSorting = response.data.sort(sortByName);

      setBookList(bookDefaultSorting);
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  //sorting by name
  const bookSortByName = () => {
    const sortBook = getBookList.sort(sortByName);
    // setBookList(sortBook);
    setFilter("name");
  };

  //sorting by popularity
  const bookSortByPopularity = () => {
    const sortBook = getBookList.sort(sortByPopularity);

    // setBookList(sortBook);
    setFilter("popularity");
  };

  useEffect(() => {
    getBooksFromApi();
  }, []);

  if (getBookList === null) {
    return <p>Book not found!</p>;
  } else {
    return (
      <>
        <div>
          <p>Currently sorted by {getFilter} </p>
          <button onClick={bookSortByName}>name</button>
          <button onClick={bookSortByPopularity}>Popularity</button>
        </div>
        <ul>
          {getBookList.map((books: BookListProps) => {
            return (
              <div key={books.id}>
                <Link href={`/books/${books.id}`}>
                  <div>
                    <Image
                      src={books.coverImgUrl}
                      alt={`Image of ${books.title}`}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div>
                    <div>
                      <h2>{books.title}</h2>
                    </div>

                    <p>Author: {books.author}</p>
                    <p>Pagecount: {books.pageCount} pages</p>
                    <p>Currently {books.bookProgress.length} user(s) reading</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </>
    );
  }
};

export default TheBookList;
