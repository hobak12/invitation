import { CommentInput, CommentEditModal, CommentDeleteModal } from "./index";
import { useState, useRef, useEffect } from "react";
import { useGetCommentQuery } from "../../redux/modules/apiSlice";
import { useNavigate } from "react-router-dom";

const Comment = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetCommentQuery();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  if (isError) {
    return <>Error: 데이터를 불러오지 못했습니다.</>;
  }

  if (isLoading) {
    return <>loading...</>;
  }

  const onClickOpenEditModal = (id: any) => {
    setOpenEditModal(true);
    navigate(`${id}`);
  };

  const onClickOpenDeleteModal = (id: any) => {
    setOpenDeleteModal(true);
    navigate(`${id}`);
  };

  return (
    <div className="mb-[20%]">
      <CommentInput />
      <div className="h-[400px] overflow-y-scroll overflow-x-hidden">
        {data?.map((item) => {
          return (
            <div
              key={item.id}
              className="rounded-lg m-2 p-1 bg-[#ffeef1] sm:text-sm text-base "
            >
              <div className=" flex justify-evenly">
                <div className="sm:w-[20%] w-[14%] p-1 h-fit my-auto">
                  {item.name}
                </div>
                <div className="sm:w-[50%] w-[64%] p-1 h-fit my-auto">
                  {item.context}
                </div>

                <div className=" text-xs sm:text-[5px] text-[#999] text-center p-1 h-fit my-auto">
                  <div>
                    {new Date(
                      item.createdAt.seconds * 1000 +
                        item.createdAt.nanoseconds / 1000000
                    )
                      .toLocaleString()
                      .slice(0, 10)}
                  </div>
                  <div>
                    {new Date(
                      item.createdAt.seconds * 1000 +
                        item.createdAt.nanoseconds / 1000000
                    )
                      .toLocaleString()
                      .slice(11, 19)}
                  </div>
                </div>

                <div className=" flex flex-col h-fit my-auto">
                  <button
                    id={item.id}
                    className="commentButton"
                    onClick={() => onClickOpenEditModal(item.id)}
                  >
                    수정
                  </button>
                  <button
                    className="commentButton"
                    onClick={() => onClickOpenDeleteModal(item.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CommentEditModal
        data={data}
        setOpenEditModal={setOpenEditModal}
        openEditModal={openEditModal}
      />
      <CommentDeleteModal
        data={data}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
      />
    </div>
  );
};

export default Comment;
