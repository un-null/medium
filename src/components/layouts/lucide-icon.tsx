import {
  Film,
  Home,
  Newspaper,
  Mailbox,
  Package,
  MoveLeft,
} from "lucide-react";

export const LucideIcon = ({
  type,
  isActive,
}: {
  type: string;
  isActive?: boolean;
}) => {
  const color = isActive ? "#f4f4f5" : "#71717a";
  return (
    <>
      {type === "home" && <Home size={24} color={color} />}
      {type === "article" && <Newspaper size={24} color={color} />}
      {type === "work" && <Package size={24} color={color} />}
      {type === "vlog" && <Film size={24} color={color} />}
      {type === "contact" && <Mailbox size={24} color={color} />}
      {type === "back" && <MoveLeft size={20} color={"#f4f4f5"} />}
    </>
  );
};
