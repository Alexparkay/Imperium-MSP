import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCalculate, MdOutlineAnalytics, MdOutlineShowChart, MdArrowForward, MdInfoOutline, MdClose, MdZoomOutMap, MdCompare, MdOutlineSpeed, MdOutlineTimeline, MdOutlineSavings, MdSecurity, MdTrendingUp, MdTrendingDown, MdAssessment, MdPieChart } from 'react-icons/md';
import { FaBuilding, FaChartLine, FaCalculator, FaChartBar, FaClock, FaMoneyBill, FaServer, FaPercentage, FaDatabase, FaUsers, FaExchangeAlt, FaInfoCircle, FaUserTie, FaMapMarkerAlt, FaMoneyBillWave, FaShieldAlt, FaRocket, FaFlag, FaEye, FaLightbulb } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis, CartesianGrid, BarChart, Bar, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ContactInfo {
  name: string;
  title: string;
  company: string;
  location: string;
  securitySystem: string;
}

interface MSPMetrics {
  endpoints: number;
  securityEvents: number;
  currentCost: number;
  optimizedCost: number;
  savingsPerYear: number;
  roi: number;
  paybackMonths: number;
}

const DataEnrichment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  
  // Pro Cloud SaaS target prospect - Healthcare organization showing key signals
  const contactInfo: ContactInfo = {
    name: "Dr. Jennifer Rodriguez",
    title: "Chief Information Security Officer (CISO)",
    company: "Mercy Regional Medical Center",
    location: "Nashville, Tennessee",
    securitySystem: "Legacy Healthcare IT"
  };
  
  const mspMetrics: MSPMetrics = {
    endpoints: 4250,
    securityEvents: 12800000,
    currentCost: 3850000,
    optimizedCost: 1420000,
    savingsPerYear: 2430000,
    roi: 385,
    paybackMonths: 7.2
  };

  // Enhanced data for comprehensive healthcare cybersecurity visualizations
  const complianceData = [
    { name: 'HIPAA Security', current: 78, target: 100, color: '#10B981' },
    { name: 'HIPAA Privacy', current: 85, target: 100, color: '#059669' },
    { name: 'HITECH Act', current: 62, target: 95, color: '#047857' },
    { name: 'SOC 2 Type II', current: 55, target: 90, color: '#34D399' }
  ];

  const threatLandscapeData = [
    { month: 'Jan', threats: 1250, blocked: 1180, advanced: 85, critical: 15, explanation: 'Post-holiday security gaps' },
    { month: 'Feb', threats: 890, blocked: 875, severity: 'Medium', category: 'Ransomware', advanced: 45, critical: 8, explanation: 'Normal threat levels' },
    { month: 'Mar', threats: 1580, blocked: 1520, severity: 'High', category: 'Phishing', advanced: 125, critical: 35, explanation: 'Tax season phishing spike' },
    { month: 'Apr', threats: 750, blocked: 740, severity: 'Low', category: 'Malware', advanced: 28, critical: 5, explanation: 'Security awareness training effect' },
    { month: 'May', threats: 2100, blocked: 1950, severity: 'Critical', category: 'Data Breach', advanced: 180, critical: 55, explanation: 'Coordinated attack campaign' },
    { month: 'Jun', threats: 980, blocked: 965, severity: 'Medium', category: 'Insider Threat', advanced: 52, critical: 12, explanation: 'Enhanced monitoring deployed' }
  ];

  const costBreakdownData = [
    { name: 'IT Personnel', current: 1650000, optimized: 420000, category: 'Staff', color: '#10B981' },
    { name: 'Security Tools', current: 1125000, optimized: 580000, category: 'Technology', color: '#059669' },
    { name: 'Compliance & Audit', current: 1075000, optimized: 420000, category: 'Regulatory', color: '#047857' }
  ];

  const medicalSecurityData = [
    { domain: 'Patient Data Protection', current: 68, target: 95, priority: 'Critical' },
    { domain: 'Medical Device Security', current: 45, target: 85, priority: 'High' },
    { domain: 'Network Segmentation', current: 72, target: 90, priority: 'High' },
    { domain: 'Access Control', current: 58, target: 92, priority: 'Critical' },
    { domain: 'Incident Response', current: 52, target: 88, priority: 'Medium' },
    { domain: 'Backup & Recovery', current: 75, target: 95, priority: 'High' }
  ];

  const healthcareRiskData = [
    { risk: 'Ransomware Attack', probability: 82, impact: 95, mitigation: 75, cost: '$8.2M', trend: 'increasing' },
    { risk: 'Patient Data Breach', probability: 68, impact: 90, mitigation: 80, cost: '$5.8M', trend: 'stable' },
    { risk: 'Medical Device Compromise', probability: 55, impact: 85, mitigation: 65, cost: '$3.2M', trend: 'increasing' },
    { risk: 'Insider Data Theft', probability: 42, impact: 78, mitigation: 88, cost: '$2.1M', trend: 'decreasing' },
    { risk: 'HIPAA Violation', probability: 38, impact: 82, mitigation: 92, cost: '$4.5M', trend: 'stable' }
  ];

  // More dynamic ROI data with realistic business curves and explanations
  const roiProjectionData = [
    { 
      year: 'Year 1', 
      savings: 1625000, 
      cumulative: 1625000, 
      investment: 630000, 
      netSavings: 995000, 
      efficiency: 65,
      month: 1,
      explanation: 'Initial implementation costs high, but immediate savings from automated processes begin',
      phase: 'Implementation'
    },
    { 
      year: 'Q2 Y1', 
      savings: 1850000, 
      cumulative: 1850000, 
      investment: 420000, 
      netSavings: 1430000, 
      efficiency: 72,
      month: 6,
      explanation: 'Staff training complete, manual processes eliminated, efficiency gains accelerating',
      phase: 'Optimization'
    },
    { 
      year: 'Year 2', 
      savings: 2650000, 
      cumulative: 4475000, 
      investment: 180000, 
      netSavings: 2470000, 
      efficiency: 85,
      month: 12,
      explanation: 'Full system integration achieved, predictive analytics reducing incident costs',
      phase: 'Maturity'
    },
    { 
      year: 'Q2 Y2', 
      savings: 2950000, 
      cumulative: 7425000, 
      investment: 120000, 
      netSavings: 2830000, 
      efficiency: 91,
      month: 18,
      explanation: 'AI-driven threat detection preventing major breaches, compliance costs minimized',
      phase: 'Advanced Analytics'
    },
    { 
      year: 'Year 3', 
      savings: 3240000, 
      cumulative: 10665000, 
      investment: 95000, 
      netSavings: 3145000, 
      efficiency: 95,
      month: 24,
      explanation: 'Peak efficiency reached, proactive security preventing 99.2% of potential incidents',
      phase: 'Full Optimization'
    },
    { 
      year: 'Q4 Y3', 
      savings: 3420000, 
      cumulative: 14085000, 
      investment: 75000, 
      netSavings: 3345000, 
      efficiency: 98,
      month: 36,
      explanation: 'Complete transformation, serving as model for industry best practices',
      phase: 'Industry Leadership'
    }
  ];

  // Metric tooltips focused on Pro Cloud's healthcare cybersecurity signals
  const metricTooltips: Record<string, { name: string, description: string, calculation: string }> = {
    endpoints: {
      name: "Medical Endpoints",
      description: "Total healthcare IT endpoints requiring HIPAA compliance and medical device security",
      calculation: "4,250 devices including medical equipment, workstations, servers, and IoT devices requiring healthcare-grade protection"
    },
    securityEvents: {
      name: "Healthcare Security Events",
      description: "Annual security events processed across healthcare infrastructure",
      calculation: "Threat detections (9.8M) + HIPAA compliance scans (3.0M) = 12.8M security events requiring healthcare-level protection"
    },
    currentCost: {
      name: "Current Healthcare IT Cost",
      description: "Total annual cost of maintaining legacy healthcare cybersecurity infrastructure",
      calculation: "Legacy security systems ($1,650,000) + Compliance management ($1,075,000) + IT personnel ($1,125,000) = $3,850,000"
    },
    optimizedCost: {
      name: "Pro Cloud Healthcare Cost",
      description: "Projected annual cost with Pro Cloud's cyberGUARD healthcare security services",
      calculation: "cyberGUARD healthcare services ($785,000) + HIPAA compliance automation ($425,000) + Medical device security ($210,000) = $1,420,000"
    },
    savingsPerYear: {
      name: "Annual Healthcare Savings",
      description: "Cost savings from outsourcing healthcare security operations to Pro Cloud SaaS",
      calculation: "$3,850,000 - $1,420,000 = $2,430,000 annual savings while improving HIPAA compliance and patient data protection"
    },
    roi: {
      name: "Healthcare ROI",
      description: "Return on investment from Pro Cloud's integrated healthcare cybersecurity services",
      calculation: "($2,430,000 ÷ $630,000) × 100 = 385% ROI including improved HIPAA compliance and reduced breach risk"
    },
    paybackMonths: {
      name: "Healthcare Payback Period",
      description: "Time to recover investment in Pro Cloud's healthcare cybersecurity migration",
      calculation: "($630,000 ÷ $2,430,000) × 12 = 3.1 months × 2.3 implementation factor = 7.2 months"
    }
  };

  // Effect to simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Card base class for glassmorphic effect
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-green-500/15 group relative overflow-hidden bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-[rgba(16,185,129,0.01)]";
  
  // Card hover effect
  const cardHoverClass = "hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:border-green-500/30 hover:scale-[1.01]";
  
  // Colors for charts - only green palette
  const COLORS = ['#10B981', '#047857', '#34D399', '#065F46', '#059669', '#6EE7B7', '#064E3B'];

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Reduced green background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-green-500/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-500/2 to-teal-500/2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="space-y-6 relative z-10">
        {isLoading ? (
          <div className={`${cardBaseClass} bg-gradient-to-br from-[rgba(16,185,129,0.15)] to-[rgba(16,185,129,0.05)] border border-green-500/30`}>
            <div className="card-body flex flex-col items-center justify-center py-16 relative z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Loading Healthcare Security Analysis Data...
              </h3>
              <p className="text-gray-400 text-center max-w-md mb-8">
                Analyzing HIPAA compliance requirements and healthcare cybersecurity optimization opportunities...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Pro Cloud Target Prospect Data Section */}
            <div className={`${cardBaseClass} p-6 mb-8 overflow-hidden relative bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-[rgba(16,185,129,0.01)] border border-green-500/20 hover:border-green-400/30 transition-all duration-500 shadow-[0_10px_50px_rgba(16,185,129,0.2)]`}>
              {/* Decorative elements */}
              <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-green-500/5 blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-green-400/5 blur-[80px] pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-green-300/20 flex items-center justify-center border border-green-400/20 shadow-lg shadow-green-900/10">
                    <FaUserTie className="text-green-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{contactInfo.name}</h2>
                    <p className="text-green-300/80 flex items-center text-lg">
                      <span className="text-gray-400 font-light">{contactInfo.title}</span>
                      <span className="mx-2 text-green-500/40">•</span>
                      <span className="text-green-300/70 font-medium">{contactInfo.company}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0 text-gray-300 bg-white/5 rounded-full py-2 px-4 border border-green-500/10">
                  <FaMapMarkerAlt className="text-green-400" />
                  <span>{contactInfo.location}</span>
                  <span className="mx-1 text-green-500/40">|</span>
                  <FaShieldAlt className="text-green-400" />
                  <span>{contactInfo.securitySystem}</span>
                </div>
              </div>

              {/* Pro Cloud Healthcare Signals Display */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Healthcare Endpoints Signal */}
                <div className="rounded-2xl p-4 backdrop-blur-md bg-gradient-to-br from-[rgba(59,130,246,0.08)] to-[rgba(59,130,246,0.03)] border border-blue-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-blue-900/20 hover:border-blue-400/30 hover:scale-[1.02] relative group">
                  <button 
                    onClick={() => {
                      setActiveMetric('endpoints');
                      setShowInfoModal(true);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors z-10"
                  >
                    <FaInfoCircle className="text-blue-400 text-sm" />
                  </button>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FaServer className="text-blue-400 mr-2" />
                    Medical Endpoints
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">{mspMetrics.endpoints.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Healthcare IT Assets</p>
                  </div>
                </div>
                
                {/* HIPAA Compliance Signal */}
                <div className="rounded-2xl p-4 backdrop-blur-md bg-gradient-to-br from-[rgba(139,92,246,0.08)] to-[rgba(139,92,246,0.02)] border border-purple-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-purple-900/20 hover:border-purple-400/30 hover:scale-[1.02] relative group">
                  <button 
                    onClick={() => {
                      setActiveMetric('securityEvents');
                      setShowInfoModal(true);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center hover:bg-purple-500/20 transition-colors z-10"
                  >
                    <FaInfoCircle className="text-purple-400 text-sm" />
                  </button>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FaShieldAlt className="text-purple-400 mr-2" />
                    HIPAA Events
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-2">{(mspMetrics.securityEvents / 1000000).toFixed(1)}M</p>
                    <p className="text-gray-400 text-sm">Annual Compliance Events</p>
                  </div>
                </div>
                
                {/* New CISO Hiring Signal */}
                <div className="rounded-2xl p-4 backdrop-blur-md bg-gradient-to-br from-[rgba(6,182,212,0.08)] to-[rgba(6,182,212,0.02)] border border-cyan-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-cyan-900/20 hover:border-cyan-400/30 hover:scale-[1.02] relative group">
                  <button 
                    onClick={() => {
                      setActiveMetric('roi');
                      setShowInfoModal(true);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center hover:bg-cyan-500/20 transition-colors z-10"
                  >
                    <FaInfoCircle className="text-cyan-400 text-sm" />
                  </button>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FaUserTie className="text-cyan-400 mr-2" />
                    New Healthcare CISO
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600 mb-2">8 mo</p>
                    <p className="text-gray-400 text-sm">Ago - Security Overhaul</p>
                  </div>
                </div>
                
                {/* Healthcare Cost Optimization Signal */}
                <div className="rounded-2xl p-4 backdrop-blur-md bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-green-900/20 hover:border-green-400/30 hover:scale-[1.02] flex flex-col relative group">
                  <button 
                    onClick={() => {
                      setActiveMetric('savingsPerYear');
                      setShowInfoModal(true);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors z-10"
                  >
                    <FaInfoCircle className="text-green-400 text-sm" />
                  </button>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FaMoneyBillWave className="text-green-400 mr-2" />
                    Cost Savings Potential
                  </h3>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-green-500/5 blur-[30px]"></div>
                      </div>
                      <div className="relative w-24 h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Savings', value: Math.min(385, 400) },
                                { name: 'Base', value: 100 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={20}
                              outerRadius={40}
                              startAngle={90}
                              endAngle={-270}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell key="cell-0" fill="#10B981" />
                              <Cell key="cell-1" fill="#1F2937" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">{mspMetrics.roi}%</p>
                          <p className="text-xs text-gray-400">ROI</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                          <FaClock className="text-green-400 text-xs" />
                        </div>
                        <span className="text-gray-300 text-xs">Payback</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium text-sm">{mspMetrics.paybackMonths} mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pro Cloud Healthcare Opportunity Analysis Chart */}
              <div className="h-72 rounded-2xl p-6 backdrop-blur-md bg-gradient-to-br from-[rgba(16,185,129,0.03)] to-[rgba(16,185,129,0.08)] border border-green-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-green-900/20 hover:border-green-400/30 relative group">
                <button 
                  onClick={() => {
                    setActiveMetric('currentCost');
                    setShowInfoModal(true);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors z-10"
                >
                  <FaInfoCircle className="text-green-400 text-sm" />
                </button>
                
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaChartBar className="text-green-400 mr-2" />
                  Pro Cloud Healthcare Cybersecurity Opportunity Analysis
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    data={[
                      { name: 'Current Healthcare IT', value: mspMetrics.currentCost },
                      { name: 'Pro Cloud cyberGUARD', value: mspMetrics.optimizedCost },
                      { name: 'Annual Savings', value: mspMetrics.savingsPerYear }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.4} />
                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                    <YAxis tick={{ fill: '#9CA3AF' }} />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(10px)' }}
                    />
                    <Bar dataKey="value" name="Amount">
                      {[
                        <Cell key="cell-0" fill="#EF4444" />,
                        <Cell key="cell-1" fill="#10B981" />,
                        <Cell key="cell-2" fill="#3B82F6" />
                      ] as React.ReactNode[]}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Comprehensive Analysis Sections */}
            <div className="space-y-8">
              
              {/* HIPAA Compliance Analysis Section */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaShieldAlt className="text-green-500 mr-3" />
                    HIPAA Compliance Assessment
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Healthcare Ready</span>
                    <FaFlag className="text-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Compliance Progress Chart */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Healthcare Compliance Framework Progress</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={complianceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.2)" />
                        <XAxis dataKey="name" tick={{ fill: '#10B981', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#10B981' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(5, 46, 22, 0.95)', 
                            borderRadius: '0.75rem', 
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
                          }}
                        />
                        <defs>
                          <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#047857" stopOpacity={0.4}/>
                          </linearGradient>
                          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <Bar dataKey="current" name="Current" fill="url(#currentGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" name="Pro Cloud Target" fill="url(#targetGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Medical Security Maturity Radar */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Medical Security Domain Maturity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={medicalSecurityData}>
                        <PolarGrid stroke="rgba(16,185,129,0.3)" />
                        <PolarAngleAxis dataKey="domain" tick={{ fill: '#10B981', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#10B981' }} />
                        <defs>
                          <linearGradient id="currentRadarGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="targetRadarGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#059669" stopOpacity={0.4}/>
                          </linearGradient>
                        </defs>
                        <Radar name="Current" dataKey="current" stroke="#ef4444" fill="url(#currentRadarGradient)" strokeWidth={2} />
                        <Radar name="Pro Cloud Target" dataKey="target" stroke="#10B981" fill="url(#targetRadarGradient)" strokeWidth={3} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Healthcare Compliance Level Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm font-medium">HIPAA Security</div>
                    <div className="text-2xl font-bold text-white mt-1">78%</div>
                    <div className="text-xs text-gray-400 mt-1">Security Rule Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm font-medium">HIPAA Privacy</div>
                    <div className="text-2xl font-bold text-white mt-1">85%</div>
                    <div className="text-xs text-gray-400 mt-1">Privacy Rule Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm font-medium">Implementation</div>
                    <div className="text-2xl font-bold text-white mt-1">6 mo</div>
                    <div className="text-xs text-gray-400 mt-1">to Full Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm font-medium">Cost Savings</div>
                    <div className="text-2xl font-bold text-white mt-1">$285K</div>
                    <div className="text-xs text-gray-400 mt-1">Healthcare Incentives</div>
                  </div>
                </div>
              </div>

              {/* Cost Analysis Section */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaMoneyBillWave className="text-green-500 mr-3" />
                    Healthcare Cost Optimization Analysis
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">63.1% Cost Reduction</span>
                    <MdTrendingDown className="text-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cost Breakdown Comparison */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Healthcare IT Cost Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.2)" />
                        <XAxis dataKey="name" tick={{ fill: '#10B981' }} />
                        <YAxis tick={{ fill: '#10B981' }} tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(5, 46, 22, 0.95)', 
                            borderRadius: '0.75rem', 
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
                          }}
                        />
                        <defs>
                          <linearGradient id="currentCostGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.4}/>
                          </linearGradient>
                          <linearGradient id="optimizedCostGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#047857" stopOpacity={0.5}/>
                          </linearGradient>
                        </defs>
                        <Bar dataKey="current" name="Current Cost" fill="url(#currentCostGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="optimized" name="Pro Cloud Cost" fill="url(#optimizedCostGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Healthcare ROI Projection */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">3-Year Healthcare ROI Projection with Business Milestones</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={roiProjectionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.2)" />
                        <XAxis dataKey="year" tick={{ fill: '#10B981' }} />
                        <YAxis tick={{ fill: '#10B981' }} tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                        <YAxis yAxisId="efficiency" orientation="right" tick={{ fill: '#059669' }} tickFormatter={(value) => `${value}%`} />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-gradient-to-br from-[rgba(5,46,22,0.98)] to-[rgba(5,46,22,0.92)] backdrop-blur-md rounded-xl p-5 border border-green-500/40 shadow-xl shadow-green-500/30 max-w-sm">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      data.phase === 'Implementation' ? 'bg-blue-500/20 text-blue-300' :
                                      data.phase === 'Optimization' ? 'bg-yellow-500/20 text-yellow-300' :
                                      data.phase === 'Maturity' ? 'bg-green-500/20 text-green-300' :
                                      data.phase === 'Advanced Analytics' ? 'bg-purple-500/20 text-purple-300' :
                                      data.phase === 'Full Optimization' ? 'bg-emerald-500/20 text-emerald-300' :
                                      'bg-cyan-500/20 text-cyan-300'
                                    }`}>
                                      {data.phase}
                                    </div>
                                    <span className="text-green-300 font-semibold">{label}</span>
                                  </div>
                                  
                                  <div className="space-y-3 text-sm">
                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <span className="text-gray-400">Annual Savings:</span>
                                        <div className="text-green-300 font-semibold">${data.savings.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <span className="text-gray-400">Efficiency:</span>
                                        <div className="text-green-300 font-semibold">{data.efficiency}%</div>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <span className="text-gray-400">Net Savings:</span>
                                        <div className="text-white font-semibold">${data.netSavings.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <span className="text-gray-400">Investment:</span>
                                        <div className="text-orange-300 font-semibold">${data.investment.toLocaleString()}</div>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t border-green-500/30">
                                      <div className="text-green-200 text-xs leading-relaxed">
                                        <strong className="text-green-300">Business Impact:</strong> {data.explanation}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <defs>
                          <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="50%" stopColor="#059669" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#047857" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="netSavingsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D399" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <Line 
                          type="monotone" 
                          dataKey="cumulative" 
                          stroke="#10B981" 
                          strokeWidth={4} 
                          dot={{ r: 6, strokeWidth: 2, fill: "#10B981" }}
                          activeDot={{ r: 8, strokeWidth: 3, fill: "#34D399", stroke: "#10B981" }}
                          name="Cumulative Savings"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="netSavings" 
                          stroke="#34D399" 
                          strokeWidth={3} 
                          dot={{ r: 5, strokeWidth: 2, fill: "#34D399" }}
                          activeDot={{ r: 7, strokeWidth: 2, fill: "#34D399", stroke: "#10B981" }}
                          name="Annual Net Savings"
                          strokeDasharray="8 6"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="efficiency" 
                          stroke="#059669" 
                          strokeWidth={2} 
                          dot={{ r: 4, strokeWidth: 2, fill: "#059669" }}
                          activeDot={{ r: 6, strokeWidth: 2, fill: "#059669", stroke: "#34D399" }}
                          name="Efficiency %"
                          yAxisId="efficiency"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                    
                    {/* ROI Milestone Indicators */}
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-lg p-2 border border-blue-500/20">
                        <div className="text-blue-400 font-medium">Implementation</div>
                        <div className="text-white">High investment, immediate automation gains</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/5 rounded-lg p-2 border border-green-500/20">
                        <div className="text-green-400 font-medium">Optimization</div>
                        <div className="text-white">Efficiency acceleration, predictive analytics</div>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 rounded-lg p-2 border border-emerald-500/20">
                        <div className="text-emerald-400 font-medium">Maturity</div>
                        <div className="text-white">Peak performance, industry leadership</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Healthcare Threat Landscape & Performance Section */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaEye className="text-green-500 mr-3" />
                    Healthcare Threat Landscape & Security Performance
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Real-time Medical Security</span>
                    <FaRocket className="text-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Healthcare Threat Detection Timeline */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">6-Month Healthcare Threat Detection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={threatLandscapeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.2)" />
                        <XAxis dataKey="month" tick={{ fill: '#10B981' }} />
                        <YAxis tick={{ fill: '#10B981' }} />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-gradient-to-br from-[rgba(5,46,22,0.95)] to-[rgba(5,46,22,0.85)] backdrop-blur-md rounded-xl p-4 border border-green-500/30 shadow-lg shadow-green-500/20">
                                  <h4 className="text-green-300 font-semibold mb-2">{label}</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                      <span className="text-white">Total Threats: {data.threats}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      <span className="text-white">Blocked: {data.blocked}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                      <span className="text-white">Advanced: {data.advanced}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                      <span className="text-white">Critical: {data.critical}</span>
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-green-500/30">
                                      <span className="text-green-200 text-xs italic">{data.explanation}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="threats" 
                          stroke="#ef4444" 
                          strokeWidth={3} 
                          dot={{ r: 5, strokeWidth: 2, fill: "#ef4444" }}
                          activeDot={{ r: 7, strokeWidth: 2, fill: "#ef4444" }}
                          name="Total Threats"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="blocked" 
                          stroke="#10B981" 
                          strokeWidth={3} 
                          dot={{ r: 5, strokeWidth: 2, fill: "#10B981" }}
                          activeDot={{ r: 7, strokeWidth: 2, fill: "#10B981" }}
                          name="Threats Blocked"
                          strokeDasharray="8 4"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="advanced" 
                          stroke="#f59e0b" 
                          strokeWidth={2} 
                          dot={{ r: 4, strokeWidth: 2, fill: "#f59e0b" }}
                          activeDot={{ r: 6, strokeWidth: 2, fill: "#f59e0b" }}
                          name="Advanced Threats"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="critical" 
                          stroke="#f97316" 
                          strokeWidth={2} 
                          dot={{ r: 4, strokeWidth: 2, fill: "#f97316" }}
                          activeDot={{ r: 6, strokeWidth: 2, fill: "#f97316" }}
                          name="Critical Threats"
                          strokeDasharray="4 2"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Healthcare Risk Assessment Matrix */}
                  <div className="bg-gradient-to-br from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.05)] backdrop-blur-md rounded-xl p-6 border border-green-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Healthcare Risk Assessment Matrix</h3>
                    <div className="space-y-4">
                      {healthcareRiskData.map((risk, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-800/60 to-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-white font-medium text-sm">{risk.risk}</span>
                            <div className="flex items-center space-x-3">
                              <div className={`flex items-center space-x-1 ${
                                risk.trend === 'increasing' ? 'text-red-400' : 
                                risk.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'
                              }`}>
                                {risk.trend === 'increasing' ? '↗' : risk.trend === 'decreasing' ? '↘' : '→'}
                                <span className="text-xs capitalize">{risk.trend}</span>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                risk.probability > 70 ? 'bg-red-500/20 text-red-300' :
                                risk.probability > 50 ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-green-500/20 text-green-300'
                              }`}>
                                {risk.probability > 70 ? 'High Risk' : risk.probability > 50 ? 'Medium Risk' : 'Low Risk'}
                              </span>
                              <span className="text-xs text-green-400 font-medium">{risk.cost}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <div className="text-gray-400 mb-1">Probability: {risk.probability}%</div>
                              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                                <div 
                                  className={`h-3 rounded-full transition-all duration-1000 ${
                                    risk.probability > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                    risk.probability > 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                    'bg-gradient-to-r from-green-500 to-green-600'
                                  }`}
                                  style={{ width: `${risk.probability}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-1">Impact: {risk.impact}%</div>
                              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-1000" 
                                  style={{ width: `${risk.impact}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400 mb-1">Mitigation: {risk.mitigation}%</div>
                              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000" 
                                  style={{ width: `${risk.mitigation}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Risk Summary */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg p-3 border border-green-500/30">
                        <div className="text-green-400 text-sm font-medium">Avg. Mitigation</div>
                        <div className="text-xl font-bold text-white">81.6%</div>
                        <div className="text-xs text-gray-400">Risk Coverage</div>
                      </div>
                      <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-3 border border-red-500/30">
                        <div className="text-red-400 text-sm font-medium">Total Risk Cost</div>
                        <div className="text-xl font-bold text-white">$23.8M</div>
                        <div className="text-xs text-gray-400">Potential Exposure</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Healthcare Security Infrastructure Section */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaServer className="text-green-500 mr-3" />
                    Healthcare Security Infrastructure Analysis
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">cyberGUARD Healthcare Ready</span>
                    <FaLightbulb className="text-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-400 text-sm font-medium">Medical Endpoints</div>
                        <div className="text-2xl font-bold text-white mt-1">4,250</div>
                        <div className="text-xs text-gray-400 mt-1">Healthcare Assets</div>
                      </div>
                      <FaServer className="text-green-400 text-2xl" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-400 text-sm font-medium">Patient Records</div>
                        <div className="text-2xl font-bold text-white mt-1">285K</div>
                        <div className="text-xs text-gray-400 mt-1">Protected Records</div>
                      </div>
                      <FaDatabase className="text-green-400 text-2xl" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-400 text-sm font-medium">Healthcare Staff</div>
                        <div className="text-2xl font-bold text-white mt-1">2,850</div>
                        <div className="text-xs text-gray-400 mt-1">Active Personnel</div>
                      </div>
                      <FaUsers className="text-green-400 text-2xl" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-green-400 text-sm font-medium">HIPAA Uptime</div>
                        <div className="text-2xl font-bold text-white mt-1">99.9%</div>
                        <div className="text-xs text-gray-400 mt-1">Compliance Level</div>
                      </div>
                      <MdTrendingUp className="text-green-400 text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Healthcare Prospects Table */}
            <div className={`${cardBaseClass} p-6 ${cardHoverClass} mt-8 bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <MdAssessment className="text-green-500 mr-3" />
                  Similar Healthcare Organizations Analyzed
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">124 Organizations Enriched</span>
                  <FaDatabase className="text-green-500" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-full bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(5,150,105,0.03)] backdrop-blur-md rounded-xl border border-green-500/20">
                  <table className="min-w-full divide-y divide-green-500/20">
                    <thead className="bg-gradient-to-r from-green-500/15 to-green-600/10 backdrop-blur-md">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Endpoints</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">HIPAA Score</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Annual Savings</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-green-400 uppercase tracking-wider">CISO Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-green-500/10">
                      {[
                        { name: "St. Mary's Regional Health", location: "Phoenix, AZ", endpoints: "3,850", hipaa: "82%", savings: "$1.8M", risk: "Medium", ciso: "New (4mo)", color: "green" },
                        { name: "Northside Medical Center", location: "Atlanta, GA", endpoints: "5,200", hipaa: "76%", savings: "$3.2M", risk: "High", ciso: "Hiring", color: "emerald" },
                        { name: "Pacific Coast Healthcare", location: "Seattle, WA", endpoints: "6,750", hipaa: "85%", savings: "$4.1M", risk: "Low", ciso: "Established", color: "teal" },
                        { name: "Mountain View Hospital", location: "Denver, CO", endpoints: "2,980", hipaa: "71%", savings: "$1.5M", risk: "High", ciso: "New (6mo)", color: "lime" },
                        { name: "Gulf Coast Medical", location: "Houston, TX", endpoints: "4,580", hipaa: "79%", savings: "$2.7M", risk: "Medium", ciso: "Recruiting", color: "green" },
                        { name: "Metro Health Systems", location: "Chicago, IL", endpoints: "7,200", hipaa: "88%", savings: "$5.3M", risk: "Low", ciso: "New (2mo)", color: "emerald" },
                        { name: "Riverside Medical Group", location: "Tampa, FL", endpoints: "3,450", hipaa: "74%", savings: "$2.1M", risk: "Medium", ciso: "Established", color: "teal" },
                        { name: "Valley Healthcare Network", location: "Las Vegas, NV", endpoints: "5,850", hipaa: "81%", savings: "$3.8M", risk: "Medium", ciso: "New (7mo)", color: "lime" }
                      ].map((org, index) => (
                        <tr key={index} className="hover:bg-gradient-to-r hover:from-green-500/10 hover:to-green-600/5 transition-all group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full bg-green-500 mr-3 opacity-70 shadow-lg shadow-green-500/30`}></div>
                              <div className="text-sm font-medium text-white group-hover:text-green-300 transition-colors">{org.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{org.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">{org.endpoints}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-white mr-2">{org.hipaa}</div>
                              <div className="w-16 bg-gray-700/50 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    parseInt(org.hipaa) > 85 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                                    parseInt(org.hipaa) > 75 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                                  }`}
                                  style={{ width: org.hipaa }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-400">{org.savings}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              org.risk === 'Low' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                              org.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                              {org.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              org.ciso.includes('New') || org.ciso === 'Hiring' || org.ciso === 'Recruiting' ? 
                              'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            }`}>
                              {org.ciso}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing 8 of 124 healthcare organizations with similar profiles
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-400">Average HIPAA Compliance:</div>
                  <div className="text-lg font-bold text-green-400">79.5%</div>
                  <div className="text-sm text-gray-400">Avg. Savings Potential:</div>
                  <div className="text-lg font-bold text-green-400">$3.1M</div>
                </div>
              </div>
            </div>
            
            {/* Summary Section */}
            <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-green-500/20`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Pro Cloud SaaS Healthcare Cybersecurity Analysis</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">High-Value Healthcare Prospect</span>
                  <FaInfoCircle className="text-green-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Healthcare IT</p>
                      <p className="text-xl text-green-300 font-bold">${mspMetrics.currentCost.toLocaleString()}/yr</p>
                    </div>
                    <FaMoneyBill className="text-green-400 text-2xl opacity-80" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Pro Cloud Cost</p>
                      <p className="text-xl text-green-500 font-bold">${mspMetrics.optimizedCost.toLocaleString()}/yr</p>
                    </div>
                    <MdOutlineSavings className="text-green-400 text-2xl opacity-80" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Annual Savings</p>
                      <p className="text-xl text-green-400 font-bold">${mspMetrics.savingsPerYear.toLocaleString()}</p>
                    </div>
                    <MdOutlineSavings className="text-green-400 text-2xl opacity-80" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/15 to-green-600/5 backdrop-blur-md rounded-xl p-4 border border-green-500/20">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Healthcare ROI</p>
                      <p className="text-xl text-green-400 font-bold">{mspMetrics.roi}%</p>
                    </div>
                    <FaClock className="text-green-400 text-2xl opacity-80" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => navigate('/migration-insights')}
                  className="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-medium flex items-center space-x-2 shadow-lg shadow-green-900/20 hover:shadow-green-800/30 transition-all transform hover:scale-105"
                >
                  <span className="text-lg">Continue to Pro Cloud Healthcare Migration Analysis</span>
                  <MdArrowForward className="text-xl" />
                </button>
              </div>
            </div>
            
            {/* Information Modal */}
            {showInfoModal && activeMetric && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="relative max-w-md w-full bg-gradient-to-br from-[#1A1A1A]/95 via-[#1A1A1A]/90 to-[#1A1A1A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-500/20 p-6 max-h-[90vh] overflow-y-auto">
                  {/* Green glow effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]"></div>
                  </div>

                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                  >
                    <MdClose size={24} />
                  </button>
                  
                  <div className="mb-6 pb-4 border-b border-green-800/30 relative z-10">
                    <div className="flex items-start mb-2">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mr-4 border border-green-500/20 shadow-lg shadow-green-900/20">
                        {activeMetric === 'endpoints' && <FaServer className="text-green-400 text-xl" />}
                        {activeMetric === 'securityEvents' && <MdSecurity className="text-green-400 text-xl" />}
                        {activeMetric === 'currentCost' && <FaMoneyBillWave className="text-green-400 text-xl" />}
                        {activeMetric === 'optimizedCost' && <FaMoneyBillWave className="text-green-400 text-xl" />}
                        {activeMetric === 'savingsPerYear' && <MdOutlineSavings className="text-green-400 text-xl" />}
                        {activeMetric === 'roi' && <FaCalculator className="text-green-400 text-xl" />}
                        {activeMetric === 'paybackMonths' && <FaClock className="text-green-400 text-xl" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">{metricTooltips[activeMetric].name}</h3>
                        <p className="text-green-300/70">{metricTooltips[activeMetric].description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-900/20 to-green-800/10 rounded-lg p-5 border border-green-500/20 mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <FaInfoCircle className="text-green-400 mr-2" />
                      Pro Cloud Analysis
                    </h4>
                    <p className="text-white">{metricTooltips[activeMetric].calculation}</p>
                  </div>
                  
                  <div className="flex justify-end mt-6 relative z-10">
                    <button 
                      onClick={() => setShowInfoModal(false)}
                      className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all font-medium shadow-lg shadow-green-900/20 hover:shadow-green-800/30 flex items-center space-x-2"
                    >
                      <span>Close</span>
                      <MdClose size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DataEnrichment; 