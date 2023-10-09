export interface UserProfile {
  userId: string;     // Unique user ID
  displayName: string;       // User's name
  email: string;      // User's email address
  roles: string[];    // Array of roles (e.g., 'superAdmin', 'manager', 'server')
  emailVerified: boolean;
}
