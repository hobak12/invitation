import { CommentInput } from "./index";
import { useState, useRef, useEffect } from "react";
import {
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";

import { debounce } from "lodash";

const Comment = () => {
  const [test, setTest] = useState("");
  const { data, isError, isLoading } = useGetCommentQuery();

  const [name, setName] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const trimName = name && name.trim();
  const trimContext = context && context.trim();

  const nameRef = useRef<any>();
  const contextRef = useRef<any>();
  const passwordRef = useRef<any>();

  const onChangeNameHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setName(e.target.value);
  }, 500);

  const onChangeContextHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setContext(e.target.value);
  }, 500);

  const onChangePasswordHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }, 500);

  //방명록 수정
  const [showEdit, setShowEdit] = useState<boolean>(true);

  const [updateComment] = useUpdateCommentMutation();
  const onClickUpdateCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    updateFn: any,
    id: any
  ) => {
    e.preventDefault();

    updateFn({
      commentId: id,
      createdAt: new Date(),
      name: trimName,
      context: trimContext,
    });
  };

  //수정 토글
  const openEdit = (e: any) => {
    setTest(e.target.id);
    const editData = data?.find((item: any) => item.id === e.target.id);
  };

  const closeEdit = (e: any) => {
    setTest("");
  };

  // 방명록 삭제
  const [showDelete, setShowDelete] = useState<boolean>(true);
  const [deleteComment] = useDeleteCommentMutation();
  const onClickDeleteCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteFn: (id: string | undefined) => void,
    id: any
  ) => {
    e.preventDefault();

    deleteFn(id);
  };

  useEffect(() => {}, [test]);

  // 삭제토글
  const toggleDelete = () => {
    setShowDelete((current) => !current);
  };

  if (isError) {
    return <>Error: 데이터를 불러오지 못했습니다.</>;
  }

  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <div className="mb-[20%]">
      <CommentInput />
      <div className="h-[400px] overflow-y-scroll overflow-x-hidden">
        {data?.map((item) => {
          return (
            <div
              key={item.id}
              className="rounded-lg m-2 p-1 bg-[#ffeef1] sm:text-sm text-base "
            >
              <div className=" flex justify-evenly">
                <div className="sm:w-[20%] w-[14%] p-1 h-fit my-auto">
                  {item.name}
                </div>
                <div className="sm:w-[50%] w-[64%] p-1 h-fit my-auto">
                  {item.context}
                </div>

                <div className=" text-xs sm:text-[5px] text-[#999] text-center p-1 h-fit my-auto">
                  <div>
                    {new Date(
                      item.createdAt.seconds * 1000 +
                        item.createdAt.nanoseconds / 1000000
                    )
                      .toLocaleString()
                      .slice(0, 10)}
                  </div>
                  <div>
                    {new Date(
                      item.createdAt.seconds * 1000 +
                        item.createdAt.nanoseconds / 1000000
                    )
                      .toLocaleString()
                      .slice(11, 19)}
                  </div>
                </div>

                <div className=" flex flex-col h-fit my-auto">
                  <button
                    id={item.id}
                    className="commentButton"
                    onClick={(e) => {
                      openEdit(e);
                    }}
                  >
                    수정
                  </button>
                  <button className="commentButton" onClick={toggleDelete}>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
