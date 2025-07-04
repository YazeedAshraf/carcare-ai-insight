import { useState } from "react";
import { Button } from "@/components/ui/components";
import { Input, Textarea } from "@/components/ui/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/components";
import { useToast } from "@/hooks";
import { 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  Wrench, 
  Loader2, 
  Brain,
  Heart,
  Shield,
  Zap,
  Mail,
  Send
} from "lucide-react";
import { diagnoseCarProblem, DiagnosisResult } from "@/utils/carDiagnostics";

const Index = () => {
  // Diagnosis Form State
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const { toast } = useToast();

  // Diagnosis Form Functions
  const handleDiagnosisSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const diagnosis = diagnoseCarProblem(problem.trim());
      setResult(diagnosis);
      setIsLoading(false);
    }, 1500);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Wrench className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-green-200 bg-green-50";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-green-600";
    if (confidence >= 50) return "text-yellow-600";
    return "text-gray-600";
  };

  // Contact Form Functions
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      setContactForm({ name: "", email: "", message: "" });
      setIsSubmittingContact(false);
    }, 1000);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // FAQ Data
  const faqs = [
    {
      question: "What kinds of issues can this tool detect?",
      answer: "CarCare AI can help identify common automotive problems including engine issues, brake problems, electrical faults, tire and alignment issues, and various mechanical concerns. Our AI analyzes your description and provides educated suggestions based on common symptoms and causes."
    },
    {
      question: "Is this a replacement for a mechanic?",
      answer: "No, CarCare AI is designed to provide initial guidance and help you understand potential issues with your vehicle. It should never replace professional diagnosis by a certified mechanic. Always consult with a qualified automotive professional for accurate diagnosis and repairs."
    },
    {
      question: "How accurate are the AI diagnoses?",
      answer: "Our AI provides educated suggestions based on common automotive problems and symptoms. While helpful for initial assessment, the accuracy depends on the quality and detail of your problem description. For definitive diagnosis, always consult a professional mechanic."
    },
    {
      question: "What should I do if my car problem seems urgent?",
      answer: "If you suspect a safety-critical issue (brakes, steering, engine overheating, or strange smells), stop driving immediately and consult a professional mechanic or call for roadside assistance. CarCare AI can provide initial guidance, but safety should always be your first priority."
    }
  ];

  // About Features Data
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your car problem description and provides intelligent suggestions based on automotive expertise."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback on your car issues without waiting for appointments or lengthy diagnostic processes."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize your safety by clearly indicating when issues require immediate professional attention."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CarCare AI</h1>
                <p className="text-sm text-slate-600 hidden sm:block">Type your car problem — let AI do the rest.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Section with Diagnosis Form */}
        <section className="py-8">
          <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Welcome to CarCare AI
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Your personal assistant for diagnosing car issues. Describe your car problem in detail, 
                and our intelligent diagnostic system will analyze the symptoms and provide specific recommendations.
              </p>
            </div>

            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleDiagnosisSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-3">
                      Describe your car problem in detail
                    </label>
                    <Textarea
                      id="problem"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="Be specific: What sounds do you hear? When does it happen? What does it feel like? Examples: 'My car makes a clicking sound when I try to start it but won't turn over' or 'My brakes squeal loudly when I slow down and the pedal feels spongy'"
                      className="min-h-[120px] text-base resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 text-lg transition-colors duration-200"
                    disabled={!problem.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing symptoms...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-5 w-5" />
                        Diagnose Problem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {result && (
              <Card className={`border-2 animate-fade-in ${getSeverityColor(result.severity)}`}>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start space-x-4">
                    {getSeverityIcon(result.severity)}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-slate-900">
                            Possible Problem
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Confidence:</span>
                            <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                              {result.confidence}%
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-slate-800 font-medium mb-4">
                          {result.possibleProblem}
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h4 className="font-medium text-slate-900 mb-3 flex items-center">
                          <Wrench className="h-4 w-4 mr-2" />
                          Suggested Action
                        </h4>
                        <p className="text-slate-700 leading-relaxed">{result.suggestedAction}</p>
                      </div>

                      {result.severity === "high" && (
                        <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                          <p className="text-red-800 text-sm font-medium">
                            ⚠️ High Priority: This issue may affect vehicle safety or cause further damage. 
                            Seek professional attention immediately.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center">
              <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                <strong>Disclaimer:</strong> This diagnostic tool provides general suggestions based on common symptoms 
                and is not a substitute for professional mechanical diagnosis. Always consult with a qualified 
                automotive technician for accurate diagnosis and repairs.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-blue-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* About Section */}
        <section id="about" className="py-8">
          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-900">
                About CarCare AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
                CarCare AI combines the power of artificial intelligence with automotive expertise 
                to help car owners understand and address vehicle problems quickly and efficiently.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-blue-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200 mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">How It Works</h3>
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
                    <p>Describe your car problem in detail using the text box above</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
                    <p>Our AI analyzes your description against automotive knowledge</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
                    <p>Receive potential causes and recommended actions for your issue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Contact Us
              </CardTitle>
              <p className="text-slate-600">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    className="min-h-[120px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about your experience or ask us a question..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5"
                  disabled={isSubmittingContact}
                >
                  {isSubmittingContact ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CarCare AI</span>
            </div>
            <p className="text-slate-400 text-center max-w-md">
              Empowering car owners with AI-driven automotive insights and recommendations.
            </p>
            <div className="flex items-center space-x-1 text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>by the CarCare AI Team</span>
            </div>
            <div className="text-sm text-slate-500">
              © 2024 CarCare AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
