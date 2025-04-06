export async function fetchDiscordAPI(endpoint: string) {
  try {
    const response = await fetch(
      `/api/discord?endpoint=${encodeURIComponent(endpoint)}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from Discord API:", error);
    throw error;
  }
}
