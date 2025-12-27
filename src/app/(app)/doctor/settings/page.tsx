
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DoctorSettingsPage() {
  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Profile & Consultation</CardTitle>
                <CardDescription>Manage your public profile and consultation settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input id="specialty" defaultValue="Cardiologist" />
                </div>
                <div className="space-y-2">
                     <Label htmlFor="fee">Consultation Fee ($)</Label>
                     <Input id="fee" type="number" defaultValue="250" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Save Profile</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Choose how you receive notifications about your practice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className="font-medium">New Appointment Bookings</p>
                        <p className="text-sm text-muted-foreground">Get notified when a new patient books a token.</p>
                    </div>
                    <Checkbox defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <p className="font-medium">Appointment Cancellations</p>
                        <p className="text-sm text-muted-foreground">Get notified when a patient cancels an appointment.</p>
                    </div>
                    <Checkbox defaultChecked />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
