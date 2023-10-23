const baseURL = process.env.REACT_APP_API;
console.log(baseURL);

const urls = {
  login: "/login",
  table: "/table",
};

export { baseURL, urls };
