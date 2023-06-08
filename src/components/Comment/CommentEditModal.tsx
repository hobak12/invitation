import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateCommentMutation } from "../../redux/modules/apiSlice";
import { debounce } from "lodash";
import { RiCloseFill } from "react-icons/ri";

const CommentEditModal = ({ data, setOpenEditModal, openEditModal }: any) => {
  const navigate = useNavigate();
  const onClickCloseEditModal = () => {
    setOpenEditModal(false);
    setName("");
    setContext("");
    setPassword("");
    navigate("/");
    editPasswordRef.current.value = "";
  };
  const [updateComment] = useUpdateCommentMutation();
  const paramId = useParams().id;
  const modalData = data.find((item: any) => item.id === paramId);

  const [name, setName] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const trimName = name && name.trim();
  const trimContext = context && context.trim();
  const trimPassword = password && password.trim();

  const editPasswordRef = useRef<any>();

  const onChangeNameHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onChangeContextHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setContext(e.target.value);
  };

  const onChangePasswordHandler = debounce((e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }, 500);

  //방명록 수정

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

      editPasswordRef.current.value = "";
      setName("");
      setContext("");
      setPassword("");
      onClickCloseEditModal();
    } else {
      alert("비번이 틀렸슴둥");
      setPassword("");
      editPasswordRef.current.value = "";
    }
  };

  useEffect(() => {
    if (modalData) {
      setName(modalData.name);
      setContext(modalData.context);
    }
  }, [modalData]);

  console.log(modalData?.password === trimPassword);
  console.log("modalData?.password", modalData?.password);
  console.log("trimPassword", trimPassword);
  console.log(modalData);

  return (
    <div
      className={`${
        openEditModal ? "" : "hidden"
      } w-[300px]  z-[50] top-[40%] left-[35%] fixed bg-white p-4 rounded-lg flex flex-col items-center pb-7`}
    >
      <div className=" ">
        <button
          onClick={onClickCloseEditModal}
          className=" absolute top-0 right-0"
        >
          <RiCloseFill className="hover:bg-pink-200 rounded-full w-[22px] h-[22px] m-2 " />
        </button>

        {/* 수정 버튼 누르고 보이는 부분 */}
        <div>
          <div className="flex gap-2 mt-6">
            <div>
              <label className="bg-white absolute left-7 top-7 text-xs p-1">
                이름
              </label>
              <input
                className="input"
                value={name}
                onChange={(e) => onChangeNameHandler(e)}
              />
            </div>
            <div>
              <input
                className="input "
                placeholder="비밀번호"
                ref={editPasswordRef}
                onChange={(e) => onChangePasswordHandler(e)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className=" bg-white absolute left-8 text-xs p-1">
              방명록 내용
            </label>
            <textarea
              className="textAreaEdit mt-3"
              value={context}
              onChange={(e) => onChangeContextHandler(e)}
            />
          </div>

          <button
            className="buttonEdit mt-3"
            onClick={(e) => onClickUpdateCommentHandler(e, updateComment)}
          >
            방명록 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEditModal;
