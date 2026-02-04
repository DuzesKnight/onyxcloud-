export async function getCsrfToken() {
  const csrfRes = await fetch('/api/csrf');
  const { csrfToken } = await csrfRes.json();
  return csrfToken;
}
