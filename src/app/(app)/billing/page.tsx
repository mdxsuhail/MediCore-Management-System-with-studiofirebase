
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, Plus } from "lucide-react";

const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/26' },
];

const invoiceHistory = [
    { id: 'inv-001', date: '2024-07-15', amount: '$250.00', status: 'Paid' },
    { id: 'inv-002', date: '2024-06-20', amount: '$220.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods.</CardDescription>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Method
                </Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                            <p className="font-medium">Visa ending in {paymentMethods[0].last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {paymentMethods[0].expiry}</p>
                        </div>
                    </div>
                    <Button variant="outline">Edit</Button>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>View and download your past invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoiceHistory.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
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
