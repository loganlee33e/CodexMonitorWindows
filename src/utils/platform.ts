export type Platform = "windows" | "macos" | "linux" | "unknown";

export function getPlatform(): Platform {
  if (typeof navigator === "undefined") {
    return "unknown";
  }
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? navigator.platform ?? "";
  const normalized = platform.toLowerCase();
  if (normalized.includes("win")) {
    return "windows";
  }
  if (normalized.includes("mac")) {
    return "macos";
  }
  if (normalized.includes("linux")) {
    return "linux";
  }
  return "unknown";
}

export function getPlatformClassName(platform = getPlatform()) {
  return `platform-${platform}`;
}

export function isWindowsPlatform(platform = getPlatform()) {
  return platform === "windows";
}

export function getRevealLabel(platform = getPlatform()) {
  if (platform === "macos") {
    return "Reveal in Finder";
  }
  if (platform === "windows") {
    return "Show in Explorer";
  }
  return "Reveal in File Manager";
}

export function isAbsolutePath(path: string, platform = getPlatform()) {
  if (platform === "windows") {
    return /^[a-zA-Z]:[\\/]/.test(path) || path.startsWith("\\\\");
  }
  return path.startsWith("/") || path.startsWith("~/");
}

export function normalizePathForPlatform(path: string, platform = getPlatform()) {
  if (platform !== "windows") {
    return path;
  }
  return path.replace(/\//g, "\\");
}

export function joinPlatformPath(
  base: string,
  relative: string,
  platform = getPlatform(),
) {
  const separator = platform === "windows" ? "\\" : "/";
  const normalizedBase =
    platform === "windows"
      ? base.replace(/[\\/]+$/, "")
      : base.replace(/\/+$/, "");
  const normalizedRelative =
    platform === "windows"
      ? relative.replace(/\//g, "\\")
      : relative.replace(/^\/+/, "");
  if (!normalizedBase) {
    return normalizedRelative;
  }
  if (!normalizedRelative) {
    return normalizedBase;
  }
  return `${normalizedBase}${separator}${normalizedRelative}`;
}
