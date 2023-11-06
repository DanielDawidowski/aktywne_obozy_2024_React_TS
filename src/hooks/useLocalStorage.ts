type LocalStorageActions<T> = {
  set: (value: T) => void;
  get: () => T | null;
  delete: () => void;
};

const useLocalStorage = <T>(key: string): LocalStorageActions<T> => {
  const set: LocalStorageActions<T>["set"] = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const get: LocalStorageActions<T>["get"] = () => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  };

  const del: LocalStorageActions<T>["delete"] = () => {
    window.localStorage.removeItem(key);
  };

  return { set, get, delete: del };
};

export default useLocalStorage;
