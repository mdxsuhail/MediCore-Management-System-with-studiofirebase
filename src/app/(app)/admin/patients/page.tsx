
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockUsers, type MockUser } from "@/lib/users";

export default function PatientManagementPage() {
    const [patients, setPatients] = useState<MockUser[]>([]);

    useEffect(() => {
        // In a real app, this would be an API call.
        // For now, we'll filter the mock users.
        let allUsers: MockUser[] = [];
        const storedUsers = localStorage.getItem('sessionUsers');
        if (storedUsers) {
            allUsers = JSON.parse(storedUsers);
        } else {
            allUsers = mockUsers;
        }

        setPatients(allUsers.filter(user => user.role === 'patient'));
    }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
        <CardDescription>View all registered patients in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{patient.email}</TableCell>
                <TableCell className="capitalize">{patient.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
