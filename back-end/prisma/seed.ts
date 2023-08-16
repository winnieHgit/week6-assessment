import { PrismaClient } from "@prisma/client";
import users from "./data/users.json";
import books from "./data/books.json";
import bookProgresses from "./data/bookProgresses.json";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < books.length; i++) {
    const currentBook = books[i];
    await prisma.book.create({
      data: currentBook,
    });
  }

  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    await prisma.user.create({
      data: currentUser,
    });
  }

  for (let i = 0; i < bookProgresses.length; i++) {
    const currentbookProgress = bookProgresses[i];
    await prisma.bookProgress.create({
      data: currentbookProgress,
    });
  }
};
seed();
