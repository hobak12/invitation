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
    <div>
      <form
        onSubmit={(e) => onSubmitAddCommentHandler(e, addComment, newComment)}
      >
        <input
          placeholder="성명을 입력해주세요"
          ref={nameRef}
          onChange={(e) => onChangeNameHandler(e)}
        />

        <input
          placeholder="비밀번호를 입력해주세요"
          ref={passwordRef}
          onChange={(e) => onChangePasswordHandler(e)}
        />

        <textarea
          placeholder="방명록을 입력해주세요"
          ref={contextRef}
          onChange={(e) => onChangeContextHandler(e)}
        />
        <button className="button">입력</button>
      </form>
      <button className="button">닫기</button>
    </div>
  );
};
export default CommentInput;
