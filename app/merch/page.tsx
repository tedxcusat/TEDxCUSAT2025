"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { products, Product } from "@/lib/products";
import MerchCard from "../components/merch/MerchCard";
import ProductDetail from "../components/merch/ProductDetail";
import PaymentSection from "../components/merch/PaymentSection";
import SuccessPopup from "../components/merch/SuccessPopup";
import Footer from "../components/Footer";

gsap.registerPlugin();

type ViewState = "listing" | "detail" | "payment" | "success";

export default function MerchPage() {
    const [viewState, setViewState] = useState<ViewState>("listing");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [footerInView, setFooterInView] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Title Animation
        tl.fromTo(
            titleRef.current,
            { y: 100, opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            {
                y: 0,
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.2,
                ease: "power4.out"
            }
        ).fromTo(
            subtitleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        );

        // Footer observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFooterInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, { scope: containerRef });

    const handleSelectProduct = (product: Product) => {
        if (product.inStock) {
            setSelectedProduct(product);
            setViewState("detail");
        }
    };

    const handleBuy = (product: Product, size: string) => {
        setSelectedProduct(product);
        setSelectedSize(size);
        setViewState("payment");
    };

    const handlePaymentSuccess = () => {
        setViewState("success");
    };

    const handleCloseSuccess = () => {
        setViewState("listing");
        setSelectedProduct(null);
        setSelectedSize("");
    };

    const handleBackFromDetail = () => {
        setViewState("listing");
        setSelectedProduct(null);
    };

    const handleBackFromPayment = () => {
        setViewState("detail");
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-[#EB0028] selection:text-white overflow-x-hidden">
            {/* Back Button */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#EB0028] transition bg-black/50 backdrop-blur-md cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        <span className="font-clash text-sm tracking-wide hidden sm:inline">Back to Home</span>
                    </motion.div>
                </Link>
            </div>

            {/* Background Noise & Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('/noise.svg')" }}></div>
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 pointer-events-none"></div>

            <div className="relative z-10 pt-32 pb-20 px-6 md:px-24 max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 ref={titleRef} className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        OFFICIAL <span className="text-[#EB0028]">MERCH</span>
                    </h1>
                    <p ref={subtitleRef} className="mt-6 font-clash text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Grab exclusive TEDxCUSAT 2025 merchandise. Limited edition items celebrating the Genesis theme.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {products.map((product, index) => (
                        <MerchCard
                            key={product.id}
                            product={product}
                            index={index}
                            onSelect={handleSelectProduct}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div ref={footerRef} className="mt-32 lg:mt-0">
                <Footer startAnimation={footerInView} />
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {viewState === "detail" && selectedProduct && (
                    <ProductDetail
                        product={selectedProduct}
                        onClose={handleBackFromDetail}
                        onBuy={handleBuy}
                    />
                )}
            </AnimatePresence>

            {/* Payment Section */}
            <AnimatePresence>
                {viewState === "payment" && selectedProduct && (
                    <PaymentSection
                        product={selectedProduct}
                        size={selectedSize}
                        onBack={handleBackFromPayment}
                        onSuccess={handlePaymentSuccess}
                    />
                )}
            </AnimatePresence>

            {/* Success Popup */}
            <AnimatePresence>
                {viewState === "success" && (
                    <SuccessPopup onClose={handleCloseSuccess} />
                )}
            </AnimatePresence>
        </main>
    );
}
