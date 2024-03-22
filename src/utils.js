export const generateNextKey = (obj = null) => {
  if (!obj) return 0;

  const keys = Object.keys(obj);
  keys.sort((a, b) => a - b);
  const last = keys.at(-1);
  console.log("last", last, keys, obj);
  return (+last || 0) + 1;
};

export const timestampToDDMMYY = (timestamp = false) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so we add 1
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
