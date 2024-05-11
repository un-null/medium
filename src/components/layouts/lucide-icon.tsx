import {
  Film,
  Home,
  Newspaper,
  Mailbox,
  Package,
  MoveLeft,
  ChevronRight,
  Paintbrush,
} from "lucide-react";

export const LucideIcon = ({
  type,
  isActive,
  size,
  color,
}: {
  type: string;
  isActive?: boolean;
  size?: number;
  color?: string;
}) => {
  const active = isActive ? "#f4f4f5" : "#71717a";
  return (
    <>
      {type === "home" && <Home size={24} color={active} />}
      {type === "article" && <Newspaper size={24} color={active} />}
      {type === "work" && <Package size={24} color={active} />}
      {type === "vlog" && <Film size={24} color={active} />}
      {type === "contact" && <Mailbox size={24} color={active} />}
      {type === "back" && <MoveLeft size={20} color={"#f4f4f5"} />}
      {type === "go" && (
        <ChevronRight
          size={size ? size : 20}
          color={color ? color : "#f4f4f5"}
        />
      )}
      {type === "paint" && (
        <Paintbrush size={size ? size : 20} color={"#f4f4f5"} />
      )}
    </>
  );
};
