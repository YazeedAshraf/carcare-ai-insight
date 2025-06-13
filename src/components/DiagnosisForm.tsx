import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Wrench, Loader2, Brain } from "lucide-react";
import { DiagnosisResult } from "@/utils/carDiagnostics";

const DiagnosisForm = () => {
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: problem.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to get diagnosis");
      }

      const diagnosis = await response.json();
      setResult(diagnosis);
    } catch (error) {
      console.error("Error:", error);
      setResult({
        possibleProblem: "Unable to generate diagnosis.",
        suggestedAction: "Please try again later.",
        severity: "medium",
        confidence: 0,
      });
    } finally {
      setIsLoading(false);
    }
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

  return (
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
  );
};

export default DiagnosisForm;
