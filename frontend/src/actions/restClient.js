const publicIp = require("public-ip");

export const get = async url => {
  const encodedUrl = encodeURI(url);

  const response = await fetch(`${encodedUrl}`, {
    method: "get"
  });
  return resolveResponse(response);
};

export const post = async (url, body) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  });
  return resolveResponse(response);
};

const resolveResponse = async response => {
  const json = await response.json();
  if (response.status === 200) {
    return Promise.resolve(json);
  } else {
    return Promise.reject(json);
  }
};
