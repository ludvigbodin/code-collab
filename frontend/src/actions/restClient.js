export const get = url => {
  const encodedUrl = encodeURI(url);

  return fetch(`${encodedUrl}`, {
    method: "get"
  });
};

export const post = (url, body) => {
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body)
  });
};
