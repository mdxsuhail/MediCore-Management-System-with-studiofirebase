
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitalBedAvailability } from "@/lib/placeholder-data";
import { Progress } from "@/components/ui/progress";
import { BedDouble, Hospital, Check } from "lucide-react";
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
import type { BedInfo } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export default function BookBedPage() {
  const { toast } = useToast();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<{
    hospital: string;
    bedType: string;
  } | null>(null);

  const handleBookBed = (hospital: string, bed: BedInfo) => {
    if (bed.available > 0) {
      setBookedDetails({ hospital, bedType: bed.type });
      setShowBookingDialog(true);
      toast({
        title: "Bed Booked Successfully!",
        description: `A ${bed.type} bed has been reserved for you at ${hospital}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: `No ${bed.type} beds are available at ${hospital}.`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Bed</CardTitle>
          <CardDescription>
            Find and book available beds in different hospitals.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hospitalBedAvailability.map((hospital, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hospital className="h-5 w-5" />
                {hospital.hospitalName}
              </CardTitle>
              <CardDescription>Live bed availability status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {hospital.beds.map((bed, bedIndex) => (
                <div key={bed.type}>
                  <div className="space-y-3 p-4 border rounded-lg">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <p className="font-medium flex items-center gap-2">
                          <BedDouble className="h-4 w-4 text-muted-foreground" />
                          {bed.type}
                        </p>
                        <p className="text-sm">
                          <span className="font-bold text-primary">
                            {bed.available}
                          </span>
                          <span className="text-muted-foreground">
                            /{bed.total} Available
                          </span>
                        </p>
                      </div>
                      <Progress
                        value={(bed.occupied / bed.total) * 100}
                        className="mt-2"
                      />
                    </div>
                    
                    {bed.features.length > 0 && (
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Features:</p>
                            <ul className="space-y-1.5">
                                {bed.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Button
                      className="w-full mt-3"
                      onClick={() => handleBookBed(hospital.hospitalName, bed)}
                      disabled={bed.available === 0}
                    >
                      {bed.available > 0 ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                   {bedIndex < hospital.beds.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              Your bed has been successfully reserved. Please proceed to the
              hospital.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {bookedDetails && (
            <div className="py-4 text-center bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Hospital</p>
              <p className="font-bold text-lg">{bookedDetails.hospital}</p>
              <p className="text-sm text-muted-foreground mt-2">Bed Type</p>
              <p className="font-bold text-lg">{bookedDetails.bedType}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowBookingDialog(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
