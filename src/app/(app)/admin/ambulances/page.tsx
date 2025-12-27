
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ambulanceAvailability } from "@/lib/placeholder-data";
import { Ambulance as AmbulanceIcon, LocateFixed, User, Battery } from "lucide-react";
import Image from "next/image";
import { placeholderImages } from '@/lib/placeholder-images';

type AmbulanceLocation = {
  id: string;
  vehicleNumber: string;
  driverName: string;
  status: 'available' | 'on-duty' | 'maintenance';
  position: { top: string; left: string };
};

const initialAmbulanceLocations: AmbulanceLocation[] = ambulanceAvailability.map((amb, index) => ({
  ...amb,
  position: {
    top: `${20 + index * 25}%`,
    left: `${20 + index * 15}%`,
  },
}));

export default function AmbulanceTrackingPage() {
  const [locations, setLocations] = useState<AmbulanceLocation[]>(initialAmbulanceLocations);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocations(currentLocations => 
        currentLocations.map(loc => {
          if (loc.status === 'on-duty') {
            const top = parseFloat(loc.position.top);
            const left = parseFloat(loc.position.left);
            return {
              ...loc,
              position: {
                top: `${Math.min(90, Math.max(10, top + (Math.random() - 0.5) * 5))}%`,
                left: `${Math.min(90, Math.max(10, left + (Math.random() - 0.5) * 5))}%`,
              },
            };
          }
          return loc;
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);
  
  const mapImage = placeholderImages.find(p => p.id === 'map-background');

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Ambulance Map</CardTitle>
            <CardDescription>Real-time location of the ambulance fleet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[500px] w-full bg-secondary rounded-lg overflow-hidden">
                {mapImage && (
                    <Image
                        src={mapImage.imageUrl}
                        alt={mapImage.description}
                        data-ai-hint={mapImage.imageHint}
                        fill
                        className="object-cover opacity-50"
                    />
                )}
              {locations.map(amb => (
                <div
                  key={amb.id}
                  className="absolute transition-all duration-1000 ease-linear"
                  style={{ top: amb.position.top, left: amb.position.left }}
                >
                  <div className="relative group">
                    <AmbulanceIcon className={`h-8 w-8 ${amb.status === 'available' ? 'text-green-500' : amb.status === 'on-duty' ? 'text-blue-500 animate-pulse' : 'text-gray-500'}`} />
                    <div className="absolute bottom-full mb-2 w-48 bg-background p-2 rounded-lg shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p className="font-bold">{amb.vehicleNumber}</p>
                      <p><User className="inline h-3 w-3 mr-1"/>{amb.driverName}</p>
                      <p><Battery className="inline h-3 w-3 mr-1"/>Status: <span className="font-medium capitalize">{amb.status}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Fleet Status</CardTitle>
            <CardDescription>Overview of all ambulances.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {locations.map(amb => (
                        <TableRow key={amb.id}>
                            <TableCell className="font-medium">{amb.vehicleNumber}</TableCell>
                            <TableCell>{amb.driverName}</TableCell>
                            <TableCell>
                                <Badge variant={amb.status === 'available' ? 'default' : amb.status === 'on-duty' ? 'secondary' : 'destructive'} className="capitalize">
                                    {amb.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
