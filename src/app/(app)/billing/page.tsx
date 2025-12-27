
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Plus, CheckCircle2 } from "lucide-react";
import type { Invoice } from "@/lib/types";
import { initialInvoiceHistory } from "@/lib/placeholder-data";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/26' },
];

export default function BillingPage() {
    const { toast } = useToast();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // On component mount, read from localStorage or use initial data
        const storedInvoices = localStorage.getItem('invoiceHistory');
        if (storedInvoices) {
            setInvoices(JSON.parse(storedInvoices));
        } else {
            setInvoices(initialInvoiceHistory);
            localStorage.setItem('invoiceHistory', JSON.stringify(initialInvoiceHistory));
        }
    }, []);

    const handlePayNow = (invoiceId: string) => {
        const updatedInvoices = invoices.map(inv => 
            inv.id === invoiceId ? { ...inv, status: 'Paid' as const } : inv
        );
        setInvoices(updatedInvoices);
        localStorage.setItem('invoiceHistory', JSON.stringify(updatedInvoices));

        toast({
            title: "Payment Successful",
            description: `Invoice ${invoiceId} has been paid.`,
        });
    };

    if (!isClient) {
        return null; // or a loading spinner
    }

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
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.description}</TableCell>
                                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>
                                        {invoice.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {invoice.status === 'Unpaid' ? (
                                        <Button variant="default" size="sm" onClick={() => handlePayNow(invoice.id)}>
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            Pay Now
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    )}
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
