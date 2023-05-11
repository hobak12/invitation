import { useState, useRef } from "react";
import { useAddCommentMutation } from "../../redux/modules/apiSlice";
import { debounce } from "lodash";

const CommentInput = () => {
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

  const newComment = {
    createdAt: new Date(),
    name: trimName,
    context: trimContext,
    password: trimPassword,
  };

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
  return (
    <>
      {" "}
      <form
        onSubmit={(e) => onSubmitAddCommentHandler(e, addComment, newComment)}
      >
        <label>성명</label>
        <input ref={nameRef} onChange={(e) => onChangeNameHandler(e)} />
        <label>비밀번호</label>
        <input ref={passwordRef} onChange={(e) => onChangePasswordHandler(e)} />
        <label>코멘트</label>
        <textarea
          ref={contextRef}
          onChange={(e) => onChangeContextHandler(e)}
        />
        <button>입력</button>
      </form>
    </>
  );
};
export default CommentInput;
