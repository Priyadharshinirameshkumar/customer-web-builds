const STORAGE_KEY = "websitePlanId";

export const saveWebsitePlanId = (id: number) => {
  sessionStorage.setItem(STORAGE_KEY, String(id));
};

export const getWebsitePlanId = (): number | null => {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  const id = Number(stored);
  return Number.isNaN(id) ? null : id;
};

export const clearWebsitePlanId = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
