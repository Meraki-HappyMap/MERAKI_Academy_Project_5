export async function getCurrentUser(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch current user: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Server Error 500");
    throw error;
  }
}

export async function updateUserRole(token, role) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/role`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to update user role: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Failed to update user role:", error);
    throw error;
  }
}
