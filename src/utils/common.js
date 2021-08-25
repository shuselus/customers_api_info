export const isNotEmptyObject = (obj={}) => {
  return (Object.keys(obj).length > 0);
};
export const capitalizeByIndex = (str, arrNums) => {
  const _str = str.split("");
  arrNums.forEach(i => _str[i] = _str[i].toUpperCase());
  return _str.join("");
}