export function capitalize(str) {
  // FIXME: UTF 8, UTF 16 ???
  const firstChar = str[0];
  return `${firstChar.toUpperCase()}${str.slice(1)}`;
}