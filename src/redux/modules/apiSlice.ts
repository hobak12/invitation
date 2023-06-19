import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../../utils/firebase";

export const courseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    //Comment Reducer
    addComment: builder.mutation({
      async queryFn(newComment) {
        try {
          await addDoc(collection(dbService, "comments"), newComment);
          return { data: newComment };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Comments"],
    }),
    getComment: builder.query<CommentType[], void>({
      async queryFn() {
        try {
          const commentQuery = query(
            collection(dbService, "comments"),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(commentQuery);
          let comments: any = [];
          querySnapshot?.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() } as CommentType);
          });
          return { data: comments };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      async queryFn({ commentId, createdAt, name, context }) {
        try {
          await updateDoc(doc(dbService, "comments", commentId), {
            context,
            name,
            createdAt,
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      async queryFn(commentId) {
        try {
          await deleteDoc(doc(dbService, "comments", commentId));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = courseApi;
