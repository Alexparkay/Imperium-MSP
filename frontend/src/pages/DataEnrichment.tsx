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
  industry: string;
  employees: number;
  hiringStatus: string;
  compliance: string;
  licenseRenewal: string;
  rmmTool: string;
  opportunityScore: number;
  currentMSP: boolean;
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
  
  // Dr. Michael Rodriguez - Desert Valley Medical Group specific profile
  const contactInfo: ContactInfo = {
    name: "Dr. Michael Rodriguez",
    title: "Practice Administrator",
    company: "Desert Valley Medical Group",
    location: "Phoenix, Arizona",
    securitySystem: "Legacy Healthcare IT",
    industry: "Healthcare",
    employees: 85,
    hiringStatus: "Actively Hiring IT Staff",
    compliance: "HIPAA",
    licenseRenewal: "Microsoft 365",
    rmmTool: "No RMM Tool Identified",
    opportunityScore: 8.5,
    currentMSP: false
  };
  
  const mspMetrics: MSPMetrics = {
    endpoints: 340, // Adjusted for 85 employees (4 endpoints per employee average)
    securityEvents: 1650000, // Scaled down from larger organizations
    currentCost: 485000, // Appropriate for mid-size practice
    optimizedCost: 189000, // ProCloud pricing for this size
    savingsPerYear: 296000, // Annual savings potential
    roi: 285, // Strong ROI for this opportunity
    paybackMonths: 4.8 // Fast payback for high-opportunity client
  };

  // Enhanced data for Desert Valley Medical Group cybersecurity analysis
  const complianceData = [
    { name: 'HIPAA Security', current: 62, target: 95, color: '#3B82F6' },
    { name: 'HIPAA Privacy', current: 71, target: 95, color: '#8B5CF6' },
    { name: 'HITECH Act', current: 48, target: 90, color: '#06B6D4' },
    { name: 'State Regulations', current: 58, target: 88, color: '#10B981' }
  ];

  const threatLandscapeData = [
    { month: 'Jan', threats: 420, blocked: 385, advanced: 28, critical: 7, explanation: 'Baseline security events for medical practice' },
    { month: 'Feb', threats: 310, blocked: 295, severity: 'Low', category: 'Phishing', advanced: 18, critical: 3, explanation: 'Normal operational security' },
    { month: 'Mar', threats: 680, blocked: 625, severity: 'High', category: 'Ransomware', advanced: 48, critical: 15, explanation: 'Healthcare targeting campaign detected' },
    { month: 'Apr', threats: 250, blocked: 240, severity: 'Low', category: 'Malware', advanced: 12, critical: 2, explanation: 'Staff training effectiveness visible' },
    { month: 'May', threats: 890, blocked: 825, severity: 'Critical', category: 'Data Breach Attempt', advanced: 62, critical: 18, explanation: 'Sophisticated attack on patient data' },
    { month: 'Jun', threats: 340, blocked: 330, severity: 'Medium', category: 'Email Security', advanced: 22, critical: 5, explanation: 'Enhanced monitoring showing results' }
  ];

  const costBreakdownData = [
    { name: 'IT Personnel', current: 185000, optimized: 48000, category: 'Staff', color: '#3B82F6' },
    { name: 'Security Tools', current: 165000, optimized: 89000, category: 'Technology', color: '#8B5CF6' },
    { name: 'Compliance & Audit', current: 135000, optimized: 52000, category: 'Regulatory', color: '#06B6D4' }
  ];

  const medicalSecurityData = [
    { domain: 'Patient Data Protection', current: 58, target: 95, priority: 'Critical' },
    { domain: 'Medical Device Security', current: 35, target: 88, priority: 'High' },
    { domain: 'Network Segmentation', current: 45, target: 85, priority: 'High' },
    { domain: 'Access Control', current: 52, target: 92, priority: 'Critical' },
    { domain: 'Incident Response', current: 38, target: 85, priority: 'Medium' },
    { domain: 'Backup & Recovery', current: 62, target: 95, priority: 'High' }
  ];

  const healthcareRiskData = [
    { risk: 'Ransomware Attack', probability: 78, impact: 92, mitigation: 45, cost: '$1.8M', trend: 'increasing' },
    { risk: 'Patient Data Breach', probability: 65, impact: 88, mitigation: 52, cost: '$950K', trend: 'stable' },
    { risk: 'Medical Device Compromise', probability: 58, impact: 82, mitigation: 38, cost: '$420K', trend: 'increasing' },
    { risk: 'Insider Data Theft', probability: 35, impact: 75, mitigation: 68, cost: '$280K', trend: 'decreasing' },
    { risk: 'HIPAA Violation', probability: 48, impact: 85, mitigation: 58, cost: '$650K', trend: 'stable' }
  ];

  // ROI projection for Desert Valley Medical Group
  const roiProjectionData = [
    { 
      year: 'Year 1', 
      savings: 198000, 
      cumulative: 198000, 
      investment: 85000, 
      netSavings: 113000, 
      efficiency: 68,
      month: 1,
      explanation: 'Initial implementation costs offset by immediate automation savings in small practice',
      phase: 'Implementation'
    },
    { 
      year: 'Q2 Y1', 
      savings: 235000, 
      cumulative: 235000, 
      investment: 52000, 
      netSavings: 183000, 
      efficiency: 78,
      month: 6,
      explanation: 'Staff productivity gains, automated HIPAA compliance reducing manual effort',
      phase: 'Optimization'
    },
    { 
      year: 'Year 2', 
      savings: 315000, 
      cumulative: 550000, 
      investment: 28000, 
      netSavings: 287000, 
      efficiency: 88,
      month: 12,
      explanation: 'Full integration complete, predictive analytics preventing security incidents',
      phase: 'Maturity'
    },
    { 
      year: 'Q2 Y2', 
      savings: 340000, 
      cumulative: 890000, 
      investment: 18000, 
      netSavings: 322000, 
      efficiency: 92,
      month: 18,
      explanation: 'AI-driven threat detection, complete HIPAA automation, zero compliance incidents',
      phase: 'Advanced Analytics'
    },
    { 
      year: 'Year 3', 
      savings: 365000, 
      cumulative: 1255000, 
      investment: 15000, 
      netSavings: 350000, 
      efficiency: 96,
      month: 24,
      explanation: 'Peak efficiency achieved, practice serves as ProCloud healthcare reference client',
      phase: 'Full Optimization'
    }
  ];

  // Metric tooltips with ProCloud methodology explanation
  const metricTooltips: Record<string, { name: string, description: string, calculation: string, methodology: string }> = {
    endpoints: {
      name: "Medical Practice Endpoints",
      description: "Total IT assets requiring healthcare-grade security at Desert Valley Medical Group",
      calculation: "340 devices including medical equipment, workstations, tablets, and servers requiring HIPAA compliance",
      methodology: "Data collected via: Network scanning, inventory databases, employee device counts (85 staff × 4 avg devices), medical equipment registrations, and technology stack analysis through DNS records and SSL certificates."
    },
    securityEvents: {
      name: "Healthcare Security Events",
      description: "Annual security events processed across Desert Valley's healthcare infrastructure", 
      calculation: "Threat detections (1.2M) + HIPAA compliance scans (450K) = 1.65M security events requiring medical-grade protection",
      methodology: "Data derived from: Industry benchmark analysis, similar practice comparisons, email security logs via MX record analysis, and healthcare threat intelligence feeds. Cross-referenced with HIPAA covered entity breach reports."
    },
    currentCost: {
      name: "Current Practice IT Cost",
      description: "Total annual cost of maintaining legacy IT infrastructure at Desert Valley Medical Group",
      calculation: "Current IT staff ($185K) + Security tools ($165K) + Compliance costs ($135K) = $485K annually",
      methodology: "Cost analysis through: Salary data from Indeed/LinkedIn job postings, vendor pricing research, similar practice benchmarking, and technology stack cost modeling based on identified software licenses and contracts."
    },
    optimizedCost: {
      name: "ProCloud Healthcare Cost",
      description: "Projected annual cost with ProCloud's specialized healthcare MSP services",
      calculation: "ProCloud healthcare MSP ($125K) + HIPAA compliance automation ($42K) + Medical device security ($22K) = $189K",
      methodology: "Pricing based on: Practice size (85 employees), endpoint count (340 devices), compliance requirements (HIPAA), and ProCloud's healthcare MSP pricing model for similar-sized medical practices."
    },
    savingsPerYear: {
      name: "Annual Practice Savings", 
      description: "Cost savings from transitioning to ProCloud's healthcare-specialized MSP services",
      calculation: "$485K - $189K = $296K annual savings while improving HIPAA compliance and patient data protection",
      methodology: "Savings calculated using: Current vs. optimized cost analysis, efficiency improvements from automation, reduced compliance overhead, and elimination of redundant security tools."
    },
    roi: {
      name: "Healthcare Practice ROI",
      description: "Return on investment from ProCloud's medical practice cybersecurity transformation",
      calculation: "($296K ÷ $104K) × 100 = 285% ROI including enhanced HIPAA compliance and reduced breach risk",
      methodology: "ROI calculation includes: Direct cost savings, compliance risk reduction, operational efficiency gains, and avoided breach costs based on healthcare industry averages ($10.93M per breach)."
    },
    paybackMonths: {
      name: "Healthcare Payback Period",
      description: "Time to recover investment in ProCloud's healthcare cybersecurity implementation",
      calculation: "($104K ÷ $296K) × 12 = 4.2 months × 1.14 implementation factor = 4.8 months",
      methodology: "Payback calculated using: Implementation costs, monthly savings rate, healthcare practice operational patterns, and typical cybersecurity deployment timelines for medical environments."
    }
  };

  // Effect to simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Card base class for reduced green glassmorphic effect
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-slate-500/15 group relative overflow-hidden";
  
  // Card hover effect with more subtle colors
  const cardHoverClass = "hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] hover:border-slate-500/30 hover:scale-[1.01]";
  
  // Balanced color palette - less green, more blue/purple/cyan
  const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Reduced background effects with more balanced colors */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-500/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/2 to-slate-500/2 rounded-full blur-3xl"></div>
      </div>
      
      <div className="space-y-6 relative z-10">
        {isLoading ? (
          <div className={`${cardBaseClass} bg-gradient-to-br from-[rgba(59,130,246,0.15)] to-[rgba(139,92,246,0.05)] border border-blue-500/30`}>
            <div className="card-body flex flex-col items-center justify-center py-16 relative z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Loading Desert Valley Medical Group Analysis...
              </h3>
              <p className="text-gray-400 text-center max-w-md mb-8">
                Analyzing Dr. Rodriguez's practice for HIPAA compliance optimization and cybersecurity enhancement opportunities...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desert Valley Medical Group Prospect Profile Section */}
            <div className={`${cardBaseClass} p-6 mb-8 overflow-hidden relative bg-gradient-to-br from-[rgba(59,130,246,0.05)] to-[rgba(139,92,246,0.02)] border border-blue-500/20 hover:border-blue-400/30 transition-all duration-500 shadow-[0_10px_50px_rgba(59,130,246,0.15)]`}>
              {/* Decorative elements */}
              <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-400/5 blur-[80px] pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-300/20 flex items-center justify-center border border-blue-400/20 shadow-lg shadow-blue-900/10">
                    <FaUserTie className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{contactInfo.name}</h2>
                    <p className="text-blue-300/80 flex items-center text-lg">
                      <span className="text-gray-400 font-light">{contactInfo.title}</span>
                      <span className="mx-2 text-blue-500/40">•</span>
                      <span className="text-blue-300/70 font-medium">{contactInfo.company}</span>
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1 text-gray-300">
                        <FaBuilding className="text-blue-400" />
                        {contactInfo.employees} employees
                      </span>
                      <span className="flex items-center gap-1 text-gray-300">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        {contactInfo.hiringStatus}
                      </span>
                      <span className="flex items-center gap-1 text-gray-300">
                        <FaShieldAlt className="text-blue-400" />
                        {contactInfo.compliance} Required
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 mt-4 md:mt-0">
                  <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-full py-2 px-4 border border-blue-500/10">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <span>{contactInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Opportunity Score:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-blue-400">{contactInfo.opportunityScore}</span>
                      <span className="text-sm text-gray-400">/10</span>
                      <div className="w-16 bg-gray-700/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${contactInfo.opportunityScore * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ProCloud Signals for Desert Valley Medical Group */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Medical Practice Endpoints */}
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
                    Practice Endpoints
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-2">{mspMetrics.endpoints.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Medical IT Assets</p>
                  </div>
                </div>
                
                {/* HIPAA Security Events */}
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
                
                {/* Microsoft 365 Renewal Signal */}
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
                    <FaExchangeAlt className="text-cyan-400 mr-2" />
                    {contactInfo.licenseRenewal} Renewal
                  </h3>
                  
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600 mb-2">Q2</p>
                    <p className="text-gray-400 text-sm">Contract Renewal Window</p>
                  </div>
                </div>
                
                {/* Cost Savings Opportunity */}
                <div className="rounded-2xl p-4 backdrop-blur-md bg-gradient-to-br from-[rgba(16,185,129,0.08)] to-[rgba(16,185,129,0.02)] border border-emerald-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-emerald-900/20 hover:border-emerald-400/30 hover:scale-[1.02] flex flex-col relative group">
                  <button 
                    onClick={() => {
                      setActiveMetric('savingsPerYear');
                      setShowInfoModal(true);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors z-10"
                  >
                    <FaInfoCircle className="text-emerald-400 text-sm" />
                  </button>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <FaMoneyBillWave className="text-emerald-400 mr-2" />
                    Cost Savings Potential
                  </h3>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/5 blur-[30px]"></div>
                      </div>
                      <div className="relative w-24 h-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Savings', value: Math.min(285, 400) },
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
                          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">{mspMetrics.roi}%</p>
                          <p className="text-xs text-gray-400">ROI</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <FaClock className="text-emerald-400 text-xs" />
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
              
              {/* ProCloud Desert Valley Opportunity Analysis Chart */}
              <div className="h-72 rounded-2xl p-6 backdrop-blur-md bg-gradient-to-br from-[rgba(59,130,246,0.03)] to-[rgba(139,92,246,0.05)] border border-blue-500/20 shadow-lg shadow-black/20 transform transition-all duration-300 hover:shadow-blue-900/20 hover:border-blue-400/30 relative group">
                <button 
                  onClick={() => {
                    setActiveMetric('currentCost');
                    setShowInfoModal(true);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors z-10"
                >
                  <FaInfoCircle className="text-blue-400 text-sm" />
                </button>
                
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FaChartBar className="text-blue-400 mr-2" />
                  Desert Valley Medical Group - ProCloud MSP Opportunity Analysis
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart
                    data={[
                      { name: 'Current Practice IT', value: mspMetrics.currentCost },
                      { name: 'ProCloud MSP Cost', value: mspMetrics.optimizedCost },
                      { name: 'Annual Savings', value: mspMetrics.savingsPerYear }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.4} />
                    <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                    <YAxis tick={{ fill: '#9CA3AF' }} />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: 'rgba(20, 20, 25, 0.9)', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.3)', backdropFilter: 'blur(10px)' }}
                    />
                    <Bar dataKey="value" name="Amount">
                      {[
                        <Cell key="cell-0" fill="#EF4444" />,
                        <Cell key="cell-1" fill="#3B82F6" />,
                        <Cell key="cell-2" fill="#10B981" />
                      ] as React.ReactNode[]}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Comprehensive Analysis Sections */}
            <div className="space-y-8">
              
              {/* HIPAA Compliance Analysis Section for Desert Valley Medical Group */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(59,130,246,0.08)] to-[rgba(139,92,246,0.02)] border border-blue-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaShieldAlt className="text-blue-500 mr-3" />
                    Desert Valley Medical Group - HIPAA Compliance Assessment
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Healthcare Compliance Analysis</span>
                    <FaFlag className="text-blue-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Compliance Progress Chart */}
                  <div className="bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.05)] backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Healthcare Compliance Framework Progress</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={complianceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.2)" />
                        <XAxis dataKey="name" tick={{ fill: '#3B82F6', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#3B82F6' }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(5, 46, 22, 0.95)', 
                            borderRadius: '0.75rem', 
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
                          }}
                        />
                        <defs>
                          <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#DC2626" stopOpacity={0.4}/>
                          </linearGradient>
                          <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.6}/>
                          </linearGradient>
                        </defs>
                        <Bar dataKey="current" name="Current" fill="url(#currentGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" name="ProCloud Target" fill="url(#targetGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Medical Security Maturity Radar */}
                  <div className="bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.05)] backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Medical Practice Security Domain Maturity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={medicalSecurityData}>
                        <PolarGrid stroke="rgba(59,130,246,0.3)" />
                        <PolarAngleAxis dataKey="domain" tick={{ fill: '#3B82F6', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#3B82F6' }} />
                        <defs>
                          <linearGradient id="currentRadarGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="targetRadarGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.4}/>
                          </linearGradient>
                        </defs>
                        <Radar name="Current" dataKey="current" stroke="#ef4444" fill="url(#currentRadarGradient)" strokeWidth={2} />
                        <Radar name="ProCloud Target" dataKey="target" stroke="#3B82F6" fill="url(#targetRadarGradient)" strokeWidth={3} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Healthcare Compliance Level Details for 85-employee practice */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/5 backdrop-blur-md rounded-xl p-4 border border-blue-500/30">
                    <div className="text-blue-400 text-sm font-medium">HIPAA Security</div>
                    <div className="text-2xl font-bold text-white mt-1">62%</div>
                    <div className="text-xs text-gray-400 mt-1">Security Rule Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/15 to-purple-600/5 backdrop-blur-md rounded-xl p-4 border border-purple-500/30">
                    <div className="text-purple-400 text-sm font-medium">HIPAA Privacy</div>
                    <div className="text-2xl font-bold text-white mt-1">71%</div>
                    <div className="text-xs text-gray-400 mt-1">Privacy Rule Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 backdrop-blur-md rounded-xl p-4 border border-cyan-500/30">
                    <div className="text-cyan-400 text-sm font-medium">Implementation</div>
                    <div className="text-2xl font-bold text-white mt-1">4.8 mo</div>
                    <div className="text-xs text-gray-400 mt-1">to Full Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 backdrop-blur-md rounded-xl p-4 border border-emerald-500/30">
                    <div className="text-emerald-400 text-sm font-medium">Cost Savings</div>
                    <div className="text-2xl font-bold text-white mt-1">$48K</div>
                    <div className="text-xs text-gray-400 mt-1">Healthcare Incentives</div>
                  </div>
                </div>
              </div>

              {/* Cost Analysis Section */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(139,92,246,0.08)] to-[rgba(6,182,212,0.02)] border border-purple-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaMoneyBillWave className="text-purple-500 mr-3" />
                    Desert Valley Medical Group - Cost Optimization Analysis
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">61.0% Cost Reduction</span>
                    <MdTrendingDown className="text-emerald-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cost Breakdown Comparison */}
                  <div className="bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-[rgba(6,182,212,0.05)] backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Practice IT Cost Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.2)" />
                        <XAxis dataKey="name" tick={{ fill: '#8B5CF6' }} />
                        <YAxis tick={{ fill: '#8B5CF6' }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(5, 46, 22, 0.95)', 
                            borderRadius: '0.75rem', 
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)'
                          }}
                        />
                        <defs>
                          <linearGradient id="currentCostGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.4}/>
                          </linearGradient>
                          <linearGradient id="optimizedCostGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.5}/>
                          </linearGradient>
                        </defs>
                        <Bar dataKey="current" name="Current Cost" fill="url(#currentCostGradient)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="optimized" name="ProCloud Cost" fill="url(#optimizedCostGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Practice ROI Projection */}
                  <div className="bg-gradient-to-br from-[rgba(139,92,246,0.1)] to-[rgba(6,182,212,0.05)] backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4">3-Year ROI Projection with Business Milestones</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={roiProjectionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.2)" />
                        <XAxis dataKey="year" tick={{ fill: '#8B5CF6' }} />
                        <YAxis tick={{ fill: '#8B5CF6' }} tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                        <YAxis yAxisId="efficiency" orientation="right" tick={{ fill: '#06B6D4' }} tickFormatter={(value) => `${value}%`} />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-gradient-to-br from-[rgba(5,46,22,0.98)] to-[rgba(5,46,22,0.92)] backdrop-blur-md rounded-xl p-5 border border-purple-500/40 shadow-xl shadow-purple-500/30 max-w-sm">
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      data.phase === 'Implementation' ? 'bg-blue-500/20 text-blue-300' :
                                      data.phase === 'Optimization' ? 'bg-yellow-500/20 text-yellow-300' :
                                      data.phase === 'Maturity' ? 'bg-purple-500/20 text-purple-300' :
                                      data.phase === 'Advanced Analytics' ? 'bg-cyan-500/20 text-cyan-300' :
                                      'bg-emerald-500/20 text-emerald-300'
                                    }`}>
                                      {data.phase}
                                    </div>
                                    <span className="text-purple-300 font-semibold">{label}</span>
                                  </div>
                                  
                                  <div className="space-y-3 text-sm">
                                    <div className="grid grid-cols-2 gap-3">
                                      <div>
                                        <span className="text-gray-400">Annual Savings:</span>
                                        <div className="text-purple-300 font-semibold">${data.savings.toLocaleString()}</div>
                                      </div>
                                      <div>
                                        <span className="text-gray-400">Efficiency:</span>
                                        <div className="text-purple-300 font-semibold">{data.efficiency}%</div>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t border-purple-500/30">
                                      <div className="text-purple-200 text-xs leading-relaxed">
                                        <strong className="text-purple-300">Business Impact:</strong> {data.explanation}
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
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                            <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6D28D9" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <Line 
                          type="monotone" 
                          dataKey="cumulative" 
                          stroke="#8B5CF6" 
                          strokeWidth={4} 
                          dot={{ r: 6, strokeWidth: 2, fill: "#8B5CF6" }}
                          activeDot={{ r: 8, strokeWidth: 3, fill: "#A78BFA", stroke: "#8B5CF6" }}
                          name="Cumulative Savings"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="netSavings" 
                          stroke="#06B6D4" 
                          strokeWidth={3} 
                          dot={{ r: 5, strokeWidth: 2, fill: "#06B6D4" }}
                          activeDot={{ r: 7, strokeWidth: 2, fill: "#06B6D4", stroke: "#8B5CF6" }}
                          name="Annual Net Savings"
                          strokeDasharray="8 6"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="efficiency" 
                          stroke="#10B981" 
                          strokeWidth={2} 
                          dot={{ r: 4, strokeWidth: 2, fill: "#10B981" }}
                          activeDot={{ r: 6, strokeWidth: 2, fill: "#10B981", stroke: "#06B6D4" }}
                          name="Efficiency %"
                          yAxisId="efficiency"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Summary Section for Desert Valley Medical Group */}
              <div className={`${cardBaseClass} p-6 ${cardHoverClass} bg-gradient-to-br from-[rgba(6,182,212,0.08)] to-[rgba(16,185,129,0.02)] border border-cyan-500/20`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">ProCloud MSP Analysis - Desert Valley Medical Group</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">High-Value Healthcare Prospect</span>
                    <FaInfoCircle className="text-cyan-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-red-500/15 to-red-600/5 backdrop-blur-md rounded-xl p-4 border border-red-500/20">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Current Practice IT</p>
                        <p className="text-xl text-red-300 font-bold">${mspMetrics.currentCost.toLocaleString()}/yr</p>
                      </div>
                      <FaMoneyBill className="text-red-400 text-2xl opacity-80" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/15 to-blue-600/5 backdrop-blur-md rounded-xl p-4 border border-blue-500/20">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">ProCloud MSP Cost</p>
                        <p className="text-xl text-blue-500 font-bold">${mspMetrics.optimizedCost.toLocaleString()}/yr</p>
                      </div>
                      <MdOutlineSavings className="text-blue-400 text-2xl opacity-80" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 backdrop-blur-md rounded-xl p-4 border border-emerald-500/20">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Annual Savings</p>
                        <p className="text-xl text-emerald-400 font-bold">${mspMetrics.savingsPerYear.toLocaleString()}</p>
                      </div>
                      <MdOutlineSavings className="text-emerald-400 text-2xl opacity-80" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 backdrop-blur-md rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Practice ROI</p>
                        <p className="text-xl text-cyan-400 font-bold">{mspMetrics.roi}%</p>
                      </div>
                      <FaClock className="text-cyan-400 text-2xl opacity-80" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => navigate('/migration-insights')}
                    className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-medium flex items-center space-x-2 shadow-lg shadow-cyan-900/20 hover:shadow-cyan-800/30 transition-all transform hover:scale-105"
                  >
                    <span className="text-lg">Continue to ProCloud Healthcare Migration Analysis</span>
                    <MdArrowForward className="text-xl" />
                  </button>
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
            
            {/* Information Modal with ProCloud Methodology */}
            {showInfoModal && activeMetric && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="relative max-w-2xl w-full bg-gradient-to-br from-[#1A1A1A]/95 via-[#1A1A1A]/90 to-[#1A1A1A]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/20 p-6 max-h-[90vh] overflow-y-auto">
                  {/* Blue glow effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]"></div>
                  </div>

                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-10"
                  >
                    <MdClose size={24} />
                  </button>
                  
                  <div className="mb-6 pb-4 border-b border-blue-800/30 relative z-10">
                    <div className="flex items-start mb-2">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/10 flex items-center justify-center mr-4 border border-blue-500/20 shadow-lg shadow-blue-900/20">
                        {activeMetric === 'endpoints' && <FaServer className="text-blue-400 text-xl" />}
                        {activeMetric === 'securityEvents' && <MdSecurity className="text-purple-400 text-xl" />}
                        {activeMetric === 'currentCost' && <FaMoneyBillWave className="text-red-400 text-xl" />}
                        {activeMetric === 'optimizedCost' && <FaMoneyBillWave className="text-blue-400 text-xl" />}
                        {activeMetric === 'savingsPerYear' && <MdOutlineSavings className="text-emerald-400 text-xl" />}
                        {activeMetric === 'roi' && <FaCalculator className="text-cyan-400 text-xl" />}
                        {activeMetric === 'paybackMonths' && <FaClock className="text-purple-400 text-xl" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{metricTooltips[activeMetric].name}</h3>
                        <p className="text-blue-300/70">{metricTooltips[activeMetric].description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-800/10 rounded-lg p-5 border border-blue-500/20 mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <FaInfoCircle className="text-blue-400 mr-2" />
                      ProCloud Analysis for Desert Valley Medical Group
                    </h4>
                    <p className="text-white">{metricTooltips[activeMetric].calculation}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-slate-900/20 to-slate-800/10 rounded-lg p-5 border border-slate-500/20 mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <FaDatabase className="text-slate-400 mr-2" />
                      Data Collection Methodology
                    </h4>
                    <p className="text-white text-sm leading-relaxed">{metricTooltips[activeMetric].methodology}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-cyan-900/20 to-blue-800/10 rounded-lg p-5 border border-cyan-500/20">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <FaLightbulb className="text-cyan-400 mr-2" />
                      ProCloud Research Process
                    </h4>
                    <div className="text-white text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span><strong>Multi-Source Verification:</strong> Cross-referenced data from 12+ industry databases</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span><strong>Real-Time Monitoring:</strong> Automated tracking of hiring patterns and technology changes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span><strong>Healthcare Specialization:</strong> HIPAA compliance database integration and medical industry benchmarking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span><strong>Competitive Intelligence:</strong> Current MSP relationship analysis and contract timing research</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 relative z-10">
                    <button 
                      onClick={() => setShowInfoModal(false)}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-400 transition-all font-medium shadow-lg shadow-blue-900/20 hover:shadow-blue-800/30 flex items-center space-x-2"
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