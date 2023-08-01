import { type CardUser } from "@/types";

export default function UserCard({ element }: CardUser): JSX.Element {
  return (
    <div>
      <h1>UserCard</h1>
      <p>{element.name}</p>
    </div>
  );
}
