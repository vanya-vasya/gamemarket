export const CLERK_APPEARANCE = {
  variables: {
    colorPrimary: "#9333ea",
    colorText: "#18181b",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full border-0 bg-transparent p-0 shadow-none",
    formButtonPrimary:
      "!bg-none !bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 !shadow-none hover:opacity-90",
  },
};

export const getSafeRedirectPath = (value?: string) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return undefined;
  return value;
};
