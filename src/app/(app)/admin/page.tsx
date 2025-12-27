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
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
  import { Badge } from "@/components/ui/badge";
  import { Progress } from "@/components/ui/progress";
  import { bedAvailability, doctors, ambulanceAvailability } from "@/lib/placeholder-data";
  import { BarChart, Bed, Hospital, Stethoscope, Users, Ambulance as AmbulanceIcon } from "lucide-react";
  import { ChartContainer, ChartTooltip, ChartTooltipContent, Bar as BarChartComponent, BarChart as RechartsBarChart } from "@/components/ui/chart";

  const chartData = [
    { month: "January", appointments: 186 },
    { month: "February", appointments: 305 },
    { month: "March", appointments: 237 },
    { month: "April", appointments: 73 },
    { month: "May", appointments: 209 },
    { month: "June", appointments: 214 },
  ];
  
  const chartConfig = {
    appointments: {
      label: "Appointments",
      color: "hsl(var(--primary))",
    },
  };
  
  export default function AdminDashboardPage() {
    return (
      <div className="space-y-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{doctors.length}</div>
                <p className="text-xs text-muted-foreground">currently on staff</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">5,421</div>
                <p className="text-xs text-muted-foreground">registered in the system</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">across all departments</p>
                </CardContent>
            </Card>
         </div>

         <Card>
            <CardHeader>
              <CardTitle>Appointment Analytics</CardTitle>
              <CardDescription>Monthly appointment trends.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <BarChartComponent dataKey="appointments" fill="var(--color-appointments)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Tabs defaultValue="beds">
            <TabsList>
                <TabsTrigger value="beds">Bed Management</TabsTrigger>
                <TabsTrigger value="ambulances">Ambulance Status</TabsTrigger>
                <TabsTrigger value="doctors">Doctor Management</TabsTrigger>
            </TabsList>
            <TabsContent value="beds">
                <Card>
                    <CardHeader><CardTitle>Bed Availability</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {bedAvailability.map(bedInfo => (
                            <div key={bedInfo.type} className="space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-medium">{bedInfo.type}</p>
                                    <p className="text-sm text-muted-foreground">{bedInfo.occupied} / {bedInfo.total}</p>
                                </div>
                                <Progress value={(bedInfo.occupied / bedInfo.total) * 100} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="ambulances">
                <Card>
                    <CardHeader><CardTitle>Ambulance Fleet Status</CardTitle></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Vehicle No.</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ambulanceAvailability.map(amb => (
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
            </TabsContent>
            <TabsContent value="doctors">
                <Card>
                    <CardHeader><CardTitle>Doctor Roster</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Specialty</TableHead>
                                <TableHead>Hospital</TableHead>
                                <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {doctors.map(doctor => (
                                <TableRow key={doctor.id}>
                                    <TableCell className="font-medium">{doctor.name}</TableCell>
                                    <TableCell>{doctor.specialty}</TableCell>
                                    <TableCell>{doctor.hospital}</TableCell>
                                    <TableCell>
                                        <Badge variant={doctor.availability === 'available' ? 'default' : 'destructive'} className="capitalize">{doctor.availability}</Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>
    );
  }
  