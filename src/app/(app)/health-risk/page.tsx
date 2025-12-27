
"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
    score: {
      label: "Score",
    },
    age: { label: "Age", color: "hsl(var(--chart-1))" },
    bmi: { label: "BMI", color: "hsl(var(--chart-2))" },
    lifestyle: { label: "Lifestyle", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig

export default function HealthRiskPage() {
    const [riskResult, setRiskResult] = useState<{level: string, score: number, chartData: any[]} | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isClient) return;

        // Mock calculation
        const score = Math.floor(Math.random() * 100);
        let level = "Low Risk";
        if (score > 66) level = "High Risk";
        else if (score > 33) level = "Medium Risk";
        
        setRiskResult({ 
            level, 
            score,
            chartData: [
                { factor: "Age", score: Math.floor(Math.random() * 30), fill: "var(--color-age)" },
                { factor: "BMI", score: Math.floor(Math.random() * 40), fill: "var(--color-bmi)" },
                { factor: "Lifestyle", score: Math.floor(Math.random() * 30), fill: "var(--color-lifestyle)" }
            ]
        });
    };

    const getRiskColor = (level: string) => {
        if (level === 'High Risk') return 'text-destructive';
        if (level === 'Medium Risk') return 'text-yellow-500';
        return 'text-green-500';
    }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Health Risk Assessment</CardTitle>
            <CardDescription>
              Fill out the form below to get an estimate of your health risk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="e.g., 35" />
                    </div>
                    <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup defaultValue="male" className="flex pt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input id="height" type="number" placeholder="e.g., 175" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input id="weight" type="number" placeholder="e.g., 70" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="blood-pressure">Systolic Blood Pressure</Label>
                        <Input id="blood-pressure" type="number" placeholder="e.g., 120" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
                        <Input id="cholesterol" type="number" placeholder="e.g., 200" />
                    </div>
                     <div className="space-y-2">
                        <Label>Do you smoke?</Label>
                        <RadioGroup defaultValue="no" className="flex pt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="smoke-yes" /><Label htmlFor="smoke-yes">Yes</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="smoke-no" /><Label htmlFor="smoke-no">No</Label></div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label>Do you have diabetes?</Label>
                        <RadioGroup defaultValue="no" className="flex pt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="diabetes-yes" /><Label htmlFor="diabetes-yes">Yes</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="diabetes-no" /><Label htmlFor="diabetes-no">No</Label></div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label>Does your family have a history of heart disease?</Label>
                        <RadioGroup defaultValue="no" className="flex pt-2">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="history-yes" /><Label htmlFor="history-yes">Yes</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="history-no" /><Label htmlFor="history-no">No</Label></div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-2">
                        <Label>Physical Activity</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select activity level" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sedentary">Sedentary</SelectItem>
                                <SelectItem value="light">Lightly Active</SelectItem>
                                <SelectItem value="moderate">Moderately Active</SelectItem>
                                <SelectItem value="very">Very Active</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Alcohol Consumption</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Select consumption level" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="light">Light (1-3 drinks/week)</SelectItem>
                                <SelectItem value="moderate">Moderate (4-7 drinks/week)</SelectItem>
                                <SelectItem value="heavy">Heavy (8+ drinks/week)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

              <div className="flex justify-end pt-6">
                 <Button type="submit">Calculate Risk</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Your Result</CardTitle>
                <CardDescription>This is an estimate based on the provided data.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                {riskResult ? (
                    <div className="space-y-4">
                        <p className={`text-4xl font-bold ${getRiskColor(riskResult.level)}`}>{riskResult.level}</p>
                        <p className="text-lg text-muted-foreground">Overall Score: {riskResult.score}/100</p>
                    </div>
                ) : (
                    <p className="text-muted-foreground">Complete the form to see your result.</p>
                )}
            </CardContent>
        </Card>
        {riskResult && (
            <Card>
                <CardHeader>
                    <CardTitle>Risk Factors Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <RechartsBarChart accessibilityLayer data={riskResult.chartData} layout="vertical" margin={{ left: 10 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="factor" type="category" tickLine={false} tickMargin={10} axisLine={false} />
                            <XAxis dataKey="score" type="number" hide />
                            <Tooltip cursor={false} content={<ChartTooltipContent />} />
                            <Bar dataKey="score" radius={5} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
