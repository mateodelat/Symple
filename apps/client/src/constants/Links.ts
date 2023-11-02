import { type Link } from "@/types";

export const headerNavLinks: Link[] = [
  // { href: "/departments", label: "Departamentos" },
  { href: "/my-mentoring", label: "Mis mentorías" },
  { href: "/admin-panel", label: "Admin panel", roleRestriction: "admin" },
  { href: "/my-profile", label: "Mi perfil" },
];
