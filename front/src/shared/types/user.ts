export enum Role {
    ADMIN = 'ADMIN',
    DEALER = 'DEALER',
    CUSTOMER = 'CUSTOMER',
}

export type UserProfile = {
    id: number;
    role: Role;
    email: string;
    createdAt: string;
};
