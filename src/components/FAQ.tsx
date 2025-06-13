
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
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

  return (
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
  );
};

export default FAQ;
