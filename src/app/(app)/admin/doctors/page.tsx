
'use client';

import { useState } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { doctors as initialDoctors } from "@/lib/placeholder-data";
import type { Doctor } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const { toast } = useToast();

  const handleStatusChange = (doctorId: string, newStatus: boolean) => {
    const availability = newStatus ? 'available' : 'unavailable';
    setDoctors(prevDoctors =>
      prevDoctors.map(doc =>
        doc.id === doctorId ? { ...doc, availability } : doc
      )
    );
    toast({
      title: 'Doctor Status Updated',
      description: `Doctor's availability has been set to ${availability}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Management</CardTitle>
        <CardDescription>Manage doctor details and availability.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead className="text-right">Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map(doctor => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.hospital}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Label htmlFor={`status-${doctor.id}`} className="text-sm text-muted-foreground capitalize">
                      {doctor.availability}
                    </Label>
                    <Switch
                      id={`status-${doctor.id}`}
                      checked={doctor.availability === 'available'}
                      onCheckedChange={(checked) => handleStatusChange(doctor.id, checked)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
