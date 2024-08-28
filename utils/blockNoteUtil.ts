import { PartialBlock } from "@blocknote/core";

export const sanitizeBlocks = (blocks: PartialBlock[]) => {
  return blocks.map((block: PartialBlock) => {
    // Only sanitize content if the type is 'image' or 'paragraph'
    let sanitizedContent = block.content;

    if (block.type === "image") {
      sanitizedContent =
        typeof block.content === "undefined" ? "" : block.content;
    }

    // Recursively sanitize the children if they exist
    const sanitizedChildren = block.children
      ? sanitizeBlocks(block.children)
      : [];

    return {
      ...block,
      content: sanitizedContent,
      children: sanitizedChildren,
    };
  });
};
