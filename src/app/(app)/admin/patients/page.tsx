
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
import { mockUsers } from "@/lib/users";
import type { MockUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserX, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PatientManagementPage() {
    const [patients, setPatients] = useState<MockUser[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        let allUsers: MockUser[] = [];
        const storedUsers = localStorage.getItem('sessionUsers');
        if (storedUsers) {
            allUsers = JSON.parse(storedUsers);
        } else {
            allUsers = mockUsers;
        }

        setPatients(allUsers.filter(user => user.role === 'patient'));
    }, []);

    const handleStatusToggle = (userId: string) => {
        setPatients(currentPatients => 
            currentPatients.map(p => {
                if (p.id === userId) {
                    const newStatus = p.status === 'active' ? 'inactive' : 'active';
                    toast({
                        title: "Patient Status Updated",
                        description: `${p.name}'s status has been set to ${newStatus}.`
                    });
                    return { ...p, status: newStatus };
                }
                return p;
            })
        );
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
        <CardDescription>View and manage all registered patients.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Last Appointment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                            <AvatarFallback>{patient.name ? patient.name.split(' ').map(n => n[0]).join('') : 'P'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">{patient.email}</p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>{patient.dateJoined ? new Date(patient.dateJoined).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{patient.lastAppointment ? new Date(patient.lastAppointment).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={patient.status === 'active' ? 'default' : 'destructive'} className="capitalize bg-green-500 text-white">
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusToggle(patient.id)}>
                                {patient.status === 'active' ? (
                                    <><UserX className="mr-2 h-4 w-4" /> Deactivate</>
                                ) : (
                                    <><UserCheck className="mr-2 h-4 w-4" /> Activate</>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
