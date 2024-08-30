export const sanitizeBlocks = (blocks: any) => {
  return blocks.map((block: any) => {
    // Initialize sanitizedContent with the existing content
    let sanitizedContent = block.content;

    if (block.type === "image") {
      // Ensure content for 'image' type blocks is a string (e.g., URL)
      sanitizedContent = typeof block.content === "string" ? block.content : "";
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
