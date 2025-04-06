export function toCapitalCase(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toRGB(num: number) {
  num >>>= 0;
  let b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16;
  return "rgb(" + [r, g, b].join(",") + ")";
}

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export function durationToMs(duration: string): number | string {
  const timeUnits: { [key: string]: number } = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = duration.toString().match(/^(\d+)(ms|s|m|h|d)$/i);
  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    return value * timeUnits[unit];
  }

  const partialMatch = duration.match(/^(\d+)([a-zA-Z]*)$/);
  if (partialMatch) {
    return parseInt(partialMatch[1], 10);
  }

  return duration;
}

export function emojiToImage(emoji: string): string | null {
  const emojiRegex = /<(a)?:[a-zA-Z0-9_]+:(\d+)>/;
  const match = emoji.match(emojiRegex);
  if (match) {
    const emojiId = match[2];
    const isAnimated = match[1] === "a";
    return `https://cdn.discordapp.com/emojis/${emojiId}.${
      isAnimated ? "gif" : "png"
    }`;
  } else {
    return null;
  }
}

export function msToDuration(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= 24 * 60 * 60 * 1000;
  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= 60 * 60 * 1000;
  const minutes = Math.floor(ms / (60 * 1000));
  ms %= 60 * 1000;
  const seconds = Math.floor(ms / 1000);

  const parts = [];
  if (days) parts.push(`${days > 1 ? `${days} days` : `${days} day`}`);
  if (hours) parts.push(`${hours > 1 ? `${hours} hours` : `${hours} hour`}`);
  if (minutes)
    parts.push(`${minutes > 1 ? `${minutes} mins` : `${minutes} min`}`);
  if (seconds)
    parts.push(`${seconds > 1 ? `${seconds} seconds` : `${seconds} second`}`);
  if (!parts.length) parts.push(`${ms}ms`);

  return parts.join(" ");
}

export function parsePrize(prize: number | string): number {
  const multiplier: { [key: string]: number } = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
    q: 1000000000000000,
  };
  if (typeof prize === "string" && prize.match(/^\d+(\.\d+)?[kmbtq]$/i)) {
    const unit: string = prize.slice(-1).toLowerCase();
    const number = parseFloat(prize.slice(0, -1));
    return number * (multiplier[unit] || 1);
  }
  return typeof prize === "string" ? Number(prize) : prize;
}

export function formatCurrency(num: number | string): string {
  if (typeof num === "string" && num.match(/\d+[kmbtq]/i)) {
    const multiplier: { [key: string]: number } = {
      k: 1000,
      m: 1000000,
      b: 1000000000,
      t: 1000000000000,
      q: 1000000000000000,
    };
    const unit: string = num.slice(-1).toLowerCase();
    const number = parseFloat(num.slice(0, -1));
    const val = number * (multiplier[unit] || 1);
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function getRandomElement(arr: any): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
