import { useState, useRef } from "react";
import {
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "./redux/modules/apiSlice";
import { debounce } from "lodash";

const App = () => {
  const { data, isError, isLoading } = useGetCommentQuery();
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [password, setPassword] = useState("");
  const trimName = name && name.trim();
  const trimContext = context && context.trim();
  const trimPassword = password && password.trim();

  console.log(trimName, trimContext, trimPassword);

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

  //방명록 추가
  const [addComment] = useAddCommentMutation();
  const onSubmitAddCommentHandler = (
    e: React.FormEvent<HTMLFormElement>,
    addFn: any,
    newContent: CommentType
  ) => {
    e.preventDefault();
    if (trimName && trimContext && trimPassword) {
      addFn(newContent);
      nameRef.current.value = "";
      contextRef.current.value = "";
      passwordRef.current.value = "";
      setName("");
      setPassword("");
      setContext("");
      console.log("방명록 추가");
    } else {
      alert("빈칸없이 작성해주세요");
    }
  };

  //방명록 삭제
  const [deleteComment] = useDeleteCommentMutation();
  const onClickDeleteCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteFn: (id: string | undefined) => void,
    id: string | undefined
  ) => {
    e.preventDefault();
    deleteFn(id);
  };

  //방명록 수정
  const [updateComment] = useUpdateCommentMutation();
  const onClickUpdateCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    updateFn: (id: string | undefined) => void,
    id: string | undefined
  ) => {
    e.preventDefault();
    updateFn(id);
  };

  const newComment = {
    createdAt: new Date(),
    name: trimName,
    context: trimContext,
    password: trimPassword,
  };

  if (isError) {
    return <>Error: 데이터를 불러오지 못했습니다.</>;
  }

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <div className="flex justify-center bg-pink-200  ">
      <div className="bg-purple-100 w-[30%]">
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
                onClick={(e) =>
                  onClickUpdateCommentHandler(e, updateComment, item.id)
                }
              >
                수정
              </button>
              <button
                onClick={(e) =>
                  onClickDeleteCommentHandler(e, deleteComment, item.id)
                }
              >
                삭제
              </button>
            </div>
          );
        })}
        <div>
          <div>music</div>
          <img className="" src="/assets/marriage painting.png"></img>
          <div>영어/한국어</div>
          <div>김선형 & 판데이 수단슈</div>
          <div>결혼합니다</div>
          <div>2023년 9월 15일 토요일 오전 10시 30분</div>
          <div>세종대왕 기념관 궁중의례원</div>
          <button>참석여부 조사 모달</button>
          <div>갤러리</div>
          <div>방명록</div>
          <div> 마음전하실 곳</div>
          <div> 달력</div>
          <div> 지도 </div>
          <div> 공유</div>

          <form
            onSubmit={(e) =>
              onSubmitAddCommentHandler(e, addComment, newComment)
            }
          >
            <label>성명</label>
            <input ref={nameRef} onChange={(e) => onChangeNameHandler(e)} />
            <label>비밀번호</label>
            <input
              ref={passwordRef}
              onChange={(e) => onChangePasswordHandler(e)}
            />
            <label>코멘트</label>
            <textarea
              ref={contextRef}
              onChange={(e) => onChangeContextHandler(e)}
            />
            <button>입력</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
