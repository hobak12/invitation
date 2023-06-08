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
      <div className="bg-orang-200 p-2  ">
        {data?.map((item) => {
          return (
            <div key={item.id} className="border-2 bg-white rounded-lg ">
              <div className="bg-blue-200 ">
                {item.id !== test ? (
                  <>
                    <div className="">{item.context}</div>
                    <div>-{item.name}-</div>
                    <div className=" text-xs text-gray-500 ">
                      {new Date(
                        item.createdAt.seconds * 1000 +
                          item.createdAt.nanoseconds / 1000000
                      ).toLocaleString()}
                    </div>
                    <button
                      id={item.id}
                      className={` button`}
                      onClick={(e) => {
                        openEdit(e);
                      }}
                    >
                      수정
                    </button>
                  </>
                ) : (
                  <div>
                    <input
                      placeholder="비밀번호를 입력해주세요"
                      ref={passwordRef}
                      onChange={(e) => onChangePasswordHandler(e)}
                    />

                    <textarea
                      placeholder="수정할 내용을 입력해주세요"
                      ref={contextRef}
                      onChange={(e) => onChangeContextHandler(e)}
                    />

                    <input
                      placeholder="수정할 성명을 입력해주세요"
                      ref={nameRef}
                      onChange={(e) => onChangeNameHandler(e)}
                    />

                    <button
                      className="button"
                      onClick={(e) =>
                        onClickUpdateCommentHandler(e, updateComment, item.id)
                      }
                    >
                      확인
                    </button>
                    <button
                      id={item.id}
                      className="button"
                      onClick={(e) => closeEdit(e)}
                    >
                      취소
                    </button>
                  </div>
                )}

                <button
                  className={`${showEdit ? "" : "hidden"} ${
                    showDelete ? "" : "hidden"
                  } button`}
                  onClick={toggleDelete}
                >
                  삭제
                </button>

                <div className={`${showDelete ? "hidden" : ""} `}>
                  <label>비밀번호</label>
                  <input
                    ref={passwordRef}
                    onChange={(e) => onChangePasswordHandler(e)}
                  />
                  <button
                    className="button"
                    onClick={(e) =>
                      onClickDeleteCommentHandler(e, deleteComment, item.id)
                    }
                  >
                    확인
                  </button>
                  <button className="button" onClick={toggleDelete}>
                    취소
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
