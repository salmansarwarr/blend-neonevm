import { Inter } from "next/font/google";
import "./globals.css";
import MyProvider from "@/providers/MyProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Spiderchain Blend Engine",
    description: "Spiderchain Blend Engine",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MyProvider>{children}</MyProvider>
            </body>
        </html>
    );
}
