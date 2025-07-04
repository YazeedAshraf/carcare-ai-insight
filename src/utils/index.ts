
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function from utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Car diagnostics utilities from carDiagnostics.ts
export interface CarDiagnosticData {
  engine: {
    temperature: number;
    oilPressure: number;
    rpm: number;
  };
  battery: {
    voltage: number;
    health: 'good' | 'fair' | 'poor';
  };
  transmission: {
    temperature: number;
    fluidLevel: 'low' | 'normal' | 'high';
  };
  brakes: {
    padWear: number;
    fluidLevel: number;
  };
  tire: {
    pressure: number[];
    treadDepth: number[];
    temperature: number[];
  };
}

export interface DiagnosticAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  component: string;
  message: string;
  timestamp: Date;
}

export const generateMockDiagnosticData = (): CarDiagnosticData => {
  return {
    engine: {
      temperature: Math.floor(Math.random() * 100) + 80, // 80-180°F
      oilPressure: Math.floor(Math.random() * 40) + 20, // 20-60 PSI
      rpm: Math.floor(Math.random() * 3000) + 1000, // 1000-4000 RPM
    },
    battery: {
      voltage: parseFloat((Math.random() * 2 + 11).toFixed(1)), // 11-13V
      health: ['good', 'fair', 'poor'][Math.floor(Math.random() * 3)] as 'good' | 'fair' | 'poor',
    },
    transmission: {
      temperature: Math.floor(Math.random() * 80) + 120, // 120-200°F
      fluidLevel: ['low', 'normal', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'normal' | 'high',
    },
    brakes: {
      padWear: Math.floor(Math.random() * 100), // 0-100%
      fluidLevel: Math.floor(Math.random() * 100) + 50, // 50-150%
    },
    tire: {
      pressure: Array.from({ length: 4 }, () => Math.floor(Math.random() * 15) + 25), // 25-40 PSI
      treadDepth: Array.from({ length: 4 }, () => parseFloat((Math.random() * 10 + 2).toFixed(1))), // 2-12mm
      temperature: Array.from({ length: 4 }, () => Math.floor(Math.random() * 40) + 60), // 60-100°F
    },
  };
};

export const analyzeDiagnosticData = (data: CarDiagnosticData): DiagnosticAlert[] => {
  const alerts: DiagnosticAlert[] = [];
  
  // Engine checks
  if (data.engine.temperature > 220) {
    alerts.push({
      id: 'engine-temp-critical',
      severity: 'critical',
      component: 'Engine',
      message: 'Engine temperature critically high - pull over immediately',
      timestamp: new Date(),
    });
  } else if (data.engine.temperature > 200) {
    alerts.push({
      id: 'engine-temp-warning',
      severity: 'warning',
      component: 'Engine',
      message: 'Engine temperature elevated - monitor closely',
      timestamp: new Date(),
    });
  }
  
  if (data.engine.oilPressure < 10) {
    alerts.push({
      id: 'oil-pressure-critical',
      severity: 'critical',
      component: 'Engine',
      message: 'Oil pressure critically low - stop engine immediately',
      timestamp: new Date(),
    });
  } else if (data.engine.oilPressure < 20) {
    alerts.push({
      id: 'oil-pressure-warning',
      severity: 'warning',
      component: 'Engine',
      message: 'Oil pressure low - check oil level',
      timestamp: new Date(),
    });
  }
  
  // Battery checks
  if (data.battery.voltage < 11.5) {
    alerts.push({
      id: 'battery-voltage-critical',
      severity: 'critical',
      component: 'Battery',
      message: 'Battery voltage critically low - may not start',
      timestamp: new Date(),
    });
  } else if (data.battery.voltage < 12.0) {
    alerts.push({
      id: 'battery-voltage-warning',
      severity: 'warning',
      component: 'Battery',
      message: 'Battery voltage low - consider charging',
      timestamp: new Date(),
    });
  }
  
  if (data.battery.health === 'poor') {
    alerts.push({
      id: 'battery-health-warning',
      severity: 'warning',
      component: 'Battery',
      message: 'Battery health poor - replacement recommended',
      timestamp: new Date(),
    });
  }
  
  // Transmission checks
  if (data.transmission.temperature > 250) {
    alerts.push({
      id: 'transmission-temp-critical',
      severity: 'critical',
      component: 'Transmission',
      message: 'Transmission overheating - stop driving immediately',
      timestamp: new Date(),
    });
  } else if (data.transmission.temperature > 220) {
    alerts.push({
      id: 'transmission-temp-warning',
      severity: 'warning',
      component: 'Transmission',
      message: 'Transmission temperature high - reduce load',
      timestamp: new Date(),
    });
  }
  
  if (data.transmission.fluidLevel === 'low') {
    alerts.push({
      id: 'transmission-fluid-warning',
      severity: 'warning',
      component: 'Transmission',
      message: 'Transmission fluid level low - check for leaks',
      timestamp: new Date(),
    });
  }
  
  // Brake checks
  if (data.brakes.padWear > 90) {
    alerts.push({
      id: 'brake-pad-critical',
      severity: 'critical',
      component: 'Brakes',
      message: 'Brake pads critically worn - replace immediately',
      timestamp: new Date(),
    });
  } else if (data.brakes.padWear > 75) {
    alerts.push({
      id: 'brake-pad-warning',
      severity: 'warning',
      component: 'Brakes',
      message: 'Brake pads worn - replacement needed soon',
      timestamp: new Date(),
    });
  }
  
  if (data.brakes.fluidLevel < 25) {
    alerts.push({
      id: 'brake-fluid-critical',
      severity: 'critical',
      component: 'Brakes',
      message: 'Brake fluid critically low - check system immediately',
      timestamp: new Date(),
    });
  } else if (data.brakes.fluidLevel < 50) {
    alerts.push({
      id: 'brake-fluid-warning',
      severity: 'warning',
      component: 'Brakes',
      message: 'Brake fluid low - top up recommended',
      timestamp: new Date(),
    });
  }
  
  // Tire checks
  data.tire.pressure.forEach((pressure, index) => {
    if (pressure < 20) {
      alerts.push({
        id: `tire-pressure-critical-${index}`,
        severity: 'critical',
        component: 'Tires',
        message: `Tire ${index + 1} pressure critically low (${pressure} PSI)`,
        timestamp: new Date(),
      });
    } else if (pressure < 25) {
      alerts.push({
        id: `tire-pressure-warning-${index}`,
        severity: 'warning',
        component: 'Tires',
        message: `Tire ${index + 1} pressure low (${pressure} PSI)`,
        timestamp: new Date(),
      });
    }
  });
  
  data.tire.treadDepth.forEach((depth, index) => {
    if (depth < 2) {
      alerts.push({
        id: `tire-tread-critical-${index}`,
        severity: 'critical',
        component: 'Tires',
        message: `Tire ${index + 1} tread depth critically low (${depth}mm)`,
        timestamp: new Date(),
      });
    } else if (depth < 3) {
      alerts.push({
        id: `tire-tread-warning-${index}`,
        severity: 'warning',
        component: 'Tires',
        message: `Tire ${index + 1} tread depth low (${depth}mm)`,
        timestamp: new Date(),
      });
    }
  });
  
  return alerts;
};

export const getSeverityColor = (severity: DiagnosticAlert['severity']): string => {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'info':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};
