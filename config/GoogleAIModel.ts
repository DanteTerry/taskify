import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
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

  history: [
    {
      role: "user",
      parts: [
        {
          text: 'reference to : [\n{\n"content": [\n{\n"type": "text",\n"text": "Hello",\n"styles": {}\n}\n],\n"type": "paragraph",\n"children": [],\n"id": "273cd439-1d4d-4713-b920-6eb45d803c53",\n"props": {\n"textAlignment": "left",\n"textColor": "default",\n"backgroundColor": "default"\n}\n},\n{\n"type": "paragraph",\n"content": [\n{\n"styles": {},\n"text": "This is a paragraph",\n"type": "text"\n}\n],\n"props": {\n"textColor": "default",\n"backgroundColor": "default",\n"textAlignment": "left"\n},\n"children": [],\n"id": "d0ce6c21-f4f8-4237-9e73-83005a155f8e"\n},\n{\n"children": [],\n"content": [\n{\n"styles": {},\n"type": "text",\n"text": "This is a big heading "\n}\n],\n"props": {\n"textColor": "default",\n"backgroundColor": "default",\n"level": 1,\n"textAlignment": "left"\n},\n"type": "heading",\n"id": "730a9573-bf16-4581-91f0-9df483fd8047"\n},\n{\n"id": "b3d09562-aa28-468d-a8d6-52935622742a",\n"children": [],\n"props": {\n"textAlignment": "left",\n"backgroundColor": "default",\n"textColor": "default",\n"level": 2\n},\n"content": [\n{\n"text": "This is second heading ",\n"type": "text",\n"styles": {}\n}\n],\n"type": "heading"\n},\n{\n"props": {\n"textColor": "default",\n"backgroundColor": "default",\n"textAlignment": "left"\n},\n"type": "paragraph",\n"id": "d2cd3b4c-bb97-4a57-b4e8-e82879efe627",\n"children": [],\n"content": []\n}\n] this data format\nthis is types type PartialBlock = {\nid?: string;\ntype?: string;\nprops?: Partial<Record<string, any>>; // exact type depends on "type"\ncontent?: string | InlineContent[] | TableContent;\nchildren?: PartialBlock[];\n}; following is type of each block in blocknotejs.org\'s editor generate the template in json for grocery TODO list ',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "type": "heading",\n    "props": {\n      "level": 1,\n      "textAlignment": "left",\n      "textColor": "default",\n      "backgroundColor": "default"\n    },\n    "content": [\n      {\n        "type": "text",\n        "text": "Grocery List",\n        "styles": {}\n      }\n    ],\n    "children": [],\n    "id": "1"\n  },\n  {\n    "type": "paragraph",\n    "props": {\n      "textAlignment": "left",\n      "textColor": "default",\n      "backgroundColor": "default"\n    },\n    "content": [],\n    "children": [],\n    "id": "2"\n  },\n  {\n    "type": "unordered-list",\n    "props": {\n      "textAlignment": "left",\n      "textColor": "default",\n      "backgroundColor": "default"\n    },\n    "content": [],\n    "children": [\n      {\n        "type": "list-item",\n        "props": {\n          "textAlignment": "left",\n          "textColor": "default",\n          "backgroundColor": "default"\n        },\n        "content": [\n          {\n            "type": "text",\n            "text": "Milk",\n            "styles": {}\n          }\n        ],\n        "children": [],\n        "id": "3"\n      },\n      {\n        "type": "list-item",\n        "props": {\n          "textAlignment": "left",\n          "textColor": "default",\n          "backgroundColor": "default"\n        },\n        "content": [\n          {\n            "type": "text",\n            "text": "Eggs",\n            "styles": {}\n          }\n        ],\n        "children": [],\n        "id": "4"\n      },\n      {\n        "type": "list-item",\n        "props": {\n          "textAlignment": "left",\n          "textColor": "default",\n          "backgroundColor": "default"\n        },\n        "content": [\n          {\n            "type": "text",\n            "text": "Bread",\n            "styles": {}\n          }\n        ],\n        "children": [],\n        "id": "5"\n      },\n      {\n        "type": "list-item",\n        "props": {\n          "textAlignment": "left",\n          "textColor": "default",\n          "backgroundColor": "default"\n        },\n        "content": [\n          {\n            "type": "text",\n            "text": "Cheese",\n            "styles": {}\n          }\n        ],\n        "children": [],\n        "id": "6"\n      },\n      {\n        "type": "list-item",\n        "props": {\n          "textAlignment": "left",\n          "textColor": "default",\n          "backgroundColor": "default"\n        },\n        "content": [\n          {\n            "type": "text",\n            "text": "Apples",\n            "styles": {}\n          }\n        ],\n        "children": [],\n        "id": "7"\n      }\n    ],\n    "id": "8"\n  },\n  {\n    "type": "paragraph",\n    "props": {\n      "textAlignment": "left",\n      "textColor": "default",\n      "backgroundColor": "default"\n    },\n    "content": [],\n    "children": [],\n    "id": "9"\n  }\n]\n```\n\n**Explanation:**\n\n1. **Heading:** The first block is a heading with level 1, displaying "Grocery List".\n2. **Paragraphs:** There are two empty paragraphs, one before the list and one after.\n3. **Unordered List:** The grocery items are listed in an unordered list.\n4. **List Items:** Each grocery item is a list item containing the item name as text.\n\n**How to use this JSON in BlockNote.js:**\n\n1. **Open BlockNote.js:** Go to the BlockNote.js editor at [https://blocknotejs.org/](https://blocknotejs.org/).\n2. **Import JSON:** Click on the "Import" button and paste the JSON code.\n3. **Preview:** The grocery list will be displayed in the editor.\n4. **Edit:** You can add or remove items, change their names, or add more sections as needed.\n\nThis JSON template provides a basic structure for your grocery list. You can customize it to suit your specific needs.\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
