import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopDealsBox from '../components/topDealsBox/TopDealsBox';
import ChartBox from '../components/charts/ChartBox';
import USMap from '../components/maps/USMap';
import { useQuery } from '@tanstack/react-query';
import SplineWrapper from '../components/SplineWrapper';
import {
  MdFactory,
  MdSolarPower,
  MdElectricBolt,
  MdAttachMoney,
  MdLocationOn,
  MdBarChart,
  MdOutlineRoofing,
  MdOutlineWbSunny,
  MdOutlineEmail,
  MdOutlineTrackChanges,
  MdArrowForward,
  MdArrowOutward,
  MdOutlineSettings,
  MdPieChart,
  MdInsights,
  MdOutlineAnalytics,
  MdOutlineLightbulb,
  MdOutlineEnergySavingsLeaf,
  MdCheck,
  MdChevronRight,
  MdOutlineArrowUpward,
  MdTrendingUp,
  MdAccessTime,
  MdOutlineCalendarMonth,
  MdOutlineSearch,
  MdOutlineLocationOn,
  MdOutlineCloud,
  MdOutlineWbSunny as MdSun,
  MdKeyboardArrowRight,
  MdHomeWork,
  MdShowChart,
  MdEmail,
  MdDashboard,
  MdClose,
  MdInfoOutline,
  MdCircle,
  MdArrowUpward,
  MdDateRange,
  MdOutlineBusiness,
  MdStorage
} from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';

// Mock data for Imperium MSP dashboard
const dashboardData = {
  companiesScraped: {
    total: 89,
    enriched: 72,
    percentage: 81,
    chartData: [
      { name: "Jan", value: 32 },
      { name: "Feb", value: 41 },
      { name: "Mar", value: 48 },
      { name: "Apr", value: 55 },
      { name: "May", value: 63 },
      { name: "Jun", value: 69 },
      { name: "Jul", value: 78 },
      { name: "Aug", value: 89 }
    ]
  },
  companiesAnalyzed: {
    total: 72,
    percentage: 81,
    chartData: [
      { name: "Jan", value: 25 },
      { name: "Feb", value: 31 },
      { name: "Mar", value: 38 },
      { name: "Apr", value: 44 },
      { name: "May", value: 52 },
      { name: "Jun", value: 58 },
      { name: "Jul", value: 65 },
      { name: "Aug", value: 72 }
    ]
  },
  cybersecurityEvaluations: {
    total: 72,
    averageUsers: "285 Users",
    averageMonthlyCost: "$68K",
    chartData: [
      { name: "Jan", value: 52000 },
      { name: "Feb", value: 57000 },
      { name: "Mar", value: 61000 },
      { name: "Apr", value: 65000 },
      { name: "May", value: 68000 },
      { name: "Jun", value: 71000 },
      { name: "Jul", value: 69000 },
      { name: "Aug", value: 68000 }
    ]
  },
  mspOpportunities: {
    companiesEvaluated: 67,
    averageROI: "245%",
    averageImplementation: "4.2 months",
    totalSavings: "$8.7M",
    chartData: [
      { name: "Jan", value: 180 },
      { name: "Feb", value: 195 },
      { name: "Mar", value: 210 },
      { name: "Apr", value: 225 },
      { name: "May", value: 235 },
      { name: "Jun", value: 245 },
      { name: "Jul", value: 250 },
      { name: "Aug", value: 245 }
    ]
  },
  emailCampaigns: {
    emailsSent: 63,
    emailsOpened: 48,
    openRate: 76,
    repliedRate: 34,
    interestedRate: 22,
    chartData: [
      { name: "Sent", value: 63 },
      { name: "Opened", value: 48 },
      { name: "Replied", value: 21 },
      { name: "Interested", value: 14 }
    ]
  },
  topCompanies: [
    {
      id: 1,
      name: "Microsoft Inc.",
      location: "Redmond, WA",
      savings: "$2.8M",
      roi: "285.3%",
      status: "Interested"
    },
    {
      id: 2,
      name: "Salesforce",
      location: "San Francisco, CA",
      savings: "$1.4M",
      roi: "312.8%",
      status: "Email Sent"
    },
    {
      id: 3,
      name: "HubSpot",
      location: "Cambridge, MA",
      savings: "$3.2M",
      roi: "268.2%",
      status: "Follow-up Scheduled"
    },
    {
      id: 4,
      name: "Zoom",
      location: "San Jose, CA",
      savings: "$1.1M",
      roi: "245.2%",
      status: "Email Opened"
    },
    {
      id: 5,
      name: "Slack Technologies",
      location: "San Francisco, CA",
      savings: "$4.1M",
      roi: "298.5%",
      status: "Not Contacted"
    }
  ]
};

// Add this mock data for the campaign performance
const campaignData = [
  { date: '01 Mar', sent: 1250, totalOpens: 875, uniqueOpens: 625, replies: 245 },
  { date: '03 Mar', sent: 1450, totalOpens: 1015, uniqueOpens: 725, replies: 285 },
  { date: '05 Mar', sent: 1680, totalOpens: 1175, uniqueOpens: 840, replies: 340 },
  { date: '07 Mar', sent: 1920, totalOpens: 1345, uniqueOpens: 960, replies: 390 },
  { date: '09 Mar', sent: 2240, totalOpens: 1570, uniqueOpens: 1120, replies: 448 },
  { date: '11 Mar', sent: 2580, totalOpens: 1805, uniqueOpens: 1290, replies: 515 },
  { date: '13 Mar', sent: 2950, totalOpens: 2065, uniqueOpens: 1475, replies: 590 },
  { date: '15 Mar', sent: 3280, totalOpens: 2295, uniqueOpens: 1640, replies: 655 },
  { date: '17 Mar', sent: 3650, totalOpens: 2555, uniqueOpens: 1825, replies: 730 },
  { date: '19 Mar', sent: 4120, totalOpens: 2885, uniqueOpens: 2060, replies: 825 },
  { date: '21 Mar', sent: 4580, totalOpens: 3205, uniqueOpens: 2290, replies: 915 },
  { date: '23 Mar', sent: 4980, totalOpens: 3485, uniqueOpens: 2490, replies: 995 },
  { date: '25 Mar', sent: 5320, totalOpens: 3725, uniqueOpens: 2660, replies: 1065 },
  { date: '27 Mar', sent: 5720, totalOpens: 4005, uniqueOpens: 2860, replies: 1145 },
  { date: '29 Mar', sent: 6280, totalOpens: 4395, uniqueOpens: 3140, replies: 1255 },
];

// Add this email campaign data near the top of the file, after the existing mock data
const emailCampaignData = [
  { day: 'Mon', sent: 950, opened: 580, clicked: 320 },
  { day: 'Tue', sent: 1040, opened: 620, clicked: 360 },
  { day: 'Wed', sent: 1170, opened: 730, clicked: 420 },
  { day: 'Thu', sent: 1080, opened: 640, clicked: 350 },
  { day: 'Fri', sent: 950, opened: 540, clicked: 290 },
  { day: 'Sat', sent: 380, opened: 180, clicked: 110 },
  { day: 'Sun', sent: 320, opened: 150, clicked: 90 },
];

// Add this monthly email campaign data after the existing emailCampaignData
const monthlyEmailCampaignData = [
  { month: 'Jan', sent: 4800, opened: 2160, clicked: 960 },
  { month: 'Feb', sent: 5200, opened: 2470, clicked: 1120 },
  { month: 'Mar', sent: 6280, opened: 3265, clicked: 1695 },
  { month: 'Apr', sent: 5700, opened: 2850, clicked: 1425 },
  { month: 'May', sent: 6100, opened: 3172, clicked: 1586 },
  { month: 'Jun', sent: 6500, opened: 3380, clicked: 1755 },
];

// Add this overall email campaign data
const overallEmailCampaignData = [
  { quarter: 'Q1 2022', sent: 12000, opened: 5400, clicked: 2400 },
  { quarter: 'Q2 2022', sent: 14500, opened: 6960, clicked: 3480 },
  { quarter: 'Q3 2022', sent: 16800, opened: 8736, clicked: 4368 },
  { quarter: 'Q4 2022', sent: 18200, opened: 9282, clicked: 4732 },
  { quarter: 'Q1 2023', sent: 21500, opened: 11610, clicked: 5805 },
  { quarter: 'Q2 2023', sent: 24700, opened: 13585, clicked: 6428 },
];

// Add this campaign breakdown data
const campaignBreakdownData: Record<string, { email: number; linkedin: number; voice: number }> = {
  Mon: { email: 420, linkedin: 350, voice: 180 },
  Tue: { email: 480, linkedin: 365, voice: 195 },
  Wed: { email: 520, linkedin: 410, voice: 240 },
  Thu: { email: 490, linkedin: 380, voice: 210 },
  Fri: { email: 450, linkedin: 325, voice: 175 },
  Sat: { email: 180, linkedin: 120, voice: 80 },
  Sun: { email: 160, linkedin: 95, voice: 65 },
};

// Add migration timeline data
const migrationTimelineData = [
  { company: 'Enterprise A', size: 'Large', timelineMonths: 12, complexity: 'High', modules: 14, status: 'In Progress' },
  { company: 'Enterprise B', size: 'Medium', timelineMonths: 8, complexity: 'Medium', modules: 9, status: 'Planning' },
  { company: 'Enterprise C', size: 'Small', timelineMonths: 6, complexity: 'Low', modules: 6, status: 'Complete' },
  { company: 'Enterprise D', size: 'Large', timelineMonths: 14, complexity: 'Very High', modules: 18, status: 'Planning' },
  { company: 'Enterprise E', size: 'Medium', timelineMonths: 9, complexity: 'Medium', modules: 10, status: 'In Progress' },
];

// Add ERP landscape data
const erpLandscapeData = {
  sapMigration: [
    { name: 'Completed', value: 34, color: '#10B981' },
    { name: 'Planning before 2027', value: 41, color: '#059669' },
    { name: 'Will miss deadline', value: 18, color: '#047857' },
    { name: 'No plans', value: 7, color: '#065F46' }
  ],
  cloudERP: [
    { name: 'Manufacturing', value: 47, color: '#10B981' },
    { name: 'Finance/Insurance', value: 60.5, color: '#059669' },
    { name: 'Wholesale/Retail', value: 49.7, color: '#047857' },
    { name: 'Healthcare', value: 42.3, color: '#065F46' },
    { name: 'Technology', value: 55.8, color: '#064E3B' }
  ],
  aiDeployment: { value: 72.6 },
  hybridCloud: { value: 76.5 },
  composableERP: { value: 46 },
  timelines: [
    { year: 2025, event: 'Present', description: 'Only 34% migration complete' },
    { year: 2027, event: 'Deadline', description: 'End of mainstream support' },
    { year: 2030, event: 'End', description: 'End of extended paid support' }
  ]
};

// Add MSP system data
const mspData = {
  yearlyClients: '124',
  yearlyRevenue: '$12,450,800',
  avgClientValue: '$8,250/mo',
  servicesCovered: '89%',
  monthlyAverage: '$1,037,567',
  firstYear: '$8,970,000',
  fiveYearTotal: '$62,254,000',
  revenueWithoutOptimization: '$785,490/mo',
  revenueWithOptimization: '$1,245,680/mo',
  totalLifetimeValue: '$18,544,130',
  breakEven: '8 months',
  location: '118 South Montclair Avenue, Glen Ellyn, IL',
  region: 'AMERICAS',
  systemId: 'MSP-IMP-001',
  avgPricePerUser: '$195/user/month',
  monthlyMaintenance: '$15,000.00',
  serviceCount: '8 core services',
  supportLevel: '24/7 SOC',
  implementationCost: '$2.50M',
  clientCapacity: '500 clients'
};

const Home = () => {
  const navigate = useNavigate();
  const [campaignView, setCampaignView] = useState<'weekly' | 'monthly' | 'overall'>('weekly');
  const [hoverDay, setHoverDay] = useState<string | null>(null);
  const [showERPInfo, setShowERPInfo] = useState(false);
  const erpBoxRef = useRef<HTMLDivElement>(null);
  const [erpInfoPosition, setErpInfoPosition] = useState({ top: 0, left: 0 });

  // Helper function to determine if a specific view is active
  const isViewActive = (view: 'weekly' | 'monthly' | 'overall') => campaignView === view;

  // Effect to calculate position when ERP box is shown
  useEffect(() => {
    if (showERPInfo && erpBoxRef.current) {
      const rect = erpBoxRef.current.getBoundingClientRect();
      setErpInfoPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width + window.scrollX
      });
    }
  }, [showERPInfo]);

  const FeatureCard = ({ 
    icon, 
    title, 
    description,
    bgColor = 'bg-white dark:bg-slate-800'
  }: { 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    bgColor?: string;
  }) => {
    return (
      <div className={`${bgColor} rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden group border border-slate-100 dark:border-slate-700`}>
        {/* Decorative corner shape */}
        <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-emerald-500/10"></div>
        
        <div className="relative z-10">
          <div className="rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 p-4 mb-5 text-white shadow-sm inline-flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">{title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{description}</p>
          
          <div className="flex items-center mt-2 group-hover:translate-x-1 transition-transform duration-300">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mr-2">
              <MdChevronRight className="text-white text-sm" />
            </div>
            <span className="text-emerald-500 text-sm font-medium">Learn more</span>
          </div>
        </div>
      </div>
    );
  };

  const StatsCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    colorClass,
    borderColor = 'border-white/10' 
  }: { 
    title: string; 
    value: string; 
    change?: string;
    icon: React.ReactNode;
    colorClass: string;
    borderColor?: string;
  }) => {
    return (
      <div className={`backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-emerald-500/20 hover:-translate-y-1 relative overflow-hidden group`}>
        {/* Enhanced gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-purple-500/20 to-blue-500/30 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-emerald-500/40 to-transparent rounded-full blur-2xl transform rotate-12 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-500/30 to-transparent rounded-full blur-xl transform -rotate-12 opacity-80 group-hover:opacity-90"></div>
        <div className="absolute top-1/3 -right-8 w-20 h-20 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-lg transform rotate-45 opacity-70"></div>
        
        <div className="relative z-10 p-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white/90 mb-1">{title}</p>
              <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{value}</h3>
              {change && (
                <div className="flex items-center text-xs font-medium text-emerald-300 mt-2">
                  <MdTrendingUp className="mr-1" /> {change}
                </div>
              )}
            </div>
            <div className={`rounded-2xl p-3 ${colorClass} shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/20`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WorkflowCard = ({ 
    number, 
    title, 
    description, 
    icon, 
    route, 
    stats,
    chartData,
    chartType = 'bar' // 'bar', 'progress', 'metric', 'sparkline'
  }: { 
    number: number; 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    route: string;
    stats: React.ReactNode;
    chartData: { name: string; value: number }[];
    chartType?: 'bar' | 'progress' | 'metric' | 'sparkline';
  }) => {
    const renderChart = () => {
      switch (chartType) {
        case 'progress':
          const total = chartData.reduce((sum, item) => sum + item.value, 0);
          return (
            <div className="space-y-3">
              {chartData.map((item, index) => {
                const percentage = (item.value / total) * 100;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">{item.name}</span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );

        case 'metric':
          return (
            <div className="h-full flex items-center justify-center">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-full h-28 w-28 flex items-center justify-center relative border border-emerald-500/20">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-300"
                    style={{ height: `${(chartData[0].value / (chartData[0].value + chartData[1].value)) * 100}%` }}
                  />
                </div>
                <div className="z-10 text-center">
                  <div className="text-2xl font-bold text-white">{chartData[0].value}</div>
                  <div className="text-xs text-slate-300">{chartData[0].name}</div>
                </div>
              </div>
            </div>
          );

        case 'sparkline':
          const maxValue = Math.max(...chartData.map(item => item.value));
          const values = chartData.map(item => item.value / maxValue * 40);
          
          return (
            <div className="h-full flex items-end justify-between px-2">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="w-2 bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-400"
                  style={{ height: `${value}px` }}
                />
              ))}
            </div>
          );

        default:
          return (
            <div className="h-full flex items-end justify-between px-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-6 bg-gradient-to-t from-emerald-600 to-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-400"
                    style={{ height: `${(item.value / Math.max(...chartData.map(d => d.value))) * 100}px` }}
                  />
                  <span className="text-xs text-slate-300 mt-1">{item.name}</span>
                </div>
              ))}
            </div>
          );
      }
    };

    // Add a function to generate random gradient patterns
    const getRandomGradient = () => {
      const patterns = [
        {
          base: "bg-gradient-to-tr from-emerald-500/30 via-emerald-500/20 to-emerald-600/15",
          blobs: [
            "absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/40",
            "absolute bottom-1/3 -right-10 w-32 h-32 bg-gradient-to-tl from-emerald-500/30",
            "absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-emerald-600/25"
          ]
        },
        {
          base: "bg-gradient-to-bl from-emerald-600/30 via-emerald-600/20 to-emerald-500/15",
          blobs: [
            "absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-tr from-emerald-500/40",
            "absolute -bottom-10 right-1/4 w-36 h-36 bg-gradient-to-bl from-emerald-500/35",
            "absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-tr from-emerald-600/30"
          ]
        },
        {
          base: "bg-gradient-to-r from-emerald-500/30 via-emerald-500/20 to-emerald-600/25",
          blobs: [
            "absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-emerald-500/45",
            "absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-emerald-600/40",
            "absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-emerald-500/35"
          ]
        }
      ];
      return patterns[Math.floor(Math.random() * patterns.length)];
    };

    const gradient = getRandomGradient();

    return (
      <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-emerald-500/15 group relative">
        {/* Random gradient pattern */}
        <div className={`absolute inset-0 ${gradient.base} opacity-25 group-hover:opacity-30`}></div>
        {gradient.blobs.map((blob, index) => (
          <div key={index} className={`${blob} to-transparent rounded-full blur-${index === 0 ? '3xl' : index === 1 ? '2xl' : 'xl'} transform rotate-${Math.floor(Math.random() * 90)}deg`}></div>
        ))}
        
        <div className="p-6 relative z-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-600 text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-bold shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/20">
              {number}
            </div>
            <h2 className="text-lg font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{title}</h2>
          </div>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="text-emerald-300 text-xl">
              {icon}
            </div>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
          
          {/* Chart Visualization */}
          <div className="h-32 mb-5 px-2 bg-gradient-to-b from-white/[0.05] to-transparent rounded-xl p-4">
            {renderChart()}
          </div>
          
          <div className="bg-gradient-to-br from-[#28292b]/60 to-[rgba(40,41,43,0.2)] backdrop-blur-md rounded-xl p-4 mb-5 shadow-sm border border-emerald-500/20 relative overflow-hidden">
            {/* Inner gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-purple-500/5 to-blue-500/10 opacity-30"></div>
            <div className="relative z-10">
              {stats}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => navigate(route)}
              className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors flex items-center gap-1 group font-medium"
            >
              View Details
              <MdArrowForward className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Updated ERP Landscape Info Modal Component
  const ERPLandscapeInfoModal = () => {
    if (!showERPInfo) return null;
    
    return (
      <div 
        className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowERPInfo(false);
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={() => setShowERPInfo(false)}></div>
        <div 
          className="absolute z-10 w-[65vw] h-[75vh] rounded-3xl bg-gradient-to-br from-[#28292b]/60 via-[#28292b]/40 to-[rgba(40,41,43,0.30)] backdrop-blur-xl border border-emerald-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white overflow-hidden pointer-events-auto animate-popup-scale"
          style={{ transformOrigin: 'center left' }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-64 h-64 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10 p-5 h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  ERP Landscape Overview (2025–2027)
                </h2>
                <p className="text-emerald-400 text-sm">Key metrics and deadlines shaping the market</p>
              </div>
              
              <button 
                onClick={() => setShowERPInfo(false)}
                className="rounded-full p-2 bg-emerald-900/40 hover:bg-emerald-800/50 text-white/70 hover:text-white transition-all duration-300 border border-emerald-500/20"
              >
                <MdClose />
              </button>
            </div>
            
            {/* Main content in grid layout - tighter spacing */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100%-3.5rem)]">
              {/* SAP ECC Migration Section */}
              <div className="bg-[rgba(27,34,42,0.3)] backdrop-blur-md rounded-xl p-4 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-emerald-500/5 to-emerald-600/5 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <MdDateRange className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">SAP ECC to S/4HANA Migration</h3>
                      <div className="flex items-center text-emerald-300 text-xs">
                        <MdAccessTime className="mr-1" /> Deadline: December 31, 2027
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    <div className="w-1/2">
                      <PieChart width={130} height={130}>
                        <Pie
                          data={erpLandscapeData.sapMigration}
                          cx="50%"
                          cy="50%"
                          innerRadius={32}
                          outerRadius={55}
                          paddingAngle={2}
                          dataKey="value"
                          labelLine={false}
                        >
                          {erpLandscapeData.sapMigration.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="w-1/2 space-y-1.5 my-auto">
                      {erpLandscapeData.sapMigration.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          <div className="text-sm text-slate-300">{item.name}</div>
                          <div className="ml-auto text-sm font-medium text-white">{item.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-slate-300">
                    <p>• Over 50% of SAP customers risk missing the 2027 deadline</p>
                    <p>• Extended support available until 2030 (premium pricing)</p>
                    <p>• Resource crunch expected: Only 57% of enterprises on track</p>
                  </div>
                </div>
              </div>
              
              {/* Cloud ERP Adoption */}
              <div className="bg-[rgba(27,34,42,0.3)] backdrop-blur-md rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-emerald-500/5 to-emerald-600/5 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <MdOutlineCloud className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Cloud ERP Adoption</h3>
                      <div className="flex items-center text-emerald-300 text-xs">
                        <MdTrendingUp className="mr-1" /> Growing at 10.5% CAGR
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[160px] mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={erpLandscapeData.cloudERP} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" horizontal={false} />
                        <XAxis 
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#94A3B8' }}
                          domain={[0, 100]}
                        />
                        <YAxis 
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#E2E8F0' }}
                          width={90}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(6, 78, 59, 0.8)', 
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                            color: 'white',
                            fontSize: '12px',
                            backdropFilter: 'blur(8px)'
                          }}
                          formatter={(value) => [`${value}%`, 'Adoption']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {erpLandscapeData.cloudERP.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-slate-300">
                    <p>• Global adoption: <span className="text-white font-medium">53%</span> of organizations now use cloud ERP</p>
                    <p>• Market growth: Spending reaching <span className="text-white font-medium">$70 billion</span> by 2032</p>
                    <p>• Hybrid preference: <span className="text-white font-medium">76.5%</span> opt for hosted vs. SaaS for customization</p>
                  </div>
                </div>
              </div>
              
              {/* Emerging ERP Tech */}
              <div className="bg-[rgba(27,34,42,0.3)] backdrop-blur-md rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-emerald-500/5 to-emerald-600/5 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <MdOutlineLightbulb className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Emerging ERP Technologies</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    {/* AI Integration */}
                    <div className="bg-[rgba(15,23,42,0.3)] rounded-lg p-3 border border-emerald-500/20">
                      <div className="text-sm font-medium text-emerald-400 mb-1.5">AI Integration</div>
                      <div className="flex items-end gap-2 mb-1">
                        <div className="text-2xl font-bold text-white">72.6%</div>
                        <div className="text-xs text-emerald-300">Adoption</div>
                      </div>
                      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: '72.6%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-300">For predictive analytics & automation</div>
                    </div>
                    
                    {/* Hyperautomation */}
                    <div className="bg-[rgba(15,23,42,0.3)] rounded-lg p-3 border border-emerald-500/20">
                      <div className="text-sm font-medium text-emerald-400 mb-1.5">Hyperautomation</div>
                      <div className="flex items-end gap-2 mb-1">
                        <div className="text-2xl font-bold text-white">40-60%</div>
                        <div className="text-xs text-emerald-300">Task Reduction</div>
                      </div>
                      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full"
                          style={{ width: '50%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-300">Invoice processing, demand planning</div>
                    </div>
                    
                    {/* Composable ERP */}
                    <div className="bg-[rgba(15,23,42,0.3)] rounded-lg p-3 border border-emerald-500/20">
                      <div className="text-sm font-medium text-emerald-400 mb-1.5">Composable ERP</div>
                      <div className="flex items-end gap-2 mb-1">
                        <div className="text-2xl font-bold text-white">46%</div>
                        <div className="text-xs text-emerald-300">Adoption</div>
                      </div>
                      <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: '46%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-300">APIs/microservices for vendor flexibility</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Regional & Industry Trends + Strategic Implications */}
              <div className="bg-[rgba(27,34,42,0.3)] backdrop-blur-md rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-emerald-500/5 to-emerald-600/5 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <MdInsights className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Regional & Strategic Insights</h3>
                      <div className="flex items-center text-emerald-300 text-xs">
                        <MdLocationOn className="mr-1" /> Global Market Overview
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline visualization */}
                  <div className="mb-4 relative">
                    <div className="absolute left-0 top-5 bottom-5 w-[3px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-full"></div>
                    
                    {erpLandscapeData.timelines.map((item, index) => (
                      <div key={index} className="ml-6 mb-3 relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-2 border-white bg-gradient-to-r from-emerald-500 to-emerald-400" style={{
                          backgroundColor: index === 0 ? '#10B981' : index === 1 ? '#059669' : '#047857'
                        }}></div>
                        <div className="text-sm font-medium text-white">{item.year}: {item.event}</div>
                        <div className="text-xs text-slate-300">{item.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-white mb-1">Regional Distribution</div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-4 bg-slate-700/60 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <div className="text-xs text-white w-8 text-right">35%</div>
                    </div>
                    <div className="text-xs text-slate-400">North America: 35% of global ERP spending</div>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-slate-300">
                    <p>• <span className="text-white font-medium">Strategic imperative:</span> Migrate by 2027 to avoid 20-30% higher costs</p>
                    <p>• <span className="text-white font-medium">AI ROI:</span> 15-25% error reduction in finance/supply chain</p>
                    <p>• <span className="text-white font-medium">Risk factors:</span> Compliance gaps, operational inefficiencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-[#020305] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      {/* 3D Spline Component */}
      <div className="fixed w-full h-full z-0 opacity-90 pointer-events-none">
        <SplineWrapper scene="https://prod.spline.design/7o3AL69KlurQ-HoD/scene.splinecode" />
      </div>

      {/* Layout with left-aligned widgets */}
      <div className="flex h-screen p-6 relative z-10">
        {/* Left Column - stacked widgets */}
        <div className="w-1/4 h-full flex flex-col space-y-6">
          {/* MSP Client Database box */}
          <div className="rounded-3xl bg-gradient-to-br from-[#28292b]/60 via-[#28292b]/40 to-[rgba(40,41,43,0.15)] backdrop-blur-xl border border-emerald-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
            {/* Unique gradient pattern 1 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/15 to-emerald-600/10 opacity-20"></div>
            <div className="absolute -top-24 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full blur-3xl transform rotate-45"></div>
            <div className="absolute bottom-1/3 -right-16 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl flex flex-col">
              {/* Main icon and metrics display */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                    <MdOutlineAnalytics className="text-white text-3xl" />
                  </div>
                  <div className="ml-3">
                    <div className="text-4xl font-bold text-white tracking-tight">2.84<span className="text-lg font-normal text-white/80">M</span></div>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">IT Decision Makers</div>
                  </div>
                </div>
                <div 
                  className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-emerald-500/10 cursor-pointer transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                  onClick={() => navigate('/market-database')}
                  title="Go to Market Database"
                >
                  <MdOutlineSearch className="text-xl text-white/70" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">MSP Prospect Database</h3>
              <p className="text-sm text-slate-300 mb-4">Access to 2.84 million companies requiring cybersecurity and IT management</p>
              
              {/* Status indicators */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-emerald-400">
                    <MdOutlineCalendarMonth />
                  </div>
                  <div className="text-sm text-slate-200">Updated Daily</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-emerald-400">
                    <MdLocationOn />
                  </div>
                  <div className="text-sm text-slate-200">Global Coverage: 87 Countries</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 mr-3 text-emerald-400">
                    <MdAccessTime />
                  </div>
                  <div className="text-sm text-slate-200">Last Sync: 1h ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cybersecurity Intelligence box */}
          <div 
            ref={erpBoxRef}
            className="rounded-3xl bg-gradient-to-br from-[#28292b]/60 via-[#28292b]/40 to-[rgba(40,41,43,0.15)] backdrop-blur-xl border border-emerald-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group flex-1"
          >
            {/* Background patterns */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/15 to-emerald-600/10 opacity-20"></div>
            <div className="absolute -top-24 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full blur-3xl transform rotate-45"></div>
            <div className="absolute bottom-1/3 -right-16 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>

            <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl h-full flex flex-col">
              {/* Header with info icon */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                    <MdOutlineLightbulb className="text-white text-2xl" />
                  </div>
                  <div className="ml-3">
                    <div className="text-3xl font-bold text-white tracking-tight">94<span className="text-sm font-normal text-white/80">%</span></div>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">Data Enrichment</div>
                  </div>
                </div>
                <div 
                  className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-emerald-500/10 cursor-pointer transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                  onClick={() => setShowERPInfo(true)}
                  title="MSP Market Overview"
                >
                  <MdInfoOutline className="text-xl text-white/70" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">Cybersecurity Intelligence</h3>
              
              {/* Data Enrichment Progress */}
              <div className="bg-[rgba(27,34,42,0.5)] backdrop-blur-md rounded-xl p-4 border border-emerald-500/10 mb-3 relative overflow-hidden">
                {/* ... existing styling ... */}
                
                <div className="relative z-10">
                  <h3 className="text-white text-xs font-medium mb-3">MSP Intelligence Pipeline</h3>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 text-xs">IT Infrastructure</span>
                        <span className="text-emerald-400 text-xs font-medium">96%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 text-xs">Security Posture</span>
                        <span className="text-emerald-400 text-xs font-medium">92%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 text-xs">Compliance Status</span>
                        <span className="text-emerald-400 text-xs font-medium">88%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-[rgba(27,34,42,0.5)] backdrop-blur-md rounded-xl p-4 border border-emerald-500/10 mb-3 relative overflow-hidden">
                {/* ... existing styling ... */}
                
                <div className="relative z-10">
                  <h3 className="text-white text-xs font-medium mb-3">MSP Market Intelligence</h3>
                  
                  {/* Metrics data - Simple grid with key metrics */}
                  <div className="grid grid-cols-3 gap-x-3 gap-y-3">
                    <div>
                      <div className="text-emerald-400 text-xs font-medium">IT Contacts</div>
                      <div className="text-white text-lg font-bold">1.8<span className="text-sm">M</span></div>
                    </div>
                    
                    <div>
                      <div className="text-emerald-400 text-xs font-medium">Tech Stack</div>
                      <div className="text-white text-lg font-bold">950<span className="text-sm">K</span></div>
                    </div>
                    
                    <div>
                      <div className="text-emerald-400 text-xs font-medium">Security Data</div>
                      <div className="text-white text-lg font-bold">2.1<span className="text-sm">M</span></div>
                    </div>

                    <div>
                      <div className="text-emerald-400 text-xs font-medium">Compliance</div>
                      <div className="text-white text-lg font-bold">1.6<span className="text-sm">M</span></div>
                    </div>

                    <div>
                      <div className="text-emerald-400 text-xs font-medium">Employee Data</div>
                      <div className="text-white text-lg font-bold">2.3<span className="text-sm">M</span></div>
                    </div>

                    <div>
                      <div className="text-emerald-400 text-xs font-medium">Budget Data</div>
                      <div className="text-white text-lg font-bold">1.9<span className="text-sm">M</span></div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-emerald-400 text-xs font-medium">+ 12 more data points</span>
                  </div>
                </div>
              </div>
              
              {/* Data Quality */}
              <div className="flex-1 bg-[rgba(27,34,42,0.5)] backdrop-blur-md rounded-xl p-4 border border-emerald-500/10 relative overflow-hidden">
                {/* ... existing styling ... */}
                
                <div className="relative z-10">
                  <h3 className="text-white text-xs font-medium mb-3">Data Quality Metrics</h3>
                  
                  <div className="space-y-2">
                    <div className="bg-[rgba(15,23,42,0.4)] backdrop-blur-sm rounded-lg border border-emerald-500/10 p-2">
                      <div className="text-emerald-400 text-xs font-medium">Accuracy Rate</div>
                      <div className="text-white text-lg font-bold">97%</div>
                      <div className="flex items-center text-emerald-300 text-xs">
                        <MdTrendingUp className="mr-1" />
                        <span>Verified Monthly</span>
                      </div>
                    </div>
                    
                    <div className="bg-[rgba(15,23,42,0.4)] backdrop-blur-sm rounded-lg border border-emerald-500/10 p-2">
                      <div className="text-emerald-400 text-xs font-medium">Update Frequency</div>
                      <div className="text-white text-lg font-bold">12h</div>
                      <div className="flex items-center text-emerald-300 text-xs">
                        <MdTrendingUp className="mr-1" />
                        <span>Real-time Updates</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Center/Right area - mostly empty for the 3D visualization */}
        <div className="flex-1 relative h-full flex justify-end items-end">
          {/* Right side widget - positioned at bottom right */}
          <div className="w-2/5 mb-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#28292b]/60 via-[#28292b]/40 to-[rgba(40,41,43,0.15)] backdrop-blur-xl border border-emerald-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-visible">
              {/* Background patterns */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/15 to-emerald-600/10 opacity-20"></div>
              <div className="absolute -top-24 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full blur-3xl transform rotate-45"></div>
              <div className="absolute bottom-1/3 -right-16 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-full blur-2xl"></div>

              <div className="p-5 pt-6 relative z-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                      <MdOutlineEmail className="text-white text-2xl" />
                    </div>
                    <div className="ml-3">
                      <div className="text-3xl font-bold text-white tracking-tight">56<span className="text-sm font-normal text-white/80">%</span></div>
                      <div className="text-xs text-emerald-400 font-medium mt-0.5">Response Rate</div>
                    </div>
                  </div>
                  <button 
                    className="bg-[rgba(30,41,59,0.7)] backdrop-blur-md p-1.5 rounded-full shadow-sm border border-emerald-500/10 cursor-pointer transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/30"
                    onClick={() => navigate('/outreach-tracking')}
                    title="Go to Outreach Tracking"
                  >
                    <MdArrowOutward className="text-xl text-white/70" />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">MSP Outreach Performance</h3>
                
                {/* ... rest of the email campaign widget remains similar but with MSP context ... */}
                </div>
                        </div>
                        </div>
                              </div>
                                    </div>

      {/* Update ERP Landscape Info Modal to MSP Market Overview */}
      <ERPLandscapeInfoModal />

      {/* ... update the modal content to MSP market data ... */}

      {/* Add animation styles as a regular style tag */}
      <style>
        {`
          @keyframes popup-scale {
            0% { opacity: 0; transform: scale(0.6); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-popup-scale {
            animation: popup-scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
