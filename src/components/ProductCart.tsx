"use client";
import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const ProductCart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]); // Store cart items
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedPrice, setSelectedPrice] = useState(69);
  const [selectedImage, setSelectedImage] = useState(
    "/product-images/purple.png"
  );
  const [cartQuantity, setCartQuantity] = useState(1);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Dummy data for the product
  const productDetails = {
    name: "Classy Modern Smart Watch",
    id: "product-001",
    defaultImage: "/product-images/purple.png",
    images: [
      { color: "purple", image: "/product-images/purple.png" },
      { color: "blue", image: "/product-images/blue.png" },
      { color: "green", image: "/product-images/green.png" },
      { color: "black", image: "/product-images/black.png" },
    ],
    colors: [
      { name: "purple", colorCode: "#816BFF" },
      { name: "green", colorCode: "#1FCEC9" },
      { name: "blue", colorCode: "#4B97D3" },
      { name: "black", colorCode: "#3B4747" },
    ],
    stock: 10,
    ratings: 2.5,
    reviews: 2,
    productDescription:
      "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
    productType: "Watch",
    modelNumber: "Forerunner 290XT",
    isFavorite: false,
    defaultColor: "purple",
    defaultSize: "M",
    defaultPrice: 99,
    discountPrice: 79,
    priceBySize: {
      S: 69,
      M: 79,
      L: 89,
      XL: 99,
    },
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const colorImage = productDetails.images.find((img) => img.color === color);
    setSelectedImage(colorImage?.image || productDetails.defaultImage);
  };

  const handleSizePriceChange = (size: string, price: number) => {
    setSelectedSize(size);
    setSelectedPrice(price);
  };

  const handleAddToCart = () => {
    const item = {
      name: productDetails?.name,
      id: productDetails?.id,
      image: selectedImage,
      Color: selectedColor,
      size: selectedSize,
      price: selectedPrice,
      quantity: cartQuantity,
    };

    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.Color === selectedColor && cartItem.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += cartQuantity;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, item]);
    }

    setCartQuantity(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-[#ffffff] min-h-screen flex items-center justify-center px-[10rem] md:px-[18.75rem] md:py-30 relative">
        <div className="rounded-lg w-full flex flex-col md:flex-row gap-x-[3.75rem] py-10">
          {/* Left side - Image */}
          <div className="md:w-1/2 w-full rounded-lg flex items-center justify-center">
            <img
              id={`${productDetails.id}-product-image`}
              src={selectedImage}
              alt={productDetails.name}
              className="w-full h-auto md:object-contain rounded max-h-[45.0625rem] max-w-[39.375rem]"
            />
          </div>

          {/* Right side - Product Details */}
          <div className="md:w-1/2 w-full mt-5 md:mt-0 flex flex-col justify-center">
            <h1 className="text-[2.5rem] leading-[2.75rem] font-bold text-[#364A63] mb-3">
              {productDetails.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-[1.6875rem]">
              <div className="flex relative -left-1 justify-between">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productDetails.ratings)
                          ? "text-[#FFD200]"
                          : productDetails.ratings % 1 >= 0.5 &&
                            i === Math.floor(productDetails.ratings)
                          ? "text-[#FFD200]"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <span className="text-[#8091A7] text-sm">
                ({productDetails.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-[0.3125rem] mb-5">
              <span className="text-xl text-gray-400 line-through">
                ${productDetails.defaultPrice.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-[#6576FF]">
                ${productDetails.discountPrice.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#8091A7] mb-6 leading-[1.875rem]">
              {productDetails.productDescription}
            </p>

            {/* Product Info  */}
            <div className="flex gap-16 mb-6">
              <div>
                <span className="text-[#8091A7] text-sm leading-[1.44375rem]">
                  Type
                </span>
                <p className="font-bold text-[#364A63]">
                  {productDetails?.productType}
                </p>
              </div>
              <div>
                <span className="text-[#8091A7] text-sm leading-[1.44375rem]">
                  Model Number
                </span>
                <p className="font-bold text-[#364A63]">
                  {productDetails.modelNumber}
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-[#364A63]  font-bold mb-[0.625rem]">
                Band Color
              </h3>
              <div className="flex gap-4 leading-5">
                {productDetails.colors.map((color) => {
                  return (
                    <button
                      key={color.name}
                      data-color={color.name}
                      className={`w-5 aspect-square rounded-full`}
                      style={{
                        backgroundColor: color.colorCode,
                        outline: " 2px solid transparent",
                        border: "2px solid white",
                        outlineColor:
                          color.name == selectedColor
                            ? color.colorCode
                            : "transparent",
                      }}
                      onClick={() => handleColorChange(color.name)}
                    ></button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-[#364A63] font-bold leading-5 mb-[0.625rem]">
                Wrist Size
              </h3>
              <div className="flex gap-2">
                {Object.entries(productDetails.priceBySize).map(
                  ([size, price]) => (
                    <button
                      key={size}
                      className={`px-[1.125rem] text-[#364A63] text-sm py-2 border rounded-md ${
                        size === selectedSize
                          ? "border-[#6576FF]"
                          : "border-gray-300"
                      }`}
                      data-size={size}
                      onClick={() => handleSizePriceChange(size, price)}
                    >
                      <span
                        className={`font-bold ${
                          size === selectedSize
                            ? "text-[#6576FF]"
                            : "text-[#364A63]"
                        }`}
                      >
                        {size}
                      </span>
                      <span className="text-[#8091A7]"> ${price}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() =>
                    setCartQuantity((prev) => Math.max(1, prev - 1))
                  }
                  className="px-4 py-2 text-[#8091A7] text-[1.1375rem] hover:text-[#6576FF]"
                >
                  -
                </button>
                <span className="px-[1.625rem] py-2 border-x">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => setCartQuantity((prev) => prev + 1)}
                  className="px-4 py-2 text-[#8091A7] text-[1.1375rem] hover:text-[#6576FF]"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#6576FF] text-white px-[1.125rem] py-2 rounded hover:bg-[#7C3AED]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={openModal}
          className="fixed text-[#364A63] bottom-5 left-1/2 transform -translate-x-1/2 bg-[#FFBB5A] rounded-full px-6 py-2 font-bold z-50 shadow-lg"
        >
          {" "}
          Checkout{" "}
          <span className="px-[6px] py-[2px] bg-[#ffffff] rounded-md">
            {totalItems}
          </span>
        </button>
      </div>

      <CheckoutModal cart={cart} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ProductCart;
