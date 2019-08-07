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
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}
