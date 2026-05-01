const STORAGE_KEY = "clarityai_bookmarks";

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addBookmark(slug: string): void {
  if (typeof window === "undefined") return;
  const current = getBookmarks();
  if (!current.includes(slug)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, slug]));
  }
}

export function removeBookmark(slug: string): void {
  if (typeof window === "undefined") return;
  const current = getBookmarks();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(current.filter((s) => s !== slug))
  );
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().includes(slug);
}
