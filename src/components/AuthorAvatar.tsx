import Avatar from "boring-avatars";
import Image from "next/image";

interface Props {
	avatar: string;
	name: string;
	size?: number;
}

export function AuthorAvatar({ avatar, name, size = 20 }: Props) {
	if (avatar.startsWith("http")) {
		return (
			<Image
				src={avatar}
				width={size}
				height={size}
				alt={name}
				className="rounded-full"
			/>
		);
	}
	return <Avatar size={size} name={name} variant="beam" />;
}
