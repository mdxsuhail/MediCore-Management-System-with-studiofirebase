
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placeholderImages } from "@/lib/placeholder-images";
import { Edit } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-start pt-8">
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your personal and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage 
                        src={placeholderImages.find(p => p.id === 'user-avatar-1')?.imageUrl} 
                        alt="User avatar" 
                        data-ai-hint={placeholderImages.find(p => p.id === 'user-avatar-1')?.imageHint}
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-muted-foreground">john.doe@example.com</p>
                         <Button variant="outline" size="sm" className="mt-2">
                            <Edit className="mr-2 h-4 w-4" />
                            Change Picture
                        </Button>
                    </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 border-b pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" defaultValue="john.doe@example.com" disabled />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" defaultValue="1990-05-25" />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                       <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 Health St, Wellness City, USA 12345" />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" defaultValue="Patient" disabled />
                      </div>
                       <div className="space-y-2">
                          <Label htmlFor="member-since">Member Since</Label>
                          <Input id="member-since" defaultValue="July 20, 2024" disabled />
                      </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 border-b pb-2">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="emergency-name">Contact Name</Label>
                        <Input id="emergency-name" defaultValue="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emergency-phone">Contact Phone</Label>
                        <Input id="emergency-phone" defaultValue="+1 (555) 987-6543" />
                    </div>
                  </div>
                </div>
                
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
