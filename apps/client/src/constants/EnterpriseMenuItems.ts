import { type MenuItem } from "@/types";
import { ID_TO_REPLACE } from "./General";

export const EnterpriseMenuItems: MenuItem[] = [
  {
    id: "edit",
    label: "Editar",
    icon: "/pencil-black.svg",
    isLink: true,
    navigate: `/admin-panel/enterprise/${ID_TO_REPLACE}/edit`,
  },
];
