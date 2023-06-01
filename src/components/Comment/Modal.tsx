import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/modules/apiSlice";
import { debounce } from "lodash";

const Modal = ({ setModalOpen, modalOpen, data }: any) => {
  const navigate = useNavigate();

  const closeModal = (e: any) => {
    e.stopPropagation();
    setModalOpen(false);
    navigate(`/`);
  };

  const paramId = useParams().id;
  const modalData = data.find((item: any) => item.id === paramId);
  const modalRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const trimName = name && name.trim();
  const trimContext = context && context.trim();
  const trimPassword = password && password.trim();

  const nameRef = useRef<any>();
  const contextRef = useRef<any>();
  const editPasswordRef = useRef<any>();
  const deletePasswordRef = useRef<any>();

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
    updateFn: any
  ) => {
    e.preventDefault();
    if (modalData?.password === trimPassword) {
      updateFn({
        commentId: paramId,
        createdAt: new Date(),
        name: trimName,
        context: trimContext,
      });
      nameRef.current.value = "";
      contextRef.current.value = "";
      editPasswordRef.current.value = "";
      setName("");
      setContext("");
      setPassword("");
      toggleEdit();
    } else {
      alert("비번이 틀렸슴둥");
      setPassword("");
      editPasswordRef.current.value = "";
    }
  };

  //수정 토글
  const toggleEdit = () => {
    setShowEdit((current) => !current);
    nameRef.current.value = modalData.name;
    contextRef.current.value = modalData.context;
  };

  // 방명록 삭제
  const [showDelete, setShowDelete] = useState<boolean>(true);
  const [deleteComment] = useDeleteCommentMutation();
  const onClickDeleteCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteFn: (id: string | undefined) => void
  ) => {
    e.preventDefault();

    if (modalData.password === trimPassword) {
      deleteFn(paramId);
      setPassword("");
      deletePasswordRef.current.value = "";
      closeModal(e);
    } else {
      alert("비번이 틀렸슴둥");
      deletePasswordRef.current.value = "";
    }
  };

  // 삭제토글
  const toggleDelete = () => {
    setShowDelete((current) => !current);
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal(e);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={modalRef}
      className={`${
        modalOpen ? "" : "hidden"
      } w-[300px] h-[200px] z-[50] top-[40%] left-[35%] fixed bg-gray-200  border-2 border-black rounded-lg flex flex-col items-center`}
    >
      <div className="bg-yellow-200 ">
        {modalData && (
          <div className={` ${showEdit ? "" : "hidden"} `}>
            <div>{modalData.context}</div>
            <div>-{modalData.name}-</div>
            <div>{modalData.password}</div>
          </div>
        )}

        <button onClick={closeModal} className="button absolute  top-0 right-0">
          닫기
        </button>

        <button
          className={`${showEdit ? "" : "hidden"} ${
            showDelete ? "" : "hidden"
          } button `}
          onClick={() => {
            toggleEdit();
          }}
        >
          수정
        </button>
        {/* 수정 버튼 누르고 보이는 부분 */}
        <div className={`${showEdit ? "hidden" : ""} `}>
          <label>성명</label>
          <input ref={nameRef} onChange={(e) => onChangeNameHandler(e)} />
          <label>코멘트</label>
          <textarea
            ref={contextRef}
            onChange={(e) => onChangeContextHandler(e)}
          />

          <input
            placeholder="비밀번호를 입력해주세요"
            ref={editPasswordRef}
            onChange={(e) => onChangePasswordHandler(e)}
          />
          <button
            className="button"
            onClick={(e) => onClickUpdateCommentHandler(e, updateComment)}
          >
            확인
          </button>
          <button className="button" onClick={toggleEdit}>
            취소
          </button>
        </div>

        <button
          className={`${showEdit ? "" : "hidden"} ${
            showDelete ? "" : "hidden"
          } button`}
          onClick={toggleDelete}
        >
          삭제
        </button>
        {/* 삭제 버튼 누르고 보이는 부분 */}

        <div className={`${showDelete ? "hidden" : ""} `}>
          <input
            placeholder="비밀번호를 입력해주세요"
            ref={deletePasswordRef}
            onChange={(e) => onChangePasswordHandler(e)}
          />
          <button
            className="button"
            onClick={(e) => onClickDeleteCommentHandler(e, deleteComment)}
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
};

export default Modal;
