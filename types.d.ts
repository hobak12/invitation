declare interface CommentType {
  createdAt?: number;
  id?: string;
  userId?: string;
  postId?: string;
  nickname?: string | null | undefined;
  comment?: string | undefined;
  profileImage: string | null | undefined;
}
