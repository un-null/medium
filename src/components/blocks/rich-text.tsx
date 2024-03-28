import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText = ({ text }: { text: RichTextItemResponse[] }) => {
  return (
    <p className="inline whitespace-pre-wrap break-words leading-loose">
      {text.length === 0 ? (
        <span className="block h-6" />
      ) : (
        <>
          {text.map((textItem, _: number) => {
            return textItem.plain_text;
          })}
        </>
      )}
    </p>
  );
};
