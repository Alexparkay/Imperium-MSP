import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineStorage, MdOutlineBusiness, MdOutlineAttachMoney, MdArrowForward, MdArrowBack, MdEdit, MdRefresh, MdCloudUpload, MdOutlineCalculate, MdOutlineSettings, MdSecurity } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FaServer, FaMoneyBillWave, FaDatabase, FaChartLine, FaRegCalendarAlt, FaShieldAlt } from 'react-icons/fa';

// Define types for our data
interface SecuritySystem {
  id: string;
  name: string;
  complexity: number;
  efficiency: number;
  coverage: {
    endpoints: number;
    services: number;
  };
  costPerEndpoint: number;
}

interface SecurityPotential {
  calculated: boolean;
  totalEndpoints: number;
  selectedSystemType: string;
  annualSavings: number;
  implementationCost: number;
  operationalSavings: number;
  paybackPeriod: number;
  roi: number;
  monthlySavings: Array<{
    month: string;
    savings: number;
  }>;
  annualOperationalCost?: number;
  mspCostPerEndpoint?: number;
  systemEndpoints?: number;
  costPerEndpoint?: number;
  securityIncentives?: number;
  currentAnnualOperationalCost?: number;
  remainingInHouse?: number;
  remainingCost?: number;
  firstYearSavings?: number;
  firstYearROI?: number;
}

interface Enterprise {
  id: number;
  name: string;
  industry: string;
  location: string;
  analysis: {
    enterpriseType: string;
    employees: number;
    endpointRate: number;
    securityComplexity: number;
  };
  operationalAssessment: {
    annualCost: number;
    annualMaintenance: number;
  };
  securityPotential: SecurityPotential;
}

const SecurityInsights = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(true);
  const [currentEnterpriseIndex, setCurrentEnterpriseIndex] = useState(0);
  const [selectedSystemType, setSelectedSystemType] = useState('essential');
  const [iframeKey, setIframeKey] = useState(1);
  // Set iframe loaded to true by default
  const [iframeLoaded, setIframeLoaded] = useState(true);
  
  // Available Pro Cloud SaaS security service types
  const systemTypes: SecuritySystem[] = [
    {
      id: 'essential',
      name: 'cyberGUARD Essential',
      complexity: 2,
      efficiency: 0.80,
      coverage: {
        endpoints: 1000,
        services: 10
      },
      costPerEndpoint: 55
    },
    {
      id: 'advanced',
      name: 'cyberGUARD Professional',
      complexity: 3,
      efficiency: 0.90,
      coverage: {
        endpoints: 3000,
        services: 18
      },
      costPerEndpoint: 75
    },
    {
      id: 'enterprise',
      name: 'cyberGUARD Enterprise + CMMC',
      complexity: 4,
      efficiency: 0.95,
      coverage: {
        endpoints: 15000,
        services: 28
      },
      costPerEndpoint: 110
    }
  ];
  
  // Sample enterprises data with analysis and operational assessment results
  const [enterprises, setEnterprises] = useState<Enterprise[]>([
    {
      id: 1,
      name: "Defense Technologies Corp",
      industry: "Defense Contracting",
      location: "Arlington, VA",
      analysis: {
        enterpriseType: "Defense/Aerospace",
        employees: 3800,
        endpointRate: 2.1,
        securityComplexity: 4.2
      },
      operationalAssessment: {
        annualCost: 5850000,
        annualMaintenance: 1450000
      },
      securityPotential: {
        calculated: false,
        totalEndpoints: 0,
        selectedSystemType: '',
        annualSavings: 0,
        implementationCost: 0,
        operationalSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlySavings: []
      }
    },
    {
      id: 2,
      name: "Federal Systems Integration",
      industry: "Government Contracting",
      location: "Huntsville, AL",
      analysis: {
        enterpriseType: "Government/Federal",
        employees: 2750,
        endpointRate: 1.9,
        securityComplexity: 4.0
      },
      operationalAssessment: {
        annualCost: 4250000,
        annualMaintenance: 1020000
      },
      securityPotential: {
        calculated: false,
        totalEndpoints: 0,
        selectedSystemType: '',
        annualSavings: 0,
        implementationCost: 0,
        operationalSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlySavings: []
      }
    },
    {
      id: 3,
      name: "Western Healthcare Systems",
      industry: "Healthcare",
      location: "Denver, CO",
      analysis: {
        enterpriseType: "Healthcare",
        employees: 7800,
        endpointRate: 2.2,
        securityComplexity: 4.2
      },
      operationalAssessment: {
        annualCost: 6250000,
        annualMaintenance: 1870000
      },
      securityPotential: {
        calculated: false,
        totalEndpoints: 0,
        selectedSystemType: '',
        annualSavings: 0,
        implementationCost: 0,
        operationalSavings: 0,
        paybackPeriod: 0,
        roi: 0,
        monthlySavings: []
      }
    }
  ]);

  const currentEnterprise = enterprises[currentEnterpriseIndex];
  const selectedSystem = systemTypes.find(system => system.id === selectedSystemType)!;

  // MSP Security Optimization data
  const securityOptimizationData = {
    yearlyOperationalSavings: '$2,125,500/year',
    yearlyCost: '$785,750',
    systemSize: '1,250 endpoints',
    costsReduced: '73.5%',
    monthlyAverage: '$177,125',
    firstYear: '$1,339,750',
    threeYearTotal: '$6,376,500',
    costWithoutMSP: '$9,875,000',
    costWithMSP: '$3,498,500',
    totalLifetimeSavings: '$6,376,500',
    breakEven: '14 months',
    address: '303 S Technology Ct, Broomfield, CO',
    state: 'CO',
    zipCode: '80021',
    currentCostPerEndpoint: '$656/month',
    monthlyOpex: '$823,750',
    totalEndpoints: '1,250 endpoints',
    securityIncentives: '$125,000',
    implementationCost: '$1,750,000 total',
    implementationTime: '6 months',
    totalImplementationCost: '$1,875,000',
    endpointCost: '$628 per endpoint',
    totalServers: '42 servers',
    totalDatabases: '18 databases',
    annualMaintenanceHours: '12,800 hours',
    co2Reduction: '185 tons/year',
    dataEfficiency: '86% improved',
    annualSavings: '$2,125,500',
    remainingInHouseCost: '$560,750',
    remainingCost: '$46,730/month',
    firstYearROI: '71.5%'
  };

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate calculation process
      setTimeout(() => {
        setIsCalculating(false);
      }, 3000);
    }, 1000);
  }, []);

  // Add a new useEffect to handle iframe safety
  useEffect(() => {
    // Prevent the iframe from navigating to the "Are you lost?" page
    const preventNavigation = (e: MessageEvent) => {
      if (e.data && e.data.type === 'navigation') {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('message', preventNavigation);
    
    return () => {
      window.removeEventListener('message', preventNavigation);
    };
  }, []);

  // Add this useEffect to prevent the "Are you lost?" page from showing
  useEffect(() => {
    // Check if URL has changed to include #ru (the "Are you lost?" page marker)
    const checkUrl = () => {
      if (window.location.href.includes('#ru')) {
        console.log('Detected unwanted navigation, resetting URL');
        // Reset the URL without causing a page reload
        window.history.pushState(null, '', window.location.pathname);
        
        // Reload the iframe to restore functionality
        setIframeKey(prev => prev + 1);
        
        // Show a toast to inform the user
        toast('Prevented unwanted navigation', {
          icon: '👍',
          duration: 2000
        });
      }
    };

    // Set up interval to periodically check the URL
    const urlCheckInterval = setInterval(checkUrl, 1000);
    
    // Also check on hash change events
    const hashChangeHandler = () => {
      checkUrl();
    };
    
    window.addEventListener('hashchange', hashChangeHandler);
    
    // Clean up
    return () => {
      clearInterval(urlCheckInterval);
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  const calculateMigrationPotential = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Calculate how many endpoints will be managed
      const totalEndpoints = Math.round(currentEnterprise.analysis.employees * currentEnterprise.analysis.endpointRate);
      
      // Calculate annual savings based on system type and complexity
      let efficiencyFactor = 0;
      if (currentEnterprise.industry.includes("Manufacturing")) {
        efficiencyFactor = 0.68;
      } else if (currentEnterprise.industry.includes("Retail")) {
        efficiencyFactor = 0.72;
      } else if (currentEnterprise.industry.includes("Healthcare")) {
        efficiencyFactor = 0.65;
      } else {
        efficiencyFactor = 0.70; // Default
      }
      
      const annualSavings = Math.round(currentEnterprise.operationalAssessment.annualCost * selectedSystem.efficiency * efficiencyFactor);
      
      // Calculate costs and savings
      const implementationCost = Math.round(totalEndpoints * 450 + 150000); // $450 per endpoint plus $150k base cost
      const operationalSavings = Math.round(currentEnterprise.operationalAssessment.annualMaintenance * 0.85); // 85% maintenance cost reduction
      const paybackPeriod = parseFloat(((implementationCost) / (annualSavings + operationalSavings)).toFixed(1));
      const roi = parseFloat((((annualSavings + operationalSavings) * 3 - implementationCost) / implementationCost * 100).toFixed(1)); // 3-year ROI
      
      // Generate monthly savings data based on implementation phases
      const monthlySavingsRamp = [0.05, 0.10, 0.20, 0.30, 0.45, 0.60, 0.75, 0.90, 1.0, 1.0, 1.0, 1.0];
      const monthlySavings = [
        { month: 'Jan', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[0]) },
        { month: 'Feb', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[1]) },
        { month: 'Mar', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[2]) },
        { month: 'Apr', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[3]) },
        { month: 'May', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[4]) },
        { month: 'Jun', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[5]) },
        { month: 'Jul', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[6]) },
        { month: 'Aug', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[7]) },
        { month: 'Sep', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[8]) },
        { month: 'Oct', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[9]) },
        { month: 'Nov', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[10]) },
        { month: 'Dec', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[11]) }
      ];
      
      // Update the current enterprise with security potential data
      const updatedEnterprises = [...enterprises];
      updatedEnterprises[currentEnterpriseIndex] = {
        ...currentEnterprise,
        securityPotential: {
          calculated: true,
          totalEndpoints,
          selectedSystemType: selectedSystem.id,
          annualSavings,
          implementationCost,
          operationalSavings,
          paybackPeriod,
          roi,
          monthlySavings
        }
      };
      
      setEnterprises(updatedEnterprises);
      toast.success('MSP security potential calculation complete');
    }, 2000);
  };

  const calculateSecurityPotential = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Calculate how many endpoints will be managed
      const totalEndpoints = Math.round(currentEnterprise.analysis.employees * currentEnterprise.analysis.endpointRate);
      
      // Calculate annual savings based on Pro Cloud's cyberGUARD system type and CMMC complexity
      let efficiencyFactor = 0;
      if (currentEnterprise.industry.includes("Defense") || currentEnterprise.industry.includes("Aerospace")) {
        efficiencyFactor = 0.78; // Higher savings for defense contractors due to CMMC optimization
      } else if (currentEnterprise.industry.includes("Government") || currentEnterprise.industry.includes("Federal")) {
        efficiencyFactor = 0.82; // Government efficiency gains
      } else if (currentEnterprise.industry.includes("Manufacturing")) {
        efficiencyFactor = 0.75; // Manufacturing efficiency
      } else {
        efficiencyFactor = 0.70; // Default
      }
      
      const annualSavings = Math.round(currentEnterprise.operationalAssessment.annualCost * selectedSystem.efficiency * efficiencyFactor);
      
      // Calculate costs and savings for Pro Cloud's cyberGUARD implementation
      const implementationCost = Math.round(totalEndpoints * 520 + 275000); // $520 per endpoint plus $275k base cost for CMMC setup
      const operationalSavings = Math.round(currentEnterprise.operationalAssessment.annualMaintenance * 0.88); // 88% maintenance cost reduction through cyberGUARD automation
      const paybackPeriod = parseFloat(((implementationCost) / (annualSavings + operationalSavings)).toFixed(1));
      const roi = parseFloat((((annualSavings + operationalSavings) * 3 - implementationCost) / implementationCost * 100).toFixed(1)); // 3-year ROI
      
      // Generate monthly savings data based on cyberGUARD implementation phases
      const monthlySavingsRamp = [0.08, 0.15, 0.28, 0.45, 0.62, 0.78, 0.88, 0.95, 1.0, 1.0, 1.0, 1.0];
      const monthlySavings = [
        { month: 'Jan', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[0]) },
        { month: 'Feb', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[1]) },
        { month: 'Mar', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[2]) },
        { month: 'Apr', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[3]) },
        { month: 'May', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[4]) },
        { month: 'Jun', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[5]) },
        { month: 'Jul', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[6]) },
        { month: 'Aug', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[7]) },
        { month: 'Sep', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[8]) },
        { month: 'Oct', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[9]) },
        { month: 'Nov', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[10]) },
        { month: 'Dec', savings: Math.round((annualSavings / 12) * monthlySavingsRamp[11]) }
      ];
      
      // Update the current enterprise with security potential data
      const updatedEnterprises = [...enterprises];
      updatedEnterprises[currentEnterpriseIndex] = {
        ...currentEnterprise,
        securityPotential: {
          calculated: true,
          totalEndpoints,
          selectedSystemType: selectedSystem.id,
          annualSavings,
          implementationCost,
          operationalSavings,
          paybackPeriod,
          roi,
          monthlySavings
        }
      };
      
      setEnterprises(updatedEnterprises);
      toast.success('Pro Cloud cyberGUARD potential calculation complete');
    }, 2000);
  };

  const handleNext = () => {
    if (currentEnterpriseIndex < enterprises.length - 1) {
      setCurrentEnterpriseIndex(currentEnterpriseIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentEnterpriseIndex > 0) {
      setCurrentEnterpriseIndex(currentEnterpriseIndex - 1);
    }
  };

  const handleContinue = () => {
    // Only navigate when this function is explicitly called
    navigate('/outreach');
  };

  const handleSystemTypeChange = (systemId: string) => {
    setSelectedSystemType(systemId);
    
    // If we already have calculations, recalculate with the new system type
    if (currentEnterprise.securityPotential.calculated) {
      calculateSecurityPotential();
    }
  };

  // Calculate percentage of costs that can be reduced by MSP security services
  const calculateCostReduction = () => {
    if (!currentEnterprise.securityPotential.calculated) return 0;
    
    return Math.min(100, Math.round(((currentEnterprise.securityPotential.annualSavings + currentEnterprise.securityPotential.operationalSavings) / (currentEnterprise.operationalAssessment.annualCost + currentEnterprise.operationalAssessment.annualMaintenance)) * 100));
  };

  // Data for the cost reduction pie chart
  const costReductionData = [
    { name: 'Cost Reduction', value: calculateCostReduction() },
    { name: 'Remaining Cost', value: 100 - calculateCostReduction() }
  ];
  
  const COLORS = ['#22c55e', '#94a3b8'];

  // Safe function to show modals
  const showModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
    }
  };

  // Add a scroll event listener to prevent unwanted navigation
  useEffect(() => {
    // Prevent any automatic navigation on scroll
    const handleScroll = (e: Event) => {
      // This empty handler overrides any other scroll handlers that might navigate
      e.stopPropagation();
    };

    window.addEventListener('scroll', handleScroll, { capture: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, []);

  // Enhanced scroll prevention by adding multiple levels of protection
  useEffect(() => {
    // Comprehensive set of measures to prevent the "Are you lost" page from showing

    // 1. Prevent default behavior for various scroll events
    const preventDefaultScroll = (e: Event) => {
      // Don't prevent all scrolling, just specific behaviors that might trigger navigation
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        // Only prevent if this is a link that might navigate
        if (!e.defaultPrevented) {
          e.preventDefault();
        }
      }
    };

    // 2. Prevent any history navigation on scroll
    const preventNavigation = (e: Event) => {
      e.stopPropagation();
      if (e.target instanceof HTMLElement && e.target.tagName === 'A') {
        e.preventDefault();
      }
    };

    // 3. Block any hashchange events that aren't explicitly triggered by user clicks
    const preventHashChange = (e: HashChangeEvent) => {
      // We can't always prevent the hash change, but we can navigate back if it wasn't wanted
      if (e.newURL.includes('#ru')) {
        window.history.back();
      }
    };

    // 4. Block popstate events that might be related to unwanted navigation
    const preventPopState = (e: PopStateEvent) => {
      // Check if this might be the "Are you lost" page
      if (typeof window.location.href === 'string' && window.location.href.includes('#ru')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    // Handle touch events to prevent swipe navigation
    const preventSwipeNavigation = (e: TouchEvent) => {
      // Only needed for browsers that might interpret horizontal swipes as navigation
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add the event listeners
    window.addEventListener('scroll', preventDefaultScroll, { passive: false });
    window.addEventListener('wheel', preventNavigation, { capture: true });
    window.addEventListener('touchmove', preventSwipeNavigation, { passive: false });
    window.addEventListener('hashchange', preventHashChange);
    window.addEventListener('popstate', preventPopState);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', preventDefaultScroll);
      window.removeEventListener('wheel', preventNavigation, { capture: true });
      window.removeEventListener('touchmove', preventSwipeNavigation);
      window.removeEventListener('hashchange', preventHashChange);
      window.removeEventListener('popstate', preventPopState);
    };
  }, []);

  // Fix the tooltip content function to handle undefined values
  const safeTooltipContent = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length && payload[0] && payload[1]) {
      return (
        <div className="bg-[#1e222b] p-4 rounded-lg shadow-lg border border-[#1e222b]/30">
          <h4 className="text-white font-medium mb-2">{label || 'N/A'}</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-gray-300">Savings:</span>
              <span className="text-white font-medium">${(payload[0].value || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-gray-300">Baseline:</span>
              <span className="text-white font-medium">${(payload[1].value || 0).toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              ${Math.round(Number(payload[0]?.value || 0) * 0.08).toLocaleString()} operational savings
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-[#020305] flex items-center justify-center relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
        <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8 w-[700px]">
          {/* Financial Calculations Display */}
          <div className="relative group w-full">
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Financial calculations with glass effect */}
            <div className="relative backdrop-blur-md bg-black/40 p-6 rounded-3xl border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Annual Cost (Current)</span>
                      <span className="text-white font-mono">$3,253,750</span>
                    </div>
                    <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-red-400/50 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Projected Cloud Cost</span>
                      <span className="text-white font-mono">$863,244</span>
                    </div>
                    <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full w-[27%] bg-emerald-400/50 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Implementation Cost</span>
                      <span className="text-white font-mono">$875,000</span>
                    </div>
                    <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full w-[26%] bg-blue-400/50 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">ROI (3-Year)</span>
                      <span className="text-white font-mono">327%</span>
                    </div>
                    <div className="h-1 bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-purple-400/50 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1e222b]/70 backdrop-blur-md rounded-xl p-3 mt-4 border border-white/5">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Payback Period</div>
                    <div className="text-2xl font-mono text-white">14.2 <span className="text-sm">months</span></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Animated calculation figures */}
                  <div className="bg-[#1e222b]/60 p-3 rounded-xl border border-white/5">
                    <div className="font-mono text-xs text-gray-400 mb-1">Operational Cost Analysis</div>
                    <div className="font-mono text-sm text-emerald-400">
                      <div className="flex justify-between mb-1">
                        <span>Hardware:</span>
                        <span className="animate-pulse">$1,238,457</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Software:</span>
                        <span>$748,350</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Maintenance:</span>
                        <span className="animate-pulse">$832,915</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Personnel:</span>
                        <span>$434,028</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-white/10 flex justify-between">
                        <span>Total:</span>
                        <span className="animate-pulse">$3,253,750</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1e222b]/60 p-3 rounded-xl border border-white/5">
                    <div className="font-mono text-xs text-gray-400 mb-1">Projected Savings</div>
                    <div className="font-mono text-sm text-emerald-400">
                      <div className="flex justify-between mb-1">
                        <span>Year 1:</span>
                        <span className="animate-pulse">$570,500</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Year 2:</span>
                        <span>$894,250</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Year 3:</span>
                        <span className="animate-pulse">$894,250</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-white/10 flex justify-between">
                        <span>Total:</span>
                        <span className="animate-pulse">$2,359,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex gap-2">
                    <div className="flex-1 bg-[#1e222b]/60 p-3 rounded-xl border border-white/5 font-mono">
                      <div className="text-xs text-gray-400 mb-1">NPV</div>
                      <div className="text-lg text-emerald-400 animate-pulse">$1,978,243</div>
                    </div>
                    <div className="flex-1 bg-[#1e222b]/60 p-3 rounded-xl border border-white/5 font-mono">
                      <div className="text-xs text-gray-400 mb-1">IRR</div>
                      <div className="text-lg text-emerald-400 animate-pulse">73.8%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Calculating MSP Security Optimization Potential</h2>
            <p className="text-white/60">Analyzing your current security infrastructure and optimization opportunities...</p>
            
            {/* Progress bars */}
            <div className="w-full space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Calculating security optimization requirements</span>
                  <span className="text-emerald-500 font-medium">100%</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Evaluating databases</span>
                  <span className="text-emerald-500 font-medium">95%</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Calculating migration requirements</span>
                  <span className="text-emerald-500 font-medium">80%</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Estimating cost savings</span>
                  <span className="text-emerald-500 font-medium">60%</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Define base classes for cards to match the Home page styling
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#1e222b]/80 via-[#1e222b]/50 to-[rgba(30,34,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-emerald-500/15 group relative overflow-hidden";

  return (
    <div className="w-full px-1 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Simple title without a box - left aligned */}
          <div className="flex items-center justify-start py-4">
            <div className="flex items-center gap-3">
              <MdOutlineStorage size={28} className="text-emerald-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Pro Cloud cyberGUARD Migration Potential
              </h1>
            </div>
          </div>
          
          {isCalculating ? (
            <div className={cardBaseClass}>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                    backgroundSize: '30px 30px'
                  }}
                ></div>
              </div>
              
              {/* Gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
              
              <div className="card-body flex flex-col items-center justify-center py-16 relative z-10">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="loading loading-spinner loading-lg text-emerald-500 relative"></div>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent mb-4">
                  Calculating Pro Cloud cyberGUARD Optimization Potential
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
                  Our AI is analyzing your current security infrastructure and CMMC compliance requirements to determine optimal Pro Cloud migration strategy...
                </p>
                <div className="w-full max-w-md space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Calculating cyberGUARD optimization requirements</span>
                      <span className="text-emerald-500 font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Evaluating CMMC compliance gaps</span>
                      <span className="text-emerald-500 font-medium">95%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Calculating cyberGUARD migration requirements</span>
                      <span className="text-emerald-500 font-medium">80%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Estimating cost savings with Pro Cloud</span>
                      <span className="text-green-500 font-medium">60%</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full w-[60%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Statistics Grid with Images */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Implementation Details Card */}
                <div className="relative h-[400px] overflow-hidden rounded-3xl">
                  {/* Full-width image container */}
                  <div className="absolute inset-0">
                    <img 
                      src="/images/SAP/9f8d193c67c44ea39fb7ebbbc251526f.jpg" 
                      alt="cyberGUARD Implementation Details" 
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Stronger vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 h-full w-[45%] p-6 flex flex-col justify-center">
                    {/* Combined icon and heading box */}
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                          <FaServer className="text-lg text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">cyberGUARD Implementation</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-black/30 rounded-2xl p-5 border border-white/10">
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Defense Endpoints</span>
                        <span className="text-sm font-semibold text-white">2,850 endpoints</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">CMMC Compliance</span>
                        <span className="text-sm font-semibold text-white">Level 2 Ready</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Endpoint Cost</span>
                        <span className="text-sm font-semibold text-white">$110/endpoint</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-300">Implementation</span>
                        <span className="text-sm font-semibold text-white">$2,125,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Benefits Card */}
                <div className="relative h-[400px] overflow-hidden rounded-3xl">
                  {/* Full-width image container */}
                  <div className="absolute inset-0">
                    <img 
                      src="/images/SAP/eeec8cab190002a2ebdb955a175312a0.jpg" 
                      alt="Financial Benefits" 
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Stronger vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 h-full w-[45%] p-6 flex flex-col justify-center">
                    {/* Combined icon and heading box */}
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                          <FaMoneyBillWave className="text-lg text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Pro Cloud Savings</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-black/30 rounded-2xl p-5 border border-white/10">
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Annual Savings</span>
                        <span className="text-sm font-semibold text-white">$2,850,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Monthly Savings</span>
                        <span className="text-sm font-semibold text-white">$237,500</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">First Year</span>
                        <span className="text-sm font-semibold text-white">$2,135,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-300">CMMC Incentives</span>
                        <span className="text-sm font-semibold text-white">$185,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Assessment Card */}
                <div className="relative h-[400px] overflow-hidden rounded-3xl">
                  {/* Full-width image container */}
                  <div className="absolute inset-0">
                    <img 
                      src="/images/SAP/d2e31c8edf938cb0e91610502f699f6c.jpg" 
                      alt="Security Assessment" 
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Stronger vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 h-full w-[45%] p-6 flex flex-col justify-center">
                    {/* Combined icon and heading box */}
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                          <MdOutlineBusiness className="text-lg text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Defense Contractor Assessment</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-black/30 rounded-2xl p-5 border border-white/10">
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Current System</span>
                        <span className="text-sm font-semibold text-white">Legacy On-Premises</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Target System</span>
                        <span className="text-sm font-semibold text-white">Pro Cloud cyberGUARD</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">CMMC Readiness</span>
                        <span className="text-sm font-semibold text-white">Level 2 Compliant</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-300">Cost Reduction</span>
                        <span className="text-sm font-semibold text-white">78.5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Physical Security Integration Card */}
                <div className="relative h-[400px] overflow-hidden rounded-3xl">
                  {/* Full-width image container with increased right offset */}
                  <div className="absolute inset-0 translate-x-[20%]">
                    <img 
                      src="/images/SAP/ef752e7a0381c7ef856d5c4b3b627c13.jpg" 
                      alt="Physical Security Integration" 
                      className="w-[115%] h-full object-cover object-left scale-95"
                    />
                    {/* Simple gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 h-full w-[45%] p-6 flex flex-col justify-center">
                    {/* Combined icon and heading box */}
                    <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                          <FaDatabase className="text-lg text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Physical Security Integration</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-black/30 rounded-2xl p-5 border border-white/10">
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Access Control</span>
                        <span className="text-sm font-semibold text-white">SaaS-based</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Integration Points</span>
                        <span className="text-sm font-semibold text-white">24 systems</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20">
                        <span className="text-sm text-gray-300">Compliance</span>
                        <span className="text-sm font-semibold text-white">UL 294, SOC2</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-300">Efficiency Gain</span>
                        <span className="text-sm font-semibold text-white">92% improved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove the Solar Window Integration section and replace with Statistics Visualization */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Pro Cloud cyberGUARD Migration Analytics</h2>
                <div className="bg-white dark:bg-[#1e222b]/50 rounded-xl shadow-lg backdrop-blur-lg border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Left side - Radar chart for security complexity */}
                    <div className="bg-[#1e222b]/70 rounded-xl p-6 h-[500px]">
                      <h3 className="text-lg font-semibold text-white mb-4">Defense Contractor Security Analysis</h3>
                      <ResponsiveContainer width="100%" height="85%">
                        <RadarChart outerRadius={150} data={[
                          { subject: 'Endpoint Scale', A: 120, B: 110, fullMark: 150 },
                          { subject: 'Service Integration', A: 98, B: 130, fullMark: 150 },
                          { subject: 'Network Complexity', A: 86, B: 130, fullMark: 150 },
                          { subject: 'User Management', A: 99, B: 100, fullMark: 150 },
                          { subject: 'Support Volume', A: 85, B: 90, fullMark: 150 },
                          { subject: 'Service Modules', A: 65, B: 85, fullMark: 150 },
                        ]}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#94a3b8' }} />
                          <Radar name="In-House IT" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                          <Radar name="MSP Services" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Right side - Cost comparison area chart */}
                    <div className="bg-[#1e222b]/70 rounded-xl p-6 h-[500px]">
                      <h3 className="text-lg font-semibold text-white mb-4">5-Year TCO Comparison</h3>
                      <ResponsiveContainer width="100%" height="85%">
                        <AreaChart
                          data={[
                            { year: 'Year 1', legacy: 1250000, cloud: 1025000 },
                            { year: 'Year 2', legacy: 1312500, cloud: 875000 },
                            { year: 'Year 3', legacy: 1378125, cloud: 918750 },
                            { year: 'Year 4', legacy: 1447031, cloud: 964688 },
                            { year: 'Year 5', legacy: 1519383, cloud: 1012922 },
                          ]}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="year" tick={{ fill: '#94a3b8' }} />
                          <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => `$${value/1000}k`} />
                          <Tooltip 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                            contentStyle={{ backgroundColor: '#1e222b', borderColor: '#1e222b', color: '#fff' }}
                          />
                          <Legend />
                          <defs>
                            <linearGradient id="legacyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="legacy" name="In-House IT" stroke="#ef4444" fill="url(#legacyGradient)" />
                          <Area type="monotone" dataKey="cloud" name="MSP Services" stroke="#10b981" fill="url(#cloudGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bottom row with statistics */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-[#1e222b]/80 to-[#1e222b]/70 backdrop-blur-md rounded-xl p-5 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Total Cost Reduction</div>
                        <div className="font-semibold text-lg text-emerald-400">73.5%</div>
                        <div className="text-xs text-gray-400 mt-2">vs. Current System</div>
                          </div>
                      <div className="bg-gradient-to-br from-[#1e222b]/80 to-[#1e222b]/70 backdrop-blur-md rounded-xl p-5 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Implementation Time</div>
                        <div className="font-semibold text-lg text-emerald-400">9 months</div>
                        <div className="text-xs text-gray-400 mt-2">Start to Finish</div>
                          </div>
                      <div className="bg-gradient-to-br from-[#1e222b]/80 to-[#1e222b]/70 backdrop-blur-md rounded-xl p-5 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">Maintenance Reduction</div>
                        <div className="font-semibold text-lg text-emerald-400">12,800 hrs/yr</div>
                        <div className="text-xs text-gray-400 mt-2">IT Staff Hours Saved</div>
                        </div>
                      <div className="bg-gradient-to-br from-[#1e222b]/80 to-[#1e222b]/70 backdrop-blur-md rounded-xl p-5 border border-white/5">
                        <div className="text-xs text-gray-400 mb-1">First Year ROI</div>
                        <div className="font-semibold text-lg text-emerald-400">65.2%</div>
                        <div className="text-xs text-gray-400 mt-2">After Migration</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Monthly Savings Chart - Update to be SAP-specific with green colors */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Monthly Cost Savings</h2>
                <div className="bg-white dark:bg-[#1e222b]/50 rounded-xl shadow-lg p-6 backdrop-blur-lg border border-white/10">
                  <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">MSP Service Cost Savings ($)</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Based on implementation timeline, service consolidation, and support reductions
                        </p>
                      </div>
                      
                      {/* Phase indicators */}
                      <div className="flex justify-between mb-2 text-xs font-medium">
                        <div className="text-blue-400">Planning</div>
                        <div className="text-emerald-400">Implementation</div>
                        <div className="text-green-400">Optimization</div>
                        <div className="text-teal-400">Full Operation</div>
                      </div>
                      
                      {/* Chart area */}
                      <div className="h-80 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { month: 'Jan', kwh: 458, baseline: 500 },
                              { month: 'Feb', kwh: 532, baseline: 550 },
                              { month: 'Mar', kwh: 672, baseline: 650 },
                              { month: 'Apr', kwh: 798, baseline: 775 },
                              { month: 'May', kwh: 845, baseline: 825 },
                              { month: 'Jun', kwh: 915, baseline: 900 },
                              { month: 'Jul', kwh: 932, baseline: 925 },
                              { month: 'Aug', kwh: 921, baseline: 910 },
                              { month: 'Sep', kwh: 854, baseline: 840 },
                              { month: 'Oct', kwh: 756, baseline: 735 },
                              { month: 'Nov', kwh: 605, baseline: 585 },
                              { month: 'Dec', kwh: 438, baseline: 470 }
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                            <XAxis 
                              dataKey="month" 
                              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                              tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <YAxis 
                              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                              tick={{ fill: '#94a3b8', fontSize: 12 }}
                              tickFormatter={(value) => `$${value}k`}
                            />
                            <Tooltip 
                              formatter={(value: number, name: string) => {
                                return [
                                  `$${value}k`, 
                                  name === "kwh" ? "Savings" : "Baseline"
                                ];
                              }}
                              content={safeTooltipContent}
                            />
                            <Legend
                              align="right"
                              verticalAlign="top"
                              wrapperStyle={{ paddingBottom: '20px' }}
                            />
                            <defs>
                              <linearGradient id="planningGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                              </linearGradient>
                              <linearGradient id="implementationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                              </linearGradient>
                              <linearGradient id="optimizationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.2}/>
                              </linearGradient>
                              <linearGradient id="operationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.2}/>
                              </linearGradient>
                            </defs>
                            <Bar 
                              dataKey="kwh" 
                              name="Savings" 
                              radius={[4, 4, 0, 0]}
                              barSize={36}
                            >
                              {/* Planning months */}
                              <Cell fill="url(#planningGradient)" stroke="#3B82F6" strokeWidth={1} />
                              <Cell fill="url(#planningGradient)" stroke="#3B82F6" strokeWidth={1} />
                              <Cell fill="url(#planningGradient)" stroke="#3B82F6" strokeWidth={1} />
                              {/* Implementation months */}
                              <Cell fill="url(#implementationGradient)" stroke="#10B981" strokeWidth={1} />
                              <Cell fill="url(#implementationGradient)" stroke="#10B981" strokeWidth={1} />
                              <Cell fill="url(#implementationGradient)" stroke="#10B981" strokeWidth={1} />
                              {/* Optimization months */}
                              <Cell fill="url(#optimizationGradient)" stroke="#22C55E" strokeWidth={1} />
                              <Cell fill="url(#optimizationGradient)" stroke="#22C55E" strokeWidth={1} />
                              <Cell fill="url(#optimizationGradient)" stroke="#22C55E" strokeWidth={1} />
                              {/* Operation months */}
                              <Cell fill="url(#operationGradient)" stroke="#14B8A6" strokeWidth={1} />
                              <Cell fill="url(#operationGradient)" stroke="#14B8A6" strokeWidth={1} />
                              <Cell fill="url(#operationGradient)" stroke="#14B8A6" strokeWidth={1} />
                            </Bar>
                            <Line 
                              type="monotone" 
                              dataKey="baseline" 
                              name="Baseline"
                              stroke="#94a3b8" 
                              strokeWidth={2}
                              dot={{ r: 4, strokeWidth: 2, fill: "#1e293b" }}
                              activeDot={{ r: 6, strokeWidth: 2, fill: "#1e293b" }}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {/* Annual totals */}
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-gray-50 dark:bg-gray-800/70 rounded-lg p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Annual Savings</div>
                          <div className="text-2xl font-bold mt-1">$894,250</div>
                          <div className="text-sm text-green-500 mt-1">+3% from estimate</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/70 rounded-lg p-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Average</div>
                          <div className="text-2xl font-bold mt-1">$74,520</div>
                          <div className="text-sm text-green-500 mt-1">After full migration</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-72 mt-6 md:mt-0">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Savings vs. Costs</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Your MSP migration will save 73.5% of your operational costs
                        </p>
                        
                        {/* MSP Savings visualization - Update to green */}
                        <div className="relative h-36 bg-gray-100 dark:bg-[#1e222b] rounded-lg overflow-hidden mt-4">
                          <div className="absolute inset-0 flex items-end">
                            <div 
                              className="h-[73.5%] w-full bg-gradient-to-t from-emerald-500 to-green-400 opacity-80"
                              style={{ borderTopRightRadius: '100px' }}
                            >
                              <div className="absolute top-2 left-4 text-white text-sm font-medium drop-shadow-md">
                                MSP Savings
                              </div>
                              <div className="absolute bottom-2 left-4 text-white text-sm font-medium drop-shadow-md">
                                73.5%
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 right-4 text-gray-600 dark:text-gray-300 text-sm font-medium">
                            In-House Costs
                          </div>
                          <div className="absolute bottom-2 right-4 text-gray-600 dark:text-gray-300 text-sm font-medium">
                            26.5%
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-[#1e222b]/70 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Performance Factors</h3>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                            <span>Service efficiency: 75%</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                            <span>Endpoint count: 1,250</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                            <span>Support reduction: 84%</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                            <span>Management cost: -65%/yr</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-100 dark:bg-[#1e222b]/40 rounded-lg border-l-4 border-emerald-500">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Note:</span> Savings estimates reflect typical 
                          operational year data. Actual results may vary based on service performance,
                          endpoint count, and other factors.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Migration Timeline - Update colors to green */}
              <div className={cardBaseClass}>
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>
                
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full"></div>
                
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-xl text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                      <FaRegCalendarAlt size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                        MSP Migration Timeline
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Comprehensive timeline for the MSP service migration process (6 months)
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-[#1e222b]/50 rounded-xl p-6 backdrop-blur-sm">
                      {/* Gantt Chart Header */}
                      <div className="flex border-b border-gray-200 dark:border-[#1e222b] pb-2 mb-4">
                        <div className="w-56 flex-shrink-0 font-semibold">Project Phase</div>
                        <div className="flex-1 flex">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex-1 text-center text-sm font-medium">
                              Month {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Gantt Chart Rows */}
                      <div className="space-y-8">
                        {/* Initial Assessment */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Initial Assessment</div>
                            <div className="text-xs text-gray-500">3-4 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md"
                              style={{ width: '20%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                Service Requirements & Analysis
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Strategy & Planning */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Service Planning</div>
                            <div className="text-xs text-gray-500">3-4 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[15%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-90"
                              style={{ width: '25%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                Service Design & Implementation Plan
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Development Environment */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Infrastructure Setup</div>
                            <div className="text-xs text-gray-500">2-3 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[35%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-80"
                              style={{ width: '20%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                MSP Infrastructure & Configuration
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Data Migration */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Data Migration</div>
                            <div className="text-xs text-gray-500">8-12 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[40%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-70"
                              style={{ width: '33%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                Data Extraction, Transformation & Loading
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Integration & Testing */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Integration & Testing</div>
                            <div className="text-xs text-gray-500">6-8 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[55%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-85"
                              style={{ width: '26%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                System Integration & User Acceptance Testing
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Training */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">User Training</div>
                            <div className="text-xs text-gray-500">3-4 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[75%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-95"
                              style={{ width: '15%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                User Training & Knowledge Transfer
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Go-Live & Support */}
                        <div className="flex items-center">
                          <div className="w-56 flex-shrink-0 pr-4">
                            <div className="font-semibold mb-1">Go-Live & Support</div>
                            <div className="text-xs text-gray-500">2-4 weeks</div>
                          </div>
                          <div className="flex-1 relative h-12">
                            <div 
                              className="absolute top-0 left-[88%] h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-md opacity-90"
                              style={{ width: '12%' }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white px-2">
                                Final Deployment & Support
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Milestones */}
                      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-[#1e222b]/60 rounded-lg p-4">
                          <div className="text-emerald-500 font-semibold mb-2">Key Milestones</div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                              <span>Assessment Completion</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500 opacity-80"></div>
                              <span>Service Plan Approval</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500 opacity-90"></div>
                              <span>Migration Complete</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                              <span>Services Operational</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-[#1e222b]/60 rounded-lg p-4">
                          <div className="text-emerald-500 font-semibold mb-2">Critical Dependencies</div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>System Design Approval</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Data Migration Quality</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Interface Testing</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>User Acceptance</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-[#1e222b]/60 rounded-lg p-4">
                          <div className="text-emerald-500 font-semibold mb-2">Potential Delays</div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <span>Data Quality Issues</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <span>Custom Code Migration</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <span>Interface Complexity</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                              <span>User Training Delays</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Continue button to green */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleContinue}
                  className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3 group relative overflow-hidden"
                >
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  
                  {/* Gradient orbs */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
                  
                  <span className="relative z-10 text-lg">Continue to MSP Outreach</span>
                  <MdArrowForward className="relative z-10 text-2xl group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Next Steps */}
              <div className={cardBaseClass}>
                <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/30 via-green-500/20 to-emerald-500/25 opacity-25"></div>
                <div className="card-body relative z-10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="bg-white/10 p-6 rounded-xl text-white shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
                      <FaServer size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Next Steps</h3>
                      <p className="text-white/90 text-lg leading-relaxed">
                        Based on our comprehensive analysis, this enterprise is an excellent candidate for MSP migration. 
                        The next step is to reach out to the enterprise manager to discuss this opportunity and schedule a consultation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all backdrop-blur-sm transform hover:scale-105">
                      Contact Enterprise Manager
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-white hover:bg-[#1e222b]/10 text-orange-600 font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                      Generate Proposal
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityInsights; 