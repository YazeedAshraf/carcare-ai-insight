
export interface DiagnosisResult {
  possibleProblem: string;
  suggestedAction: string;
  severity: "low" | "medium" | "high";
  confidence: number;
}

export function diagnoseCarProblem(problem: string): DiagnosisResult {
  const lowerProblem = problem.toLowerCase();
  
  // Engine issues
  if (lowerProblem.includes("won't start") || lowerProblem.includes("clicking") || lowerProblem.includes("cranking")) {
    return {
      possibleProblem: "Dead battery or starter motor issue",
      suggestedAction: "Check battery connections and voltage. If battery is good, have starter motor tested by a professional.",
      severity: "medium",
      confidence: 75
    };
  }
  
  // Brake issues
  if (lowerProblem.includes("squeal") || lowerProblem.includes("grinding") || lowerProblem.includes("brake")) {
    return {
      possibleProblem: "Worn brake pads or brake system issue",
      suggestedAction: "Have brakes inspected immediately. Squealing or grinding sounds indicate worn brake pads that need replacement.",
      severity: "high",
      confidence: 85
    };
  }
  
  // Engine performance
  if (lowerProblem.includes("rough idle") || lowerProblem.includes("stalling") || lowerProblem.includes("misfire")) {
    return {
      possibleProblem: "Engine tune-up needed or fuel system issue",
      suggestedAction: "Check spark plugs, air filter, and fuel filter. Consider having engine diagnostics performed.",
      severity: "medium",
      confidence: 70
    };
  }
  
  // Overheating
  if (lowerProblem.includes("overheating") || lowerProblem.includes("hot") || lowerProblem.includes("temperature")) {
    return {
      possibleProblem: "Cooling system malfunction",
      suggestedAction: "Stop driving immediately. Check coolant level and look for leaks. Have cooling system inspected by a professional.",
      severity: "high",
      confidence: 90
    };
  }
  
  // Default response
  return {
    possibleProblem: "General automotive issue requiring diagnosis",
    suggestedAction: "Consult with a qualified automotive technician for proper diagnosis and repair recommendations.",
    severity: "medium",
    confidence: 50
  };
}
