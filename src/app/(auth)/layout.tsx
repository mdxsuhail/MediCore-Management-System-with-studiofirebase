import { Logo } from "@/components/logo";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src={placeholderImages[1].imageUrl}
          alt={placeholderImages[1].description}
          data-ai-hint={placeholderImages[1].imageHint}
          fill
          className="object-cover"
        />
        <div className="relative z-20 flex items-center">
            <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has revolutionized how I manage my health, providing all the tools I need in one accessible place.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Patient</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}
