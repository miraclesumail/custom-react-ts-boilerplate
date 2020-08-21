/**
 * Handles response according to content type
 * @param {object} response
 * @returns {promise}
 */
export function handleResponseType(
  response: Response
): Promise<[boolean, any]> {
  if (response.headers) {
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/pdf")) {
      return Promise.all([response.ok, response.blob()]);
    }
    if (contentType && contentType.includes("application/json")) {
      return Promise.all([response.ok, response.json()]);
    }
    // it includes all text types
    if (contentType && contentType.includes("text/")) {
      return Promise.all([response.ok, response.text()]);
    }

    // unfortunately on download files there is no header available
    if (response.url && response.url.endsWith(".tgz") === true) {
      return Promise.all([response.ok, response.blob()]);
    }
  }

  return Promise.all([response.ok, response.text()]);
}

class API {
  public request<T>(
    url: string,
    method = "GET",
    options: RequestInit = { headers: {} }
  ): Promise<T> {
    const token = localStorage.getItem("token");
    const headers = new Headers(options.headers);

    if (method === "post") {
      headers.set("content-type", "application/json");
    }

    if (token) {
      headers.set("x-access-token", token);
      options.headers = headers;
    }

    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        ...options
      })
        .then(handleResponseType)
        .then(response => {
          if (response[0]) {
            resolve(response[1]);
          } else {
            reject(new Error("something went wrong"));
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new API();
