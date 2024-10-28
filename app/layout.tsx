import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SolarPay Admin Portal',
  description: 'Manage your solar payment system efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <footer className="py-4 px-8 border-t bg-background">
              <p className="text-center text-sm text-muted-foreground">
                Powered by Best Brains Technology Inc.
              </p>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}