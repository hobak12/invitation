import { useState, useRef } from "react";
import {
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "./redux/modules/apiSlice";
import { debounce } from "lodash";

export interface CommentType {
  createdAt?: number;
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

  const newComment = {
    createdAt: Date.now(),
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
    <div>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.context}</div>
          </div>
        );
      })}
      <div>
        <div>music</div>
        <div> 왜 안뜨지?</div>
        <div>김선형 & 판데이 수단슈</div>
        <div>결혼합니다</div>
        <div>2023년 9월 15일 토요일 오전 10시 30분</div>
        <div>세종대왕 기념관 궁중의례원</div>
        <button>참석여부 조사</button>
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
  );
};

export default App;
