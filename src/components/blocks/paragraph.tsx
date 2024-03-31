import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";

export const Paragraph = ({ block }: { block: BlockObjectResponse }) => {
  const text = "paragraph" in block ? block.paragraph.rich_text : [];
  return (
    <p>
      <RichText text={text} />
    </p>
  );
};
