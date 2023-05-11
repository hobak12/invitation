import CommentInput from "./CommentInput";
import { useState, useRef } from "react";
import {
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";
import { debounce } from "lodash";

const Comment = () => {
  const { data, isError, isLoading } = useGetCommentQuery();

  //방명록 삭제
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

  // 삭제 PW 토글
  const toggledelete = () => {
    setShowDelete((current) => !current);
  };

  //방명록 수정
  const [showEditPW, setShowEditPW] = useState<boolean>(true);
  const [showEdit, setShowEdit] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [editContext, setEditContext] = useState<string>("");
  const [editPW, setEditPW] = useState<string>("");

  const editNameRef = useRef<any>();
  const editContextRef = useRef<any>();

  const onChangeEditNameHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setEditName(e.target.value);
  }, 500);

  const onChangeEditContextHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setEditContext(e.target.value);
  }, 500);

  const onChangeEditPasswordHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setEditPW(e.target.value);
  }, 500);

  const trimEditName = editName && editName.trim();
  const trimEditContext = editContext && editContext.trim();
  const trimEditPW = editPW && editPW.trim();

  const [updateComment] = useUpdateCommentMutation();
  const onClickUpdateCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    updateFn: (id: string | undefined) => void,
    id: string | undefined
  ) => {
    e.preventDefault();
    updateFn(id);
  };

  //수정 PW 토글
  const toggleEditPW = () => {
    setShowEditPW((current) => !current);
  };

  //수정 토글
  const toggleEdit = (id: string | undefined) => {
    if (data?.find((item) => item.id === id)?.password === trimEditPW) {
      setShowEdit((current) => !current);
      setShowEditPW((current) => !current);
    } else {
      alert("비번 틀림");
    }
  };

  if (isError) {
    return <>Error: 데이터를 불러오지 못했습니다.</>;
  }

  if (isLoading) {
    return <>loading...</>;
  }
  return (
    <>
      <div className="bg-purple-100">
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.context}</div>
              <div>{item.name}</div>
              <div>{item.password}</div>
              <div>
                {new Date(
                  item.createdAt.seconds * 1000 +
                    item.createdAt.nanoseconds / 1000000
                ).toLocaleString()}
              </div>
              <button
                className={`${showEditPW ? "" : "hidden"} `}
                onClick={toggleEditPW}
              >
                수정
              </button>
              <div className={`${showEditPW ? "hidden" : ""} `}>
                <label>비밀번호</label>
                <input />
                <button onClick={() => toggleEdit(item.id)}>입력</button>
              </div>
              <div className={`${showEdit ? "hidden" : ""} `}></div>
              <div>
                <label>성명</label>
                <input />
                <label>코멘트</label>
                <textarea />
                <button
                  onClick={(e) =>
                    onClickUpdateCommentHandler(e, updateComment, item.id)
                  }
                >
                  확인
                </button>
                <button onClick={() => toggleEdit(item.id)}>취소</button>
              </div>
              {/* <button
                onClick={(e) =>
                  onClickDeleteCommentHandler(e, deleteComment, item.id)
                }
              >
                삭제
              </button>
              <div>
                <label>비밀번호</label>
                <input />
                <button>취소</button>
              </div> */}
            </div>
          );
        })}
      </div>
      <CommentInput />
    </>
  );
};

export default Comment;
