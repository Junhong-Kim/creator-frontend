export interface IUser {
  id: number;
  displayName: string;
  picture: string;
  email: string;
  googleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChannelThumbnail {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

export interface IPost {
  id: number;
  title: string;
  contents: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  updatedAt: string;
  isValid: boolean;
  userId: number;
  user: IUser;
}
