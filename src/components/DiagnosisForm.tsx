
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Wrench, Loader2 } from "lucide-react";

interface DiagnosisResult {
  issue: string;
  recommendation: string;
  severity: "low" | "medium" | "high";
}

const DiagnosisForm = () => {
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const mockDiagnoses: DiagnosisResult[] = [
    {
      issue: "Engine knock or timing issues",
      recommendation: "Check engine oil level immediately. If noise persists, visit a mechanic to inspect spark plugs and timing chain/belt.",
      severity: "high"
    },
    {
      issue: "Low brake fluid or worn brake pads",
      recommendation: "Check brake fluid level and inspect brake pads for wear. Replace if pads are less than 3mm thick. See a mechanic immediately if braking performance is affected.",
      severity: "high"
    },
    {
      issue: "Low tire pressure or wheel alignment issues",
      recommendation: "Check tire pressure and inflate to manufacturer specifications. If pulling continues, schedule a wheel alignment check.",
      severity: "medium"
    },
    {
      issue: "Loose or worn belt components",
      recommendation: "Check engine belts for wear, cracks, or looseness. Replace serpentine belt if damaged. This is usually a moderate priority repair.",
      severity: "medium"
    },
    {
      issue: "Battery or electrical connection issues",
      recommendation: "Test battery voltage (should be 12.6V when off, 13.5-14.5V when running). Clean battery terminals and check alternator if problem persists.",
      severity: "medium"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
      setResult(randomDiagnosis);
      setIsLoading(false);
    }, 2000);
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Welcome to CarCare AI
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Your personal assistant for diagnosing car issues. Just describe the problem you're facing, 
          and our smart system will suggest possible causes and actions.
        </p>
      </div>

      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-slate-700 mb-3">
                Describe your car problem
              </label>
              <Textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="E.g., My engine makes a clicking sound when I start the car, or my car pulls to the right when braking..."
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
                  Analyzing...
                </>
              ) : (
                "Diagnose Problem"
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
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Possible Issue: {result.issue}
                </h3>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-2">Recommendation:</h4>
                  <p className="text-slate-700 leading-relaxed">{result.recommendation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> This tool provides general suggestions and is not a substitute 
          for a certified mechanic's advice. Always consult with a qualified professional for accurate 
          diagnosis and repairs.
        </p>
      </div>
    </div>
  );
};

export default DiagnosisForm;
