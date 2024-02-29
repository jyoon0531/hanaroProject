type LoginUser = { id: number };
type Session = {
  loginUser: LoginUser | null;
  username: string;
};
