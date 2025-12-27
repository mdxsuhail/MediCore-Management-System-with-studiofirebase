
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { doctors } from "@/lib/placeholder-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Ticket, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@/lib/types";

const initialQueue = [
  { id: 1, name: "AB", token: 5 },
  { id: 2, name: "CD", token: 6 },
  { id: 3, name: "EF", token: 7 },
  { id: 4, name: "GH", token: 8 },
  { id: 5, name: "IJ", token: 9 },
];

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookedDoctor, setBookedDoctor] = useState("");
  const [assignedToken, setAssignedToken] = useState(0);
  const [queue, setQueue] = useState(initialQueue);
  const [isClient, setIsClient] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const queueInterval = setInterval(() => {
      setQueue(prevQueue => {
        if (prevQueue.length === 0) return [];
        const newQueue = [...prevQueue.slice(1)];
        if (newQueue.length > 0) {
           const lastToken = newQueue[newQueue.length - 1]?.token || 0;
           newQueue.push({ id: Math.random(), name: "KL", token: lastToken + 1 });
        }
        return newQueue;
      });
    }, 5000); // Move queue every 5 seconds

    return () => clearInterval(queueInterval);
  }, [isClient]);

  useEffect(() => {
    let newFilteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (specialty !== "all") {
        newFilteredDoctors = newFilteredDoctors.filter(doctor => doctor.specialty === specialty);
    }

    if (availability !== "all") {
        newFilteredDoctors = newFilteredDoctors.filter(doctor => doctor.availability === availability);
    }

    setFilteredDoctors(newFilteredDoctors);
  }, [searchTerm, specialty, availability]);

  const handleBookAppointment = (doctorName: string) => {
    const newToken = Math.floor(Math.random() * 100) + 10;
    setBookedDoctor(doctorName);
    setAssignedToken(newToken);
    setShowBookingDialog(true);
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctorName} is confirmed. Your token is #${newToken}.`,
    });
  };
  
  const specialties = [...new Set(doctors.map(d => d.specialty))];

  return (
    <div className="space-y-8">
       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Waiting Line</CardTitle>
            <CardDescription>Live status of the queue.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">#{queue.length > 0 ? queue[0].token : '-'}</div>
                  <p className="text-sm text-muted-foreground">Currently Serving</p>
                </div>
              </div>
              <div className="relative flex h-16 w-full items-center justify-center overflow-hidden">
                {isClient && queue.slice(1, 6).map((person, index) => (
                  <div
                    key={person.id}
                    className="absolute transition-all duration-500 ease-in-out"
                    style={{
                      left: `calc(50% + ${index * 40 - 80}px)`,
                      transform: `scale(${1 - index * 0.1})`,
                      zIndex: 5 - index,
                    }}
                  >
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarImage src={`https://picsum.photos/seed/${person.id}/100`} />
                      <AvatarFallback>{person.name}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-1.5 py-0.5 text-xs font-semibold">
                      #{person.token}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>
        <Card className="md:col-span-2">
            <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Input 
                    placeholder="Search by doctor name or hospital..." 
                    className="flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-4">
                <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            </CardHeader>
        </Card>
       </div>


      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
                <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <p className="text-sm text-muted-foreground">{doctor.bio}</p>
              <p className="text-sm">
                <span className="font-semibold">Hospital:</span> {doctor.hospital}
              </p>
               <p className="text-sm">
                <span className="font-semibold">Experience:</span> {doctor.experience} years
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
               <Badge variant={doctor.availability === 'available' ? 'default' : 'destructive'} className="capitalize bg-green-500 text-white dark:bg-green-600">
                    {doctor.availability}
               </Badge>
              <Button 
                disabled={doctor.availability === 'unavailable'}
                onClick={() => handleBookAppointment(doctor.name)}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Book Token
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <AlertDialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                Your appointment with {bookedDoctor} is confirmed. Please keep track of the waiting line. Your token number is:
                <div className="text-center py-4">
                    <div className="text-6xl font-bold text-primary">#{assignedToken}</div>
                </div>
                You will be notified when it's your turn.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowBookingDialog(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
