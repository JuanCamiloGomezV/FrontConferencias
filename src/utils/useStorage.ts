export interface Storage {
  token: string;
}
export const getItem = <T>(key: keyof Storage): T | null => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setItem = <T>(key: keyof Storage, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: keyof Storage): void => {
  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  localStorage.clear();
};
