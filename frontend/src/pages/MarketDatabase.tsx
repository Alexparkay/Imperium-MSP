import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useFilters } from '../contexts/FilterContext';
import { 
  MdSearch, 
  MdFilterList, 
  MdLocationOn, 
  MdFactory, 
  MdOutlineEmail, 
  MdOutlinePhone, 
  MdArrowForward, 
  MdAdd, 
  MdDelete, 
  MdEdit, 
  MdLink, 
  MdCheck, 
  MdChevronRight,
  MdFilterAlt,
  MdRefresh,
  MdOutlineRoofing,
  MdOutlineManageSearch,
  MdOutlineBusiness,
  MdSolarPower,
  MdOutlineElectricBolt,
  MdAreaChart,
  MdTrendingUp,
  MdBarChart,
  MdAttachMoney,
  MdPieChart,
  MdInsights,
  MdOutlineAnalytics,
  MdOutlineLightbulb,
  MdOutlineEnergySavingsLeaf,
  MdOutlineArrowUpward,
  MdAccessTime,
  MdOutlineCalendarMonth,
  MdOutlineSearch,
  MdOutlineLocationOn,
  MdOutlineCloud,
  MdOutlineWbSunny,
  MdKeyboardArrowRight,
  MdHomeWork,
  MdShowChart,
  MdEmail,
  MdDashboard,
  MdFilterAltOff,
  MdArrowBack,
  MdInfoOutline,
  MdStorage,
  MdComputer,
  MdDataUsage,
  MdSyncAlt,
  MdOutlineDataUsage,
  MdBusinessCenter,
  MdOutlineStarOutline,
  MdSecurity,
  MdShield,
  MdVpnKey,
  MdAccountBalance,
  MdTrendingDown,
  MdPeople,
  MdMonetizationOn,
  MdVerifiedUser,
  MdBusiness,
  MdPublic,
  MdWorkspacePremium,
  MdDeveloperBoard,
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { FaLinkedin, FaFilter } from 'react-icons/fa';

const complianceFrameworks = [
  "HIPAA", "PCI DSS", "SOC 2", "HITECH", "GLBA"
];

// Define ProCloud-specific filter interface
interface FilterState {
  companyName: string;
  state: string;
  industry: string;
  subIndustry: string;
  employeeCount: string;
  hiringStatus: string;
  compliance: string;
  licenseRenewal: string;
  rmmTool: string;
  hasCurrentMSP: boolean;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
}

// ProCloud-specific filter options based on their ideal customer profile
const targetStates = [
  "Arizona", "California", "Nevada", "Utah", "Pennsylvania", "New York", "Illinois", "New Jersey", "Delaware", "Maryland"
];

const healthcareSubIndustries = [
  "Doctor's Offices", "Surgical Centers", "Hospitals", "Dental Clinics", "Senior Living Centers", "Medical Clinics", "Urgent Care"
];

const financeSubIndustries = [
  "Banks", "Credit Unions", "Insurance Companies", "Investment Firms", "Payment Processing Firms", "Tax & Accounting Firms"
];

const targetIndustries = [
  "Healthcare", "Finance"
];

const licenseRenewals = [
  "Microsoft 365", "Google Workspace", "PrinterLogic", "SentinelOne", "No Renewals Identified"
];

const rmmTools = [
  "ConnectWise Automate", "Kaseya VSA", "Datto RMM", "NinjaRMM", "Atera", "No RMM Tool Identified"
];

const employeeCountRanges = [
  "50-500 employees", "50-100 employees", "100-200 employees", "200-350 employees", "350-500 employees"
];

const hiringIndicators = [
  "Actively Hiring IT Staff", "Recently Hired Technical Support", "CIO/CTO Position Open", "No Current IT Hiring"
];

const MarketDatabase = () => {
  const navigate = useNavigate();
  const { filters, setFilter, clearFilters, activeFilterCount } = useFilters();
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Centralized filter state for ProCloud MSP leads
  const [filterState, setFilterState] = useState<FilterState>({
    companyName: '',
    state: '',
    industry: '',
    subIndustry: '',
    employeeCount: '',
    hiringStatus: '',
    compliance: '',
    licenseRenewal: '',
    rmmTool: '',
    hasCurrentMSP: false,
    verifiedEmail: false,
    verifiedPhone: false,
  });
  
  const [companiesStats, setCompaniesStats] = useState({
    total: 5540, // Updated to match ProCloud's projected TAM
    filtered: 15, 
    healthcare: 3328, // 60% healthcare based on methodology
    finance: 2212, // 40% finance based on methodology
    enriched: 0,
    highPotential: 3989, // 72% high potential based on methodology (opportunity score ≥7)
  });
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 230,
    itemsPerPage: 10
  });

  // ProCloud Healthcare Companies from CSV data - Expanded Dataset
  const healthcareCompanies = [
    // Original 5 companies from CSV
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      jobTitle: "CIO",
      company: "Kaiser Permanente",
      emails: true,
      phoneNumbers: true,
      location: "Oakland, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 375,
      industry: "Healthcare",
      subIndustry: "Healthcare System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 9.2,
      hasCurrentMSP: false,
      techStackGaps: ["Epic EHR Integration", "Healthcare IT Security", "Compliance Reporting"],
      lastContactAttempt: "2024-01-15",
      emailDomain: "@kp.org",
      phoneNumber: "(510) 555-0123",
      website: "https://www.kaiserpermanentejobs.org",
      currentITRoles: "IT Engineer Applications, Senior IT Engineer Applications, IT Support Technician",
      technologyStack: "Epic EHR Microsoft Healthcare IT systems"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      jobTitle: "Chief Clinical Information Officer",
      company: "Northwell Health",
      emails: true,
      phoneNumbers: true,
      location: "New Hyde Park, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 450,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.9,
      hasCurrentMSP: false,
      techStackGaps: ["Epic Integration", "Healthcare Analytics", "Network Security"],
      lastContactAttempt: "2024-01-20",
      emailDomain: "@northwell.edu",
      phoneNumber: "(516) 555-0456",
      website: "https://jobs.northwell.edu",
      currentITRoles: "Chief Clinical Information Officer, IT Support, Information Technology positions",
      technologyStack: "Epic Microsoft Healthcare analytics"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      jobTitle: "Epic Senior IT Project Manager",
      company: "ChristianaCare",
      emails: true,
      phoneNumbers: true,
      location: "Newark, Delaware",
      state: "Delaware",
      enriched: true,
      verified: true,
      employeeCount: 400,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.7,
      hasCurrentMSP: false,
      techStackGaps: ["Epic EHR Security", "Microsoft Office Integration", "Healthcare IT"],
      lastContactAttempt: "2024-01-25",
      emailDomain: "@christianacare.org",
      phoneNumber: "(302) 555-0789",
      website: "https://careers.christianacare.org",
      currentITRoles: "Epic Senior IT Project Manager, IT Support positions",
      technologyStack: "Epic EHR Microsoft Office Healthcare IT"
    },
    {
      id: 4,
      name: "David Kim",
      jobTitle: "Clinical Analyst",
      company: "Penn Medicine",
      emails: true,
      phoneNumbers: true,
      location: "Philadelphia, Pennsylvania",
      state: "Pennsylvania",
      enriched: true,
      verified: true,
      employeeCount: 450,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.8,
      hasCurrentMSP: false,
      techStackGaps: ["Epic Integration", "Clinical Systems", "Microsoft Security"],
      lastContactAttempt: "2024-01-18",
      emailDomain: "@pennmedicine.org",
      phoneNumber: "(215) 555-0234",
      website: "https://careers.pennmedicine.org",
      currentITRoles: "Clinical Analyst, Application Analyst, IT Support",
      technologyStack: "Epic Microsoft Clinical systems"
    },
    {
      id: 5,
      name: "Jennifer Walsh",
      jobTitle: "IT Support Technician",
      company: "University of Utah Health",
      emails: true,
      phoneNumbers: true,
      location: "Salt Lake City, Utah",
      state: "Utah",
      enriched: true,
      verified: true,
      employeeCount: 400,
      industry: "Healthcare",
      subIndustry: "Healthcare System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.5,
      hasCurrentMSP: false,
      techStackGaps: ["DevOps Security", "Epic Integration", "Healthcare IT"],
      lastContactAttempt: "2024-01-22",
      emailDomain: "@healthcare.utah.edu",
      phoneNumber: "(801) 555-0567",
      website: "https://careers-uuhc.icims.com",
      currentITRoles: "IT Support Technician, Desktop Support, DevOps Engineer",
      technologyStack: "Microsoft Healthcare IT Epic"
    },
    // Additional expanded healthcare companies to reach scale
    {
      id: 25,
      name: "Dr. Maria Santos",
      jobTitle: "Director of Information Systems",
      company: "Banner Health",
      emails: true,
      phoneNumbers: true,
      location: "Phoenix, Arizona",
      state: "Arizona",
      enriched: true,
      verified: true,
      employeeCount: 385,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Google Workspace",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 8.4,
      hasCurrentMSP: false,
      techStackGaps: ["Cloud Security", "EMR Integration", "Network Monitoring"],
      lastContactAttempt: "2024-01-30",
      emailDomain: "@bannerhealth.com",
      phoneNumber: "(602) 555-1234"
    },
    {
      id: 26,
      name: "Robert Williams",
      jobTitle: "IT Manager",
      company: "Intermountain Healthcare",
      emails: true,
      phoneNumbers: true,
      location: "Salt Lake City, Utah",
      state: "Utah",
      enriched: true,
      verified: true,
      employeeCount: 425,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "Kaseya VSA",
      opportunityScore: 7.8,
      hasCurrentMSP: true,
      techStackGaps: ["Security Analytics", "Backup Solutions"],
      lastContactAttempt: "2024-01-28",
      emailDomain: "@intermountain.org",
      phoneNumber: "(801) 555-2345"
    },
    {
      id: 27,
      name: "Dr. Amanda Foster",
      jobTitle: "Chief Medical Information Officer",
      company: "Scripps Health",
      emails: true,
      phoneNumbers: true,
      location: "San Diego, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 395,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "PrinterLogic",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.9,
      hasCurrentMSP: false,
      techStackGaps: ["Print Security", "Medical Device Integration", "Data Encryption"],
      lastContactAttempt: "2024-01-26",
      emailDomain: "@scripps.edu",
      phoneNumber: "(858) 555-3456"
    },
    // Extended healthcare companies for full dataset appearance
    {
      id: 31,
      name: "Dr. Steven Thompson",
      jobTitle: "IT Director",
      company: "Cleveland Clinic",
      emails: true,
      phoneNumbers: true,
      location: "Cleveland, Ohio",
      state: "Ohio",
      enriched: true,
      verified: true,
      employeeCount: 465,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.6,
      hasCurrentMSP: false,
      techStackGaps: ["Epic Security", "Healthcare Analytics", "Compliance Tools"],
      lastContactAttempt: "2024-02-01",
      emailDomain: "@ccf.org",
      phoneNumber: "(216) 555-7890"
    },
    {
      id: 32,
      name: "Dr. Patricia Johnson",
      jobTitle: "CMIO",
      company: "Johns Hopkins Medicine",
      emails: true,
      phoneNumbers: true,
      location: "Baltimore, Maryland",
      state: "Maryland",
      enriched: true,
      verified: true,
      employeeCount: 480,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "HIPAA",
      licenseRenewal: "SentinelOne",
      rmmTool: "Datto RMM",
      opportunityScore: 9.4,
      hasCurrentMSP: false,
      techStackGaps: ["Research Data Security", "Clinical Integration", "AI/ML Infrastructure"],
      lastContactAttempt: "2024-02-02",
      emailDomain: "@jhmi.edu",
      phoneNumber: "(410) 555-8901"
    },
    {
      id: 33,
      name: "Mark Rodriguez",
      jobTitle: "VP Technology",
      company: "Dignity Health",
      emails: true,
      phoneNumbers: true,
      location: "San Francisco, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 415,
      industry: "Healthcare",
      subIndustry: "Healthcare System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Google Workspace",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 8.1,
      hasCurrentMSP: true,
      techStackGaps: ["Cloud Migration", "Legacy System Integration"],
      lastContactAttempt: "2024-02-03",
      emailDomain: "@dignityhealth.org",
      phoneNumber: "(415) 555-9012"
    },
    {
      id: 34,
      name: "Dr. Lisa Anderson",
      jobTitle: "Practice Administrator",
      company: "Scottsdale Healthcare Partners",
      emails: true,
      phoneNumbers: true,
      location: "Scottsdale, Arizona",
      state: "Arizona",
      enriched: true,
      verified: true,
      employeeCount: 95,
      industry: "Healthcare",
      subIndustry: "Doctor's Offices",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "Atera",
      opportunityScore: 7.9,
      hasCurrentMSP: false,
      techStackGaps: ["Practice Management Security", "Patient Portal"],
      lastContactAttempt: "2024-02-04",
      emailDomain: "@scottsdalehealth.com",
      phoneNumber: "(480) 555-0123"
    },
    {
      id: 35,
      name: "Michael Chang",
      jobTitle: "Information Systems Manager",
      company: "St. Joseph Health",
      emails: true,
      phoneNumbers: true,
      location: "Orange, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 355,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "No Current IT Hiring",
      compliance: "HIPAA",
      licenseRenewal: "PrinterLogic",
      rmmTool: "Kaseya VSA",
      opportunityScore: 7.3,
      hasCurrentMSP: true,
      techStackGaps: ["Print Management", "Endpoint Security"],
      lastContactAttempt: "2024-02-05",
      emailDomain: "@stjoe.org",
      phoneNumber: "(714) 555-1234"
    },
    {
      id: 36,
      name: "Dr. Nancy Williams",
      jobTitle: "Chief Information Officer",
      company: "Temple University Health System",
      emails: true,
      phoneNumbers: true,
      location: "Philadelphia, Pennsylvania",
      state: "Pennsylvania",
      enriched: true,
      verified: true,
      employeeCount: 420,
      industry: "Healthcare",
      subIndustry: "Hospital System",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.8,
      hasCurrentMSP: false,
      techStackGaps: ["Epic Implementation", "Network Infrastructure", "Security Operations"],
      lastContactAttempt: "2024-02-06",
      emailDomain: "@tuhs.temple.edu",
      phoneNumber: "(215) 555-2345"
    }
  ];

  // ProCloud Finance Companies from CSV data - Expanded Dataset
  const financeCompanies = [
    // Original 5 companies from CSV
    {
      id: 6,
      name: "Alex Thompson",
      jobTitle: "Backend Engineer",
      company: "BitGo",
      emails: true,
      phoneNumbers: true,
      location: "Palo Alto, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 175,
      industry: "Finance",
      subIndustry: "Financial Services/Cryptocurrency",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "No Renewals Identified",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.3,
      hasCurrentMSP: false,
      techStackGaps: ["PCI DSS Compliance", "Cryptocurrency Security", "AWS Security"],
      lastContactAttempt: "2024-01-28",
      emailDomain: "@bitgo.com",
      phoneNumber: "(650) 555-0890",
      website: "http://www.bitgo.com",
      currentITRoles: "Backend Engineer DevOps Engineer Security Engineer",
      technologyStack: "Node.js, Go, PostgreSQL, AWS"
    },
    {
      id: 7,
      name: "Sarah Martinez",
      jobTitle: "Platform Engineer",
      company: "Betterment",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 175,
      industry: "Finance",
      subIndustry: "Investment Management",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "No Renewals Identified",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.1,
      hasCurrentMSP: false,
      techStackGaps: ["SEC Compliance", "Kubernetes Security", "Data Protection"],
      lastContactAttempt: "2024-01-30",
      emailDomain: "@betterment.com",
      phoneNumber: "(212) 555-0123",
      website: "http://www.betterment.com",
      currentITRoles: "Software Engineer Platform Engineer Data Engineer",
      technologyStack: "Python, AWS, Kubernetes, PostgreSQL"
    },
    {
      id: 8,
      name: "Robert Chen",
      jobTitle: "DevOps Engineer",
      company: "Alloy",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 375,
      industry: "Finance",
      subIndustry: "Identity Verification/Banking",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "PCI DSS",
      licenseRenewal: "No Renewals Identified",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.6,
      hasCurrentMSP: false,
      techStackGaps: ["Banking Security", "Identity Verification", "Docker Security"],
      lastContactAttempt: "2024-01-26",
      emailDomain: "@alloy.com",
      phoneNumber: "(646) 555-0456",
      website: "https://www.alloy.com",
      currentITRoles: "Software Engineer DevOps Engineer Security Engineer",
      technologyStack: "Ruby, PostgreSQL, AWS, Docker"
    },
    {
      id: 9,
      name: "Michelle Wu",
      jobTitle: "IT Support Specialist",
      company: "Trinity Capital",
      emails: true,
      phoneNumbers: true,
      location: "Phoenix, Arizona",
      state: "Arizona",
      enriched: true,
      verified: true,
      employeeCount: 175,
      industry: "Finance",
      subIndustry: "Investment Firm",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.4,
      hasCurrentMSP: false,
      techStackGaps: ["SEC Regulations", "Azure Security", "Investment Systems"],
      lastContactAttempt: "2024-01-24",
      emailDomain: "@trinitycap.com",
      phoneNumber: "(602) 555-0789",
      website: "https://trinitycap.com",
      currentITRoles: "IT Support Specialist Systems Administrator Technology Analyst",
      technologyStack: "Microsoft Office 365, Azure, SQL Server"
    },
    {
      id: 10,
      name: "James Park",
      jobTitle: "Infrastructure Engineer",
      company: "Elliott Investment Management",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 375,
      industry: "Finance",
      subIndustry: "Hedge Fund",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "No Renewals Identified",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 9.1,
      hasCurrentMSP: false,
      techStackGaps: ["Financial Trading Security", "Bloomberg Integration", "Unix/Linux Security"],
      lastContactAttempt: "2024-01-21",
      emailDomain: "@elliottmgmt.com",
      phoneNumber: "(212) 555-0234",
      website: "http://www.elliottmgmt.com",
      currentITRoles: "Quantitative Developer Infrastructure Engineer IT Support",
      technologyStack: "Python, C++, Bloomberg Terminal, Unix/Linux"
    },
    // Additional expanded finance companies to reach scale
    {
      id: 28,
      name: "Michael Davis",
      jobTitle: "Chief Technology Officer",
      company: "Charles Schwab",
      emails: true,
      phoneNumbers: true,
      location: "San Francisco, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 485,
      industry: "Finance",
      subIndustry: "Investment Firm",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "PCI DSS",
      licenseRenewal: "Microsoft 365",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 9.3,
      hasCurrentMSP: false,
      techStackGaps: ["Trading Platform Security", "Real-time Analytics", "Compliance Automation"],
      lastContactAttempt: "2024-01-29",
      emailDomain: "@schwab.com",
      phoneNumber: "(415) 555-4567"
    },
    {
      id: 29,
      name: "Jennifer Adams",
      jobTitle: "VP of Information Technology",
      company: "American Express",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 445,
      industry: "Finance",
      subIndustry: "Payment Processing",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "PCI DSS",
      licenseRenewal: "SentinelOne",
      rmmTool: "Kaseya VSA",
      opportunityScore: 8.7,
      hasCurrentMSP: true,
      techStackGaps: ["Payment Security", "Fraud Detection", "API Security"],
      lastContactAttempt: "2024-01-27",
      emailDomain: "@aexp.com",
      phoneNumber: "(212) 555-5678"
    },
    {
      id: 30,
      name: "Dr. Rachel Kim",
      jobTitle: "Director of Technology Operations",
      company: "Goldman Sachs",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 465,
      industry: "Finance",
      subIndustry: "Investment Banking",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "SOC 2",
      licenseRenewal: "PrinterLogic",
      rmmTool: "Datto RMM",
      opportunityScore: 8.2,
      hasCurrentMSP: true,
      techStackGaps: ["High-Frequency Trading Security", "Risk Management Systems"],
      lastContactAttempt: "2024-01-31",
      emailDomain: "@gs.com",
      phoneNumber: "(212) 555-6789"
    },
    // Extended finance companies for full dataset appearance
    {
      id: 37,
      name: "Thomas Wright",
      jobTitle: "Chief Information Security Officer",
      company: "JPMorgan Chase",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 495,
      industry: "Finance",
      subIndustry: "Banking",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "PCI DSS",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 9.1,
      hasCurrentMSP: false,
      techStackGaps: ["Banking Security", "Fraud Prevention", "Digital Banking Platform"],
      lastContactAttempt: "2024-02-07",
      emailDomain: "@jpmorgan.com",
      phoneNumber: "(212) 555-7890"
    },
    {
      id: 38,
      name: "Sandra Lopez",
      jobTitle: "IT Director",
      company: "Wells Fargo",
      emails: true,
      phoneNumbers: true,
      location: "San Francisco, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 475,
      industry: "Finance",
      subIndustry: "Banking",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "PCI DSS",
      licenseRenewal: "SentinelOne",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 8.9,
      hasCurrentMSP: false,
      techStackGaps: ["Regulatory Compliance", "Mobile Banking Security", "Data Analytics"],
      lastContactAttempt: "2024-02-08",
      emailDomain: "@wellsfargo.com",
      phoneNumber: "(415) 555-8901"
    },
    {
      id: 39,
      name: "Kevin Martinez",
      jobTitle: "VP Technology Infrastructure",
      company: "Fidelity Investments",
      emails: true,
      phoneNumbers: true,
      location: "Boston, Massachusetts",
      state: "Massachusetts",
      enriched: true,
      verified: true,
      employeeCount: 440,
      industry: "Finance",
      subIndustry: "Investment Management",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "SOC 2",
      licenseRenewal: "Google Workspace",
      rmmTool: "Datto RMM",
      opportunityScore: 8.5,
      hasCurrentMSP: true,
      techStackGaps: ["Investment Platform Security", "Portfolio Management Systems"],
      lastContactAttempt: "2024-02-09",
      emailDomain: "@fidelity.com",
      phoneNumber: "(617) 555-9012"
    },
    {
      id: 40,
      name: "Angela Brown",
      jobTitle: "Systems Administrator",
      company: "State Street Corporation",
      emails: true,
      phoneNumbers: true,
      location: "Boston, Massachusetts",
      state: "Massachusetts",
      enriched: true,
      verified: true,
      employeeCount: 385,
      industry: "Finance",
      subIndustry: "Financial Services",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "Microsoft 365",
      rmmTool: "Atera",
      opportunityScore: 7.7,
      hasCurrentMSP: false,
      techStackGaps: ["Custody Systems Security", "Global Operations Platform"],
      lastContactAttempt: "2024-02-10",
      emailDomain: "@statestreet.com",
      phoneNumber: "(617) 555-0123"
    },
    {
      id: 41,
      name: "Richard Taylor",
      jobTitle: "Chief Technology Officer",
      company: "Prudential Financial",
      emails: true,
      phoneNumbers: true,
      location: "Newark, New Jersey",
      state: "New Jersey",
      enriched: true,
      verified: true,
      employeeCount: 455,
      industry: "Finance",
      subIndustry: "Insurance",
      hiringStatus: "No Current IT Hiring",
      compliance: "SOC 2",
      licenseRenewal: "PrinterLogic",
      rmmTool: "Kaseya VSA",
      opportunityScore: 7.4,
      hasCurrentMSP: true,
      techStackGaps: ["Insurance Platform Modernization", "Legacy System Integration"],
      lastContactAttempt: "2024-02-11",
      emailDomain: "@prudential.com",
      phoneNumber: "(973) 555-1234"
    },
    {
      id: 42,
      name: "Maria Garcia",
      jobTitle: "Information Systems Manager",
      company: "T. Rowe Price",
      emails: true,
      phoneNumbers: true,
      location: "Baltimore, Maryland",
      state: "Maryland",
      enriched: true,
      verified: true,
      employeeCount: 325,
      industry: "Finance",
      subIndustry: "Investment Management",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.3,
      hasCurrentMSP: false,
      techStackGaps: ["Investment Research Platform", "Client Portal Security", "Risk Analytics"],
      lastContactAttempt: "2024-02-12",
      emailDomain: "@troweprice.com",
      phoneNumber: "(410) 555-2345"
    }
  ];

  // Combined dataset state management
  const [selectedDataset, setSelectedDataset] = useState<'combined' | 'healthcare' | 'finance'>('combined');
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Dr. Michael Rodriguez",
      jobTitle: "Practice Administrator",
      company: "Desert Valley Medical Group",
      emails: true,
      phoneNumbers: true,
      location: "Phoenix, Arizona",
      state: "Arizona",
      enriched: true,
      verified: true,
      employeeCount: 85,
      industry: "Healthcare",
      subIndustry: "Doctor's Offices",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.5,
      hasCurrentMSP: false,
      techStackGaps: ["Endpoint Security", "Backup Solution", "Compliance Reporting"],
      lastContactAttempt: "2024-01-15",
      emailDomain: "@desertvmed.com",
      phoneNumber: "(602) 555-0123"
    },
    {
      id: 2,
      name: "Sarah Chen",
      jobTitle: "Chief Information Officer",
      company: "Pacific Coast Credit Union",
      emails: true,
      phoneNumbers: true,
      location: "Los Angeles, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 245,
      industry: "Finance",
      subIndustry: "Credit Unions",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "PCI DSS",
      licenseRenewal: "SentinelOne",
      rmmTool: "Kaseya VSA",
      opportunityScore: 7.2,
      hasCurrentMSP: true,
      techStackGaps: ["Security Monitoring", "Incident Response"],
      lastContactAttempt: "2024-01-20",
      emailDomain: "@pccreditunion.org",
      phoneNumber: "(213) 555-0456"
    },
    {
      id: 3,
      name: "James Wilson",
      jobTitle: "IT Director",
      company: "Sunrise Senior Living",
      emails: true,
      phoneNumbers: true,
      location: "Las Vegas, Nevada",
      state: "Nevada",
      enriched: true,
      verified: true,
      employeeCount: 156,
      industry: "Healthcare",
      subIndustry: "Senior Living Centers",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "HIPAA",
      licenseRenewal: "Google Workspace",
      rmmTool: "NinjaRMM",
      opportunityScore: 9.1,
      hasCurrentMSP: false,
      techStackGaps: ["HIPAA Compliance Tools", "Data Backup", "Network Security"],
      lastContactAttempt: "2024-01-10",
      emailDomain: "@sunrisesenior.com",
      phoneNumber: "(702) 555-0789"
    },
    {
      id: 4,
      name: "Dr. Lisa Patel",
      jobTitle: "Chief Medical Officer",
      company: "Mountain View Surgical Center",
      emails: true,
      phoneNumbers: true,
      location: "Salt Lake City, Utah",
      state: "Utah",
      enriched: true,
      verified: true,
      employeeCount: 92,
      industry: "Healthcare",
      subIndustry: "Surgical Centers",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.8,
      hasCurrentMSP: false,
      techStackGaps: ["EMR Integration", "Security Tools", "Disaster Recovery"],
      lastContactAttempt: "2024-01-25",
      emailDomain: "@mvsc.com",
      phoneNumber: "(801) 555-0234"
    },
    {
      id: 5,
      name: "Robert Kim",
      jobTitle: "Chief Technology Officer",
      company: "Liberty Financial Advisors",
      emails: true,
      phoneNumbers: true,
      location: "Philadelphia, Pennsylvania",
      state: "Pennsylvania",
      enriched: true,
      verified: true,
      employeeCount: 312,
      industry: "Finance",
      subIndustry: "Investment Firms",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "SOC 2",
      licenseRenewal: "PrinterLogic",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 6.9,
      hasCurrentMSP: true,
      techStackGaps: ["Print Management", "Mobile Security"],
      lastContactAttempt: "2024-01-18",
      emailDomain: "@libertyfa.com",
      phoneNumber: "(215) 555-0567"
    },
    {
      id: 6,
      name: "Maria Gonzalez",
      jobTitle: "Operations Manager",
      company: "Manhattan Dental Associates",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 78,
      industry: "Healthcare",
      subIndustry: "Dental Clinics",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "Microsoft 365",
      rmmTool: "Atera",
      opportunityScore: 8.3,
      hasCurrentMSP: false,
      techStackGaps: ["Patient Portal Security", "Data Encryption", "Backup Systems"],
      lastContactAttempt: "2024-01-22",
      emailDomain: "@manhattandental.com",
      phoneNumber: "(212) 555-0890"
    },
    {
      id: 7,
      name: "David Thompson",
      jobTitle: "IT Manager",
      company: "Chicago Community Bank",
      emails: true,
      phoneNumbers: true,
      location: "Chicago, Illinois",
      state: "Illinois",
      enriched: true,
      verified: true,
      employeeCount: 189,
      industry: "Finance",
      subIndustry: "Banks",
      hiringStatus: "No Current IT Hiring",
      compliance: "PCI DSS",
      licenseRenewal: "SentinelOne",
      rmmTool: "Datto RMM",
      opportunityScore: 7.5,
      hasCurrentMSP: true,
      techStackGaps: ["Endpoint Protection", "Email Security"],
      lastContactAttempt: "2024-01-12",
      emailDomain: "@chicagobank.com",
      phoneNumber: "(312) 555-0123"
    },
    {
      id: 8,
      name: "Jennifer Adams",
      jobTitle: "Practice Administrator",
      company: "Garden State Family Medicine",
      emails: true,
      phoneNumbers: true,
      location: "Newark, New Jersey",
      state: "New Jersey",
      enriched: true,
      verified: true,
      employeeCount: 64,
      industry: "Healthcare",
      subIndustry: "Doctor's Offices",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "HIPAA",
      licenseRenewal: "Google Workspace",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 9.2,
      hasCurrentMSP: false,
      techStackGaps: ["EMR Security", "Network Monitoring", "Compliance Reporting"],
      lastContactAttempt: "2024-01-28",
      emailDomain: "@gsfm.com",
      phoneNumber: "(973) 555-0456"
    },
    {
      id: 9,
      name: "Mark Davis",
      jobTitle: "Chief Financial Officer",
      company: "Diamond State Insurance",
      emails: true,
      phoneNumbers: true,
      location: "Wilmington, Delaware",
      state: "Delaware",
      enriched: true,
      verified: true,
      employeeCount: 134,
      industry: "Finance",
      subIndustry: "Insurance Companies",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "SOC 2",
      licenseRenewal: "Microsoft 365",
      rmmTool: "NinjaRMM",
      opportunityScore: 7.8,
      hasCurrentMSP: false,
      techStackGaps: ["Data Loss Prevention", "Identity Management"],
      lastContactAttempt: "2024-01-16",
      emailDomain: "@diamondins.com",
      phoneNumber: "(302) 555-0789"
    },
    {
      id: 10,
      name: "Dr. Amanda Foster",
      jobTitle: "Chief of Staff",
      company: "Baltimore Regional Hospital",
      emails: true,
      phoneNumbers: true,
      location: "Baltimore, Maryland",
      state: "Maryland",
      enriched: true,
      verified: true,
      employeeCount: 387,
      industry: "Healthcare",
      subIndustry: "Hospitals",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "PrinterLogic",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 8.7,
      hasCurrentMSP: true,
      techStackGaps: ["Medical Device Security", "Print Security"],
      lastContactAttempt: "2024-01-14",
      emailDomain: "@baltimoreregional.org",
      phoneNumber: "(410) 555-0234"
    },
    {
      id: 11,
      name: "Thomas Lee",
      jobTitle: "Managing Partner",
      company: "Golden Gate Tax & Accounting",
      emails: true,
      phoneNumbers: true,
      location: "San Francisco, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 98,
      industry: "Finance",
      subIndustry: "Tax & Accounting Firms",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "SOC 2",
      licenseRenewal: "Google Workspace",
      rmmTool: "No RMM Tool Identified",
      opportunityScore: 8.9,
      hasCurrentMSP: false,
      techStackGaps: ["Client Data Protection", "Tax Software Security", "Document Management"],
      lastContactAttempt: "2024-01-26",
      emailDomain: "@ggcpa.com",
      phoneNumber: "(415) 555-0567"
    },
    {
      id: 12,
      name: "Dr. Patricia Rodriguez",
      jobTitle: "Medical Director",
      company: "Valley Urgent Care",
      emails: true,
      phoneNumbers: true,
      location: "Phoenix, Arizona",
      state: "Arizona",
      enriched: true,
      verified: true,
      employeeCount: 72,
      industry: "Healthcare",
      subIndustry: "Urgent Care",
      hiringStatus: "CIO/CTO Position Open",
      compliance: "HIPAA",
      licenseRenewal: "SentinelOne",
      rmmTool: "Atera",
      opportunityScore: 8.4,
      hasCurrentMSP: false,
      techStackGaps: ["Patient Check-in Systems", "Mobile Security", "Telemedicine Platform"],
      lastContactAttempt: "2024-01-30",
      emailDomain: "@valleyurgent.com",
      phoneNumber: "(602) 555-0890"
    },
    {
      id: 13,
      name: "Steven Walsh",
      jobTitle: "Vice President of Technology",
      company: "Empire Payment Solutions",
      emails: true,
      phoneNumbers: true,
      location: "New York, New York",
      state: "New York",
      enriched: true,
      verified: true,
      employeeCount: 278,
      industry: "Finance",
      subIndustry: "Payment Processing Firms",
      hiringStatus: "Recently Hired Technical Support",
      compliance: "PCI DSS",
      licenseRenewal: "Microsoft 365",
      rmmTool: "Kaseya VSA",
      opportunityScore: 7.6,
      hasCurrentMSP: true,
      techStackGaps: ["Payment Security", "Fraud Detection"],
      lastContactAttempt: "2024-01-21",
      emailDomain: "@empirepay.com",
      phoneNumber: "(646) 555-0123"
    },
    {
      id: 14,
      name: "Dr. Kevin Park",
      jobTitle: "Chief Executive Officer",
      company: "Westside Medical Clinic",
      emails: true,
      phoneNumbers: true,
      location: "Los Angeles, California",
      state: "California",
      enriched: true,
      verified: true,
      employeeCount: 115,
      industry: "Healthcare",
      subIndustry: "Medical Clinics",
      hiringStatus: "Actively Hiring IT Staff",
      compliance: "HIPAA",
      licenseRenewal: "PrinterLogic",
      rmmTool: "Datto RMM",
      opportunityScore: 8.6,
      hasCurrentMSP: false,
      techStackGaps: ["HIPAA Risk Assessment", "Print Management", "Network Segmentation"],
      lastContactAttempt: "2024-01-27",
      emailDomain: "@westsidemedical.com",
      phoneNumber: "(323) 555-0456"
    },
    {
      id: 15,
      name: "Rachel Martinez",
      jobTitle: "Information Systems Director",
      company: "First Community Credit Union",
      emails: true,
      phoneNumbers: true,
      location: "Las Vegas, Nevada",
      state: "Nevada",
      enriched: true,
      verified: true,
      employeeCount: 203,
      industry: "Finance",
      subIndustry: "Credit Unions",
      hiringStatus: "No Current IT Hiring",
      compliance: "PCI DSS",
      licenseRenewal: "SentinelOne",
      rmmTool: "ConnectWise Automate",
      opportunityScore: 7.1,
      hasCurrentMSP: true,
      techStackGaps: ["Mobile Banking Security", "ATM Monitoring"],
      lastContactAttempt: "2024-01-19",
      emailDomain: "@firstcommunitycu.org",
      phoneNumber: "(702) 555-0789"
    }
  ]);

  // Custom select component to fix white dropdown issue
  const CustomSelect = ({ 
    value, 
    onChange, 
    options, 
    placeholder = "Select..."
  }: { 
    value: string; 
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    const selectedOption = options.find(option => option.value === value);
    
    // Get dropdown position based on button position
    const getDropdownPosition = () => {
      if (!buttonRef.current) return { top: 0, left: 0, width: 0 };
      
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      };
    };
    
    const position = getDropdownPosition();
    
    return (
      <div className="relative" ref={selectRef}>
        <button
          ref={buttonRef}
          type="button"
          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-[#28292b] backdrop-blur-sm text-white focus:ring-2 focus:ring-[#10ba82] focus:border-transparent transition-all flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`${!selectedOption ? 'text-white/50' : 'text-white'} truncate pr-2`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <MdKeyboardArrowRight className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        
        {isOpen && createPortal(
          <div 
            className="fixed z-[9999] rounded-md bg-[#28292b] border border-white/10 shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`
            }}
          >
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`cursor-pointer select-none relative py-2 px-3 ${
                    option.value === value 
                      ? 'bg-gradient-to-r from-[#10ba82]/40 to-[#0c9a6c]/30 text-white' 
                      : 'text-white/70 hover:bg-gradient-to-r hover:from-[#10ba82]/5 hover:via-[#0c9a6c]/3 hover:to-[#0c9a6c]/5'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  };

  // Toggle filter sections
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleFilterChange = (category: string, value: string | boolean) => {
    // Update activeFilters state
    if (typeof value === 'string' && value === '') {
      // Clear this filter
      const newActiveFilters = { ...activeFilters };
      delete newActiveFilters[category];
      setActiveFilters(newActiveFilters);
    } else {
      // Set or update this filter
      setActiveFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
    
    // Update the corresponding state variable for ProCloud filters
    switch (category) {
      case 'companyName':
        setFilterState(prev => ({ ...prev, companyName: value as string }));
        break;
      case 'state':
        setFilterState(prev => ({ ...prev, state: value as string }));
        break;
      case 'industry':
        setFilterState(prev => ({ ...prev, industry: value as string }));
        break;
      case 'subIndustry':
        setFilterState(prev => ({ ...prev, subIndustry: value as string }));
        break;
      case 'employeeCount':
        setFilterState(prev => ({ ...prev, employeeCount: value as string }));
        break;
      case 'hiringStatus':
        setFilterState(prev => ({ ...prev, hiringStatus: value as string }));
        break;
      case 'compliance':
        setFilterState(prev => ({ ...prev, compliance: value as string }));
        break;
      case 'licenseRenewal':
        setFilterState(prev => ({ ...prev, licenseRenewal: value as string }));
        break;
      case 'rmmTool':
        setFilterState(prev => ({ ...prev, rmmTool: value as string }));
        break;
      case 'hasCurrentMSP':
        setFilterState(prev => ({ ...prev, hasCurrentMSP: value as boolean }));
        break;
      case 'verifiedEmail':
        setFilterState(prev => ({ ...prev, verifiedEmail: value as boolean }));
        break;
      case 'verifiedPhone':
        setFilterState(prev => ({ ...prev, verifiedPhone: value as boolean }));
        break;
    }
    
    // Calculate how many filters are applied (excluding empty string filters)
    const activeFilterCount = Object.entries({ 
      ...filterState, 
      [category]: value 
    }).filter(([_, val]) => {
      if (typeof val === 'string') return val !== '';
      return val === true;
    }).length;
    
    // Calculate filtered count based on number of active filters
    let newFilteredCount = companiesStats.total;
    
    // Base reduction - each filter reduces the count by a percentage
    if (activeFilterCount > 0) {
      // Start with a baseline of 60% of total for first filter
      // Each additional filter reduces by increasing percentages
      switch (activeFilterCount) {
        case 1:
          newFilteredCount = Math.round(newFilteredCount * 0.60); // 60% of total
          break;
        case 2:
          newFilteredCount = Math.round(newFilteredCount * 0.40); // 40% of total
          break;
        case 3:
          newFilteredCount = Math.round(newFilteredCount * 0.27); // 27% of total
          break;
        case 4:
          newFilteredCount = Math.round(newFilteredCount * 0.19); // 19% of total
          break;
        case 5:
          newFilteredCount = Math.round(newFilteredCount * 0.12); // 12% of total
          break;
        default:
          newFilteredCount = Math.round(newFilteredCount * 0.05); // 5% of total for 6+ filters
      }
    }
    
    // Additional filter-specific reductions
    if (category === 'companyName' && typeof value === 'string' && value !== '') {
      // If filtering by company name, reduce count based on name specificity
      // The longer the name filter, the fewer results
      newFilteredCount = Math.max(10, Math.round(newFilteredCount * (1 - (value.length * 0.05))));
    }
    
    // Ensure minimum reasonable result count
    newFilteredCount = Math.max(newFilteredCount, 5);
    
    // Update companies stats with new filtered count
    setCompaniesStats(prev => ({
      ...prev,
      filtered: newFilteredCount
    }));
    
    // Update pagination
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(newFilteredCount / prev.itemsPerPage)
    }));
  };

  // Add a useEffect to update high potential and enriched counts when filtered count changes
  useEffect(() => {
    // Update enriched count based on filtered count, but keep highPotential fixed at 1964
    setCompaniesStats(prev => ({
      ...prev,
      enriched: 0,
      highPotential: 1964,
    }));
  }, [companiesStats.filtered]);

  // Update the clearAllFilters function for ProCloud filters
  const clearAllFilters = () => {
    setFilterState({
      companyName: '',
      state: '',
      industry: '',
      subIndustry: '',
      employeeCount: '',
      hiringStatus: '',
      compliance: '',
      licenseRenewal: '',
      rmmTool: '',
      hasCurrentMSP: false,
      verifiedEmail: false,
      verifiedPhone: false,
    });
    
    setActiveFilters({});
    
    // Reset filtered count to total, but keep highPotential fixed at 1964
    setCompaniesStats(prev => ({
      ...prev,
      filtered: prev.total,
      highPotential: 1964,
      enriched: 0
    }));
    
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: Math.ceil(companiesStats.total / prev.itemsPerPage)
    }));
  };

  const handleScrape = () => {
    if (!filters.companyType) {
      toast.error('Please enter what companies you are looking for');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Build a description of what's being searched for
      let searchDescription = filters.companyType;
      
      // Add filter details to the search description
      if (filterState.state) {
        searchDescription += ` in ${filterState.state}`;
      }
      if (filterState.industry) {
        searchDescription += ` (${filterState.industry} industry)`;
      }
      if (filterState.compliance) {
        searchDescription += ` with ${filterState.compliance} compliance`;
      }
      if (filterState.licenseRenewal && filterState.licenseRenewal !== 'No Renewals Identified') {
        searchDescription += ` with ${filterState.licenseRenewal} renewal`;
      }
      if (filterState.verifiedEmail || filterState.verifiedPhone) {
        searchDescription += " with verified contacts";
      }
      
      toast.success(`MSP lead data for ${searchDescription} scraped successfully`);
      
      // Note: In ProCloud implementation, new leads would be added with proper structure
      setCompaniesStats(prev => ({
        ...prev,
        total: prev.total + 2,
        filtered: prev.filtered + 2
      }));
    }, 2000);
  };

  const handleEnrich = () => {
    if (selectedCompanies.length === 0) {
      toast.error('Please select at least one company to enrich');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${selectedCompanies.length} companies enriched successfully`);
      
      // Update enriched companies
      setCompanies(prev => prev.map(company => {
        if (selectedCompanies.includes(company.id)) {
          return {
            ...company,
            enriched: true
          };
        }
        return company;
      }));
      
      setSelectedCompanies([]);
    }, 2000);
  };

  const handleContinue = () => {
    if (companies.filter(f => f.enriched).length === 0) {
      toast.error('Please enrich at least one company before continuing');
      return;
    }
    navigate('/company-enrichment');
  };

  const handleSelectCompany = (id: number) => {
    setSelectedCompanies(prev => {
      if (prev.includes(id)) {
        return prev.filter(companyId => companyId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Helper function to generate random gradient patterns
  const getRandomGradient = () => {
    const patterns = [
      {
        base: "bg-gradient-to-tr from-green-500/30 via-emerald-500/20 to-green-600/15",
        blobs: [
          "absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-green-500/40",
          "absolute bottom-1/3 -right-10 w-32 h-32 bg-gradient-to-tl from-emerald-500/30",
          "absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-600/25"
        ]
      },
      {
        base: "bg-gradient-to-bl from-green-600/30 via-emerald-600/20 to-green-500/15",
        blobs: [
          "absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-tr from-green-500/40",
          "absolute -bottom-10 right-1/4 w-36 h-36 bg-gradient-to-bl from-emerald-500/35",
          "absolute top-1/4 right-1/3 w-28 h-28 bg-gradient-to-tr from-green-600/30"
        ]
      },
      {
        base: "bg-gradient-to-r from-green-500/30 via-emerald-500/20 to-green-600/25",
        blobs: [
          "absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-green-500/45",
          "absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-emerald-600/40",
          "absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-bl from-green-500/35"
        ]
      }
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  // Function to get companies based on selected dataset
  const getCompaniesForDataset = () => {
    switch (selectedDataset) {
      case 'healthcare':
        return healthcareCompanies;
      case 'finance':
        return financeCompanies;
      case 'combined':
      default:
        return [...healthcareCompanies, ...financeCompanies, ...companies];
    }
  };

  // Function to get filtered companies with ProCloud-specific filtering logic
  const getFilteredCompanies = () => {
    const currentCompanies = getCompaniesForDataset();
    
    return currentCompanies.filter(company => {
      // Company name filter
      if (filterState.companyName && filterState.companyName !== '') {
        const searchTerm = filterState.companyName.toLowerCase();
        if (!company.name.toLowerCase().includes(searchTerm) && 
            !company.company.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // State filter (ProCloud target states)
      if (filterState.state && filterState.state !== '') {
        if (company.state !== filterState.state) {
          return false;
        }
      }

      // Industry filter (Healthcare or Finance)
      if (filterState.industry && filterState.industry !== '') {
        if (company.industry !== filterState.industry) {
          return false;
        }
      }

      // Sub-industry filter (specific healthcare/finance types)
      if (filterState.subIndustry && filterState.subIndustry !== '') {
        if (company.subIndustry !== filterState.subIndustry) {
          return false;
        }
      }

      // Employee count filter (50-500 employees)
      if (filterState.employeeCount && filterState.employeeCount !== '') {
        const range = filterState.employeeCount;
        const employeeCount = company.employeeCount;
        
        if (range === "50-500 employees" && (employeeCount < 50 || employeeCount > 500)) return false;
        if (range === "50-100 employees" && (employeeCount < 50 || employeeCount > 100)) return false;
        if (range === "100-200 employees" && (employeeCount < 100 || employeeCount > 200)) return false;
        if (range === "200-350 employees" && (employeeCount < 200 || employeeCount > 350)) return false;
        if (range === "350-500 employees" && (employeeCount < 350 || employeeCount > 500)) return false;
      }

      // Hiring status filter (IT hiring indicators)
      if (filterState.hiringStatus && filterState.hiringStatus !== '') {
        if (company.hiringStatus !== filterState.hiringStatus) {
          return false;
        }
      }

      // Compliance filter (HIPAA, PCI DSS, SOC 2)
      if (filterState.compliance && filterState.compliance !== '') {
        if (company.compliance !== filterState.compliance) {
          return false;
        }
      }

      // License renewal filter (Microsoft, Google, etc.)
      if (filterState.licenseRenewal && filterState.licenseRenewal !== '') {
        if (company.licenseRenewal !== filterState.licenseRenewal) {
          return false;
        }
      }

      // RMM tool filter
      if (filterState.rmmTool && filterState.rmmTool !== '') {
        if (company.rmmTool !== filterState.rmmTool) {
          return false;
        }
      }

      // Boolean filters
      if (filterState.hasCurrentMSP && !company.hasCurrentMSP) return false;
      if (filterState.verifiedEmail && !company.emails) return false;
      if (filterState.verifiedPhone && !company.phoneNumbers) return false;

      return true;
    });
  };

  // Get filtered companies
  const filteredCompanies = getFilteredCompanies();

  // Stats card component for the dashboard
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
      <div className={`backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-green-500/20 hover:-translate-y-1 relative overflow-hidden group`}>
        {/* Enhanced gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-teal-500/30 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-green-500/40 to-transparent rounded-full blur-2xl transform rotate-12 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-teal-500/30 to-transparent rounded-full blur-xl transform -rotate-12 opacity-80 group-hover:opacity-90"></div>
        <div className="absolute top-1/3 -right-8 w-20 h-20 bg-gradient-to-bl from-emerald-500/30 to-transparent rounded-full blur-lg transform rotate-45 opacity-70"></div>
        
        <div className="relative z-10 p-6 bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-white/90 mb-1">{title}</p>
              <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">{value}</h3>
              {change && (
                <div className="flex items-center text-xs font-medium text-green-300 mt-2">
                  <MdTrendingUp className="mr-1" /> {change}
                </div>
              )}
            </div>
            <div className={`rounded-2xl p-3 ${colorClass} shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-white/20`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter chip component
  const FilterChip = ({ 
    label, 
    value, 
    isActive, 
    onClick 
  }: { 
    label: string; 
    value: string | boolean; 
    isActive: boolean; 
    onClick: () => void 
  }) => {
    return (
      <button 
        onClick={onClick} 
        className={`${isActive 
          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20' 
          : 'bg-white/10 text-white/80 hover:bg-white/20'} 
          backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 text-sm font-medium border border-white/10 flex items-center gap-2`}
      >
        {label}
        {isActive && <MdCheck className="text-white" />}
      </button>
    );
  };

  // Add page navigation functions
  const goToNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1
      }));
    }
  };

  const goToPrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1
      }));
    }
  };

  // Function to format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Modify the handleSearch function to show the dashboard with all companies when clicked
  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call with 5 second delay
    setTimeout(() => {
      setIsLoading(false);
      setShowDashboard(true);
      
      // Store current filters to localStorage for persistence
      try {
        localStorage.setItem('companyFilters', JSON.stringify(filterState));
      } catch (error) {
        console.error('Error saving filters to localStorage', error);
      }
      
      // Set fixed number of filtered results
      setCompaniesStats(prev => ({
        ...prev,
        filtered: companies.length
      }));
      
      // Update page stats
      setPagination(prev => ({
        ...prev,
        currentPage: 1,
        totalPages: Math.ceil(companies.length / prev.itemsPerPage)
      }));
      
      // Build a description of what's being searched for based on ProCloud criteria
      let searchDescription = "MSP prospects in Healthcare & Finance industries (50-500 employees) in target states with IT hiring activity, compliance requirements, and upcoming license renewals";
      
      if (filters.companyTypeFilter) {
        searchDescription += ` in ${filters.companyTypeFilter}`;
      }
      
      // Add filter details to the search description
      if (filterState.state) {
        searchDescription += ` in ${filterState.state}`;
      }
      if (filterState.industry) {
        searchDescription += ` (${filterState.industry} industry)`;
      }
      if (filterState.compliance) {
        searchDescription += ` with ${filterState.compliance} compliance`;
      }
      if (filterState.licenseRenewal && filterState.licenseRenewal !== 'No Renewals Identified') {
        searchDescription += ` with ${filterState.licenseRenewal} renewal`;
      }
      
      toast.success(`Searching for ${searchDescription}`);
      
      // Update active filters to include ProCloud MSP criteria as fixed filters
      setActiveFilters(prev => ({
        ...prev,
        targetIndustries: "Healthcare & Finance",
        employeeCount: "50-500 employees",
        targetStates: "AZ, CA, NV, UT, PA, NY, IL, NJ, DE, MD",
        hiringIndicators: "Actively hiring IT staff",
        compliance: "HIPAA/PCI/SOC2",
        licenseRenewals: "Microsoft/Google/PrinterLogic/SentinelOne",
        verifiedEmail: true,
        verifiedPhone: true
      }));
      
      // Also set the verified filters state to match ProCloud criteria
      setFilterState(prev => ({ 
        ...prev, 
        industry: "Healthcare", // Set default to Healthcare
        employeeCount: "50-500 employees",
        compliance: "HIPAA",
        verifiedEmail: true, 
        verifiedPhone: true 
      }));
    }, 5000); // 5 second delay
  };

  const [activeFilters, setActiveFilters] = useState<{[key: string]: string | boolean}>({});

  // Update companies when dataset changes
  useEffect(() => {
    const newCompanies = getCompaniesForDataset();
    setCompaniesStats(prev => ({
      ...prev,
      filtered: newCompanies.length,
      total: selectedDataset === 'healthcare' ? 3328 : 
             selectedDataset === 'finance' ? 2212 : 5540
    }));
  }, [selectedDataset]);

  return (
    <div className="w-full px-32 py-12 bg-[#020305] min-h-screen relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-[#10ba82]/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-[#10ba82]/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      {/* Main content with single scrollbar */}
      <div className="flex flex-col">
        {/* Header with title and stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] p-3 rounded-xl text-white shadow-lg shadow-[#10ba82]/20">
              <MdBusinessCenter className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Market Database</h1>
          </div>
          
          {showDashboard && (
            <div className="text-white/70 text-sm flex items-center gap-2">
              <MdInfoOutline className="text-[#10ba82]" />
              <span>Showing <span className="text-[#10ba82] font-medium">{formatNumber(filteredCompanies.length)}</span> of {formatNumber(companiesStats.total)} companies</span>
              
              <button 
                onClick={clearAllFilters}
                className="ml-4 px-3 py-1 text-xs text-[#10ba82] hover:text-[#0c9a6c] bg-[#10ba82]/10 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Main content area */}
        <div className="flex gap-6">
          {/* Filter sidebar - now wider */}
          <div className="w-96 backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#10ba82]/20 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                {Object.keys(activeFilters).length > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="px-3 py-1 text-xs text-[#10ba82] hover:text-[#0c9a6c] bg-[#10ba82]/10 rounded-lg transition-colors border border-[#10ba82]/20"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Dataset Selection Controls */}
              <div className="mb-4 p-3 bg-[rgba(40,41,43,0.6)] rounded-xl border border-[#10ba82]/10">
                <h3 className="text-sm font-medium text-white/80 mb-3">Dataset Selection:</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setSelectedDataset('combined')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDataset === 'combined'
                        ? 'bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Combined Dataset</span>
                      <span className="text-xs opacity-70">5,540 companies</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedDataset('healthcare')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDataset === 'healthcare'
                        ? 'bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Healthcare Only</span>
                      <span className="text-xs opacity-70">3,328 companies</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedDataset('finance')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDataset === 'finance'
                        ? 'bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Finance Only</span>
                      <span className="text-xs opacity-70">2,212 companies</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Active filters display */}
              {Object.keys(activeFilters).length > 0 && (
                <div className="mb-4 p-3 bg-[rgba(40,41,43,0.6)] rounded-xl border border-[#10ba82]/10">
                  <h3 className="text-sm font-medium text-white/80 mb-2">Active Filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                      if (value === '' || value === false) return null;
                      
                      const formatFilterLabel = (key: string) => {
                        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                      };
                      
                      const formatFilterValue = (key: string, value: string | boolean) => {
                        if (typeof value === 'boolean') {
                          return value ? 'Yes' : 'No';
                        }
                        return value;
                      };
                      
                      return (
                        <div 
                          key={key}
                          className="inline-flex items-center gap-2 py-1 px-3 rounded-full text-sm font-medium bg-gradient-to-r from-[#10ba82]/40 to-[#0c9a6c]/30 text-white border border-[#10ba82]/20 shadow-sm shadow-[#10ba82]/10 transition-all hover:shadow-md hover:scale-105"
                        >
                          <span>{formatFilterLabel(key)}: {formatFilterValue(key, value)}</span>
                          <button 
                            onClick={() => handleFilterChange(key, '')}
                            className="text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20 h-5 w-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Filter sections in a scrollable container with fancy scrollbar */}
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#10ba82]/40 scrollbar-track-white/5">
              
              {/* Company Name Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('companyName')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdOutlineBusiness className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Company Name</span>
                    {filterState.companyName && filterState.companyName !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'companyName' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'companyName' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search company name..."
                        value={filterState.companyName}
                        onChange={(e) => handleFilterChange('companyName', e.target.value)}
                          className="w-full py-2 px-3 rounded-lg border border-white/20 bg-[#28292b] backdrop-blur-sm text-white focus:ring-2 focus:ring-[#10ba82] focus:border-transparent transition-all"
                      />
                      <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    </div>
                  </div>
                  </div>
              </div>
              
              {/* Company Size Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('employeeCount')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdBusinessCenter className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Company Size</span>
                    {filterState.employeeCount && filterState.employeeCount !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'employeeCount' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'employeeCount' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.employeeCount}
                      onChange={(value) => handleFilterChange('employeeCount', value)}
                      options={employeeCountRanges.map(range => ({ value: range, label: range }))}
                      placeholder="Select company size..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* Target State Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('state')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdLocationOn className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Target State</span>
                    {filterState.state && filterState.state !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'state' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'state' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.state}
                      onChange={(value) => handleFilterChange('state', value)}
                      options={targetStates.map(state => ({ value: state, label: state }))}
                      placeholder="Select target state..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* Industry Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('industry')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdFactory className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Industry</span>
                    {filterState.industry && filterState.industry !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'industry' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'industry' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.industry}
                      onChange={(value) => handleFilterChange('industry', value)}
                      options={targetIndustries.map(industry => ({ value: industry, label: industry }))}
                      placeholder="Select industry..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* Hiring Status Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('hiringStatus')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdPeople className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Hiring Status</span>
                    {filterState.hiringStatus && filterState.hiringStatus !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'hiringStatus' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'hiringStatus' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.hiringStatus}
                      onChange={(value) => handleFilterChange('hiringStatus', value)}
                      options={hiringIndicators.map(indicator => ({ value: indicator, label: indicator }))}
                      placeholder="Select hiring status..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* Compliance Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('compliance')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdSecurity className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Compliance</span>
                    {filterState.compliance && filterState.compliance !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'compliance' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'compliance' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.compliance}
                      onChange={(value) => handleFilterChange('compliance', value)}
                      options={complianceFrameworks.map(framework => ({ value: framework, label: framework }))}
                      placeholder="Select compliance..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* License Renewal Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('licenseRenewal')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdRefresh className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">License Renewal</span>
                    {filterState.licenseRenewal && filterState.licenseRenewal !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'licenseRenewal' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'licenseRenewal' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.licenseRenewal}
                      onChange={(value) => handleFilterChange('licenseRenewal', value)}
                      options={licenseRenewals.map(renewal => ({ value: renewal, label: renewal }))}
                      placeholder="Select license renewal..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* RMM Tool Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('rmmTool')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdDeveloperBoard className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">RMM Tool</span>
                    {filterState.rmmTool && filterState.rmmTool !== '' && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'rmmTool' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'rmmTool' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <CustomSelect
                      value={filterState.rmmTool}
                      onChange={(value) => handleFilterChange('rmmTool', value)}
                      options={rmmTools.map(tool => ({ value: tool, label: tool }))}
                      placeholder="Select RMM tool..."
                    />
                  </div>
                  </div>
              </div>
              
              {/* Verified Email Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('verifiedEmail')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdVerifiedUser className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Verified Emails</span>
                    {filterState.verifiedEmail && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'verifiedEmail' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'verifiedEmail' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          checked={filterState.verifiedEmail}
                          onChange={(e) => handleFilterChange('verifiedEmail', e.target.checked)}
                            className="rounded border-[#10ba82] text-[#10ba82] focus:ring-[#10ba82] h-4 w-4 bg-white/10"
                        />
                        <span>Verified Emails</span>
                      </label>
                    </div>
                  </div>
                  </div>
                </div>
              
              {/* Verified Phone Filter */}
                <div className="mb-3 bg-[rgba(40,41,43,0.4)] rounded-lg overflow-hidden border border-white/5 hover:border-[#10ba82]/20 transition-colors">
                <button
                  onClick={() => toggleSection('verifiedPhone')}
                    className="w-full p-3.5 flex justify-between items-center text-white hover:bg-[#10ba82]/10 transition-colors"
                >
                  <div className="flex items-center gap-2">
                      <div className="bg-[#10ba82]/20 p-2 rounded-lg">
                        <MdShield className="text-[#10ba82]" />
                      </div>
                    <span className="font-medium">Verified Phone Numbers</span>
                    {filterState.verifiedPhone && (
                        <span className="text-xs bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedSection === 'verifiedPhone' ? 'rotate-90' : ''}`} />
                </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'verifiedPhone' ? 'max-h-[200px]' : 'max-h-0'}`}>
                  <div className="p-3 bg-[rgba(40,41,43,0.2)]">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          checked={filterState.verifiedPhone}
                          onChange={(e) => handleFilterChange('verifiedPhone', e.target.checked)}
                            className="rounded border-[#10ba82] text-[#10ba82] focus:ring-[#10ba82] h-4 w-4 bg-white/10"
                        />
                        <span>Verified Phone Numbers</span>
                      </label>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              
              {/* Submit button - now with improved styling */}
              <div className="mt-4">
                <button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] hover:from-[#0c9a6c] hover:to-[#0a8a5c] text-white py-3 px-4 rounded-lg font-medium transition-all text-sm shadow-md hover:shadow-xl flex items-center justify-center gap-2 group border border-white/20 relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                  <MdSearch className="text-lg" />
                  Apply Filters
                      <div className="absolute right-0 h-full w-12 bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-12 group-hover:translate-x-0"></div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {isLoading ? (
              // Enhanced loading state
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-[calc(100vh-160px)]">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 relative">
                    {/* Animated particles around spinner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute h-2 w-2 rounded-full bg-[#10ba82]"
                          style={{
                            animation: `particle${i + 1} 5s infinite linear`,
                            opacity: 0.7,
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="relative h-32 w-32 mx-auto">
                      {/* Spinner rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#10ba82]/20 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-[#10ba82]/30 animate-pulse"></div>
                      
                      {/* Main spinner */}
                      <div className="h-full w-full animate-spin rounded-full border-4 border-[#10ba82] border-t-transparent flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full border-4 border-[#10ba82]/40 border-b-transparent animate-spin"></div>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">Processing your request</h2>
                  <p className="text-white/70 mb-6">
                    Analyzing companies in our database...
                  </p>
                  
                  <div className="space-y-4">
                    {/* Loading steps with animations */}
                    <div className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_ease-in-out_0.2s_forwards]">
                      <div className="h-8 w-8 rounded-full bg-[#10ba82]/20 flex items-center justify-center">
                        <MdSearch className="text-[#10ba82]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#10ba82]/20 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-[#10ba82] animate-[searchingData_1.5s_ease-in-out_forwards]"></div>
                        </div>
                      </div>
                      <span className="text-sm text-white/60">Searching</span>
                    </div>
                    
                    <div className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_ease-in-out_1.5s_forwards]">
                      <div className="h-8 w-8 rounded-full bg-[#10ba82]/20 flex items-center justify-center">
                        <MdFilterList className="text-[#10ba82]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#10ba82]/20 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-[#10ba82] animate-[filteringData_1.5s_ease-in-out_forwards_1.5s]"></div>
                        </div>
                      </div>
                      <span className="text-sm text-white/60">Filtering</span>
                    </div>
                    
                    <div className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_ease-in-out_3s_forwards]">
                      <div className="h-8 w-8 rounded-full bg-[#10ba82]/20 flex items-center justify-center">
                        <MdDataUsage className="text-[#10ba82]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#10ba82]/20 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-[#10ba82] animate-[analyzingData_1.5s_ease-in-out_forwards_3s]"></div>
                        </div>
                      </div>
                      <span className="text-sm text-white/60">Analyzing</span>
                    </div>
                    
                    <div className="flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_ease-in-out_4.5s_forwards]">
                      <div className="h-8 w-8 rounded-full bg-[#10ba82]/20 flex items-center justify-center animate-pulse">
                        <MdCheck className="text-[#10ba82]" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-[#10ba82]/20 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 left-0 h-full bg-[#10ba82] animate-[finalizing_0.5s_ease-in-out_forwards_4.5s]"></div>
                        </div>
                      </div>
                      <span className="text-sm text-white/60">Finalizing</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : !showDashboard ? (
              // Welcome message
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#10ba82]/20 via-[#10ba82]/10 to-transparent rounded-3xl flex items-center justify-center shadow-2xl shadow-[#10ba82]/20 border border-[#10ba82]/20">
                      <MdBusinessCenter className="text-6xl text-[#10ba82]" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-transparent rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/20 border border-teal-500/20">
                      <MdComputer className="text-3xl text-teal-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Tailored Market Database
                  </h2>
                  <p className="text-xl text-white/80 mb-4">
                    Based on the selections for your company profile, we have tailored everything towards your ideal customer profile.
                  </p>
                  <p className="text-lg text-white/70 mb-8">
                    We have identified <span className="text-[#10ba82] font-semibold">426,000</span> facilities which are eligible. Use the filters to narrow down your selection and obtain the specific demographic that matches your target audience.
                  </p>
                  
                  {/* Previous Lists Section */}
                  <div className="mb-10 bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4 text-left">Previous Lists</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-all hover:shadow-lg cursor-pointer text-left">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-[#10ba82]/20">
                            <MdInsights className="text-[#10ba82]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Manufacturing Sector - Q2 2023</h4>
                            <p className="text-sm text-white/70 mt-1">143 contacts • Last updated 2 weeks ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-all hover:shadow-lg cursor-pointer text-left">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-[#10ba82]/20">
                            <MdInsights className="text-[#10ba82]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Financial Services - High Value</h4>
                            <p className="text-sm text-white/70 mt-1">67 contacts • Last updated 1 month ago</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-all hover:shadow-lg cursor-pointer text-left">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-[#10ba82]/20">
                            <MdOutlineStarOutline className="text-[#10ba82]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Favorite Leads - East Coast</h4>
                            <p className="text-sm text-white/70 mt-1">28 contacts • Saved as favorite</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-all hover:shadow-lg cursor-pointer text-left">
                        <div className="flex items-center justify-center h-full text-white/30">
                          <MdAdd size={24} />
                          <span className="ml-2">Create New List</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 items-center">
                    {Object.keys(activeFilters).length > 0 && (
                      <div className="bg-white/10 p-3 rounded-lg mb-2 w-full max-w-md">
                        <p className="text-white/70 text-sm mb-2">Searching with these filters:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(activeFilters).map(([key, value]) => (
                            <div key={key} className="bg-[#10ba82]/20 text-[#10ba82] px-2 py-0.5 rounded-full text-xs">
                              {key}: {value.toString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleSearch}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] hover:from-[#0c9a6c] hover:to-[#0a8a5c] text-white py-3 px-6 rounded-lg font-medium transition-all text-lg shadow-md hover:shadow-lg inline-flex items-center gap-2 group border border-white/20"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                      <MdSearch className="text-xl" />
                      Search Companies
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* ProCloud criteria summary */}
                <div className="mb-4 py-3 px-4 backdrop-blur-md bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/40 to-[rgba(40,41,43,0.2)] rounded-xl border border-[#10ba82]/15 text-white/80">
                  <p className="flex items-center gap-2">
                    <FaFilter className="text-[#10ba82] text-sm" />
                    <span className="text-sm">
                      <span className="font-medium text-white">ProCloud MSP Criteria:</span> 
                      <span className="font-medium text-[#10ba82]"> Healthcare</span> (doctor's offices, surgical centers, hospitals, dental clinics, senior living) & 
                      <span className="font-medium text-[#10ba82]"> Finance</span> (banks, credit unions, insurance, investment firms, tax & accounting) • 
                      <span className="font-medium text-white">50-500 employees</span> • 
                      <span className="font-medium text-white">Target states</span> (AZ, CA, NV, UT, PA, NY, IL, NJ, DE, MD) • 
                      <span className="font-medium text-white">Hiring IT staff</span> • 
                      <span className="font-medium text-white">Compliance</span> (HIPAA/PCI/SOC2) • 
                      <span className="font-medium text-white">License renewals</span> (Microsoft/Google/PrinterLogic/SentinelOne)
                    </span>
                    <span className="ml-auto text-[#10ba82] font-medium">{filteredCompanies.length} matching records</span>
                  </p>
                </div>
              
                {/* ProCloud-specific Stats cards */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <StatsCard
                    title="Total MSP Prospects"
                    value="5,540"
                    change="+15% from methodology"
                    icon={<MdBusinessCenter className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c]"
                  />
                  
                  <StatsCard
                    title="High Opportunity Score (≥7)"
                    value="3,989"
                    change="72% of total prospects"
                    icon={<MdTrendingUp className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600"
                  />
                  
                  <StatsCard
                    title="Actively Hiring IT"
                    value="1,485"
                    change="27% immediate opportunity"
                    icon={<MdPeople className="text-white text-xl" />}
                    colorClass="bg-gradient-to-br from-emerald-500 via-emerald-600 to-[#10ba82]"
                  />
                </div>
                
                {/* Companies table */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#10ba82]/15 relative overflow-hidden">
                  {/* Table content */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10ba82]/30 via-[#0c9a6c]/20 to-[#0a8a5c]/25 opacity-25"></div>
                  <div className="absolute -top-10 right-1/3 w-44 h-44 bg-gradient-to-bl from-[#10ba82]/45 to-transparent rounded-full blur-3xl transform rotate-90"></div>
                  <div className="absolute bottom-1/4 -left-12 w-40 h-40 bg-gradient-to-tr from-[#0c9a6c]/40 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 overflow-x-auto rounded-2xl">
                    <table className="w-full">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="w-10 py-3 px-2">
                            <input 
                              type="checkbox" 
                              className="rounded border-[#10ba82] text-[#10ba82] focus:ring-[#10ba82] h-4 w-4 bg-white/10"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCompanies(filteredCompanies.map(f => f.id));
                                } else {
                                  setSelectedCompanies([]);
                                }
                              }}
                              checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                            />
                          </th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Job Title</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Company</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Location</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Industry</th>
                          <th className="py-3 px-2 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredCompanies.map((company) => (
                            <tr key={company.id} className={`${
                              selectedCompanies.includes(company.id) 
                              ? "bg-[#10ba82]/20" 
                                : "hover:bg-white/5"
                              } transition-colors`}
                            >
                              <td className="py-2 px-2">
                                <input 
                                  type="checkbox" 
                                className="rounded border-[#10ba82] text-[#10ba82] focus:ring-[#10ba82] h-4 w-4 bg-white/10"
                                  checked={selectedCompanies.includes(company.id)}
                                  onChange={() => handleSelectCompany(company.id)}
                                />
                              </td>
                            <td className="py-2 px-2 text-sm font-medium text-[#10ba82] hover:text-[#0c9a6c] cursor-pointer">{company.name}</td>
                            <td className="py-2 px-2 text-sm text-white/80">{company.jobTitle}</td>
                              <td className="py-2 px-2 text-sm text-white/80">{company.company}</td>
                              <td className="py-2 px-2 text-sm">
                                <div className="flex items-center gap-1">
                                {company.emails && <MdEmail className="text-[#10ba82] text-sm" />}
                                {company.phoneNumbers && <MdOutlinePhone className="text-[#10ba82] text-sm" />}
                                </div>
                              </td>
                              <td className="py-2 px-2 text-sm text-white/80">{company.location}</td>
                            <td className="py-2 px-2 text-sm text-white/80">{company.industry}</td>
                              <td className="py-2 px-2 text-sm">
                                <div className="flex gap-1">
                                  <button 
                                    onClick={() => {
                                      // Store the filtered companies in localStorage so SignalScanner can use them
                                      try {
                                      localStorage.setItem('filteredCompanies', JSON.stringify(filteredCompanies));
                                      } catch (error) {
                                        console.error('Error saving filtered companies to localStorage', error);
                                      }
                                      navigate('/signal-scanner');
                                    }}
                                  className="p-1.5 rounded-lg bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-sm"
                                  >
                                    <MdArrowForward size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                    </div>
                    
                {/* Add pagination at the bottom */}
                <div className="flex justify-between items-center mt-6 mb-3">
                  <div className="text-white/70 text-sm">
                    Showing <span className="text-white">1-{filteredCompanies.length}</span> of <span className="text-white">{formatNumber(companiesStats.total)}</span> contacts
                  </div>
                  <div className="flex gap-1">
                      <button 
                      className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all disabled:opacity-50"
                      disabled={pagination.currentPage === 1}
                      >
                      Previous
                      </button>
                    <button className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white px-3 py-1 rounded-md hover:from-[#0c9a6c] hover:to-[#0a8a5c] transition-all">1</button>
                    <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">2</button>
                    <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">3</button>
                    <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">...</button>
                    <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">230</button>
                      <button 
                      className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all"
                      >
                      Next
                      </button>
                  </div>
                </div>
                
                {/* Add Search for Signals button */}
                <div className="flex justify-end mt-6 mb-8">
                  <button
                    onClick={() => {
                      // Store the filtered companies in localStorage so SignalScanner can use them
                      try {
                        localStorage.setItem('filteredCompanies', JSON.stringify(filteredCompanies));
                      } catch (error) {
                        console.error('Error saving filtered companies to localStorage', error);
                      }
                      navigate('/signal-scanner');
                    }}
                    className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] hover:from-[#0c9a6c] hover:to-[#0a8a5c] text-white py-2 px-6 rounded-lg font-medium transition-all text-sm shadow-md hover:shadow-lg inline-flex items-center gap-2 group border border-white/20"
                  >
                    <MdInsights className="text-lg" />
                    Search for Signals
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <style>
        {`
        @keyframes loading {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes searchingData {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes filteringData {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes analyzingData {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes finalizing {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes particle1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, 50px); }
          50% { transform: translate(100px, 0); }
          75% { transform: translate(50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-50px, 50px); }
          50% { transform: translate(-100px, 0); }
          75% { transform: translate(-50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle3 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, -50px); }
          50% { transform: translate(0, -100px); }
          75% { transform: translate(-50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle4 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, 50px); }
          50% { transform: translate(0, 100px); }
          75% { transform: translate(-50px, 50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle5 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(70px, 20px); }
          50% { transform: translate(80px, 50px); }
          75% { transform: translate(40px, 70px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle6 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-70px, 20px); }
          50% { transform: translate(-80px, 50px); }
          75% { transform: translate(-40px, 70px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle7 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-70px, -20px); }
          50% { transform: translate(-50px, -80px); }
          75% { transform: translate(-10px, -60px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes particle8 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(70px, -20px); }
          50% { transform: translate(50px, -80px); }
          75% { transform: translate(10px, -60px); }
          100% { transform: translate(0, 0); }
        }
        `}
      </style>
    </div>
  );
};

export default MarketDatabase;