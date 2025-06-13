
import Header from "@/components/Header";
import DiagnosisForm from "@/components/DiagnosisForm";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Section with Diagnosis Form */}
        <section className="py-8">
          <DiagnosisForm />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-8">
          <FAQ />
        </section>

        {/* About Section */}
        <section id="about" className="py-8">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
