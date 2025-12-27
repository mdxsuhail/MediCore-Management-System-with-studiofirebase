
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { medications as initialMedications } from "@/lib/placeholder-data";
import type { Medication } from "@/lib/types";
import { Bell, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const { toast } = useToast();

  const handleSetReminder = (medName: string) => {
    toast({
      title: "Reminder Set!",
      description: `We'll remind you to take your ${medName}.`,
    });
  };

  const handleDelete = (medId: string) => {
    setMedications(meds => meds.filter(m => m.id !== medId));
    toast({
      title: "Medication Removed",
      description: "The medication has been removed from your list.",
      variant: "destructive"
    });
  };

  const handleStatusChange = (medId: string, newStatus: boolean) => {
    setMedications(meds => 
      meds.map(m => 
        m.id === medId ? { ...m, status: newStatus ? 'active' : 'inactive' } : m
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Your Medications</CardTitle>
          <CardDescription>
            Track your prescriptions and manage your medication schedule.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full max-w-[150px] md:max-w-none">Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Refills Remaining</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.id}>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell>{med.frequency}</TableCell>
                <TableCell>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <Progress value={(med.refillsRemaining / 5) * 100} className="w-full md:w-[60%]" />
                        <span className="text-xs text-muted-foreground md:text-sm">{med.refillsRemaining} of 5</span>
                    </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`status-${med.id}`}
                      checked={med.status === 'active'}
                      onCheckedChange={(checked) => handleStatusChange(med.id, checked)}
                      aria-label={`Mark as ${med.status === 'active' ? 'inactive' : 'active'}`}
                    />
                     <Label htmlFor={`status-${med.id}`} className="text-xs md:text-sm capitalize">
                        {med.status}
                    </Label>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleSetReminder(med.name)}>
                          <Bell className="mr-2 h-4 w-4" />
                          Set Reminder
                        </DropdownMenuItem>
                       <AlertDialogTrigger asChild>
                         <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>
                           <Trash2 className="mr-2 h-4 w-4" />
                           Delete
                         </DropdownMenuItem>
                       </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete {med.name} from your list.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(med.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
