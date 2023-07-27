import { type User } from "@/types";

export default function UserCard({
  element,
  isPopupOpen,
  togglePopup,
}: {
  element: User;
  isPopupOpen: boolean;
  togglePopup: () => void;
}): JSX.Element {
  return <h1>UserCard</h1>;
}
