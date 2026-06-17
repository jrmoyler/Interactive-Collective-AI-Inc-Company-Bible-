import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sparkles,
  Info,
  Layers,
  Bot,
  Activity,
  History,
  AlertTriangle,
  UploadCloud,
  FileCheck2,
  ListRestart
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from "recharts";

import CommandRail from "./components/CommandRail";
import Header from "./components/Header";
import StatTiles from "./components/StatTiles";
import AssistantPanel from "./components/AssistantPanel";

// Main Subviews
import BrandBrandView from "./components/BrandBrandView";
import DivisionsView from "./components/DivisionsView";
import SynergyNodesView from "./components/SynergyNodesView";
import CampusView from "./components/CampusView";
import GovernanceView from "./components/GovernanceView";
import MerchandiseView from "./components/MerchandiseView";
import TaxonomyView from "./components/TaxonomyView";
import SecurityView from "./components/SecurityView";
import PeopleView from "./components/PeopleView";
import AgentMixer from "./components/AgentMixer";
import IntegrationsView from "./components/IntegrationsView";
import PricingView from "./components/PricingView";
import CinematicLoader from "./components/CinematicLoader";
import BibleLandingPage from "./components/BibleLandingPage";

interface LogEvent {
  time: string;
  category: "SYSTEM" | "COMPLIANCE" | "AGENT" | "DEPLOY";
  text: string;
}

const RenderAnomalyDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload || !payload.isAnomaly) {
    return null;
  }
  return (
    <g key={`anomaly-dot-${payload.day}`}>
      {/* Outer pulsing neon ring */}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="#EF4444"
        fillOpacity="0.2"
        className="animate-pulse"
      />
      {/* Inner anchor dot */}
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="#EF4444"
        stroke="#0D1326"
        strokeWidth={1.5}
      />
      {/* Floating alert triangle badge */}
      <g transform={`translate(${cx - 8}, ${cy - 27})`}>
        <path
          d="M 8,1 L 15,13 Q 15.5,14 14,14.5 L 2,14.5 Q 0.5,14 1,13 Z"
          fill="#EF4444"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        <line x1="8" y1="5" x2="8" y2="9.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="12" r="0.75" fill="#FFFFFF" />
      </g>
    </g>
  );
};

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isAnomaly = data.isAnomaly;
    return (
      <div className="bg-[#111827] border border-[#1A2540] rounded p-3 shadow-2xl backdrop-blur-xs select-none min-w-[210px] text-xs">
        <div className="text-[10px] font-mono text-[#8B9BAE] uppercase mb-1.5 border-b border-[#1A2540] pb-1">{label}</div>
        
        <div className="space-y-1.5">
          {payload.map((p: any, idx: number) => {
            if (p.value === undefined || p.value === null) return null;
            const isForecast = p.name === "forecast" || p.dataKey === "forecast";
            const isCompareValue = p.name === "compareInference" || p.dataKey === "compareInference";
            const isInference = p.name === "inference" || p.dataKey === "inference" || (!isForecast && !isCompareValue);
            
            const labelStr = isForecast ? "Forecast" : isCompareValue ? "Prev Period Baseline" : "Inference";
            const color = isForecast ? "#D4A843" : isCompareValue ? "#A855F7" : "#00D9B5";
            
            let trendIndicator = null;
            if (isInference && data.inferenceTrend) {
              if (data.inferenceTrend === "up") {
                trendIndicator = (
                  <span className="text-[#00D9B5] ml-1.5 font-bold" title="Trending Upwards">↑</span>
                );
              } else if (data.inferenceTrend === "down") {
                trendIndicator = (
                  <span className="text-red-400 ml-1.5 font-bold" title="Trending Downwards">↓</span>
                );
              } else if (data.inferenceTrend === "flat") {
                trendIndicator = (
                  <span className="text-gray-500 ml-1.5 font-semibold" title="Stable">→</span>
                );
              }
            }
            
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between gap-4 text-[11px]">
                  <span className="font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5" style={{ color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    {labelStr}
                  </span>
                  <span className="font-mono font-bold text-white flex items-center">
                    {p.value.toFixed(2)}M
                    {trendIndicator}
                  </span>
                </div>
                {isInference && typeof data.confidenceScore === "number" && (
                  <div className="flex items-center justify-between text-[10px] font-mono pl-3 text-gray-400">
                    <span className="uppercase text-[8px] tracking-wider text-gray-500">Confidence Score:</span>
                    <span className={`font-semibold ${data.confidenceScore > 85 ? "text-[#00D9B5]" : data.confidenceScore > 65 ? "text-[#D4A843]" : "text-red-400"}`}>
                      {data.confidenceScore.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isAnomaly && (
          <div className="mt-2.5 pt-2 border-t border-red-500/30 flex items-start gap-1.5 text-[9px] text-[#FF5A5A] font-mono bg-red-500/5 px-2 py-1.5 rounded text-left">
            <AlertTriangle size={12} className="shrink-0 text-red-500 mt-0.5" />
            <div>
              <div className="font-bold uppercase tracking-wide">ANOMALY WARNING (+2.5 SD)</div>
              <div className="text-[8px] mt-0.5 leading-snug text-[#8B9BAE]">
                This node exceeds normal moving averages of the mesh network. Spike: +{(data.diffFromMA || data.diff || 0).toFixed(2)}M.
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [landingCompleted, setLandingCompleted] = useState(false);
  const [activeView, setActiveView] = useState("command-center");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLatticeEnabled, setIsLatticeEnabled] = useState(true);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isCommandRailOpen, setIsCommandRailOpen] = useState(false);
  const [isAssistantPanelOpen, setIsAssistantPanelOpen] = useState(false);

  // Dynamic states
  const [customAgentCount, setCustomAgentCount] = useState(128); // Matches StatTiles
  const [systemLogs, setSystemLogs] = useState<LogEvent[]>([
    { time: "20:04:12", category: "SYSTEM", text: "Zenith OS booted standard 600-agent lattice." },
    { time: "20:05:44", category: "COMPLIANCE", text: "Aegis security gates initialized with zero warning flags." },
    { time: "20:11:02", category: "SYSTEM", text: "Aether Link mesh grid initialized in District A Core." },
    { time: "20:14:18", category: "DEPLOY", text: "ZenFlow context routers refreshed with latest Bible parameters." }
  ]);

  // Deployment Form states
  const [deployTargetDiv, setDeployTargetDiv] = useState("D-01");
  const [deployConfidenceStrict, setDeployConfidenceStrict] = useState("Strict SEC-Level");
  const [deployModelName, setDeployModelName] = useState("ZenFlow-3.5-Loom");

  const handleAddAgentInstance = (agentName: string, roleCluster: string, divisionName: string) => {
    // Increment active count
    setCustomAgentCount(prev => prev + 1);

    // Append standard log
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog: LogEvent = {
      time: timeStr,
      category: "AGENT",
      text: `Lattice initialized for [${agentName}] as ${roleCluster} specialist under ${divisionName}.`
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  const handleConfirmDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeployModalOpen(false);

    // Log the build trigger
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog: LogEvent = {
      time: timeStr,
      category: "DEPLOY",
      text: `MODEL RUNTIME: Fused ${deployModelName} with standard parameters to Division ${deployTargetDiv} under ${deployConfidenceStrict} constraints.`
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  // Selected timeframe for telemetry range selectors
  const [selectedRange, setSelectedRange] = useState<"24h" | "7d" | "30d" >("7d");
  const [showForecast, setShowForecast] = useState(false);
  const [showGrowthTooltip, setShowGrowthTooltip] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  // Y-axis drag-to-zoom states
  const [yZoomMin, setYZoomMin] = useState<number | null>(null);
  const [yZoomMax, setYZoomMax] = useState<number | null>(null);
  const [isDraggingY, setIsDraggingY] = useState(false);
  const [dragStartPix, setDragStartPix] = useState<number | null>(null);
  const [dragEndPix, setDragEndPix] = useState<number | null>(null);

  // Hardcoded real baseline stats with calibrated 2.5 SD anomalies
  const BASE_TELEMETRY = {
    "24h": [
      { day: "00:00", inference: 1.85 },
      { day: "04:00", inference: 1.90 },
      { day: "08:00", inference: 1.95 },
      { day: "12:00", inference: 3.55 }, // High positive deviation! Peak loads.
      { day: "16:00", inference: 2.15 },
      { day: "20:00", inference: 2.10 },
      { day: "24:00", inference: 2.05 }
    ],
    "7d": [
      { day: "Mon", inference: 2.10 },
      { day: "Tue", inference: 2.15 },
      { day: "Wed", inference: 3.65 }, // High positive deviation! Wed burst spike.
      { day: "Thu", inference: 2.20 },
      { day: "Fri", inference: 2.25 },
      { day: "Sat", inference: 2.30 },
      { day: "Sun", inference: 2.35 }
    ],
    "30d": [
      { day: "Day 5", inference: 1.70 },
      { day: "Day 10", inference: 1.75 },
      { day: "Day 15", inference: 1.80 },
      { day: "Day 20", inference: 3.45 }, // Day 20 sudden spike!
      { day: "Day 25", inference: 1.90 },
      { day: "Day 30", inference: 1.95 }
    ]
  };

  // State used by the UI charts
  const [inferenceChartData, setInferenceChartData] = useState<any[]>(BASE_TELEMETRY["7d"]);

  // Dynamically project forward if showForecast is enabled
  React.useEffect(() => {
    const base = BASE_TELEMETRY[selectedRange];
    if (!showForecast) {
      setInferenceChartData(base);
    } else {
      const withForecast = base.map((item, idx) => {
        const isLast = idx === base.length - 1;
        return {
          ...item,
          forecast: isLast ? item.inference : undefined
        };
      });

      if (selectedRange === "24h") {
        withForecast.push(
          { day: "+4h", forecast: 2.54 },
          { day: "+8h", forecast: 2.61 },
          { day: "+12h", forecast: 2.68 }
        );
      } else if (selectedRange === "7d") {
        withForecast.push(
          { day: "Mon+", forecast: 2.53 },
          { day: "Tue+", forecast: 2.59 },
          { day: "Wed+", forecast: 2.66 }
        );
      } else if (selectedRange === "30d") {
        withForecast.push(
          { day: "Day 35", forecast: 2.55 },
          { day: "Day 40", forecast: 2.63 },
          { day: "Day 45", forecast: 2.70 }
        );
      }
      setInferenceChartData(withForecast);
    }
  }, [selectedRange, showForecast]);

  // Compute moving average and standard dev anomaly flags dynamically (2.5 SD threshold)
  const enrichedInferenceChartData = React.useMemo(() => {
    if (!inferenceChartData || inferenceChartData.length === 0) return [];
    
    // Filter points to only compute math points that have valid numeric inference values
    const mathPoints = inferenceChartData.filter(d => typeof d.inference === "number");
    if (mathPoints.length === 0) return inferenceChartData;

    const COMPARE_DATA = {
      "24h": [1.95, 2.05, 2.10, 2.15, 2.22, 2.28, 2.30],
      "7d": [2.00, 2.05, 2.12, 2.15, 2.18, 2.20, 2.22],
      "30d": [1.65, 1.68, 1.72, 1.75, 1.78, 1.80]
    };

    const withMA = inferenceChartData.map((item, idx) => {
      let compareInference = undefined;
      if (isCompareMode) {
        // If it's a forecast-only point, keep baseline undefined
        const isForecastPoint = item.forecast !== undefined && item.inference === undefined;
        if (!isForecastPoint) {
          compareInference = COMPARE_DATA[selectedRange][idx] ?? undefined;
        }
      }

      if (typeof item.inference !== "number") {
        return { ...item, compareInference, movingAvg: 0, diff: 0 };
      }
      
      const mathIdx = mathPoints.findIndex(p => p.day === item.day);
      let values: number[] = [item.inference];
      if (mathIdx > 0) values.push(mathPoints[mathIdx - 1].inference);
      if (mathIdx < mathPoints.length - 1) values.push(mathPoints[mathIdx + 1].inference);
      
      const movingAvg = values.reduce((sum, v) => sum + v, 0) / values.length;
      const diff = Math.abs(item.inference - movingAvg);
      
      return {
        ...item,
        compareInference,
        movingAvg,
        diff
      };
    });

    const activeDiffs = withMA.filter(d => typeof d.inference === "number").map(d => d.diff);
    if (activeDiffs.length === 0) return withMA;

    const meanDiff = activeDiffs.reduce((sum, v) => sum + v, 0) / activeDiffs.length;
    const variance = activeDiffs.reduce((sum, v) => sum + Math.pow(v - meanDiff, 2), 0) / activeDiffs.length;
    const stdDev = Math.sqrt(variance);

    return withMA.map((item, idx) => {
      if (typeof item.inference !== "number") return item;
      
      // Highlight points that deviate by more than 2.5 standard deviations from the moving average
      const isAnomaly = stdDev > 0.02 && item.diff >= 2.5 * stdDev;

      // Calculate confidence score based on the variance of the surrounding data points
      const mathIdx = mathPoints.findIndex(p => p.day === item.day);
      const surroundingVals: number[] = [item.inference];
      if (mathIdx > 0) surroundingVals.push(mathPoints[mathIdx - 1].inference);
      if (mathIdx > 1) surroundingVals.push(mathPoints[mathIdx - 2].inference);
      if (mathIdx < mathPoints.length - 1) surroundingVals.push(mathPoints[mathIdx + 1].inference);
      if (mathIdx < mathPoints.length - 2) surroundingVals.push(mathPoints[mathIdx + 2].inference);

      const localMean = surroundingVals.reduce((sum, v) => sum + v, 0) / surroundingVals.length;
      const localVariance = surroundingVals.reduce((sum, v) => sum + Math.pow(v - localMean, 2), 0) / surroundingVals.length;
      const localStdDev = Math.sqrt(localVariance);

      let computedConfidence = 100 - (localStdDev * 140);
      if (isAnomaly) {
        computedConfidence -= 18; // penalty for anomaly variance
      }
      const confidenceScore = Math.max(42.0, Math.min(99.4, computedConfidence));

      // Calculate trend relative to previous data point with valid inference value
      let trend: "up" | "down" | "flat" | null = null;
      let prevInferenceVal: number | null = null;
      for (let i = idx - 1; i >= 0; i--) {
        if (typeof withMA[i].inference === "number") {
          prevInferenceVal = withMA[i].inference as number;
          break;
        }
      }
      if (prevInferenceVal !== null && typeof item.inference === "number") {
        if (item.inference > prevInferenceVal) {
          trend = "up";
        } else if (item.inference < prevInferenceVal) {
          trend = "down";
        } else {
          trend = "flat";
        }
      }
      
      return {
        ...item,
        isAnomaly,
        stdDev,
        meanDiff,
        diffFromMA: item.diff,
        inferenceTrend: trend,
        confidenceScore
      };
    });
  }, [inferenceChartData, isCompareMode, selectedRange]);

  // Calculate average 2.5 SD threshold across visible non-anomaly timeline points
  const averageThreshold = React.useMemo(() => {
    const points = enrichedInferenceChartData.filter(d => typeof d.inference === "number");
    if (points.length === 0) return 3.0;

    // Find non-anomaly points to compute baseline moving average
    const nonAnomalies = points.filter(p => !p.isAnomaly);
    const baselinePoints = nonAnomalies.length > 0 ? nonAnomalies : points;

    // Calculate average baseline moving average
    const avgMA = baselinePoints.reduce((sum, p) => sum + (p.movingAvg || 2.22), 0) / baselinePoints.length;
    // Get stdDev from computed dataset
    const activeStdDev = points[0]?.stdDev || 0.2;

    return avgMA + 2.5 * activeStdDev;
  }, [enrichedInferenceChartData]);

  const handleRangeChange = (range: "24h" | "7d" | "30d") => {
    setSelectedRange(range);
  };

  const correlationMatrix = React.useMemo(() => {
    const matrices = {
      "24h": {
        labels: ["D-01", "D-05", "D-09"],
        data: [
          [1.00, 0.88, 0.65],
          [0.88, 1.00, 0.74],
          [0.65, 0.74, 1.00]
        ],
        details: [
          ["Identical Sync", "Direct Conduction", "Cross-Mesh Flow"],
          ["Direct Conduction", "Identical Sync", "Thermal Bridging"],
          ["Cross-Mesh Flow", "Thermal Bridging", "Identical Sync"]
        ]
      },
      "7d": {
        labels: ["D-01", "D-05", "D-09"],
        data: [
          [1.00, 0.76, 0.82],
          [0.76, 1.00, 0.69],
          [0.82, 0.69, 1.00]
        ],
        details: [
          ["Identical Sync", "Coupled Phase", "High Resonance"],
          ["Coupled Phase", "Identical Sync", "Stable Linkage"],
          ["High Resonance", "Stable Linkage", "Identical Sync"]
        ]
      },
      "30d": {
        labels: ["D-01", "D-05", "D-09"],
        data: [
          [1.00, 0.62, 0.54],
          [0.62, 1.00, 0.89],
          [0.54, 0.89, 1.00]
        ],
        details: [
          ["Identical Sync", "Weak Cohesion", "Drifting Path"],
          ["Weak Cohesion", "Identical Sync", "Dense Feedback"],
          ["Drifting Path", "Dense Feedback", "Identical Sync"]
        ]
      }
    };
    return matrices[selectedRange];
  }, [selectedRange]);

  const handleYDragMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startY = e.clientY - rect.top;
    setIsDraggingY(true);
    setDragStartPix(startY);
    setDragEndPix(startY);
  };

  const handleYDragMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingY || dragStartPix === null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setDragEndPix(currentY);
  };

  const handleYDragMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingY || dragStartPix === null || dragEndPix === null) return;
    setIsDraggingY(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const height = rect.height || 224;

    if (Math.abs(dragStartPix - dragEndPix) < 5) {
      setDragStartPix(null);
      setDragEndPix(null);
      return;
    }

    // Dynamic min and max ranges computed from dataset
    const telemetryMin = Math.min(...(enrichedInferenceChartData || []).map(d => Math.min(d.inference || 99, d.forecast || 99, d.compareInference || 99)).filter(v => typeof v === "number" && v !== 99));
    const telemetryMax = Math.max(...(enrichedInferenceChartData || []).map(d => Math.max(d.inference || -99, d.forecast || -99, d.compareInference || -99)).filter(v => typeof v === "number" && v !== -99));
    const yMinDefault = telemetryMin !== Infinity ? Math.max(0, parseFloat((telemetryMin - 0.2).toFixed(2))) : 1.5;
    const yMaxDefault = telemetryMax !== -Infinity ? parseFloat((telemetryMax + 0.3).toFixed(2)) : 4.0;

    const pctStart = (height - dragStartPix) / height;
    const pctEnd = (height - dragEndPix) / height;

    const val1 = yMinDefault + pctStart * (yMaxDefault - yMinDefault);
    const val2 = yMinDefault + pctEnd * (yMaxDefault - yMinDefault);

    setYZoomMin(parseFloat(Math.min(val1, val2).toFixed(2)));
    setYZoomMax(parseFloat(Math.max(val1, val2).toFixed(2)));

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSystemLogs(prev => [
      {
        time: timeStr,
        category: "SYSTEM",
        text: `TELEMETRY Y-ZOOM: Isolated subset [${Math.min(val1, val2).toFixed(2)}M - ${Math.max(val1, val2).toFixed(2)}M] on vertical axis.`
      },
      ...prev
    ]);

    setDragStartPix(null);
    setDragEndPix(null);
  };


  return (
    <div className="h-screen w-screen bg-[#050A18] text-[#8B9BAE] overflow-hidden flex flex-col font-sans select-none relative">
      
      <AnimatePresence mode="wait">
        {!introCompleted ? (
          <motion.div
            key="cinematic-loader-outer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <CinematicLoader onComplete={() => setIntroCompleted(true)} />
          </motion.div>
        ) : !landingCompleted ? (
          <motion.div
            key="bible-landing-outer"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 overflow-y-auto h-screen bg-[#050A18]"
          >
            <div className="min-h-max w-full flex flex-col">
              <BibleLandingPage onEnterApp={() => setLandingCompleted(true)} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {introCompleted && landingCompleted && (
        <>
      
      {/* Top Banner Warning alerts (Dismissible) */}
      {!isAlertDismissed && (
        <div className="bg-[#EA580C]/10 border-b border-[#EA580C]/25 text-white text-[11px] font-medium px-6 py-2 flex items-center justify-between z-40 relative">
          <div className="flex items-center gap-2">
            <AlertTriangle size={13} className="text-[#EA580C]" />
            <span>
              <strong>AEGIS WARNING:</strong> Unchecked corporate buzzwords or banned sentence openers detected on active staging copy. Please audit communications before committing.
            </span>
          </div>

          <button
            onClick={() => setIsAlertDismissed(true)}
            className="text-white/60 hover:text-white focus:outline-none"
            title="Dismiss security advisory"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Primary top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onToggleCommandRail={() => setIsCommandRailOpen(!isCommandRailOpen)}
        onToggleAssistantPanel={() => setIsAssistantPanelOpen(!isAssistantPanelOpen)}
      />

      {/* Inner Application frame */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: docked sidebar on desktop, responsive drawer overlay on mobile */}
        <div className="hidden lg:flex shrink-0">
          <CommandRail
            activeView={activeView}
            onViewChange={setActiveView}
            isEnabled={isLatticeEnabled}
            onEnabledChange={setIsLatticeEnabled}
          />
        </div>

        {/* Mobile/Tablet CommandRail Drawer */}
        {isCommandRailOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200" 
              onClick={() => setIsCommandRailOpen(false)}
            />
            {/* Drawer Area */}
            <div className="relative max-w-xs w-full bg-[#0A0F1E] h-full flex flex-col z-50 shadow-2xl">
              {/* Close Button Inside Drawer */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsCommandRailOpen(false)}
                  className="p-1 px-1.5 rounded-sm bg-[#111827] border border-[#1A2540] text-[#8B9BAE] hover:text-white"
                  title="Close Navigation"
                >
                  <X size={12} />
                </button>
              </div>
              <CommandRail
                activeView={activeView}
                onViewChange={(view) => {
                  setActiveView(view);
                  setIsCommandRailOpen(false);
                }}
                isEnabled={isLatticeEnabled}
                onEnabledChange={setIsLatticeEnabled}
              />
            </div>
          </div>
        )}

        {/* Center Canvas Stage */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050A18] relative z-10 scrollbar-thin scrollbar-thumb-[#1A2540]">
          
          {/* Active View Selector routers */}
          {activeView === "command-center" && (
            <div className="space-y-6">
              
              {/* Stat Tiles metrics Grid */}
              <StatTiles
                onTileClick={(id) => {
                  if (id === "active-agents") setActiveView("divisions");
                  if (id === "security-score") setActiveView("security");
                }}
              />

              {/* Bento Row Split: Recharts area vs operational logs list */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2.47M inference area charts card */}
                <motion.div layout className="lg:col-span-2 bg-[#0D1326] border border-[#1A2540] rounded p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1A2540]/60 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#8B9BAE] uppercase tracking-wider block">
                          {selectedRange === "24h" ? "24h real-time telemetry" : selectedRange === "30d" ? "30d monthly telemetry" : "Weekly telemetry routing"}
                        </span>
                        <h3 className="text-sm font-bold text-white font-sans uppercase">
                          Inference request loads (Millions)
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Forecast Projection Toggle */}
                        <button
                          type="button"
                          onClick={() => setShowForecast(!showForecast)}
                          className={`py-1 px-2.5 text-[10px] font-mono leading-none rounded-sm border transition-all font-bold flex items-center gap-1.5 ${
                            showForecast
                              ? "bg-[#D4A843]/10 border-[#D4A843]/30 text-[#D4A843]"
                              : "bg-[#111827] border-[#1A2540] text-[#8B9BAE] hover:border-[#8B9BAE]/35 hover:text-white"
                          }`}
                          title="Toggle Predictive Load Projection line"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${showForecast ? "bg-[#D4A843] animate-pulse" : "bg-[#8B9BAE]/40"}`} />
                          <span>FORECAST</span>
                        </button>

                        {/* Compare Mode Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsCompareMode(!isCompareMode);
                            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            setSystemLogs(prev => [
                              {
                                time: timeStr,
                                category: "SYSTEM",
                                text: `COMPARE MODE: ${!isCompareMode ? "Activated baseline overlay correlation metrics vs previous period cycle." : "Deactivated baseline overlay metrics."}`
                              },
                              ...prev
                            ]);
                          }}
                          className={`py-1 px-2.5 text-[10px] font-mono leading-none rounded-sm border transition-all font-bold flex items-center gap-1.5 ${
                            isCompareMode
                              ? "bg-[#A855F7]/10 border-[#A855F7]/30 text-[#A855F7]"
                              : "bg-[#111827] border-[#1A2540] text-[#8B9BAE] hover:border-[#8B9BAE]/35 hover:text-white"
                          }`}
                          title="Toggle Comparison overlay vs previous period cycle"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isCompareMode ? "bg-[#A855F7] animate-pulse" : "bg-[#8B9BAE]/40"}`} />
                          <span>COMPARE</span>
                        </button>

                        {/* Correlation Heatmap Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowHeatmap(!showHeatmap);
                            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            setSystemLogs(prev => [
                              {
                                time: timeStr,
                                category: "SYSTEM",
                                text: `CORRELATION MATRIX: ${!showHeatmap ? "Deployed dynamic inter-divisional correlation overlays [D-01, D-05, D-09]." : "Retracted matrix overlays."}`
                              },
                              ...prev
                            ]);
                          }}
                          className={`py-1 px-2.5 text-[10px] font-mono leading-none rounded-sm border transition-all font-bold flex items-center gap-1.5 ${
                            showHeatmap
                              ? "bg-[#00D9B5]/10 border-[#00D9B5]/30 text-[#00D9B5]"
                              : "bg-[#111827] border-[#1A2540] text-[#8B9BAE] hover:border-[#8B9BAE]/35 hover:text-white"
                          }`}
                          title="Toggle Inter-Divisional Correlation Heatmap Overlay"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${showHeatmap ? "bg-[#00D9B5] animate-pulse" : "bg-[#8B9BAE]/40"}`} />
                          <span>HEATMAP</span>
                        </button>

                        {/* Grid Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowGrid(!showGrid);
                            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            setSystemLogs(prev => [
                              {
                                time: timeStr,
                                category: "SYSTEM",
                                text: `TELEMETRY GRIDLINES: ${!showGrid ? "Enabled Cartesian coordinate overlay structure." : "Extracted coordinate gridlines for clean visual viewport."}`
                              },
                              ...prev
                            ]);
                          }}
                          className={`py-1 px-2.5 text-[10px] font-mono leading-none rounded-sm border transition-all font-bold flex items-center gap-1.5 ${
                            showGrid
                              ? "bg-[#38BDF8]/10 border-[#38BDF8]/30 text-[#38BDF8]"
                              : "bg-[#111827] border-[#1A2540] text-[#8B9BAE] hover:border-[#8B9BAE]/35 hover:text-white"
                          }`}
                          title="Toggle Cartesian Gridlines"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${showGrid ? "bg-[#38BDF8] animate-pulse" : "bg-[#8B9BAE]/40"}`} />
                          <span>GRID</span>
                        </button>

                        {/* Selector Segment */}
                        <div className="flex items-center p-0.5 rounded bg-[#111827] border border-[#1A2540]">
                          {(["24h", "7d", "30d"] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleRangeChange(r)}
                              className={`py-1 px-2.5 text-[10px] font-mono leading-none rounded-sm transition-all font-bold ${
                                selectedRange === r
                                  ? "bg-[#D4A843] text-[#050A18]"
                                  : "text-[#8B9BAE] hover:text-white"
                              }`}
                            >
                              {r.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        {/* Relative Wrapper for Interactive Tooltip */}
                        <div 
                          className="relative"
                          onMouseEnter={() => setShowGrowthTooltip(true)}
                          onMouseLeave={() => setShowGrowthTooltip(false)}
                        >
                          <button
                            type="button"
                            onClick={() => setShowGrowthTooltip(!showGrowthTooltip)}
                            className="font-mono text-xs font-bold text-[#00D9B5] animate-pulse-growth bg-[#00D9B5]/5 border border-[#00D9B5]/20 px-2.5 py-1 rounded shrink-0 cursor-help flex items-center gap-1.5 focus:outline-none"
                            title="Hover or click to view segment contribution breakdown"
                          >
                            <span>+18.7% GROWTH</span>
                            <Info size={11} className="opacity-80" />
                          </button>

                          {showGrowthTooltip && (
                            <div className="absolute right-0 top-full mt-2 w-72 bg-[#0D1326] border border-[#1A2540] rounded p-4 shadow-2xl z-50 text-left select-none animate-fade-in pointer-events-none">
                              <div className="flex items-center gap-1.5 border-b border-[#1A2540] pb-2 mb-3">
                                <Sparkles size={11} className="text-[#00D9B5]" />
                                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                                  DIVISIONAL CONTRIBUTION MATRIX
                                </span>
                              </div>
                              
                              <div className="space-y-3 font-sans">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white font-mono font-medium">D-01 COGNITIVE NEXUS</span>
                                    <span className="text-[#00D9B5] font-mono font-bold">+5.4%</span>
                                  </div>
                                  <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00D9B5]" style={{ width: "29%" }} />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white font-mono font-medium">D-05 HELIOS GRID</span>
                                    <span className="text-[#00D9B5] font-mono font-bold">+4.2%</span>
                                  </div>
                                  <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#3B82F6]" style={{ width: "22%" }} />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white font-mono font-medium">D-09 BIOTIC HATAALII</span>
                                    <span className="text-[#00D9B5] font-mono font-bold">+3.8%</span>
                                  </div>
                                  <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#A855F7]" style={{ width: "20%" }} />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white font-mono font-medium">D-02 AEGIS SECURITY</span>
                                    <span className="text-[#00D9B5] font-mono font-bold">+2.1%</span>
                                  </div>
                                  <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#D4A843]" style={{ width: "11%" }} />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-[10px]">
                                    <span className="text-white font-mono font-medium">OTHER 16 SEGMENTS</span>
                                    <span className="text-[#00D9B5] font-mono font-bold">+3.2%</span>
                                  </div>
                                  <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-500" style={{ width: "18%" }} />
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-[#1A2540] mt-3 pt-2 text-[8px] font-mono text-[#8B9BAE] leading-snug">
                                * Contribution baseline calculated relative to standard active multi-lattice baseline metrics.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Smoothly Animated Slide-In Details Panels */}
                    <AnimatePresence>
                      {isCompareMode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scaleY: 0.9 }}
                          animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                          exit={{ opacity: 0, height: 0, scaleY: 0.9 }}
                          style={{ originY: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="mb-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded p-3 select-none flex flex-wrap gap-4 items-center justify-between overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <Layers className="text-[#A855F7] shrink-0" size={14} />
                            <div>
                              <div className="font-mono font-bold text-white uppercase tracking-wider text-[10px]">
                                COMPARISON BASELINE CORRELATION ENGAGED
                              </div>
                              <div className="text-[9px] text-[#8B9BAE] mt-0.5">
                                Overlaying active telemetry against standard historical control run cycle models.
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-right font-mono text-[9px] shrink-0">
                            <div>VARIANCE INDEX: <span className="text-[#A855F7] font-bold">-4.12%</span></div>
                            <div>DRIFT LOG: <span className="text-[#A855F7] font-bold">+2.46%</span></div>
                            <div>COHERENCE: <span className="text-emerald-400 font-bold">98.92%</span></div>
                            <div>METRIC BASE: <span className="text-white font-bold">WEEKLY CYCLE</span></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showForecast && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scaleY: 0.9 }}
                          animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                          exit={{ opacity: 0, height: 0, scaleY: 0.9 }}
                          style={{ originY: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="mb-4 bg-[#D4A843]/10 border border-[#D4A843]/30 rounded p-3 select-none flex flex-wrap gap-4 items-center justify-between overflow-hidden"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="text-[#D4A843] shrink-0" size={14} />
                            <div>
                              <div className="font-mono font-bold text-white uppercase tracking-wider text-[10px]">
                                PREDICTIVE LOAD FORECAST ACTIVATED
                              </div>
                              <div className="text-[9px] text-[#8B9BAE] mt-0.5">
                                Auto-generating neural projection model vectors overlayed over telemetry timeline.
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-right font-mono text-[9px] shrink-0">
                            <div>PEAK VALUE: <span className="text-[#D4A843] font-bold">3.55M loads</span></div>
                            <div>REFINEMENT: <span className="text-[#D4A843] font-bold">94.75%</span></div>
                            <div>STOCHASTIC NOISE: <span className="text-emerald-400 font-bold">LOW</span></div>
                            <div>VECTOR DEPTH: <span className="text-white font-bold">GEN-3 ENGINE</span></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Animated Layout splitter for Recharts and Correlation Heatmap */}
                    <div className="flex flex-col xl:flex-row gap-6 mt-4 items-stretch">
                      
                      {/* Left: Recharts Grid viewport */}
                      <div className="flex-1 min-w-0 h-64 relative text-[10px]">
                        {/* Interactive Drag Rails for Y-Axis Zoom */}
                        <div
                          onMouseDown={handleYDragMouseDown}
                          onMouseMove={handleYDragMouseMove}
                          onMouseUp={handleYDragMouseUp}
                          onMouseLeave={() => {
                            if (isDraggingY) {
                              setIsDraggingY(false);
                              setDragStartPix(null);
                              setDragEndPix(null);
                            }
                          }}
                          className="absolute left-0 top-[10px] bottom-[30px] w-12 group select-none cursor-row-resize z-30 flex items-center justify-end pr-1 bg-white/0 hover:bg-[#D4A843]/5 border-r border-[#1A2540]/30 transition-all duration-150"
                          title="Click and drag vertically on Y-axis to zoom"
                        >
                          {/* visual guide feedback rail */}
                          <div className="h-full w-[2px] bg-transparent group-hover:bg-[#D4A843]/35 transition-colors absolute right-[-1px] top-0" />
                          <div className="hidden group-hover:flex flex-col items-center gap-1 text-[8px] font-mono text-[#D4A843]/80 absolute left-2 text-center pointer-events-none uppercase tracking-tighter leading-none pr-1">
                            <span>DRAG</span>
                            <span>Y-ZOOM</span>
                          </div>
                        </div>

                        {/* Reset Zoom indicator bubble */}
                        {(yZoomMin !== null || yZoomMax !== null) && (
                          <button
                            type="button"
                            onClick={() => {
                              setYZoomMin(null);
                              setYZoomMax(null);
                              const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                              setSystemLogs(prev => [
                                {
                                  time: timeStr,
                                  category: "SYSTEM",
                                  text: `TELEMETRY Y-ZOOM: Extracted custom constraints. Restored standard metrics.`
                                },
                                ...prev
                              ]);
                            }}
                            className="absolute top-2 left-16 px-2 py-0.5 text-[8px] font-mono font-bold uppercase transition bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded z-30 flex items-center gap-1 shadow-lg backdrop-blur-xs"
                            title="Restore default vertical scale range"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-0.5" />
                            RESET ZOOM
                          </button>
                        )}

                        {/* Target Highlight Band when user is dragging */}
                        {isDraggingY && dragStartPix !== null && dragEndPix !== null && (
                          <div
                            className="absolute left-[48px] right-2 bg-[#D4A843]/15 border-y border-[#D4A843]/40 pointer-events-none z-20 font-mono text-[9px] text-[#D4A843] px-3 flex items-center justify-end"
                            style={{
                              top: `${Math.min(dragStartPix, dragEndPix)}px`,
                              height: `${Math.abs(dragStartPix - dragEndPix)}px`,
                            }}
                          >
                            <span className="bg-[#0D1326] px-1.5 py-0.5 rounded border border-[#D4A843]/30 text-[8px] font-bold uppercase tracking-wide">
                              ZOOM BAND SELECT
                            </span>
                          </div>
                        )}

                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={enrichedInferenceChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00D9B5" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#00D9B5" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="forecastColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4A843" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#D4A843" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="compareColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#1A2540" />}
                            <XAxis dataKey="day" stroke="#8B9BAE" tickLine={false} />
                            <YAxis 
                              stroke="#8B9BAE" 
                              tickLine={false} 
                              domain={[
                                yZoomMin !== null ? yZoomMin : (Math.min(...(enrichedInferenceChartData || []).map(d => Math.min(d.inference || 99, d.forecast || 99, d.compareInference || 99)).filter(v => typeof v === "number" && v !== 99)) !== Infinity ? Math.max(0, parseFloat((Math.min(...(enrichedInferenceChartData || []).map(d => Math.min(d.inference || 99, d.forecast || 99, d.compareInference || 99)).filter(v => typeof v === "number" && v !== 99)) - 0.2).toFixed(2))) : 1.5),
                                yZoomMax !== null ? yZoomMax : (Math.max(...(enrichedInferenceChartData || []).map(d => Math.max(d.inference || -99, d.forecast || -99, d.compareInference || -99)).filter(v => typeof v === "number" && v !== -99)) !== -Infinity ? parseFloat((Math.max(...(enrichedInferenceChartData || []).map(d => Math.max(d.inference || -99, d.forecast || -99, d.compareInference || -99)).filter(v => typeof v === "number" && v !== -99)) + 0.3).toFixed(2)) : 4.0)
                              ]}
                              allowDataOverflow={true}
                            />
                            <Tooltip content={<CustomChartTooltip />} />
                            <ReferenceLine
                              y={averageThreshold}
                              stroke="#EF4444"
                              strokeWidth={1}
                              strokeDasharray="4 4"
                              label={{
                                value: "2.5 SD ANOMALY THRESHOLD",
                                fill: "#EF4444",
                                fontSize: 8,
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                position: "top",
                                offset: 5
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="inference"
                              stroke="#00D9B5"
                              strokeWidth={2}
                              fillOpacity={1}
                              fill="url(#areaColor)"
                              dot={<RenderAnomalyDot />}
                              isAnimationActive={true}
                              animationDuration={1000}
                              animationEasing="ease-in-out"
                            />
                            {isCompareMode && (
                              <Area
                                type="monotone"
                                dataKey="compareInference"
                                stroke="#A855F7"
                                strokeWidth={2}
                                strokeDasharray="4 4"
                                fillOpacity={1}
                                fill="url(#compareColor)"
                                connectNulls
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-in-out"
                              />
                            )}
                            <Area
                              type="monotone"
                              dataKey="forecast"
                              stroke="#D4A843"
                              strokeWidth={2}
                              strokeDasharray="4 4"
                              fillOpacity={1}
                              fill="url(#forecastColor)"
                              connectNulls
                              isAnimationActive={true}
                              animationDuration={1000}
                              animationEasing="ease-in-out"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Right: Dynamic Inter-Divisional Correlation Heatmap */}
                      <AnimatePresence>
                        {showHeatmap && (
                          <motion.div
                            key="correlation-heatmap-overlay"
                            initial={{ opacity: 0, width: 0, scale: 0.95 }}
                            animate={{ opacity: 1, width: "100%", xl: "310px", scale: 1 }}
                            exit={{ opacity: 0, width: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 220, damping: 22 }}
                            className="w-full xl:w-[310px] bg-[#111827]/60 border border-[#1A2540] rounded p-4 flex flex-col justify-between overflow-hidden backdrop-blur-md"
                          >
                            <div className="space-y-4 h-full flex flex-col justify-between">
                              {/* Header */}
                              <div className="flex items-center justify-between border-b border-[#1A2540]/60 pb-2">
                                <div className="flex items-center gap-1.5 font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9B5] animate-pulse" />
                                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                                    INTER-COMS RELATIONSHIP
                                  </span>
                                </div>
                                <span className="text-[8px] font-mono bg-[#00D9B5]/15 text-[#00D9B5] border border-[#00D9B5]/30 px-1.5 rounded uppercase font-bold">
                                  LIVE {selectedRange}
                                </span>
                              </div>

                              {/* Matrix Representation */}
                              <div className="grid grid-cols-4 gap-1 text-center my-1 select-none">
                                {/* Header labels */}
                                <div className="text-[8px] font-mono text-[#8B9BAE]/40 flex items-center justify-center uppercase">GRID</div>
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] py-1 border border-[#1A2540]/30 rounded">D-01</div>
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] py-1 border border-[#1A2540]/30 rounded">D-05</div>
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] py-1 border border-[#1A2540]/30 rounded">D-09</div>

                                {/* Row 1: D-01 row */}
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] flex items-center justify-center border border-[#1A2540]/30 rounded">D-01</div>
                                <div className="aspect-square flex flex-col items-center justify-center rounded border bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5] relative group cursor-pointer transition-all duration-300">
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[0][0].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[0][0].split(" ")[0]}</span>
                                </div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[0][1] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[0][1] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : "bg-purple-500/15 border-purple-500/30 text-purple-400"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[0][1].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[0][1].split(" ")[0]}</span>
                                </div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[0][2] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[0][2] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : correlationMatrix.data[0][2] >= 0.65 
                                        ? "bg-purple-500/15 border-purple-500/30 text-purple-400" 
                                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[0][2].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[0][2].split(" ")[0]}</span>
                                </div>

                                {/* Row 2: D-05 row */}
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] flex items-center justify-center border border-[#1A2540]/30 rounded">D-05</div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[1][0] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[1][0] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : correlationMatrix.data[1][0] >= 0.65 
                                        ? "bg-purple-500/15 border-purple-500/30 text-purple-400" 
                                        : "bg-[#1A2540]/40 border-transparent text-[#8B9BAE]"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[1][0].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[1][0].split(" ")[0]}</span>
                                </div>
                                <div className="aspect-square flex flex-col items-center justify-center rounded border bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5] relative group cursor-pointer transition-all duration-300">
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[1][1].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[1][1].split(" ")[0]}</span>
                                </div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[1][2] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[1][2] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : correlationMatrix.data[1][2] >= 0.65 
                                        ? "bg-purple-500/15 border-purple-500/30 text-purple-400" 
                                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[1][2].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[1][2].split(" ")[0]}</span>
                                </div>

                                {/* Row 3: D-09 row */}
                                <div className="text-[8px] font-mono text-[#8B9BAE] font-bold bg-[#0D1326] flex items-center justify-center border border-[#1A2540]/30 rounded">D-09</div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[2][0] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[2][0] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : correlationMatrix.data[2][0] >= 0.65 
                                        ? "bg-purple-500/15 border-purple-500/30 text-purple-400" 
                                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[2][0].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[2][0].split(" ")[0]}</span>
                                </div>
                                <div className={`aspect-square flex flex-col items-center justify-center rounded border relative group cursor-pointer transition-all duration-300 ${
                                  correlationMatrix.data[2][1] >= 0.85 
                                    ? "bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5]" 
                                    : correlationMatrix.data[2][1] >= 0.75 
                                      ? "bg-blue-500/15 border-blue-500/30 text-blue-400" 
                                      : correlationMatrix.data[2][1] >= 0.65 
                                        ? "bg-purple-500/15 border-purple-500/30 text-purple-400" 
                                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                }`}>
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[2][1].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[2][1].split(" ")[0]}</span>
                                </div>
                                <div className="aspect-square flex flex-col items-center justify-center rounded border bg-[#00D9B5]/20 border-[#00D9B5]/40 text-[#00D9B5] relative group cursor-pointer transition-all duration-300 font-bold">
                                  <span className="text-[11px] font-mono font-extrabold">{correlationMatrix.data[2][2].toFixed(2)}</span>
                                  <span className="text-[5px] font-mono opacity-80 uppercase scale-90 text-[center] leading-none tracking-tighter">{correlationMatrix.details[2][2].split(" ")[0]}</span>
                                </div>
                              </div>

                              {/* Footer Description */}
                              <div className="text-[7.5px] font-mono text-[#8B9BAE]/60 border-t border-[#1A2540]/60 pt-2 leading-tight">
                                * Value represents cross-correlation indices between D-01, D-05 and D-09 telemetry vectors.
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-[#8B9BAE]/60 border-t border-[#1A2540]/30 pt-3 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span>TRACKING SOURCE: ZENFLOW LATITUDE MATRICES</span>
                      <span className="flex items-center gap-1 text-red-500 font-bold shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1 leading-none animate-pulse" />
                        ⚠️ 2.5 SD ANOMALY SENSOR ACTIVE
                      </span>
                    </div>
                    <span>LAST SYNC: JUST NOW</span>
                  </div>
                </motion.div>

                {/* Live logs pipeline column */}
                <div className="bg-[#0D1326] border border-[#1A2540] rounded p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white font-sans uppercase tracking-wider border-b border-[#1A2540] pb-2 mb-3 flex items-center gap-2">
                      <History size={13} className="text-[#00D9B5]" />
                      <span>Command Center Log Queue</span>
                    </h3>

                    <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none">
                      {systemLogs.map((log, idx) => {
                        let catColor = "text-[#8B9BAE] bg-[#111827]";
                        if (log.category === "COMPLIANCE") catColor = "text-[#EA580C] bg-[#EA580C]/10 border-[#EA580C]/20";
                        if (log.category === "AGENT") catColor = "text-[#00D9B5] bg-[#00D9B5]/10 border-[#00D9B5]/20";
                        if (log.category === "DEPLOY") catColor = "text-[#D4A843] bg-[#D4A843]/10 border-[#D4A843]/20";

                        return (
                          <div key={idx} className="text-[10px] font-mono border-b border-[#1A2540]/30 pb-2 last:border-0 last:pb-0">
                            <div className="flex justify-between text-[9px] text-[#8B9BAE]/70 mb-1">
                              <span>{log.time}</span>
                              <span className={`px-1 rounded-sm text-[8px] uppercase font-bold border ${catColor}`}>
                                {log.category}
                              </span>
                            </div>
                            <p className="text-[#8B9BAE] hover:text-white transition-colors leading-relaxed">
                              {log.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1A2540]/30 text-center">
                    <button
                      onClick={() => setSystemLogs([
                        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), category: "SYSTEM", text: "Manual audit metrics pipe purge initialized." },
                        ...systemLogs
                      ])}
                      className="text-[9px] font-mono text-[#D4A843] hover:underline flex items-center justify-center gap-1 w-full uppercase"
                    >
                      <ListRestart size={10} />
                      <span>Sync Logs Matrix</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Direct access blueprints map preview */}
              <CampusView />

            </div>
          )}

          {activeView === "brand" && <BrandBrandView />}

          {activeView === "divisions" && (
            <DivisionsView
              searchQuery={searchQuery}
              onAddAgentInstance={handleAddAgentInstance}
            />
          )}

          {activeView === "mixer" && <AgentMixer />}

          {activeView === "integrations" && <IntegrationsView />}

          {activeView === "pricing" && <PricingView />}

          {activeView === "synergy" && <SynergyNodesView searchQuery={searchQuery} />}

          {activeView === "merchandise" && <MerchandiseView />}

          {activeView === "taxonomy" && <TaxonomyView />}

          {activeView === "governance" && <GovernanceView />}

          {activeView === "security" && <SecurityView />}

          {activeView === "people" && <PeopleView />}

        </main>

        {/* Right Side: docked assistant panel on desktop, responsive drawer overlay on mobile */}
        {/* Desktop Sidebar Panel */}
        <div className="hidden xl:flex shrink-0">
          <AssistantPanel />
        </div>

        {/* Mobile/Tablet Assistant Drawer */}
        {isAssistantPanelOpen && (
          <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200" 
              onClick={() => setIsAssistantPanelOpen(false)}
            />
            {/* Drawer Area */}
            <div className="relative max-w-sm w-[85%] sm:w-[380px] bg-[#0A0F1E] h-full flex flex-col z-50 shadow-2xl">
              {/* Close Button Inside Drawer */}
              <div className="absolute top-4 right-14 z-50">
                <button
                  onClick={() => setIsAssistantPanelOpen(false)}
                  className="p-1 px-1.5 rounded-sm bg-[#111827] border border-[#1A2540] text-[#8B9BAE] hover:text-white"
                  title="Close Assistant"
                >
                  <X size={12} />
                </button>
              </div>
              <AssistantPanel />
            </div>
          </div>
        )}

      </div>

      {/* Floating Action Button (FAB) for quick access to Assistant on mobile/tablets */}
      {!isAssistantPanelOpen && (
        <button
          onClick={() => setIsAssistantPanelOpen(true)}
          className="xl:hidden fixed bottom-6 right-6 z-40 bg-[#00D9B5] hover:bg-[#00D9B5]/85 active:scale-95 text-[#050A18] p-3 rounded-full shadow-lg shadow-[#00D9B5]/20 flex items-center justify-center transition-all focus:outline-none"
          title="Open AI Assistant"
          aria-label="Open AI Assistant"
        >
          <Sparkles size={18} className="animate-pulse" />
        </button>
      )}

      {/* "DEPLOY MODEL" Modal simulation sheet */}
      {isDeployModalOpen && (
        <div id="deploy-modal-backdrop" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 select-none animate-fade-in text-left">
          <div className="bg-[#0D1326] border border-[#1A2540] rounded max-w-md w-full p-6 space-y-6 relative">
            <button
              onClick={() => setIsDeployModalOpen(false)}
              className="absolute top-4 right-4 text-[#8B9BAE] hover:text-white"
              title="Close modal"
            >
              <X size={16} />
            </button>

            <div className="border-b border-[#1A2540] pb-3">
              <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider flex items-center gap-2">
                <UploadCloud size={16} className="text-[#D4A843]" />
                <span>Zenith OS Model Deployment Gate</span>
              </h3>
              <p className="text-[10px] text-[#8B9BAE] font-mono uppercase tracking-widest mt-1">
                Lattice compliance verification sequence
              </p>
            </div>

            <form onSubmit={handleConfirmDeploy} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Select Active Model Base</label>
                <select
                  value={deployModelName}
                  onChange={(e) => setDeployModelName(e.target.value)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-2 h-9"
                >
                  <option value="ZenFlow-3.5-Loom">ZenFlow-3.5-Loom (Default routing)</option>
                  <option value="Atlas-Core-4.0">Atlas-Core-4.0 (Heavy analytical engine)</option>
                  <option value="Aegis-Guard-v9">Aegis-Guard-v9 (Compliance filter layer)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Target Division Sandbox</label>
                <select
                  value={deployTargetDiv}
                  onChange={(e) => setDeployTargetDiv(e.target.value)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-2 h-9"
                >
                  <option value="D-01">D-01 ZenFlow Neural Stack</option>
                  <option value="D-03">D-03 Animus Prime (Robotics)</option>
                  <option value="D-05">D-05 Terra Axis (Logistics)</option>
                  <option value="D-08">D-08 Quantum Ledger (Financial)</option>
                  <option value="D-16">D-16 Juris Guard (Legal)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[9px] font-mono uppercase text-[#8B9BAE] font-bold">Compliance Strictness Threshold</label>
                <select
                  value={deployConfidenceStrict}
                  onChange={(e) => setDeployConfidenceStrict(e.target.value)}
                  className="bg-[#111827] border border-[#1A2540] text-xs text-white rounded p-2 h-9"
                >
                  <option value="Strict SEC-Level">Strict SEC-Level (Automatic human review hold)</option>
                  <option value="Standard Aegis Code">Standard Aegis Code (Banned word sweep pass)</option>
                  <option value="Loose Sandbox Test">Loose Sandbox Test (Air-gapped telemetry only)</option>
                </select>
              </div>

              <div className="p-3 bg-[#111827] border border-[#1A2540] rounded-[2px] space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#00D9B5] font-bold">
                  <FileCheck2 size={11} />
                  <span>PRE-DEPLOYMENT CHECKS COMPLIANT</span>
                </div>
                <p className="text-[10px] text-[#8B9BAE] leading-normal font-sans">
                  The model complies fully with the 60:30:10 visual guidelines rules. No unauthorized pink gradients or third-party web configurations are bundled inside.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#1A2540]/40 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setIsDeployModalOpen(false)}
                  className="px-4 py-2 border border-[#1A2540] rounded text-[#8B9BAE] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4A843] text-[#050A18] font-bold rounded hover:bg-[#C9963F] flex items-center gap-1.5"
                >
                  <span>CONSTRUCTION CONFIRM</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        </>
      )}

    </div>
  );
}
