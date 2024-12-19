"use client";
import React from "react";

interface CheckoutModalProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to close the modal
  cart: {
    id: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[]; // Array of cart items
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
}) => {
  if (!isOpen) return null; // Do not render the modal if it's not open
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[800px] max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-lg font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-[#364A63] mb-6">Your Cart</h2>

        {/* Headers */}
        <div className="grid grid-cols-8 gap-4 pb-4 border-b text-[#8094ae]">
          <div className="col-span-4">Item</div>
          <div>Color</div>
          <div>Size</div>
          <div>Qnt</div>
          <div className="text-right">Price</div>
        </div>

        {/* Cart Items */}
        <div id="cart-items">
          {cart.map((item, i) => (
            <div
              key={item.id + i}
              className="grid grid-cols-8 gap-4 py-4 border-b items-center"
            >
              <div className="col-span-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="font-medium text-[#364A63]">{item.name}</span>
              </div>
              <div className="capitalize">{item.color}</div>
              <div className="font-bold">{item.size}</div>
              <div className="font-bold">{item.quantity}</div>
              <div className="text-right font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="grid grid-cols-8 gap-4 mt-6 mb-8">
          <div className="text-xl font-bold text-[#364A63] col-span-6">
            Total
          </div>
          <div id="total-items" className="text-xl font-bold text-[#364A63]">
            {totalQuantity}
          </div>
          <div className="text-xl font-bold text-[#364A63] text-right">
            $<span id="total-price">{totalPrice}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border font-bold border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Continue Shopping
          </button>
          <button className="px-6 py-3 bg-[#6576FF] font-bold text-white rounded-md hover:bg-[#4b5bff]">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
