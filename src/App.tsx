import CommentPopup from "./components/miscellaneous/comment-popup";
import SmoothCursor from "./components/miscellaneous/cursor";
import CTASection from "./components/sections/cta-section";
import FAQSection from "./components/sections/faq-section";
import FeaturesSection from "./components/sections/features-section";
import Hero from "./components/sections/herosection";
import HowItWorks from "./components/sections/how-it-works";
import { UseCaseSection } from "./components/sections/use-case";
import Navbar from "./components/navigation/navbar";
import Footer from "./components/navigation/footer";

export default function Home() {
  return (
    <>
      <main className="bg-[#F6F5F0]">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <UseCaseSection />
        <FAQSection />
        <CTASection />
        <SmoothCursor />
        <Footer />
        <CommentPopup />
      </main>
    </>
  );
}
