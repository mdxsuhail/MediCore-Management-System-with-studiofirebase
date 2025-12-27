
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
import { hospitalBedAvailability, initialInvoiceHistory } from "@/lib/placeholder-data";
import { Progress } from "@/components/ui/progress";
import { BedDouble, Hospital, Check, CreditCard, User, Phone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import type { BedInfo, Invoice } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BookBedPage() {
  const { toast } = useToast();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedBed, setSelectedBed] = useState<{ hospital: string, bed: BedInfo } | null>(null);
  const [patientDetails, setPatientDetails] = useState({name: 'John Doe', phone: '+15551234567'});


  const handleBookNowClick = (hospital: string, bed: BedInfo) => {
    if (bed.available > 0) {
      setSelectedBed({ hospital, bed });
      setShowBookingForm(true);
    } else {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: `No ${bed.type} beds are available at ${hospital}.`,
      });
    }
  };
  
  const handleConfirmBooking = () => {
    if (selectedBed && patientDetails.name && patientDetails.phone) {
        setShowBookingForm(false);
        setShowConfirmationDialog(true);
        toast({
            title: "Bed Booked Successfully!",
            description: `A ${selectedBed.bed.type} bed has been reserved for ${patientDetails.name} at ${selectedBed.hospital}.`,
        });

        // Add to billing
        const newInvoice: Invoice = {
            id: `inv-${Date.now()}`,
            description: `Bed Booking: ${selectedBed.bed.type} at ${selectedBed.hospital}`,
            date: new Date().toISOString().split('T')[0],
            amount: `$${selectedBed.bed.price.toFixed(2)}`,
            status: 'Unpaid'
        };

        const existingInvoices = JSON.parse(localStorage.getItem('invoiceHistory') || '[]') as Invoice[];
        const updatedInvoices = [newInvoice, ...existingInvoices];
        localStorage.setItem('invoiceHistory', JSON.stringify(updatedInvoices));

    } else {
      toast({
        variant: "destructive",
        title: "Incomplete Details",
        description: "Please fill in all patient details.",
      });
    }
  }

  const handleDialogCloseAndRefresh = () => {
    setShowConfirmationDialog(false);
    window.location.reload();
  }

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
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                        <p className="font-semibold">Price per night:</p>
                        <p className="font-bold text-lg text-primary">${bed.price}</p>
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
                      onClick={() => handleBookNowClick(hospital.hospitalName, bed)}
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

       <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm Your Booking</DialogTitle>
                <DialogDescription>
                    Please provide patient details and confirm your reservation for a {selectedBed?.bed.type} bed at {selectedBed?.hospital}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="patient-name">Patient Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="patient-name" placeholder="e.g., John Doe" value={patientDetails.name} onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})} className="pl-8" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="patient-phone">Contact Number</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="patient-phone" placeholder="e.g., +1 555 123 4567" value={patientDetails.phone} onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value})} className="pl-8" />
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                    <p className="font-medium">Total Amount Payable:</p>
                    <p className="font-bold text-2xl text-primary">${selectedBed?.bed.price}</p>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setShowBookingForm(false)}>Cancel</Button>
                <Button onClick={handleConfirmBooking}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Confirm & Pay
                </Button>
            </DialogFooter>
        </DialogContent>
       </Dialog>

      <AlertDialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              Your bed has been successfully reserved. Please proceed to the
              hospital. An invoice has been added to your billing page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedBed && (
            <div className="py-4 text-center bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Patient</p>
              <p className="font-bold text-lg">{patientDetails.name}</p>
              <p className="text-sm text-muted-foreground mt-2">Hospital</p>
              <p className="font-bold text-lg">{selectedBed.hospital}</p>
              <p className="text-sm text-muted-foreground mt-2">Bed Type</p>
              <p className="font-bold text-lg">{selectedBed.bed.type}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogCloseAndRefresh}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
