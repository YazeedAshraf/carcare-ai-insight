
export interface DiagnosisResult {
  possibleProblem: string;
  suggestedAction: string;
  severity: "low" | "medium" | "high";
  confidence: number;
}

interface DiagnosticRule {
  keywords: string[];
  conditions?: string[];
  problem: string;
  action: string;
  severity: "low" | "medium" | "high";
  priority: number;
}

const diagnosticRules: DiagnosticRule[] = [
  // Engine Issues
  {
    keywords: ["clicking", "won't start", "no start", "dead"],
    conditions: ["engine", "ignition"],
    problem: "Dead battery or starter motor failure",
    action: "Check battery voltage (should be 12.6V). Jump start the car. If it starts, test alternator. If not, inspect starter motor connections and have starter tested.",
    severity: "high",
    priority: 10
  },
  {
    keywords: ["knocking", "pinging", "rattling"],
    conditions: ["engine", "acceleration"],
    problem: "Engine knock or carbon buildup",
    action: "Use higher octane fuel immediately. Check engine oil level and quality. If knocking persists, have engine inspected for carbon deposits or timing issues.",
    severity: "high",
    priority: 9
  },
  {
    keywords: ["overheating", "hot", "steam", "temperature"],
    conditions: ["engine", "coolant"],
    problem: "Engine overheating - coolant system failure",
    action: "Stop driving immediately. Let engine cool completely. Check coolant level, inspect for leaks. Check radiator, water pump, and thermostat. Seek immediate professional help.",
    severity: "high",
    priority: 10
  },
  {
    keywords: ["rough idle", "shaking", "vibrating"],
    conditions: ["idle", "engine"],
    problem: "Engine misfiring or vacuum leak",
    action: "Check spark plugs and ignition coils. Inspect air filter and vacuum hoses. Clean throttle body. If problem persists, have engine diagnostics performed.",
    severity: "medium",
    priority: 7
  },

  // Brake Issues
  {
    keywords: ["squealing", "grinding", "scraping"],
    conditions: ["brakes", "braking"],
    problem: "Worn brake pads or damaged rotors",
    action: "Inspect brake pads immediately - replace if less than 3mm thick. Check brake rotors for scoring. Have brake system inspected professionally within 24 hours.",
    severity: "high",
    priority: 10
  },
  {
    keywords: ["spongy", "soft", "low", "pedal"],
    conditions: ["brake", "braking"],
    problem: "Low brake fluid or air in brake lines",
    action: "Check brake fluid level immediately. Do not drive if pedal goes to floor. Inspect for brake fluid leaks. Have brake system bled and inspected by professional.",
    severity: "high",
    priority: 10
  },
  {
    keywords: ["pulling", "veering"],
    conditions: ["braking", "steering"],
    problem: "Uneven brake wear or alignment issue",
    action: "Have brake pads inspected for uneven wear. Check brake calipers and brake fluid. Schedule wheel alignment check and brake system inspection.",
    severity: "medium",
    priority: 6
  },

  // Steering and Suspension
  {
    keywords: ["pulling", "drifting"],
    conditions: ["steering", "driving"],
    problem: "Tire pressure imbalance or wheel alignment issue",
    action: "Check tire pressure on all four tires immediately. Inflate to manufacturer specifications. If pulling continues, schedule professional wheel alignment.",
    severity: "medium",
    priority: 5
  },
  {
    keywords: ["bouncing", "rough ride", "bumpy"],
    conditions: ["suspension", "driving"],
    problem: "Worn shock absorbers or struts",
    action: "Perform bounce test on each corner of vehicle. Check for fluid leaks around shocks/struts. Have suspension system inspected and replace worn components.",
    severity: "medium",
    priority: 4
  },

  // Electrical Issues
  {
    keywords: ["dim", "flickering", "electrical"],
    conditions: ["lights", "dashboard"],
    problem: "Alternator or battery charging issue",
    action: "Test battery voltage while engine running (should be 13.5-14.5V). Check alternator belt tension. Have charging system tested professionally.",
    severity: "medium",
    priority: 6
  },

  // Transmission Issues
  {
    keywords: ["slipping", "jerking", "hard shifting"],
    conditions: ["transmission", "shifting", "gears"],
    problem: "Transmission fluid issue or internal wear",
    action: "Check transmission fluid level and color (should be red/pink, not brown/black). If fluid is low or dirty, have transmission serviced immediately.",
    severity: "high",
    priority: 8
  },

  // Exhaust and Emissions
  {
    keywords: ["smoking", "blue smoke", "white smoke"],
    conditions: ["exhaust", "tailpipe"],
    problem: "Engine oil burning or coolant leak",
    action: "Blue smoke indicates oil burning - check oil level. White smoke may indicate coolant leak - check coolant level. Stop driving and seek professional diagnosis.",
    severity: "high",
    priority: 9
  },

  // Belt and Pulley Issues
  {
    keywords: ["squealing", "screeching", "belt"],
    conditions: ["engine", "startup"],
    problem: "Loose or worn drive belt",
    action: "Inspect serpentine belt for cracks, fraying, or looseness. Check belt tensioner operation. Replace belt if damaged or adjust tension as needed.",
    severity: "medium",
    priority: 5
  },

  // Fuel System
  {
    keywords: ["stalling", "hesitation", "sputtering"],
    conditions: ["acceleration", "fuel"],
    problem: "Fuel system or air intake issue",
    action: "Check air filter condition. Ensure adequate fuel in tank. Consider fuel system cleaning. If problem persists, have fuel pump and injectors tested.",
    severity: "medium",
    priority: 6
  }
];

export function diagnoseCarProblem(description: string): DiagnosisResult {
  const normalizedDescription = description.toLowerCase().trim();
  const words = normalizedDescription.split(/\s+/);
  
  let bestMatch: DiagnosticRule | null = null;
  let highestScore = 0;
  let confidence = 0;

  for (const rule of diagnosticRules) {
    let score = 0;
    let matchedKeywords = 0;
    let matchedConditions = 0;

    // Check keyword matches
    for (const keyword of rule.keywords) {
      if (normalizedDescription.includes(keyword.toLowerCase())) {
        matchedKeywords++;
        score += 3; // Higher weight for keyword matches
      }
    }

    // Check condition matches
    if (rule.conditions) {
      for (const condition of rule.conditions) {
        if (normalizedDescription.includes(condition.toLowerCase())) {
          matchedConditions++;
          score += 2; // Medium weight for condition matches
        }
      }
    }

    // Bonus for multiple matches
    if (matchedKeywords > 1) {
      score += matchedKeywords * 2;
    }

    // Priority weighting
    score += rule.priority;

    if (score > highestScore && matchedKeywords > 0) {
      highestScore = score;
      bestMatch = rule;
      
      // Calculate confidence based on matches
      const totalPossibleMatches = rule.keywords.length + (rule.conditions?.length || 0);
      const totalMatches = matchedKeywords + matchedConditions;
      confidence = Math.min(95, (totalMatches / totalPossibleMatches) * 100 + 30);
    }
  }

  // Fallback diagnosis if no good match found
  if (!bestMatch || highestScore < 5) {
    return {
      possibleProblem: "General automotive issue requiring professional diagnosis",
      suggestedAction: "The symptoms you've described require professional inspection. Please schedule an appointment with a certified mechanic for proper diagnosis and repair recommendations.",
      severity: "medium",
      confidence: 25
    };
  }

  return {
    possibleProblem: bestMatch.problem,
    suggestedAction: bestMatch.action,
    severity: bestMatch.severity,
    confidence: Math.round(confidence)
  };
}
