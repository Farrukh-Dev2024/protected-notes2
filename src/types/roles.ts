export const Roles = {
    Administrator: 1,
    Moderator: 2,
    Manager: 3,
    Dataentry: 4,
    User: 5,
    Viewer: 6,
} as const;

export type Role = typeof Roles[keyof typeof Roles];
export type RoleName = keyof typeof Roles;