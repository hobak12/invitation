import { useRef, useState } from "react";

import { useDeleteCommentMutation } from "../../redux/modules/apiSlice";

import { debounce } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

const CommentDeleteModal = ({
  data,
  setOpenDeleteModal,
  openDeleteModal,
}: any) => {
  const navigate = useNavigate();
  const paramId = useParams().id;
  const modalData = data.find((item: any) => item.id === paramId);

  const onClickCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    navigate("/");
  };

  // 방명록 삭제

  const [password, setPassword] = useState<string>("");
  const [deleteComment] = useDeleteCommentMutation();
  const deletePasswordRef = useRef<any>();
  const trimPassword = password && password.trim();

  const onChangePasswordHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }, 500);

  const onClickDeleteCommentHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    deleteFn: (id: string | undefined) => void
  ) => {
    e.preventDefault();

    if (modalData.password === trimPassword) {
      deleteFn(paramId);
      setPassword("");
      deletePasswordRef.current.value = "";
      onClickCloseDeleteModal();
    } else {
      alert("비번이 틀렸슴둥");
      deletePasswordRef.current.value = "";
    }
  };

  return (
    <div
      className={`${
        openDeleteModal ? "" : "hidden"
      }  bg-white shadow-lg rounded-lg  h-fit fixed top-0 left-0 right-0 bottom-0 m-auto w-[300px] p-10 z-50`}
    >
      <button
        onClick={onClickCloseDeleteModal}
        className=" absolute top-0 right-0"
      >
        <RiCloseFill className="hover:bg-pink-200 rounded-full w-[22px] h-[22px] m-2 " />
      </button>
      <div>
        <input
          className="inputPW mr-4"
          placeholder="비밀번호"
          ref={deletePasswordRef}
          onChange={(e) => onChangePasswordHandler(e)}
        />
        <button
          className="button"
          onClick={(e) => onClickDeleteCommentHandler(e, deleteComment)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
