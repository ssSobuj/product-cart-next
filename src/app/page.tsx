import ProductDetails from "@/components/ProductCart";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-[10rem] md:px-[18.75rem] md:py-30">
      <ProductDetails />
    </div>
  );
}
