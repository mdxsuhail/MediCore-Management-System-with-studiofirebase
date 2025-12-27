
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Calendar, FileText, HeartPulse, Pill, User, Ambulance } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { appointments, medicalDocuments, medications, vitals } from "@/lib/placeholder-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();

  const handleBookAmbulance = () => {
    toast({
      title: "Ambulance Dispatched",
      description: "An ambulance is on its way to your location. Help will arrive shortly.",
    });
  };

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, John!</CardTitle>
            <CardDescription>
              Here's a summary of your health and upcoming activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Health Status</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low Risk</div>
                <p className="text-xs text-muted-foreground">
                  Based on your latest assessment
                </p>
              </CardContent>
               <CardFooter>
                  <Button size="sm" variant="outline" asChild>
                      <Link href="/health-risk">View Details</Link>
                  </Button>
               </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Appointments
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.filter(a => a.status === 'upcoming').length}</div>
                <p className="text-xs text-muted-foreground">
                  You have appointments scheduled.
                </p>
              </CardContent>
               <CardFooter>
                  <Button size="sm" variant="outline" asChild>
                      <Link href="/appointments">Manage Appointments</Link>
                  </Button>
               </CardFooter>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                <Pill className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{medications.filter(m => m.status === 'active').length}</div>
                <p className="text-xs text-muted-foreground">
                  Currently prescribed.
                </p>
              </CardContent>
               <CardFooter>
                  <Button size="sm" variant="outline" asChild>
                      <Link href="/medications">View Medications</Link>
                  </Button>
               </CardFooter>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recent Vitals</CardTitle>
                <HeartPulse className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <div className="text-sm font-bold">BP: {vitals.find(v => v.name === 'Blood Pressure')?.value}</div>
                <p className="text-xs text-muted-foreground">
                  Updated on {new Date(vitals[0].date).toLocaleDateString()}
                </p>
              </CardContent>
               <CardFooter>
                  <Button size="sm" variant="outline" asChild>
                      <Link href="/vitals">Track Vitals</Link>
                  </Button>
               </CardFooter>
            </Card>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Card className="sm:col-span-2 lg:col-span-1 bg-destructive/10 border-destructive cursor-pointer hover:bg-destructive/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                            <Ambulance className="h-5 w-5 text-destructive" />
                            Emergency
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-xs text-destructive/80">
                            Request an ambulance to your current location immediately.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="destructive" className="w-full">Book Ambulance</Button>
                    </CardFooter>
                </Card>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Emergency Request</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will dispatch an ambulance to your current location immediately. Only proceed if this is a genuine emergency.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBookAmbulance} className="bg-destructive hover:bg-destructive/90">Confirm Emergency</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {appointments.filter(a => a.status === 'upcoming').length} upcoming appointments.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/appointments">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            {appointments.filter(a => a.status === 'upcoming').map((appointment) => (
                <div key={appointment.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://picsum.photos/seed/${appointment.doctorName.split(" ").join('')}/200/200`} alt="Avatar" />
                        <AvatarFallback>
                            {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                        {appointment.doctorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                        {appointment.doctorSpecialty}
                        </p>
                    </div>
                    <div className="ml-auto text-right font-medium">
                        <p className="text-sm">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
       <div className="xl:col-span-3">
        <Card>
          <CardHeader className="flex flex-row items-center">
             <div className="grid gap-2">
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                Recently uploaded medical documents and reports.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/documents">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
            {medicalDocuments.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                    <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="grid gap-1">
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <Badge variant={doc.type === 'prescription' ? 'default' : 'secondary'} className="capitalize">{doc.type}</Badge>
                </div>
            ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
