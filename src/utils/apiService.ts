import { refreshAccessToken, updateAccessToken } from "./tokenService";

const headers = {
  'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
  'Content-Type': 'application/json',
};

export async function handleRequest(url: any, options: any) {
  try {
    const defaultHeaders = {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    };
    const mergedHeaders = {
      ...defaultHeaders,
      ...options.headers,
    };
    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders
    });
    return response;
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Token expired") {
      try {
        const newAccessToken = await refreshAccessToken();
        updateAccessToken(newAccessToken);
        headers.Authorization = `Bearer ${newAccessToken}`;

        return await fetch(url, { ...options, headers }).then(response => response);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        throw new Error("Failed to refresh access token");
      }
    }

    throw error;
  }
}
