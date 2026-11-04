export async function booksApi(path, { token, method = "GET", body } = {}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    {
      method,
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw Object.assign(new Error(data.message || "Request failed."), {
      status: response.status,
    });
  }

  return data;
}