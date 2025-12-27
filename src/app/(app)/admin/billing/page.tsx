
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, Bar as BarChartComponent, BarChart as RechartsBarChart } from "@/components/ui/chart";

const revenueData = [
    { month: 'Jan', revenue: 4500 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 7100 },
    { month: 'Apr', revenue: 6300 },
    { month: 'May', revenue: 8200 },
    { month: 'Jun', revenue: 9500 },
];

const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
};

const recentTransactions = [
    { id: 'txn-001', patient: 'John Doe', doctor: 'Dr. Carter', service: 'Consultation', amount: '$250.00', status: 'Paid' },
    { id: 'txn-002', patient: 'Jane Smith', doctor: 'Dr. Adams', service: 'Bed Booking', amount: '$400.00', status: 'Paid' },
    { id: 'txn-003', patient: 'Michael Brown', doctor: 'Dr. Carter', service: 'Consultation', amount: '$250.00', status: 'Unpaid' },
    { id: 'txn-004', patient: 'Jessica Williams', doctor: 'Dr. Wilson', service: 'Surgery Deposit', amount: '$1500.00', status: 'Paid' },
    { id: 'txn-005', patient: 'John Doe', doctor: 'Dr. Martinez', service: 'Bed Booking', amount: '$200.00', status: 'Unpaid' },
];

export default function AdminBillingPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">$1,750.00</div>
            <p className="text-xs text-muted-foreground">Across 2 invoices</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">Since last quarter</p>
            </CardContent>
        </Card>
     </div>
     <div className="grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <RechartsBarChart accessibilityLayer data={revenueData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <BarChartComponent dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>A list of the most recent transactions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTransactions.map(t => (
                            <TableRow key={t.id}>
                                <TableCell className="font-medium">{t.patient}</TableCell>
                                <TableCell>{t.doctor}</TableCell>
                                <TableCell>{t.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={t.status === 'Paid' ? 'default' : 'destructive'} className="capitalize bg-green-500 text-white">
                                        {t.status}
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
