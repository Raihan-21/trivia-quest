const queryGenerator = (object: any) => {
  let params = "";
  const paramsArray = Object.keys(object).filter((key) => object[key]);
  paramsArray.forEach((key, i) => {
    if (object[key]) {
      if (i === 0) params += `?${key}=${object[key]}`;
      else params += `&${key}=${object[key]}`;
    }
  });
  return params;
};
export { queryGenerator };
