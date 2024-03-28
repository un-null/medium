import { Film, Home, Mail, Mailbox, Package } from "lucide-react";

export const LucideIcon = ({
  type,
  isActive,
}: {
  type: string;
  isActive: boolean;
}) => {
  const color = isActive ? "#f4f4f5" : "#71717a";
  return (
    <>
      {type === "home" && <Home size={24} color={color} />}
      {type === "article" && <Mailbox size={24} color={color} />}
      {type === "work" && <Package size={24} color={color} />}
      {type === "vlog" && <Film size={24} color={color} />}
      {type === "contact" && <Mail size={24} color={color} />}
    </>
  );
};
