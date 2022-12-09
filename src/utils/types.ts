import { string } from "yup/lib/locale";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  dob: string;
  image: {
    publicId: string;
    url: string;
  }
}

export type PostT = {
  content: string;
  image: any;
  comments?: any;
  likes?: string[];
  postedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TUser = {
  avatar: {
    publicId: string; 
    url: string;
  }
  bookmarks: string[];
  createdAt?: string;
  email: string;
  follower: string[];
  following: string[];
  id: string;
  name: string;
  post: PostT[];
  updatedAt?: string;
  username: string;
}

export interface IState {
  auth: {
    isAuthenticated: boolean,
    user: any;
  };
  posts: PostT[]
  user: IRegister[];
}
