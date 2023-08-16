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
  const [getBookList, setBookList] = useState<BookListProps[] | null>(null);

  //sort by name/popularity
  const [getFilter, setFilter] = useState<"name" | "popularity">("name");

  console.log("check?");

  const getBooksFromApi = async () => {
    // try {
    const response = await axios.get(`http://127.0.0.1:3007/books`);

    //get the code for sorting alohabetically from "https://stackoverflow.com/questions/47998188/how-to-sort-an-object-alphabetically-within-an-array-in-react-js"

    const bookDefaultSorting = response.data.sort(
      (a: BookListProps, b: BookListProps) => a.title.localeCompare(b.title)
    );

    //sorting by name(by name.length-ascending) or by popularity
    const bookSortByName = () => {
      const sortBook = response.data.sort(
        (a: BookListProps, b: BookListProps) => a.title.length - b.title.length
      );
      setBookList(sortBook);
      setFilter("name");
    };

    const booksByPopularity = () => {
      const sortBook = response.data.sort(
        (a: BookListProps, b: BookListProps) =>
          b.bookProgress.length - a.bookProgress.length
      );
      setBookList(sortBook);
      setFilter("popularity");
    };

    setBookList(response.data);

    // } catch (error) {
    //   console.log("Something went wrong!");
    // }
  };

  useEffect(() => {
    getBooksFromApi();
  }, [getBookList]);

  if (getBookList === null) {
    return <p>Book not found!</p>;
  } else {
    return (
      <>
        <div>
           
          {/* <button onClick={bookSortByName} >By name</button> */}
          <button >Sort by Popularity</button>
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
                      width={200}
                      height={200}
                    />
                  </div>
                  <div>
                    <div>
                      <h2>{books.title}</h2>
                    </div>

                    <p>Author: {books.author}</p>
                    <p>Pagecount: {books.pageCount} pages</p>
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
