import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Paragraph } from "./paragraph";

export const BlockToJSX = ({ block }: { block: BlockObjectResponse }) => {
  const blockType = block.type;

  switch (blockType) {
    case "paragraph":
      return <Paragraph block={block} />;
    default:
      return <></>;
  }
};
