
"use client";

import { useState } from "react";
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
  import { Button } from "@/components/ui/button";
  import { appointments as initialAppointments } from "@/lib/placeholder-data";
  import { Users, Clock, Stethoscope, Video, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/lib/types";

export default function DoctorDashboardPage() {
    const { toast } = useToast();
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(
        initialAppointments.filter(a => a.status === 'upcoming')
    );

    const currentlyServing = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

    const handleNextPatient = () => {
        if (upcomingAppointments.length > 1) {
            setUpcomingAppointments(prev => prev.slice(1));
        } else {
            setUpcomingAppointments([]);
            toast({
                title: "Queue is empty",
                description: "You have seen all patients for today.",
            });
        }
    };

    const handleStartCall = (patientName: string) => {
        toast({
            title: "Starting Call...",
            description: `Connecting with ${patientName}.`,
        });
    };

    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patients in Queue</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                <p className="text-xs text-muted-foreground">waiting for consultation</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Currently Serving</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{currentlyServing ? `#${currentlyServing.token}`: 'N/A'}</div>
                <p className="text-xs text-muted-foreground">{currentlyServing ? currentlyServing.patientName : 'No patients in queue'}</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center">
                <CardContent className="pt-6">
                    <Button className="w-full" onClick={handleNextPatient} disabled={!currentlyServing}>
                        Next Patient <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">Call the next person in queue.</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Summary Tool</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Link href="/doctor/consultation">
                        <Button variant="outline" className="w-full">Generate Summary</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Today's Patient Queue</CardTitle>
            <CardDescription>
              Manage your upcoming appointments for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Time Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((appointment, index) => (
                        <TableRow key={appointment.id} className={index === 0 ? "bg-secondary" : ""}>
                            <TableCell className="font-bold">#{appointment.token}</TableCell>
                            <TableCell>{appointment.patientName}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                                {index === 0 ? 'Serving' : 'Waiting'}
                            </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href="#">
                                            <FileText className="h-4 w-4 md:mr-2" />
                                            <span className="hidden md:inline">View Records</span>
                                        </Link>
                                    </Button>
                                    <Button size="sm" disabled={index !== 0} onClick={() => handleStartCall(appointment.patientName)}>
                                        <Video className="h-4 w-4 md:mr-2" />
                                        <span className="hidden md:inline">Start Call</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                No patients in the queue.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
