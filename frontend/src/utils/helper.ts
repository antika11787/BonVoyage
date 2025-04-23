export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export function formatUppercaseWords(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const getStatus = (startDate: string, endDate: string): "ongoing" | "completed" | "upcoming" => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "ongoing";
};

 export const toKebabCase = (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
      .toLowerCase();
  };

 export function toPascalCase(str: string) {
    return str
      .replace(/-./g, (match) => match.charAt(1).toUpperCase())
      .replace(/^./, (match) => match.toUpperCase());
  }
