
export interface DiagnosisResult {
  possibleProblem: string;
  suggestedAction: string;
  severity: "low" | "medium" | "high";
  confidence: number;
}

export function diagnoseCarProblem(problem: string): DiagnosisResult {
  const lowerProblem = problem.toLowerCase();
  
  // Engine issues
  if (lowerProblem.includes("clicking") && lowerProblem.includes("start")) {
    return {
      possibleProblem: "Dead or weak battery",
      suggestedAction: "Check battery connections and charge level. If battery is old (3+ years), consider replacement. Try jump-starting the vehicle.",
      severity: "medium",
      confidence: 85
    };
  }
  
  // Brake issues
  if (lowerProblem.includes("squeal") && lowerProblem.includes("brake")) {
    return {
      possibleProblem: "Worn brake pads",
      suggestedAction: "Have brake pads inspected immediately. Squealing indicates wear indicators are making contact. Replace brake pads soon to avoid damage to rotors.",
      severity: "high",
      confidence: 90
    };
  }
  
  // Engine performance
  if (lowerProblem.includes("rough idle") || lowerProblem.includes("shaking")) {
    return {
      possibleProblem: "Engine misfiring or vacuum leak",
      suggestedAction: "Check spark plugs, ignition coils, and vacuum hoses. Consider professional diagnosis if problem persists.",
      severity: "medium",
      confidence: 75
    };
  }
  
  // Overheating
  if (lowerProblem.includes("overheat") || lowerProblem.includes("hot")) {
    return {
      possibleProblem: "Cooling system failure",
      suggestedAction: "Stop driving immediately. Check coolant level and look for leaks. Have cooling system inspected by a professional.",
      severity: "high",
      confidence: 95
    };
  }
  
  // Default response
  return {
    possibleProblem: "Unable to determine specific issue",
    suggestedAction: "Provide more specific details about the symptoms, when they occur, and any sounds or sensations. Consider consulting a qualified mechanic for professional diagnosis.",
    severity: "low",
    confidence: 30
  };
}
