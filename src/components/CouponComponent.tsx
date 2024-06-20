import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import type { Coupon } from "@/schemas/Coupon.schema";

interface CouponComponentProps {
    coupons: Coupon[];
}

function isMobile() {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent) || /android/i.test(userAgent);
}

export default function CouponComponent({ coupons }: CouponComponentProps) {
    const [toasts, setToasts] = useState<(number | string)[]>([]);
    const toastCopy = (redirecting: boolean = false) => {
        const toastId = toast.success(`Coupon code copied to clipboard!${redirecting ? " Redirecting..." : ""}`, {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setToasts([...toasts, toastId]);
    }
    const handleCopyAndRedirect = async (code: string, productId: string) => {
        let uri = `https://www.oculus.com/experiences/app/${productId}`;
        if (isMobile()) {
            uri = `oculus.store://link/products?item_id=${productId}`;
        }

        await navigator.clipboard.writeText(code);
        toastCopy(true);

        await new Promise((resolve) => setTimeout(resolve, 1200));
        window.location.href = uri;
    };

    const manualCopy = async (code: string) => {
        await navigator.clipboard.writeText(code);
        toastCopy();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <header className="w-full max-w-4xl px-4 py-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Quest Codes</h1>
                <p className="text text-center"><b>Note:</b> If you are on mobile make sure you have the Meta Quest App installed</p>
            </header>
            <main className="w-full max-w-4xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {coupons.map((coupon, index) => {
                    return (
                        <Card key={index} className="bg-card text-card-foreground rounded-lg shadow-lg">
                            <div className="flex flex-col">
                                <div className="flex flex-col justify-between h-full p-4">
                                    <div>
                                        <h2 className="text-xl font-bold mb-2">{coupon.name}</h2>
                                        <p className="text-muted-foreground mb-2">
                                            <span
                                                className={`px-2 py-1 rounded-md ${coupon.discount >= 50
                                                    ? "bg-green-500 text-white"
                                                    : coupon.discount >= 30
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-red-500 text-white"
                                                    }`}
                                            >
                                                {coupon.discount}% off
                                            </span>
                                        </p>
                                        <p className="text-muted-foreground mb-4">
                                            <span className="line-through mr-2">${coupon.originalPrice.toFixed(2)}</span>
                                            <span className="inline-flex items-center">
                                                <ArrowDownIcon className="w-4 h-4 mr-1" />$
                                                {(coupon.originalPrice * (1 - coupon.discount / 100)).toFixed(2)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg bg-muted px-2 py-1 rounded-md flex items-center"
                                            onClick={() => manualCopy(coupon.code)} >
                                            {coupon.code}
                                            <CopyIcon className="w-4 h-4 ml-2" />
                                        </span>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-primary"
                                            onClick={() => handleCopyAndRedirect(coupon.code, coupon.productId)}
                                        // onTouchStart={() => handleCopyAndRedirect(coupon.code, coupon.productId)}
                                        >
                                            <MetaIcon className="w-4 h-4" />
                                            <span className="sr-only">Add to cart</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                })}
                <ToastContainer />
            </main>
        </div>
    );
}

function MetaIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            fill="#000000"
            viewBox="0 0 32 32"
        >
            <path d="M5,19.5c0-4.6,2.3-9.4,5-9.4c1.5,0,2.7,0.9,4.6,3.6c-1.8,2.8-2.9,4.5-2.9,4.5c-2.4,3.8-3.2,4.6-4.5,4.6  C5.9,22.9,5,21.7,5,19.5 M20.7,17.8L19,15c-0.4-0.7-0.9-1.4-1.3-2c1.5-2.3,2.7-3.5,4.2-3.5c3,0,5.4,4.5,5.4,10.1  c0,2.1-0.7,3.3-2.1,3.3S23.3,22,20.7,17.8 M16.4,11c-2.2-2.9-4.1-4-6.3-4C5.5,7,2,13.1,2,19.5c0,4,1.9,6.5,5.1,6.5  c2.3,0,3.9-1.1,6.9-6.3c0,0,1.2-2.2,2.1-3.7c0.3,0.5,0.6,1,0.9,1.6l1.4,2.4c2.7,4.6,4.2,6.1,6.9,6.1c3.1,0,4.8-2.6,4.8-6.7  C30,12.6,26.4,7,22.1,7C19.8,7,18,8.8,16.4,11" />
        </svg>
    )
}

function FileWarningIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    );
}
function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
