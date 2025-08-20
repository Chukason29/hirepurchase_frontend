import { AboutGrid } from "@/components/about-grid";
import { DownloadApp } from "@/components/download-app";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Logo } from "@/components/logos";
import Navbar from "@/components/navbar";
import { Products } from "@/components/products";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <AboutGrid />
      <Products />
      <Logo />
      <DownloadApp />
      <Footer />
      {/* <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Home Page
      </h1> */}
    </div>
  );
}
