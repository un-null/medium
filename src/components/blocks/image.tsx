import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const Image = ({ block }: { block: ImageBlockObjectResponse }) => {
  const src = block.image.type === "file" ? block.image.file.url : "";

  const caption =
    block.image.caption.length > 0 ? block.image.caption?.[0]?.plain_text : "";

  return (
    <img
      src={src}
      alt={caption}
      loading="lazy"
      className="h-auto w-[300px] border-zinc-500 sm:w-auto"
    />
  );
};
