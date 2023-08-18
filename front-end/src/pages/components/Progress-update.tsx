import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";



export const BookProgressValidator = z.object({
  id: z.number(),
  bookId: z.number(),

  userId: z.number(),
  pageProgress: z.number().positive(),
});

export type BookProgressData = z.infer<typeof BookProgressValidator>;




const ProgressUpdateForm = () => {
  const handleFormSubmit = (data: BookProgressData) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookProgressData>({
    resolver: zodResolver(BookProgressValidator),
  });
  return (
    <form
      className="update-progress-form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label htmlFor="update-progress">New Progress</label>
      <input
        type="number"
        data-type="number"
        id="update-progress"
        {...register("pageProgress", {
          setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
        })}
      ></input>
      {errors.pageProgress && <p>{errors.pageProgress.message}</p>}
      <button type="submit">Update Progress</button>
    </form>
  );
};

export default ProgressUpdateForm;
