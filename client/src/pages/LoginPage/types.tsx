export type usernameType = string;
export type passwordType = string;
export type loggedInStatus = "failed1" | "failed2" | "null";

export interface LoginPageProps {
  updateLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  updateUsername: React.Dispatch<React.SetStateAction<usernameType>>;
}
