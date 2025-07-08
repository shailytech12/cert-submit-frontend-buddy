
export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem("admin_token") ? true : false;
};

export const adminLogin = (username: string, password: string): boolean => {
  // Mock admin credentials - replace with real authentication later
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("admin_token", "admin-demo-token");
    return true;
  }
  return false;
};

export const adminLogout = () => {
  localStorage.removeItem("admin_token");
};
