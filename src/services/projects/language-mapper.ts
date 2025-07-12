export interface ProgrammingLanguage {
  fullName: string;
  shortName: string;
  color: string;
}

export function mapProgrammingLanguage(
  language: string | null,
): ProgrammingLanguage | null {
  switch (language) {
    case "JavaScript":
      return {
        fullName: language,
        shortName: "JS",
        color: "#F1E05A",
      };
    case "TypeScript":
      return {
        fullName: language,
        shortName: "TS",
        color: "#3178C6",
      };
    case "C#":
      return {
        fullName: language,
        shortName: "C#",
        color: "#178600",
      };
    case "Rust":
      return {
        fullName: language,
        shortName: "Rust",
        color: "#DEA584",
      };
    case "Shell":
      return {
        fullName: language,
        shortName: "sh",
        color: "#89E051",
      };
    case "HTML":
      return {
        fullName: language,
        shortName: "html",
        color: "#E34C26",
      };
    case "Astro":
      return {
        fullName: language,
        shortName: "astro",
        color: "#FF5A03",
      };
    case "C++":
      return {
        fullName: language,
        shortName: "C++",
        color: "#F34B7D",
      };
    case "Vue":
      return {
        fullName: language,
        shortName: "Vue",
        color: "#41B883",
      };
    case "Rich Text Format":
      return {
        fullName: language,
        shortName: "RTF",
        color: "#CCCCCC",
      };
    case "CSS":
      return {
        fullName: language,
        shortName: "css",
        color: "#563D7C",
      };
    case "Go":
      return {
        fullName: language,
        shortName: "Go",
        color: "#00ADD8",
      };
    case "Vala":
      return {
        fullName: language,
        shortName: "Vala",
        color: "#A56DE2",
      };
    case "Java":
      return {
        fullName: language,
        shortName: "Java",
        color: "#B07219",
      };
    case "Arduino":
      return {
        fullName: language,
        shortName: "ard",
        color: "#EDEDED",
      };

    case "Lua":
      return {
        fullName: language,
        shortName: "lua",
        color: "#00007F",
      };
    default:
      return null;
  }
}

