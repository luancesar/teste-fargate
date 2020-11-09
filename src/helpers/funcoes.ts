export function isEmpty(value: string) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

export function isNotEmpty(value:string) {
  if (value !== '' && value !== undefined && value !== null) {
    return true;
  }
  return false;
}

export function replaceAt(value: string, index: number, replacement: string) {
  return (
    value.substr(0, index) +
    replacement +
    value.substr(index + replacement.length)
  );
}
