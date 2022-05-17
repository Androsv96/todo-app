type METHODS = "GET" | "PATCH";

export default async function Api<T>(
  url: string,
  method: METHODS,
  body?: any
): Promise<T | []> {
  try {
    const response = await fetch(url, {
      headers: {
        ["X-Api-Key"]:
          "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
      },
      method,
      body: JSON.stringify(body),
    }).then((res) => res.json());
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
