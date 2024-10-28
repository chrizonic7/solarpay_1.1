import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
        <Image
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070"
          alt="Solar panels"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 flex items-center justify-center h-full px-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">SolarPay Management System</h1>
            <p className="text-lg opacity-90">Efficiently manage your solar payment operations</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8">
          {children}
        </div>
        <footer className="py-4 px-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            Powered by Best Brains Technology Inc.
          </p>
        </footer>
      </div>
    </div>
  )
}