export const coverImages = [
  {
    imageUrl: "/coverImages/galaxy.jpg",
  },

  {
    imageUrl: "/coverImages/circularAbstract.jpg",
  },

  {
    imageUrl: "/coverImages/starMountain.jpg",
  },
  {
    imageUrl: "/coverImages/earthMoon.jpg",
  },
  {
    imageUrl: "/coverImages/sportsCar.jpg",
  },
  {
    imageUrl: "/coverImages/ocean.jpg",
  },
  {
    imageUrl: "/coverImages/grayPattern.jpg",
  },
  {
    imageUrl: "/coverImages/astronauts.jpg",
  },
  {
    imageUrl: "/coverImages/dragonfly.jpg",
  },
  {
    imageUrl: "/coverImages/treeSunset.jpg",
  },
  {
    imageUrl: "/coverImages/treePond.jpg",
  },
  {
    imageUrl: "/coverImages/blackhole.jpg",
  },
];

export const emojiIcons = [
  "📅",
  "✅",
  "📝",
  "📚",
  "🚀",
  "⚡",
  "📊",
  "💡",
  "🗂️",
  "⏳",
  "🔍",
  "🛠️",
  "🎯",
  "🔗",
  "💬",
  "📌",
  "💻",
  "📈",
  "🗓️",
  "✏️",
  "📁",
  "🧠",
  "🎨",
  "📋",
  "📎",
  "⏰",
  "🏷️",
  "🔖",
  "📒",
  "🗃️",
];

// create a function to generate random emoji and return 10 emoji icons
export const getRandomEmoji = () => {
  const randomEmoji = new Set<string>();
  while (randomEmoji.size < 8) {
    randomEmoji.add(emojiIcons[Math.floor(Math.random() * emojiIcons.length)]);
  }
  return Array.from(randomEmoji);
};

// type of option for cover image
export const coverImageOptions = [
  {
    value: "gallery",
    label: "Gallery",
  },
  {
    value: "upload",
    label: "Upload",
  },
  {
    value: "link",
    label: "Link",
  },
];

export const colorCoverImages = [
  {
    imageUrl:
      "https://utfs.io/f/062c650f-a12b-4597-968f-1536322935ef-mdhiwz.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/aa3bb2c6-f96a-47a2-a67b-cecd4f17a880-5darnc.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/87b81eba-32f9-4468-acd0-a3c94963124a-gor78u.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/f590bcbc-07ca-4e05-b0b2-9f2b80f4376b-k3i53k.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/1484f8d6-1d2c-489b-9d5d-b775a1fabc69-b6z2kq.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/46824a29-b9ad-4edb-bc25-26d754f741e8-b6z2ko.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/70f0d244-c190-467f-b72e-6fac8f3ee96e-b6z2kp.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/154e3a7b-f7df-49f3-82db-e0093e781bcf-b6z2kn.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/5cca7cb6-01ba-452e-9f17-3036c9d5b558-b6z2km.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/15d5f6c5-3f56-449e-85c2-c30d6d36c8af-b6z2kk.png",
  },
  {
    imageUrl:
      "https://utfs.io/f/2feb8b90-74da-4197-83d4-ff4589cd1b47-85d21n.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/4f45e259-8c07-41a7-8d6b-cf6491ba9a4b-85d21o.jpg",
  },
];

export const spaceCoverImages = [
  {
    imageUrl:
      "https://utfs.io/f/145523c1-bee3-4de5-b510-599026589e07-2mic9m.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/219d3908-fe3a-4f9d-8d75-6d2e465a1fa8-3oxaqs.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/5243dde0-c2c4-4e0d-8ce5-24f740b1dd97-hvs0jp.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/d5af673e-063b-4373-b0aa-26955df30339-ndvanp.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/7b049847-7b05-4150-83e5-8566271caf9b-gssgmf.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/982942ba-b4e1-4c7d-9709-a133dc2958a7-1qkwpv.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/1e81bebf-f526-45eb-af82-2b50f10cdd6d-ho4wwl.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/b4e85b4e-f37d-48a2-b01b-2b438d73e03f-g4ofwz.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/c5d11bb1-7351-49f1-b874-19b429a67b22-wi8ebu.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/48fb6e13-a889-4477-888c-aecd876d38c0-da7lo.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/65120256-169c-444b-a0f4-46176a71b714-7ja34t.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/d6164eae-d387-462c-b25c-33088d3b1198-bs9so2.jpg",
  },
];

const natureCoverImages = [
  {
    imageUrl:
      "https://utfs.io/f/f1a89c09-e173-4f52-975f-e877ce8bebeb-sduewp.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/be5d289c-6fd7-45f4-b3e2-e1f1062a60a6-sd9q4n.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/78bbdf6a-09a8-4cb4-8874-e617937a0b99-axb47r.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/4b76e687-bd9a-4464-9140-9a0b416ec08a-75atk6.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/09e68452-f72c-479f-8da5-1b75ff6416af-rhq860.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/66849ae7-6776-4038-adb1-33e95a84a81f-jwuagt.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/1fe85c5d-ba7d-43ba-b984-154755728341-xs9puf.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/2e373841-65a0-44f3-8685-b1a1998eb699-984pem.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/6536745a-737c-465a-9cb9-f8d20d2df02b-r4qvq6.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/301a8408-462a-4823-85ae-38da67f67da8-pr8gyf.jpg",
  },
  {
    imageUrl:
      "https://utfs.io/f/18fc34c7-0cf8-4f47-a4ae-e6f65db35d0b-r15x9y.jpeg",
  },
  {
    imageUrl:
      "https://utfs.io/f/17c1c59d-8f0d-4133-b2d8-46f5a70daf27-mgzxxp.jpeg",
  },
];

export const coverImageCategories = [
  {
    type: "Color & Gradient",
    images: colorCoverImages,
  },

  {
    type: "Space",
    images: spaceCoverImages,
  },

  {
    type: "Nature",
    images: natureCoverImages,
  },
];
