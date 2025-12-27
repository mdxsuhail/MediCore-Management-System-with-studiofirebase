
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bed, Minus, Plus } from "lucide-react";
import { hospitalBedAvailability as initialHospitalBedAvailability } from "@/lib/placeholder-data";
import type { HospitalBedInfo, BedInfo } from "@/lib/types";
import { useToast } from '@/hooks/use-toast';

export default function BedManagementPage() {
  const [bedData, setBedData] = useState<HospitalBedInfo[]>(initialHospitalBedAvailability);
  const { toast } = useToast();

  const handleOccupancyChange = (hospitalName: string, bedType: string, change: number) => {
    setBedData(prevData =>
      prevData.map(hospital => {
        if (hospital.hospitalName === hospitalName) {
          return {
            ...hospital,
            beds: hospital.beds.map(bed => {
              if (bed.type === bedType) {
                const newOccupied = Math.max(0, Math.min(bed.total, bed.occupied + change));
                return {
                  ...bed,
                  occupied: newOccupied,
                  available: bed.total - newOccupied,
                };
              }
              return bed;
            }),
          };
        }
        return hospital;
      })
    );
    toast({
      title: 'Bed Occupancy Updated',
      description: `Occupancy for ${bedType} at ${hospitalName} has been adjusted.`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bedData.map(hospital => (
        <Card key={hospital.hospitalName}>
          <CardHeader>
            <CardTitle>{hospital.hospitalName}</CardTitle>
            <CardDescription>Live bed management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {hospital.beds.map(bed => (
              <div key={bed.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    {bed.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-primary">{bed.available}</span>
                    <span className="text-muted-foreground">/{bed.total} Available</span>
                  </p>
                </div>
                <Progress value={(bed.occupied / bed.total) * 100} />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Occupied: {bed.occupied}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleOccupancyChange(hospital.hospitalName, bed.type, -1)}
                      disabled={bed.occupied === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleOccupancyChange(hospital.hospitalName, bed.type, 1)}
                      disabled={bed.occupied === bed.total}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
