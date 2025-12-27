
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Banknote, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const earningsHistory = [
    { id: 'earn-001', date: '2024-07-20', description: 'Consultation - John Doe', amount: '$200.00', status: 'Cleared' },
    { id: 'earn-002', date: '2024-07-19', description: 'Consultation - Jane Smith', amount: '$200.00', status: 'Cleared' },
    { id: 'earn-003', date: '2024-07-18', description: 'Follow-up - Michael Brown', amount: '$100.00', status: 'Pending' },
    { id: 'earn-004', date: '2024-07-17', description: 'Consultation - Jessica Williams', amount: '$200.00', status: 'Cleared' },
    { id: 'earn-005', date: '2024-07-16', description: 'Consultation - Emily Davis', amount: '$200.00', status: 'Pending' },
];

const payoutHistory = [
    { id: 'payout-01', date: '2024-07-15', method: 'Bank Transfer', amount: '$1,500.00', status: 'Completed' },
    { id: 'payout-02', date: '2024-06-15', method: 'Bank Transfer', amount: '$1,350.00', status: 'Completed' },
];

export default function DoctorBillingPage() {
    const { toast } = useToast();

    const handleRequestPayout = () => {
        toast({
            title: "Payout Requested",
            description: "Your available earnings will be transferred within 3-5 business days.",
        });
    };

  return (
    <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$300.00</div>
                    <p className="text-xs text-muted-foreground">From 2 pending consultations</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients (This Month)</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
            </Card>
             <Card className="flex flex-col justify-center">
                <CardHeader>
                    <CardTitle>Request Payout</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={handleRequestPayout}>Request Payout</Button>
                </CardContent>
            </Card>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>
            Your earnings from recent consultations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earningsHistory.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{earning.date}</TableCell>
                  <TableCell className="font-medium">{earning.description}</TableCell>
                  <TableCell>{earning.amount}</TableCell>
                  <TableCell>
                    <Badge variant={earning.status === 'Cleared' ? 'default' : 'secondary'} className="capitalize bg-green-500 text-white">
                      {earning.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>History of your requested payouts.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {payoutHistory.map((payout) => (
                        <TableRow key={payout.id}>
                            <TableCell>{payout.date}</TableCell>
                            <TableCell>{payout.method}</TableCell>
                            <TableCell className="font-medium">{payout.amount}</TableCell>
                            <TableCell>
                                <Badge variant="default" className="capitalize bg-green-500 text-white">{payout.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Invoice
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
