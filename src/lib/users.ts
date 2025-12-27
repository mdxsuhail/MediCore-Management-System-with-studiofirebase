
export type MockUser = {
    email: string;
    password: string; // In a real app, this would be a hash
    role: 'patient' | 'doctor' | 'admin';
};

export const mockUsers: MockUser[] = [
    { email: 'john.doe@example.com', password: 'password123', role: 'patient' },
    { email: 'emily.carter@example.com', password: 'password123', role: 'doctor' },
    { email: 'admin@meditrack.pro', password: 'password123', role: 'admin' },
    { email: 'jane.smith@example.com', password: 'password123', role: 'patient' },
    { email: 'ben.adams@example.com', password: 'password123', role: 'doctor' },
];
