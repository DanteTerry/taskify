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
  const randomEmoji = new Set();
  while (randomEmoji.size < 8) {
    randomEmoji.add(emojiIcons[Math.floor(Math.random() * emojiIcons.length)]);
  }
  return Array.from(randomEmoji);
};
