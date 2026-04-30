import { Header } from "@/components/header";
import { DefinitionSearch } from "@/components/definition-search";
import EmailSignup from "@/components/EmailSignup";
import { FeaturedTerms } from "@/components/featured-terms";
import { ContributeCTA } from "@/components/contribute-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div
      className="flex flex-col min-h-screen w-full bg-scholar-bg"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(232,160,48,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="flex flex-col w-full max-w-5xl mx-auto px-5 md:px-10">
        <Header />
        <DefinitionSearch />
        <EmailSignup />
        <FeaturedTerms />
        <ContributeCTA />
      </div>
      <Footer />
    </div>
  );
}
