
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockUsers } from "@/lib/users";
import { type MockUser } from "@/lib/types";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
  role: z.enum(["patient", "doctor", "admin"], {
    required_error: "You need to select a role.",
  }),
});

// Store users in a client-side variable to persist them across navigations
let sessionUsers: MockUser[] = [...mockUsers];

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUsers = localStorage.getItem('sessionUsers');
    if (storedUsers) {
      sessionUsers = JSON.parse(storedUsers);
    } else {
        localStorage.setItem('sessionUsers', JSON.stringify(sessionUsers));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "patient",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, role } = values;

    const user = sessionUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "No account found with this email. Please sign up.",
      });
      return;
    }

    if (user.role !== role || user.password !== password) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email, password, or role selected.",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Redirecting to your dashboard...",
    });

    switch (values.role) {
      case "doctor":
        router.push("/doctor");
        break;
      case "admin":
        router.push("/admin");
        break;
      case "patient":
      default:
        router.push("/dashboard");
        break;
    }
  }

  if (!isClient) {
      return null;
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <div className="lg:hidden mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sign in as a...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="patient" />
                      </FormControl>
                      <FormLabel className="font-normal">Patient</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="doctor" />
                      </FormControl>
                      <FormLabel className="font-normal">Doctor</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel className="font-normal">Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button">Google</Button>
          <Button variant="outline" type="button">Facebook</Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
        .
      </p>
    </>
  );
}
