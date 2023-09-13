import { type Title } from "@/types";

export default function As({ name, as, style = {} }: Title): JSX.Element {
  const Tag = as;
  return <Tag style={{ ...style }}>{name}</Tag>;
}
