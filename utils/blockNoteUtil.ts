export const sanitizeImageBlocks = (blocks: any) => {
  return blocks.map((block: any) => {
    // Initialize sanitizedContent with the existing content
    let sanitizedContent = block.content;

    if (block.type === "image") {
      // Ensure content for 'image' type blocks is a string (e.g., URL)
      sanitizedContent = typeof block.content === "string" ? block.content : "";
    }

    // Recursively sanitize the children if they exist
    const sanitizedChildren = block.children
      ? sanitizeImageBlocks(block.children)
      : [];

    return {
      ...block,
      content: sanitizedContent,
      children: sanitizedChildren,
    };
  });
};

export const sanitizeStyleBlocks = (blocks: any) => {
  return blocks.map((block: any) => {
    let sanitizedContent = block.content;

    if (block.content && Array.isArray(block.content)) {
      sanitizedContent = block.content.map((contentItem: any) => {
        // Extract the styles object from content if it exists
        const sanitizedStyles = contentItem.styles
          ? { ...contentItem.styles }
          : {};

        // Remove unsupported styles
        if (sanitizedStyles.fontWeight) {
          delete sanitizedStyles.fontWeight;
        }
        if (sanitizedStyles.fontSize) {
          delete sanitizedStyles.fontSize;
        }

        return {
          ...contentItem,
          styles: sanitizedStyles,
        };
      });
    }

    const sanitizedChildren = block.children
      ? sanitizeStyleBlocks(block.children)
      : [];

    return {
      ...block,
      content: sanitizedContent,
      children: sanitizedChildren,
    };
  });
};
