export const getStoredCredentials = (): {
  email: string;
  password: string;
  rememberMe: boolean;
} | null => {
  const storedCredentials = localStorage.getItem("credentials");
  const isRembered = storedCredentials ? storedCredentials : null;
  let credentials;
  if (isRembered) {
    credentials = JSON.parse(isRembered);
  } else {
    credentials = null;
  }
  return credentials;
};
