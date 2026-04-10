  const STORAGE_KEY = "postcards";
 
export function getPostcards() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
 
export function savePostcard(postcard) {
  const all = getPostcards();
  all.unshift(postcard);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
 
export function updatePostcard(id, updatedData) {
  const all = getPostcards();
  const idx = all.findIndex((p) => p.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updatedData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}
 
export function deletePostcard(id) {
  const all = getPostcards().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}