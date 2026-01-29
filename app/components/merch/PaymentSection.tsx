"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Upload } from "lucide-react";
import { Product, qrCodes } from "@/lib/products";

interface PaymentSectionProps {
  product: Product;
  size: string;
  onBack: () => void;
  onSuccess: () => void;
  initialCoupon?: string;
}

export default function PaymentSection({ product, size, onBack, onSuccess, initialCoupon = "" }: PaymentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "",
    address: "",
  });

  // Referral State
  const [couponCode, setCouponCode] = useState(initialCoupon || "");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [referralData, setReferralData] = useState<{
    valid: boolean;
    referrer: string;
    discountValue: number;
    discountType: "fixed" | "percentage"
  } | null>(null);
  const [referralMessage, setReferralMessage] = useState("");

  const handleVerifyCoupon = async () => {
    if (!couponCode) return;
    setIsValidatingCoupon(true);
    setReferralMessage("");
    try {
      const res = await fetch("/api/coupons/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });
      const data = await res.json();
      if (data.success && data.valid) {
        setReferralData({
          valid: true,
          referrer: data.referrer,
          discountValue: data.discountValue,
          discountType: data.discountType
        });
        const discountText = data.discountType === "percentage" ? `${data.discountValue}%` : `₹${data.discountValue}`;
        setReferralMessage(`Referral applied! ${discountText} OFF (Supporting: ${data.referrer})`);
      } else {
        setReferralData({ valid: false, referrer: "", discountValue: 0, discountType: "fixed" });
        setReferralMessage("Invalid referral code");
      }
    } catch (e) {
      setReferralMessage("Error checking code");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Auto-validate if initialCoupon exists
  const [hasAutoValidated, setHasAutoValidated] = useState(false);
  if (initialCoupon && !hasAutoValidated && !referralData && !isValidatingCoupon) {
    setHasAutoValidated(true);
    // We need to call verification, but we can't call async in render.
    // Use useEffect instead.
  }

  useEffect(() => {
    if (initialCoupon && !referralData) {
      handleVerifyCoupon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 0. Validate Referral Code
    if (couponCode.trim() !== "") {
      if (isValidatingCoupon) {
        alert("Please wait for referral code validation.");
        return;
      }
      if (!referralData?.valid) {
        alert("Please enter a valid referral code or clear the field.");
        return;
      }
    }

    // 1. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // 2. Validate Screenshot
    if (!screenshot) {
      alert("Please upload payment screenshot");
      return;
    }

    setIsSubmitting(true);

    const calculateFinalPrice = () => {
      if (!referralData?.valid) return product.price;

      let finalPrice = product.price;
      if (referralData.discountType === "percentage") {
        finalPrice = product.price * (1 - referralData.discountValue / 100);
      } else {
        finalPrice = product.price - referralData.discountValue;
      }
      return Math.max(0, Math.floor(finalPrice));
    };

    const finalPrice = calculateFinalPrice();

    try {
      const data = new FormData();
      data.append("productId", product.id);
      data.append("productName", product.name);
      data.append("size", size);
      data.append("price", finalPrice.toString());
      data.append("customerName", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("transactionId", formData.transactionId);
      data.append("address", formData.address);
      data.append("screenshot", screenshot);
      if (referralData?.valid) {
        data.append("couponCode", couponCode);
      }

      const response = await fetch("/api/merch", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to submit order");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-black/50 border border-white/20 focus:border-[#EB0028] focus:outline-none font-clash text-white placeholder:text-gray-500 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md overflow-y-auto"
    >
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white/80 hover:text-white hover:border-[#EB0028] transition-colors font-clash text-sm"
          >
            <ArrowLeft size={16} />
            Back to Product
          </motion.button>
        </div>

        {/* Order Summary */}
        <div className="max-w-6xl mx-auto mb-8 p-4 border border-white/10 bg-black/30">
          <p className="font-clash text-gray-400 text-sm mb-2">Order Summary</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-orbitron text-lg text-white">{product.name}</p>
              <p className="font-clash text-gray-400">Size: {size}</p>
            </div>
            <div className="text-right">
              {referralData?.valid && (
                <p className="font-clash text-sm text-gray-500 line-through">₹{product.price}</p>
              )}
              <p className="font-clash text-2xl font-semibold text-[#EB0028]">
                ₹{referralData?.valid
                  ? (referralData.discountType === "percentage"
                    ? Math.max(0, Math.floor(product.price * (1 - referralData.discountValue / 100)))
                    : Math.max(0, product.price - referralData.discountValue))
                  : product.price}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Form + QR */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <h2 className="font-orbitron text-2xl font-bold mb-6 text-white">
              Payment <span className="text-[#EB0028]">Details</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-clash text-gray-400 text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block font-clash text-gray-400 text-sm mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block font-clash text-gray-400 text-sm mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block font-clash text-gray-400 text-sm mb-2">Transaction ID *</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter UPI transaction ID"
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block font-clash text-gray-400 text-sm mb-2">Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full delivery address with PIN code"
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <label
                  htmlFor="screenshot-upload"
                  className={`${inputClasses} flex items-center justify-center gap-2 cursor-pointer hover:border-[#EB0028]`}
                >
                  <Upload size={20} />
                  <span>{screenshot ? screenshot.name : "Upload Screenshot"}</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                  id="screenshot-upload"
                />
              </div>
              {previewUrl && (
                <div className="mt-3 relative w-32 h-32 border border-white/20">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                </div>
              )}

              {/* Referral Code Section */}
              <div className="pt-4 border-t border-white/10">
                <label className="block font-clash text-gray-400 text-sm mb-2">Referral Code (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="TXC-XXXXXXXX"
                    className={`${inputClasses} uppercase`}
                    disabled={isValidatingCoupon || referralData?.valid}
                  />
                  {!referralData?.valid && (
                    <button
                      type="button"
                      onClick={handleVerifyCoupon}
                      disabled={!couponCode || isValidatingCoupon}
                      className="px-4 py-2 bg-white/10 border border-white/20 text-white font-clash hover:bg-white/20 disabled:opacity-50 transition-colors"
                    >
                      {isValidatingCoupon ? "Checking..." : "Apply"}
                    </button>
                  )}
                  {referralData?.valid && (
                    <button
                      type="button"
                      onClick={() => {
                        setReferralData(null);
                        setCouponCode("");
                      }}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 font-clash hover:bg-red-500/30 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {referralMessage && (
                  <p className={`mt-2 text-sm font-clash ${referralData?.valid ? "text-green-400" : "text-red-400"}`}>
                    {referralMessage}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 mt-6 font-clash font-bold text-lg tracking-wide uppercase transition-all duration-300 ${isSubmitting
                  ? "bg-gray-700 text-gray-400 cursor-wait"
                  : "bg-[#EB0028] hover:bg-[#c00020] text-white cursor-pointer"
                  }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Order"}
              </motion.button>
            </form>
          </div>

          {/* QR Section */}
          <div className="order-1 lg:order-2">
            <h2 className="font-orbitron text-2xl font-bold mb-6 text-white">
              Scan & <span className="text-[#EB0028]">Pay</span>
            </h2>

            <div className="border border-white/20 p-12 bg-black/30">
              <div className="relative aspect-square w-full max-w-[300px] mx-auto mb-4 bg-white p-4">
                <Image
                  src={qrCodes[0].src}
                  alt={qrCodes[0].label}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <p className="font-clash text-center text-gray-400 mb-4">
                {qrCodes[0].label}
              </p>

              <p className="font-clash text-center text-xl font-semibold text-[#EB0028] ">
                Amount: ₹{referralData?.valid
                  ? (referralData.discountType === "percentage"
                    ? Math.max(0, Math.floor(product.price * (1 - referralData.discountValue / 100)))
                    : Math.max(0, product.price - referralData.discountValue))
                  : product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}