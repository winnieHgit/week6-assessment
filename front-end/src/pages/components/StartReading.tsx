import axios from "axios";
import { useRouter } from "next/router";

const StartReadingFunction = () => {
  const router = useRouter();

  const bookIdFromUrl = router.query.bookId;

  const handleStartReadingButton = async () => {
    console.log("clicked");
    try {
      const response = await axios.post(
        `http://localhost:3007/bookprogress`,
        {
          bookId: bookIdFromUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Start reading error:", error);
    }
  };

  return (
    <main>
      <div>
        <button onClick={handleStartReadingButton}>start reading book</button>
      </div>
    </main>
  );
};

export default StartReadingFunction;
