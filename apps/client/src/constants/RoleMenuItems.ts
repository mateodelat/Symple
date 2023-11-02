import { type MenuItem } from "@/types";

const RoleMenuItems: MenuItem[] = [
  {
    id: "edit",
    label: "Editar",
    icon: "/pencil-black.svg",
    isLink: false,
  },
  {
    id: "delete",
    label: "Borrar",
    icon: "/trash_bin.svg",
    isLink: false,
  },
];

export default RoleMenuItems;
