
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Zap } from "lucide-react";

const About = () => {
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
  );
};

export default About;
