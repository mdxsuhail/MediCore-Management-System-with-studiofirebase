
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { vitals } from '@/lib/placeholder-data';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  HeartPulse,
  PlusCircle,
  Thermometer,
  Weight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const vitalIcons: { [key: string]: React.ReactNode } = {
  'Blood Pressure': <HeartPulse className="h-8 w-8 text-primary" />,
  'Blood Glucose': <Thermometer className="h-8 w-8 text-primary" />,
  BMI: <Weight className="h-8 w-8 text-primary" />,
};

const trendIcons: { [key: string]: React.ReactNode } = {
  up: <ArrowUp className="h-4 w-4 text-destructive" />,
  down: <ArrowDown className="h-4 w-4 text-green-500" />,
  stable: <ArrowRight className="h-4 w-4 text-muted-foreground" />,
};

const chartData = [
  { name: 'Jan', bp: 120, glucose: 90 },
  { name: 'Feb', bp: 122, glucose: 95 },
  { name: 'Mar', bp: 118, glucose: 88 },
  { name: 'Apr', bp: 125, glucose: 105 },
  { name: 'May', bp: 123, glucose: 100 },
  { name: 'Jun', bp: 120, glucose: 92 },
];


export default function VitalsPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {vitals.map((vital) => (
          <Card key={vital.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-4">
                {vitalIcons[vital.name]}
                <CardTitle className="text-lg">{vital.name}</CardTitle>
              </div>
              {trendIcons[vital.trend]}
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{vital.value}</p>
              <p className="text-sm text-muted-foreground">{vital.unit}</p>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">Last updated: {new Date(vital.date).toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Log New Vitals</CardTitle>
            <CardDescription>Enter your latest measurements below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bp-sys">Blood Pressure (Systolic)</Label>
                <Input id="bp-sys" placeholder="e.g., 120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp-dia">Blood Pressure (Diastolic)</Label>
                <Input id="bp-dia" placeholder="e.g., 80" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
              <Input id="glucose" placeholder="e.g., 95" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="bmi">BMI (kg/m²)</Label>
              <Input id="bmi" placeholder="e.g., 22.5" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Log</Button>
          </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Trends Over Time</CardTitle>
                <CardDescription>Visualize your health data from the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="bp" name="Blood Pressure" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="glucose" name="Glucose" stroke="hsl(var(--accent))" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
