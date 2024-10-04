import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Create a JSON template for a versatile block note editor. The template should include the following components, with content as an array of text objects and the children field outside of content. Each block should have an id that follows a UUID format. The structure should include the following blocks:\n\nParagraph Blocks\n\nType: paragraph\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\ntextAlignment: "left"\nContent:\nArray of objects containing:\ntype: "text"\ntext: sample text\nstyles: {}\nChildren: empty array\nHeading Blocks\n\nType: heading\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\ntextAlignment: "left"\nlevel: 1, 2, or 3 (depending on heading level)\nContent:\nArray of objects containing:\ntype: "text"\ntext: sample heading text\nstyles: {}\nChildren: empty array\nNumbered List Items\n\nType: numberedListItem\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\ntextAlignment: "left"\nContent:\nArray of objects containing:\ntype: "text"\ntext: numbered list item text\nstyles: {}\nChildren: empty array\nBullet List Items\n\nType: bulletListItem\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\ntextAlignment: "left"\nContent:\nArray of objects containing:\ntype: "text"\ntext: bullet list item text\nstyles: {}\nChildren: empty array\nChecklist Items\n\nType: checkListItem\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\ntextAlignment: "left"\nchecked: false\nContent:\nArray of objects containing:\ntype: "text"\ntext: checklist item text\nstyles: {}\nChildren: empty array\nImage Block\n\nType: image\nID: generate a UUID\nProps:\nbackgroundColor: "default"\ntextAlignment: "left"\nname: "image_name.jpg"\nurl: "https://example.com/image.jpg"\ncaption: ""\nshowPreview: true\npreviewWidth: 512\nContent: an empty string\nChildren: empty array\nTable Block\n\nType: table\nID: generate a UUID\nProps:\ntextColor: "default"\nbackgroundColor: "default"\nContent:\nArray of objects representing rows and columns\nChildren: empty array\nMake sure each block follows this format, with content as an array of text objects (if applicable), and children always present as an empty array (for this example).',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "blocks": [\n    {\n      "type": "heading",\n      "id": "b4219386-3276-4c0f-ab69-32847222534a",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left",\n        "level": 1\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Grocery Shopping List",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "77841662-814a-412c-8d4e-32168917860c",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Milk",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "8011d6c8-37b4-4615-a879-723ff1716359",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Eggs",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "611929fa-8821-4a73-a5c7-c91d1ba09586",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Bread",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "5736a190-0504-46df-a877-c10234c6864e",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Cheese",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "e6951092-0221-4544-a323-8e94686587a7",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Apples",\n          "styles": {}\n        }\n      ],\n      "children": []\n    },\n    {\n      "type": "numberedListItem",\n      "id": "30486025-f856-4185-a068-e5b81273952f",\n      "props": {\n        "textColor": "default",\n        "backgroundColor": "default",\n        "textAlignment": "left"\n      },\n      "content": [\n        {\n          "type": "text",\n          "text": "Bananas",\n          "styles": {}\n        }\n      ],\n      "children": []\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});
