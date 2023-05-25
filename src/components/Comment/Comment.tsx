import { CommentInput, Modal } from "../Comment/index";
import { useState, useRef } from "react";
import {
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";
import { debounce } from "lodash";

const Comment = () => {
  const { data, isError, isLoading } = useGetCommentQuery();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const showModal = (e: any) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const closeModal = (e: any) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const [name, setName] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const trimName = name && name.trim();
  const trimContext = context && context.trim();
  const trimPassword = password && password.trim();

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
    id: string | undefined
  ) => {
    e.preventDefault();
    let pickdata = data?.find((item) => item.id === id);
    if (pickdata?.password === trimPassword) {
      updateFn({
        commentId: id,
        createdAt: new Date(),
        name: trimName,
        context: trimContext,
      });
      nameRef.current.value = "";
      contextRef.current.value = "";
      passwordRef.current.value = "";
      setName("");
      setContext("");
      setPassword("");
      toggleEdit(id);
    } else {
      alert("비번이 틀렸습니다");
    }
  };

  //수정 토글
  const toggleEdit = (id: any) => {
    setShowEdit((current) => !current);
    let pickdata = data?.find((item) => item.id === id);
    nameRef.current.value = pickdata?.name;
    contextRef.current.value = pickdata?.context;
  };

  // 방명록 삭제
  const [showDelete, setShowDelete] = useState<boolean>(true);
  const [deleteComment] = useDeleteCommentMutation();
  const onClickDeleteCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteFn: (id: string | undefined) => void,
    id: string | undefined
  ) => {
    e.preventDefault();
    deleteFn(id);
  };

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
    <>
      <div className="bg-purple-100 ">
        {data?.map((item) => {
          return (
            <div key={item.id} className="border-2 border-black">
              <button onClick={showModal}>모달</button>

              <div className={` ${showEdit ? "" : "hidden"} `}>
                <div>내용:{item.context}</div>
                <div>성명:{item.name}</div>
                <div>비번:{item.password}</div>
                <div>
                  {new Date(
                    item.createdAt.seconds * 1000 +
                      item.createdAt.nanoseconds / 1000000
                  ).toLocaleString()}
                </div>
                <button
                  onClick={() => {
                    toggleEdit(item.id);
                  }}
                >
                  수정
                </button>
              </div>
              {/* 수정 버튼 누르고 보이는 부분 */}
              <div className={`${showEdit ? "hidden" : ""} `}>
                <label>성명</label>
                <input ref={nameRef} onChange={(e) => onChangeNameHandler(e)} />
                <label>코멘트</label>
                <textarea
                  ref={contextRef}
                  onChange={(e) => onChangeContextHandler(e)}
                />

                <label>비밀번호</label>
                <input
                  ref={passwordRef}
                  onChange={(e) => onChangePasswordHandler(e)}
                />
                <button
                  onClick={(e) =>
                    onClickUpdateCommentHandler(e, updateComment, item.id)
                  }
                >
                  확인
                </button>
                <button onClick={toggleEdit}>취소</button>
              </div>
              <button
                className={`${showDelete ? "" : "hidden"} `}
                onClick={toggleDelete}
              >
                삭제
              </button>
              {/* 삭제 버튼 누르고 보이는 부분 */}
              <div className={`${showDelete ? "hidden" : ""} `}>
                <label>비밀번호</label>
                <input
                  ref={passwordRef}
                  onChange={(e) => onChangePasswordHandler(e)}
                />
                <button
                  onClick={(e) =>
                    onClickDeleteCommentHandler(e, deleteComment, item.id)
                  }
                >
                  확인
                </button>
                <button onClick={toggleDelete}>취소</button>
              </div>
            </div>
          );
        })}
        <Modal closeModal={closeModal} modalOpen={modalOpen} />
      </div>
      <CommentInput />
    </>
  );
};

export default Comment;
