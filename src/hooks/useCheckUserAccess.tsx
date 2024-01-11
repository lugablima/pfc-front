import { NavigateFunction } from "react-router-dom";
import { IUserData } from "../contexts/UserContext";

export default function checkUserAccess(
  userInfo: IUserData | null,
  navigate: NavigateFunction,
) {
  if (!userInfo) {
    navigate("/");
  }
}
