
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
  import { appointments } from "@/lib/placeholder-data";
  import { Users, Clock, Stethoscope, Video, ChevronRight } from "lucide-react";
import Link from "next/link";
  
  export default function DoctorDashboardPage() {
    const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
    const currentlyServing = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

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
                    <Button className="w-full">
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
                {upcomingAppointments.map((appointment, index) => (
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
                        <Button variant="outline" size="sm">View Records</Button>
                        <Button size="sm" className="ml-2" disabled={index !== 0}>
                            <Video className="h-4 w-4 mr-2" />
                            Start Call
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
