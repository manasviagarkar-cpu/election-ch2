// Mock Firebase implementation to avoid build errors without the library
export const auth = {
  currentUser: null,
};

export const googleProvider = {};

export const signInWithPopup = async () => {
  console.log("Mock Login Triggered");
  return { user: { displayName: "Demo User", email: "demo@example.com", photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" } };
};

export const signOut = async () => {
  console.log("Mock Logout Triggered");
};

export const onAuthStateChanged = (authObj: any, callback: (user: any) => void) => {
  // Simulate a logged out state by default
  callback(null);
  return () => {};
};

export const db = {};
