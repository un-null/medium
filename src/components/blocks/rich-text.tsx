import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText = ({ text }: { text: RichTextItemResponse[] }) => {
  return (
    <p className="inline whitespace-pre-wrap break-words leading-loose text-zinc-300">
      {text.length === 0 ? (
        <span className="block h-6" />
      ) : (
        <>
          {text.map((textItem, index: number) => {
            if (textItem.href) {
              return (
                <a
                  key={index}
                  href={textItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 underline underline-offset-1 hover:text-zinc-200"
                >
                  {textItem.plain_text}
                </a>
              );
            }
            return textItem.plain_text;
          })}
        </>
      )}
    </p>
  );
};
