
import type { MockUser } from './types';

export const mockUsers: MockUser[] = [
    { id: 'usr-001', name: 'John Doe', email: 'john.doe@example.com', password: 'password123', role: 'patient', dateJoined: '2024-01-15', lastAppointment: '2024-07-20', status: 'active', avatarUrl: 'https://picsum.photos/seed/user1/200' },
    { id: 'usr-002', name: 'Dr. Emily Carter', email: 'emily.carter@example.com', password: 'password123', role: 'doctor', dateJoined: '2023-11-10', status: 'active', avatarUrl: 'https://picsum.photos/seed/doc1/200' },
    { id: 'usr-003', name: 'Admin User', email: 'admin@meditrack.pro', password: 'password123', role: 'admin', dateJoined: '2023-01-01', status: 'active', avatarUrl: 'https://picsum.photos/seed/admin/200' },
    { id: 'usr-004', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123', role: 'patient', dateJoined: '2024-03-22', lastAppointment: '2024-07-18', status: 'active', avatarUrl: 'https://picsum.photos/seed/user2/200' },
    { id: 'usr-005', name: 'Dr. Ben Adams', email: 'ben.adams@example.com', password: 'password123', role: 'doctor', dateJoined: '2024-02-01', status: 'active', avatarUrl: 'https://picsum.photos/seed/doc2/200' },
    { id: 'usr-006', name: 'Michael Johnson', email: 'michael.j@example.com', password: 'password123', role: 'patient', dateJoined: '2024-05-10', status: 'active', avatarUrl: 'https://picsum.photos/seed/user3/200' },
    { id: 'usr-007', name: 'Jessica Brown', email: 'jess.brown@example.com', password: 'password123', role: 'patient', dateJoined: '2024-06-30', lastAppointment: '2024-07-15', status: 'inactive', avatarUrl: 'https://picsum.photos/seed/user4/200' },
];

