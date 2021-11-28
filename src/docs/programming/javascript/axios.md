---
tags: javascript, axios
---

# Axios Tips

## Basic setup

```js
axios.defaults.baseURL = "http://localhost:5000/api";
```

## Interceptor

Example:

```js
axios.interceptors.response.use(undefined, error => {
  console.log(error);
  if (error.message === "Network Error" && error.response === undefined) {
    toast.error("Network Error - make sure API is running");
  }
  const { status, config, data } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
});
```