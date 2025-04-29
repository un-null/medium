import Image from "next/image";

export function NoContent() {
	return (
		<div className="w-full grid place-items-center">
			<Image
				src={"/no-content.svg"}
				alt="no-content"
				width={300}
				height={200}
				objectFit="cover"
			/>
		</div>
	);
}
