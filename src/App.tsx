import { useState, useRef } from "react";
import {
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "./redux/modules/apiSlice";
import { debounce } from "lodash";
import { Timestamp } from "@firebase/firestore";

export interface CommentType {
  createdAt?: any;
  id?: string;
  name: string;
  context: string;
}

const App = () => {
  const nameRef = useRef<any>();
  const contextRef = useRef<any>();
  const [addComment] = useAddCommentMutation();
  const { data, isError, isLoading } = useGetCommentQuery();
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const trimName = name && name.trim();
  const trimContext = context && context.trim();

  {
    data?.map((item) => console.log(String(item.createdAt.toDate())));
  }

  const newComment = {
    createdAt: new Date(),
    name: trimName,
    context: trimContext,
  };

  const onChangeNameHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setName(e.target.value);
  }, 500);

  const onChangeContextHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setContext(e.target.value);
  }, 500);

  const onSubmitCommentHandler = (
    e: React.FormEvent<HTMLFormElement>,
    addFn: any,
    newContent: CommentType
  ) => {
    e.preventDefault();
    addFn(newContent);
    nameRef.current.value = "";
    contextRef.current.value = "";
  };

  if (isError) {
    return <>Error: 데이터를 불러오지 못했습니다.</>;
  }

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <div className="flex justify-center bg-pink-200 ">
      <div className="bg-purple-100">
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.context}</div>
              <div>{item.name}</div>
              <div>{String(item.createdAt.toDate()).slice(0, 21)}</div>
              <button>수정</button>
              <button>삭제</button>
              <div>비밀번호</div>
              <div>{}</div>
            </div>
          );
        })}
        <div>
          <div>music</div>
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
            onSubmit={(e) => onSubmitCommentHandler(e, addComment, newComment)}
          >
            <label>성명</label>
            <input ref={nameRef} onChange={(e) => onChangeNameHandler(e)} />
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
