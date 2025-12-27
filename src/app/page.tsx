import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Stethoscope, FileText, Calendar, ShieldCheck, Ambulance } from "lucide-react";
import { Logo } from "@/components/logo";
import placeHolderImage from "@/lib/placeholder-images.json";

export default function Home() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Health Risk Assessment",
      description: "Understand your health better with our rule-based risk assessment dashboard.",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Document Management",
      description: "Securely upload, store, and access your medical documents and prescriptions anytime.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Easy Appointments",
      description: "Book appointments with a token system, and track your queue number live.",
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "Find Your Doctor",
      description: "Discover doctors by specialty, availability, and experience to fit your needs.",
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      title: "Live Bed Availability",
      description: "View real-time hospital bed availability to make informed decisions.",
    },
    {
      icon: <Ambulance className="w-8 h-8 text-primary" />,
      title: "Ambulance Tracking",
      description: "Check for available ambulances and their locations in case of emergencies.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-primary">
                Smarter Healthcare, Simplified.
              </h1>
              <p className="text-lg text-muted-foreground">
                MediTrack Pro is your all-in-one platform for managing health records, booking appointments, and assessing health risks—all for free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Access Your Dashboard</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
               <Image
                src={placeHolderImage.placeholderImages[0].imageUrl}
                alt={placeHolderImage.placeholderImages[0].description}
                data-ai-hint={placeHolderImage.placeholderImages[0].imageHint}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section id="features" className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">A New Era of Health Management</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                MediTrack Pro brings you a suite of powerful, free tools to take control of your healthcare journey.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <CardTitle className="pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} MediTrack Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
