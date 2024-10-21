import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function Layout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}