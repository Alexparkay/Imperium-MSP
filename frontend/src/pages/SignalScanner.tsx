import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdInfo, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdDownload, MdArrowForward, MdAnalytics, MdFactory, MdSpeed, MdAttachMoney, MdContentCopy, MdTableChart, MdCheck, MdWarning, MdOutlineWarning, MdSearch, MdInfoOutline, MdClose, MdStorage, MdDeveloperBoard } from 'react-icons/md';
import { FaDatabase, FaMoneyBillWave, FaServer, FaChartLine, FaRegLightbulb, FaLayerGroup, FaRegClock, FaBuilding, FaIndustry, FaWarehouse } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { BsGlobe, BsServer, BsCloudDownload, BsGraphUp, BsShieldLock, BsDiagram3, BsCodeSlash, BsFileEarmarkCode } from 'react-icons/bs';
import { AiOutlineApi, AiOutlineNodeIndex, AiOutlineFileSearch, AiOutlineRobot } from 'react-icons/ai';
import { HiOutlineDatabase, HiOutlineDocumentSearch } from 'react-icons/hi';
import { TbWorldSearch } from 'react-icons/tb';

// Add a Company interface at the top of the file, after the imports
interface Company {
  id: number;
  name: string;
  jobTitle: string;
  company: string;
  emails: boolean;
  phoneNumbers: boolean;
  location: string;
  enriched: boolean;
  verified: boolean;
  employeeCount: number;
  industry: string;
  [key: string]: any; // Allow for additional properties
}

// ProCloud Comprehensive Enterprise Dataset - Healthcare & Finance MSP Prospects
const enrichedEnterprises = [
  // Healthcare Companies with MSP Enrichment
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
    technologyStack: "Epic EHR Microsoft Healthcare IT systems",
    systemType: "Healthcare IT Management",
    implementationYear: 2021,
    serverCount: 850,
    monthlySecurityEvents: 18750000,
    licenseRate: 185,
    peakThreatLoad: 6500,
    industryAvg: {
      securityIncidents: 325,
      mspAdoption: 72,
      costPerUser: 205,
      implementationTime: 4.2,
    },
    securityMetrics: {
      maxThreatCapacity: 7200,
      monthlyIncidents: 265,
      systemCoverage: 96.8,
      implementationCost: 1875000,
      totalCost: 8437500,
      savings: 3562500,
      costWithoutMSP: 12000000,
      costWithMSP: 8437500,
      annualSavings: 3562500,
      monthlySavings: 296875,
      optimizationTime: 4.2,
      roi: 190,
      securityImprovement: 285,
    }
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
    technologyStack: "Epic Microsoft Healthcare analytics",
    systemType: "Hospital System Management",
    implementationYear: 2020,
    serverCount: 1200,
    monthlySecurityEvents: 28500000,
    licenseRate: 195,
    peakThreatLoad: 9500,
    industryAvg: {
      securityIncidents: 425,
      mspAdoption: 75,
      costPerUser: 215,
      implementationTime: 4.8,
    },
    securityMetrics: {
      maxThreatCapacity: 10800,
      monthlyIncidents: 385,
      systemCoverage: 97.2,
      implementationCost: 2250000,
      totalCost: 10575000,
      savings: 4425000,
      costWithoutMSP: 15000000,
      costWithMSP: 10575000,
      annualSavings: 4425000,
      monthlySavings: 368750,
      optimizationTime: 4.8,
      roi: 197,
      securityImprovement: 315,
    }
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
    technologyStack: "Epic EHR Microsoft Office Healthcare IT",
    systemType: "Epic Healthcare Management",
    implementationYear: 2020,
    serverCount: 720,
    monthlySecurityEvents: 16800000,
    licenseRate: 180,
    peakThreatLoad: 5800,
    industryAvg: {
      securityIncidents: 315,
      mspAdoption: 74,
      costPerUser: 200,
      implementationTime: 4.0,
    },
    securityMetrics: {
      maxThreatCapacity: 6800,
      monthlyIncidents: 245,
      systemCoverage: 96.5,
      implementationCost: 1680000,
      totalCost: 7560000,
      savings: 3240000,
      costWithoutMSP: 10800000,
      costWithMSP: 7560000,
      annualSavings: 3240000,
      monthlySavings: 270000,
      optimizationTime: 4.0,
      roi: 193,
      securityImprovement: 275,
    }
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
    technologyStack: "Epic Microsoft Clinical systems",
    systemType: "Clinical Systems Management",
    implementationYear: 2021,
    serverCount: 810,
    monthlySecurityEvents: 22050000,
    licenseRate: 190,
    peakThreatLoad: 7650,
    industryAvg: {
      securityIncidents: 380,
      mspAdoption: 76,
      costPerUser: 210,
      implementationTime: 4.5,
    },
    securityMetrics: {
      maxThreatCapacity: 8550,
      monthlyIncidents: 315,
      systemCoverage: 97.0,
      implementationCost: 2025000,
      totalCost: 9450000,
      savings: 4050000,
      costWithoutMSP: 13500000,
      costWithMSP: 9450000,
      annualSavings: 4050000,
      monthlySavings: 337500,
      optimizationTime: 4.5,
      roi: 200,
      securityImprovement: 290,
    }
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
    technologyStack: "Microsoft Healthcare IT Epic",
    systemType: "Healthcare DevOps Management",
    implementationYear: 2022,
    serverCount: 680,
    monthlySecurityEvents: 16000000,
    licenseRate: 175,
    peakThreatLoad: 5400,
    industryAvg: {
      securityIncidents: 295,
      mspAdoption: 70,
      costPerUser: 195,
      implementationTime: 3.8,
    },
    securityMetrics: {
      maxThreatCapacity: 6200,
      monthlyIncidents: 225,
      systemCoverage: 95.8,
      implementationCost: 1520000,
      totalCost: 7000000,
      savings: 3000000,
      costWithoutMSP: 10000000,
      costWithMSP: 7000000,
      annualSavings: 3000000,
      monthlySavings: 250000,
      optimizationTime: 3.8,
      roi: 197,
      securityImprovement: 265,
    }
  },
  // Finance Companies with MSP Enrichment
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
    technologyStack: "Node.js, Go, PostgreSQL, AWS",
    systemType: "Cryptocurrency Security Platform",
    implementationYear: 2022,
    serverCount: 285,
    monthlySecurityEvents: 8750000,
    licenseRate: 165,
    peakThreatLoad: 3200,
    industryAvg: {
      securityIncidents: 85,
      mspAdoption: 68,
      costPerUser: 185,
      implementationTime: 3.2,
    },
    securityMetrics: {
      maxThreatCapacity: 3850,
      monthlyIncidents: 72,
      systemCoverage: 95.4,
      implementationCost: 875000,
      totalCost: 3456250,
      savings: 1543750,
      costWithoutMSP: 5000000,
      costWithMSP: 3456250,
      annualSavings: 1543750,
      monthlySavings: 128646,
      optimizationTime: 3.2,
      roi: 177,
      securityImprovement: 245,
    }
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
    technologyStack: "Python, AWS, Kubernetes, PostgreSQL",
    systemType: "Investment Platform Security",
    implementationYear: 2021,
    serverCount: 225,
    monthlySecurityEvents: 6875000,
    licenseRate: 155,
    peakThreatLoad: 2650,
    industryAvg: {
      securityIncidents: 68,
      mspAdoption: 65,
      costPerUser: 175,
      implementationTime: 2.8,
    },
    securityMetrics: {
      maxThreatCapacity: 3100,
      monthlyIncidents: 58,
      systemCoverage: 94.8,
      implementationCost: 687500,
      totalCost: 2712500,
      savings: 1287500,
      costWithoutMSP: 4000000,
      costWithMSP: 2712500,
      annualSavings: 1287500,
      monthlySavings: 107292,
      optimizationTime: 2.8,
      roi: 187,
      securityImprovement: 225,
    }
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
    technologyStack: "Ruby, PostgreSQL, AWS, Docker",
    systemType: "Banking Security Platform",
    implementationYear: 2021,
    serverCount: 535,
    monthlySecurityEvents: 14062500,
    licenseRate: 170,
    peakThreatLoad: 4875,
    industryAvg: {
      securityIncidents: 115,
      mspAdoption: 70,
      costPerUser: 190,
      implementationTime: 3.5,
    },
    securityMetrics: {
      maxThreatCapacity: 5625,
      monthlyIncidents: 95,
      systemCoverage: 95.8,
      implementationCost: 1312500,
      totalCost: 6375000,
      savings: 2812500,
      costWithoutMSP: 9187500,
      costWithMSP: 6375000,
      annualSavings: 2812500,
      monthlySavings: 234375,
      optimizationTime: 3.5,
      roi: 215,
      securityImprovement: 275,
    }
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
    technologyStack: "Microsoft Office 365, Azure, SQL Server",
    systemType: "Investment Security Management",
    implementationYear: 2022,
    serverCount: 245,
    monthlySecurityEvents: 6562500,
    licenseRate: 160,
    peakThreatLoad: 2275,
    industryAvg: {
      securityIncidents: 62,
      mspAdoption: 68,
      costPerUser: 180,
      implementationTime: 2.8,
    },
    securityMetrics: {
      maxThreatCapacity: 2625,
      monthlyIncidents: 52,
      systemCoverage: 96.2,
      implementationCost: 612500,
      totalCost: 2800000,
      savings: 1225000,
      costWithoutMSP: 4025000,
      costWithMSP: 2800000,
      annualSavings: 1225000,
      monthlySavings: 102083,
      optimizationTime: 2.8,
      roi: 200,
      securityImprovement: 240,
    }
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
    technologyStack: "Python, C++, Bloomberg Terminal, Unix/Linux",
    systemType: "Hedge Fund Trading Security",
    implementationYear: 2020,
    serverCount: 585,
    monthlySecurityEvents: 15937500,
    licenseRate: 185,
    peakThreatLoad: 5325,
    industryAvg: {
      securityIncidents: 125,
      mspAdoption: 75,
      costPerUser: 205,
      implementationTime: 4.0,
    },
    securityMetrics: {
      maxThreatCapacity: 6075,
      monthlyIncidents: 105,
      systemCoverage: 97.5,
      implementationCost: 1518750,
      totalCost: 6937500,
      savings: 3093750,
      costWithoutMSP: 10031250,
      costWithMSP: 6937500,
      annualSavings: 3093750,
      monthlySavings: 257813,
      optimizationTime: 4.0,
      roi: 225,
      securityImprovement: 295,
    }
  },
  // Additional Healthcare Companies with MSP Enrichment for comprehensive dataset
  {
    id: 11,
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
    phoneNumber: "(602) 555-1234",
    systemType: "Healthcare Cloud Management",
    implementationYear: 2021,
    serverCount: 695,
    monthlySecurityEvents: 19250000,
    licenseRate: 185,
    peakThreatLoad: 6545,
    industryAvg: {
      securityIncidents: 325,
      mspAdoption: 72,
      costPerUser: 205,
      implementationTime: 4.2,
    },
    securityMetrics: {
      maxThreatCapacity: 7425,
      monthlyIncidents: 285,
      systemCoverage: 96.2,
      implementationCost: 1732500,
      totalCost: 7892500,
      savings: 3507500,
      costWithoutMSP: 11400000,
      costWithMSP: 7892500,
      annualSavings: 3507500,
      monthlySavings: 292292,
      optimizationTime: 4.2,
      roi: 202,
      securityImprovement: 280,
    }
  },
  {
    id: 12,
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
    phoneNumber: "(801) 555-2345",
    systemType: "Healthcare Security Analytics",
    implementationYear: 2020,
    serverCount: 765,
    monthlySecurityEvents: 21250000,
    licenseRate: 190,
    peakThreatLoad: 7225,
    industryAvg: {
      securityIncidents: 345,
      mspAdoption: 74,
      costPerUser: 210,
      implementationTime: 4.4,
    },
    securityMetrics: {
      maxThreatCapacity: 8075,
      monthlyIncidents: 295,
      systemCoverage: 96.8,
      implementationCost: 1912500,
      totalCost: 8662500,
      savings: 3787500,
      costWithoutMSP: 12450000,
      costWithMSP: 8662500,
      annualSavings: 3787500,
      monthlySavings: 315625,
      optimizationTime: 4.4,
      roi: 198,
      securityImprovement: 275,
    }
  },
  // Additional Finance Companies with MSP Enrichment
  {
    id: 13,
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
    phoneNumber: "(415) 555-4567",
    systemType: "Trading Platform Security",
    implementationYear: 2021,
    serverCount: 873,
    monthlySecurityEvents: 24250000,
    licenseRate: 205,
    peakThreatLoad: 8245,
    industryAvg: {
      securityIncidents: 185,
      mspAdoption: 78,
      costPerUser: 225,
      implementationTime: 4.8,
    },
    securityMetrics: {
      maxThreatCapacity: 9345,
      monthlyIncidents: 165,
      systemCoverage: 97.8,
      implementationCost: 2182500,
      totalCost: 9942500,
      savings: 4357500,
      costWithoutMSP: 14300000,
      costWithMSP: 9942500,
      annualSavings: 4357500,
      monthlySavings: 363125,
      optimizationTime: 4.8,
      roi: 215,
      securityImprovement: 320,
    }
  },
  {
    id: 14,
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
    phoneNumber: "(212) 555-5678",
    systemType: "Payment Security Platform",
    implementationYear: 2020,
    serverCount: 801,
    monthlySecurityEvents: 22250000,
    licenseRate: 195,
    peakThreatLoad: 7565,
    industryAvg: {
      securityIncidents: 175,
      mspAdoption: 75,
      costPerUser: 215,
      implementationTime: 4.5,
    },
    securityMetrics: {
      maxThreatCapacity: 8565,
      monthlyIncidents: 155,
      systemCoverage: 97.2,
      implementationCost: 2002500,
      totalCost: 8677500,
      savings: 3822500,
      costWithoutMSP: 12500000,
      costWithMSP: 8677500,
      annualSavings: 3822500,
      monthlySavings: 318542,
      optimizationTime: 4.5,
      roi: 191,
      securityImprovement: 295,
    }
  },
  {
    id: 15,
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
    phoneNumber: "(212) 555-6789",
    systemType: "Investment Banking Security",
    implementationYear: 2019,
    serverCount: 837,
    monthlySecurityEvents: 23250000,
    licenseRate: 210,
    peakThreatLoad: 7895,
    industryAvg: {
      securityIncidents: 195,
      mspAdoption: 80,
      costPerUser: 235,
      implementationTime: 5.2,
    },
    securityMetrics: {
      maxThreatCapacity: 8995,
      monthlyIncidents: 175,
      systemCoverage: 98.1,
      implementationCost: 2092500,
      totalCost: 9765000,
      savings: 4335000,
      costWithoutMSP: 14100000,
      costWithMSP: 9765000,
      annualSavings: 4335000,
      monthlySavings: 361250,
      optimizationTime: 5.2,
      roi: 207,
      securityImprovement: 315,
    }
  }
];

const SignalScanner = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnriching, setIsEnriching] = useState(true);
  const [enterprise, setEnterprise] = useState<any>(null);
  const [selectedEnterprises, setSelectedEnterprises] = useState<any[]>([]);
  const [showEnriched, setShowEnriched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVisualizationToast, setShowVisualizationToast] = useState(false);
  const [selectedEnterpriseForModal, setSelectedEnterpriseForModal] = useState<any>(null);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [enrichedData, setEnrichedData] = useState(false);
  
  // Dataset switching functionality
  const [selectedDataset, setSelectedDataset] = useState<'combined' | 'healthcare' | 'finance'>('combined');
  
  // Function to get companies based on selected dataset
  const getCompaniesForDataset = () => {
    const healthcareCompanies = enrichedEnterprises.filter(company => company.industry === 'Healthcare');
    const financeCompanies = enrichedEnterprises.filter(company => company.industry === 'Finance');
    
    switch (selectedDataset) {
      case 'healthcare':
        return healthcareCompanies;
      case 'finance':
        return financeCompanies;
      case 'combined':
      default:
        return enrichedEnterprises;
    }
  };
  
  // Total enterprises in the database (showing 5540 to match displayed count)
  const totalEnterprisesInDatabase = 5540;
  
  // MSP system data
  const mspData = {
    monthlySecurityIncidents: '2,845',
    yearlyCost: '$8,247,500',
    systemCoverage: '2,300 endpoints',
    threatsBlocked: '94.8%',
    monthlyAverage: '$687,292',
    firstYear: '$8,970,000',
    fiveYearTotal: '$42,375,000',
    costWithoutMSP: '$13,875,000/yr',
    costWithMSP: '$8,247,500/yr',
    totalLifetimeSavings: '$28,137,500',
    breakEven: '4.2 months',
    location: '789 Cyber Defense Boulevard, Security Plaza, TX',
    region: 'AMERICAS',
    systemId: 'MSP-SEC-001',
    avgPricePerUser: '$195/user/month',
    monthlyMaintenance: '$68,750.00',
    serviceCount: '12 security services',
    supportLevel: '24/7 SOC',
    implementationCost: '$1.25M',
    clientCapacity: '2,500 endpoints'
  };

  // Update the CSS animations in the useEffect to include the new animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes dataStream {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(500%); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-in-out forwards;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-8px) translateX(8px); }
        50% { transform: translateY(5px) translateX(-5px); }
        75% { transform: translateY(-3px) translateX(3px); }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.5; }
      }
      
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      @keyframes animatePath {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 400; }
      }
    `;
    document.head.appendChild(style);
    
    // Clean up function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Simulate API call to get enterprise data
    setIsLoading(true);
    setTimeout(() => {
      // Try to get filtered companies from localStorage (set by MarketDatabase page)
      try {
        const filteredCompaniesString = localStorage.getItem('filteredCompanies');
        if (filteredCompaniesString) {
          const marketDatabaseCompanies = JSON.parse(filteredCompaniesString);
          
          // Enrich the companies with MSP metrics for visualization
          const enrichedMarketCompanies = marketDatabaseCompanies.map((company: Company) => {
            // Find if we have any existing enriched data for this company
            const existingEnriched = enrichedEnterprises.find(e => 
              e.company.toLowerCase() === company.company.toLowerCase() || 
              e.name.toLowerCase() === company.name.toLowerCase()
            );
            
            // Use existing enriched data or generate some default values
            return {
              ...company,
              systemType: existingEnriched?.systemType || "Managed Security Services",
              userCount: company.employeeCount || 100,
              implementationYear: existingEnriched?.implementationYear || 2019,
              serverCount: existingEnriched?.serverCount || Math.round((company.employeeCount || 100) * 0.15),
              monthlySecurityEvents: existingEnriched?.monthlySecurityEvents || Math.round((company.employeeCount || 100) * 25000),
              licenseRate: existingEnriched?.licenseRate || 175,
              peakThreatLoad: existingEnriched?.peakThreatLoad || Math.round((company.employeeCount || 100) * 0.5),
              industryAvg: existingEnriched?.industryAvg || {
                securityIncidents: 22,
                mspAdoption: 68,
                costPerUser: 185,
                implementationTime: 3.2,
              },
              securityMetrics: existingEnriched?.securityMetrics || {
                maxThreatCapacity: Math.round((company.employeeCount || 100) * 0.7),
                monthlyIncidents: Math.round((company.employeeCount || 100) * 0.02),
                systemCoverage: Math.round(85 + Math.random() * 15),
                implementationCost: Math.round((company.employeeCount || 100) * 800),
                totalCost: Math.round((company.employeeCount || 100) * 1850),
                savings: Math.round((company.employeeCount || 100) * 650),
                costWithoutMSP: Math.round((company.employeeCount || 100) * 2500),
                costWithMSP: Math.round((company.employeeCount || 100) * 1850),
                annualSavings: Math.round((company.employeeCount || 100) * 650),
                monthlySavings: Math.round((company.employeeCount || 100) * 54),
                optimizationTime: Math.round(2 + Math.random() * 4),
                roi: Math.round(150 + Math.random() * 100),
                securityImprovement: Math.round(200 + Math.random() * 150),
              }
            };
          });
          
          // If we have companies from MarketDatabase, use those
          if (enrichedMarketCompanies.length > 0) {
            setSelectedEnterprises(enrichedMarketCompanies);
            setEnterprise(enrichedMarketCompanies[0]);
          } else {
            // Fallback to default enriched enterprises
            setSelectedEnterprises(enrichedEnterprises);
            setEnterprise(enrichedEnterprises[0]);
          }
        } else {
          // If no specific facilityId and no localStorage data, default to enrichedEnterprises
          if (facilityId) {
            const foundEnterprise = enrichedEnterprises.find(f => f.id === parseInt(facilityId));
            if (foundEnterprise) {
              setEnterprise(foundEnterprise);
              setSelectedEnterprises([foundEnterprise]);
            } else {
              setSelectedEnterprises(enrichedEnterprises);
            }
          } else {
            setSelectedEnterprises(enrichedEnterprises);
            setEnterprise(enrichedEnterprises[0]);
          }
        }
      } catch (error) {
        console.error('Error loading filtered companies from localStorage', error);
        // Fallback to default enriched enterprises
        if (facilityId) {
          const foundEnterprise = enrichedEnterprises.find(f => f.id === parseInt(facilityId));
          if (foundEnterprise) {
            setEnterprise(foundEnterprise);
            setSelectedEnterprises([foundEnterprise]);
          } else {
            setSelectedEnterprises(enrichedEnterprises);
          }
        } else {
          setSelectedEnterprises(enrichedEnterprises);
          setEnterprise(enrichedEnterprises[0]);
        }
      }
      
      setIsLoading(false);
      
      // Simulate data enrichment processing
      setTimeout(() => {
        setIsEnriching(false);
      }, 3000);
    }, 1500);
  }, [facilityId]);

  const handleDownloadReport = () => {
    toast.success('Enriched enterprise data exported successfully');
  };
  
  const handleContinueToSystemAnalysis = () => {
    if (!showEnriched) {
      toast.error("Please enrich the data first by clicking 'Show Enriched Data'");
      return;
    }
    
    navigate('/data-enrichment');
    toast.success("Proceeding to detailed system analysis");
  };

  // Handle toggle enriched data with popup
  const handleToggleEnriched = () => {
    if (!enrichedData && !showEnriched) {
      // First time showing enriched data - simulate loading/processing
      setIsEnriching(true);
      setShowLoadingAnimation(true);
      
      // Simulate API call delay - 5 seconds as requested
      setTimeout(() => {
        setIsEnriching(false);
        setShowLoadingAnimation(false);
        setShowEnriched(true);
        setEnrichedData(true);
        toast.success("MSP system data enrichment complete!");
      }, 5000);
    } else {
      // Toggle visibility of already-enriched data
      setShowEnriched(!showEnriched);
    }
  };

  // Fix the modal showModal calls with null checks
  const showModal = (modalId: string) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement && 'showModal' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with showModal
      modalElement.showModal();
    }
  };
  
  // Handle view button click to show modal first, then navigate
  const handleViewEnterprise = (enterpriseId: number) => {
    const enterpriseToView = selectedEnterprises.find(f => f.id === enterpriseId);
    setSelectedEnterpriseForModal(enterpriseToView);
    const modalElement = document.getElementById('visualization-modal');
    if (modalElement && 'showModal' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with showModal
      modalElement.showModal();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('visualization-modal');
    if (modalElement && 'close' in modalElement) {
      // @ts-ignore - Adding this to bypass TypeScript error with close
      modalElement.close();
    }
  };
  
  const goToSystemAnalysis = () => {
    closeModal();
    navigate('/data-enrichment');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020305] flex items-center justify-center relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #ffffff 20px, #ffffff 22px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="loading loading-spinner loading-lg text-green-500 relative"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading Cybersecurity System Data</h2>
            <p className="text-gray-400">Preparing comprehensive security analysis and threat detection metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Function to update the existing card class names to match Home page styling
  const cardBaseClass = "backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 border border-green-500/15 group relative overflow-hidden";

  return (
    <div className="w-full px-32 py-2 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      {/* Loading Animation Modal */}
      {showLoadingAnimation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="relative bg-[#1e222b]/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-xl max-w-4xl w-full mx-4 animate-fadeIn">
            {/* Animated gradient background for the modal */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#10ba82]/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#10ba82]/30 to-transparent rounded-full blur-3xl animate-pulse delay-700"></div>
              <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-gradient-to-br from-[#10ba82]/20 to-transparent rounded-full blur-2xl animate-pulse delay-300"></div>
            </div>
            
            {/* Floating data points and connection lines - enhanced visual effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-[#10ba82]/30 border border-[#10ba82]/50"
                  style={{
                    width: `${6 + Math.random() * 12}px`,
                    height: `${6 + Math.random() * 12}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${5 + Math.random() * 10}s linear infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <line 
                    key={i}
                    x1={`${Math.random() * 100}%`}
                    y1={`${Math.random() * 100}%`}
                    x2={`${Math.random() * 100}%`}
                    y2={`${Math.random() * 100}%`}
                    stroke="#10ba82"
                    strokeWidth="1"
                    style={{ 
                      animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </svg>
            </div>
            
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowLoadingAnimation(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all rounded-full p-1"
              >
                <MdClose size={20} />
              </button>
            </div>
            
            <div className="p-8 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-[#10ba82] to-[#0c9a6c] p-2 rounded-lg shadow">
                  <AiOutlineRobot className="text-xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI System Analysis</h3>
              </div>
              <p className="text-white/70 mb-6">Processing enterprise data from multiple sources...</p>
              
              {/* Real-time activity log */}
              <div className="mb-6 bg-black/20 rounded-xl p-4 border border-white/10 h-64 overflow-y-auto font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-[#10ba82] animate-fadeIn">
                    <span className="text-white/50">[00:00.12]</span> Initializing AI data extraction modules...
                  </div>
                  <div className="text-[#10ba82] animate-fadeIn" style={{ animationDelay: '300ms' }}>
                    <span className="text-white/50">[00:00.35]</span> Establishing secure connection to MSP databases <BsShieldLock className="inline" />
                  </div>
                  <div className="text-[#10ba82] animate-fadeIn" style={{ animationDelay: '800ms' }}>
                    <span className="text-white/50">[00:01.08]</span> Scraping enterprise profile data from <TbWorldSearch className="inline" /> market intelligence APIs
                  </div>
                  <div className="text-blue-400 animate-fadeIn" style={{ animationDelay: '1200ms' }}>
                    <span className="text-white/50">[00:01.45]</span> <BsGlobe className="inline" /> Accessing transaction history records (473,829 entries)
                  </div>
                  <div className="text-blue-400 animate-fadeIn" style={{ animationDelay: '1600ms' }}>
                    <span className="text-white/50">[00:01.89]</span> <HiOutlineDatabase className="inline" /> Analyzing system infrastructure metrics...
                  </div>
                  <div className="text-yellow-400 animate-fadeIn" style={{ animationDelay: '2000ms' }}>
                    <span className="text-white/50">[00:02.13]</span> <AiOutlineApi className="inline" /> Accessing third-party financial analysis systems
                  </div>
                  <div className="text-purple-400 animate-fadeIn" style={{ animationDelay: '2400ms' }}>
                    <span className="text-white/50">[00:02.55]</span> <BsCodeSlash className="inline" /> Extracting system architecture and module dependencies
                  </div>
                  <div className="text-blue-400 animate-fadeIn" style={{ animationDelay: '2800ms' }}>
                    <span className="text-white/50">[00:03.02]</span> <AiOutlineFileSearch className="inline" /> Cross-referencing with industry performance benchmarks
                  </div>
                  <div className="text-purple-400 animate-fadeIn" style={{ animationDelay: '3200ms' }}>
                    <span className="text-white/50">[00:03.45]</span> <AiOutlineNodeIndex className="inline" /> Building dependency graph for optimization calculations
                  </div>
                  <div className="text-green-400 animate-fadeIn" style={{ animationDelay: '3600ms' }}>
                    <span className="text-white/50">[00:03.98]</span> <BsGraphUp className="inline" /> Generating performance improvement projection models
                  </div>
                  <div className="text-yellow-400 animate-fadeIn" style={{ animationDelay: '4000ms' }}>
                    <span className="text-white/50">[00:04.32]</span> <BsDiagram3 className="inline" /> Creating optimization opportunity map by module
                  </div>
                  <div className="text-blue-400 animate-fadeIn" style={{ animationDelay: '4400ms' }}>
                    <span className="text-white/50">[00:04.75]</span> <BsCloudDownload className="inline" /> Finalizing data compilation and enrichment
                  </div>
                  <div className="text-[#10ba82] animate-fadeIn" style={{ animationDelay: '4800ms' }}>
                    <span className="text-white/50">[00:04.98]</span> Analysis complete! Found <span className="text-white font-bold">{selectedEnterprises ? selectedEnterprises.length : 0}</span> optimization opportunities
                  </div>
                </div>
              </div>
              
              {/* Enhanced Data stream visualization with dots and labels */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/70">API Connections</span>
                    <span className="text-xs text-[#10ba82]">Active</span>
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>{['MSP API', 'Financial Data', 'Market Intel', 'System Metrics'][i]}</span>
                          <span className="text-[#10ba82]">
                            {Math.floor(Math.random() * 1000)} req/s
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] rounded-full relative"
                            style={{ width: `${60 + Math.random() * 40}%` }}
                          >
                            <div 
                              className="absolute inset-0 overflow-hidden"
                              style={{ 
                                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s infinite',
                                width: '100%'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-white/70">Data Processing</span>
                    <span className="text-xs text-[#10ba82]">2.3TB</span>
                  </div>
                  
                  {/* Animated graph */}
                  <div className="h-[80px] relative">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20"></div>
                    <svg
                      className="w-full h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0,50 Q10,30 20,45 T40,40 T60,60 T80,30 T100,50"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="200"
                        strokeDashoffset="0"
                        style={{
                          animation: 'animatePath 5s linear infinite',
                        }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10ba82" />
                          <stop offset="100%" stopColor="#0c9a6c" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Data Extraction</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>System Analysis</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Optimization Mapping</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] h-2 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-3 text-white/70">
                <div className="w-3 h-3 rounded-full bg-[#10ba82] animate-ping"></div>
                <p className="text-sm">Preparing visualization components...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Simple header without box */}
          <div className="py-4">
            <div className="flex items-center gap-3">
              <MdTableChart className="text-2xl text-[#10ba82]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">Signal Scanner</h1>
            </div>
          </div>

          {isEnriching ? (
            <div className={cardBaseClass}>
              {/* Loading state content stays the same */}
              {/* ... existing loading state code ... */}
            </div>
          ) : (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#10ba82]/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Systems</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">5540</h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] shadow-lg shadow-[#10ba82]/20 backdrop-blur-md border border-white/20">
                        <FaDatabase className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#10ba82]/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Avg. User Count</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {Math.round(getCompaniesForDataset().reduce((sum, enterprise) => sum + (enterprise.employeeCount || 100), 0) / getCompaniesForDataset().length).toLocaleString()}
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] shadow-lg shadow-[#10ba82]/20 backdrop-blur-md border border-white/20">
                        <MdFactory className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#10ba82]/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Avg. MSP ROI</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {(getCompaniesForDataset().reduce((sum, enterprise) => sum + (enterprise.securityMetrics?.roi || 150), 0) / getCompaniesForDataset().length).toFixed(1)}%
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] shadow-lg shadow-[#10ba82]/20 backdrop-blur-md border border-white/20">
                        <MdAttachMoney className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#10ba82]/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Transactions</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          {(getCompaniesForDataset().reduce((sum, enterprise) => sum + (enterprise.monthlySecurityEvents || 1000000), 0) / 1000000).toFixed(1)}M
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] shadow-lg shadow-[#10ba82]/20 backdrop-blur-md border border-white/20">
                        <MdSpeed className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={cardBaseClass}>
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" 
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, #000000 20px, #000000 22px)',
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#10ba82]/40 to-transparent rounded-full blur-2xl opacity-90"></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-white/90 mb-1">Total Savings</p>
                        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                          ${(getCompaniesForDataset().reduce((sum, enterprise) => sum + (enterprise.securityMetrics?.savings || 50000), 0) / 1000).toFixed(0)}K/yr
                        </h3>
                      </div>
                      <div className="rounded-2xl p-3 bg-gradient-to-br from-[#10ba82] via-[#0c9a6c] to-[#0a8a5c] shadow-lg shadow-[#10ba82]/20 backdrop-blur-md border border-white/20">
                        <MdAnalytics className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search and Filter Controls */}
              <div className={`${cardBaseClass} mb-6`}>
                <div className="p-4">
                  {/* Dataset Selection Controls */}
                  <div className="mb-4 p-3 bg-[rgba(40,41,43,0.6)] rounded-xl border border-[#10ba82]/10">
                    <h3 className="text-sm font-medium text-white/80 mb-3">Dataset Selection:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSelectedDataset('combined')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedDataset === 'combined'
                            ? 'bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-lg'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <div className="text-center">
                          <div>Combined</div>
                          <div className="text-xs opacity-70">5,540</div>
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
                        <div className="text-center">
                          <div>Healthcare</div>
                          <div className="text-xs opacity-70">3,328</div>
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
                        <div className="text-center">
                          <div>Finance</div>
                          <div className="text-xs opacity-70">2,212</div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                      <input
                        type="text"
                        placeholder="Search systems..."
                        className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute right-3 top-2.5 text-white/50">
                        <MdSearch size={20} />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`${
                          showEnriched 
                            ? 'bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white shadow-lg shadow-green-500/20' 
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        } backdrop-blur-md rounded-full px-4 py-2 transition-all duration-500 text-sm font-medium border border-white/10 flex items-center gap-2`}
                        onClick={handleToggleEnriched}
                      >
                        Show Enriched Data
                        {showEnriched && <MdCheck className="text-white" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enriched Enterprises Table - Fit on one page without horizontal scroll */}
              <div className={`${cardBaseClass}`}>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full table-auto text-sm">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Contact</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Company</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Location</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Industry</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Employees</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Hiring Status</th>
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Compliance</th>
                        {showEnriched && (
                          <>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">License Renewal</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">RMM Tool</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">Tech Stack Gaps</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">Opportunity Score</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">Current MSP</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">Last Contact</th>
                            <th className="px-2 py-3 text-xs font-semibold text-white/70">Contact Info</th>
                          </>
                        )}
                        <th className="px-2 py-3 text-xs font-semibold text-white/70">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getCompaniesForDataset()
                        .filter(f => 
                          searchTerm ? 
                            f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            f.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            f.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            f.systemType.toLowerCase().includes(searchTerm.toLowerCase())
                            : true
                        )
                        .map((enterprise, index) => (
                          <tr 
                            key={enterprise.id} 
                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                          >
                            <td className="px-2 py-2 text-white text-xs">
                              <div className="flex items-center">
                                <div>
                                  <div className="font-medium">{enterprise.name}</div>
                                  <div className="text-xs text-white/50">{enterprise.jobTitle}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-white text-xs">{enterprise.company}</td>
                            <td className="px-2 py-2 text-white text-xs">{enterprise.location}</td>
                            <td className="px-2 py-2 text-white text-xs">{enterprise.industry || 'Healthcare'}</td>
                            <td className="px-2 py-2 text-white text-xs">{enterprise.employeeCount}</td>
                            <td className="px-2 py-2 text-white text-xs">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                (enterprise.hiringStatus || 'Actively Hiring IT Staff').includes('Actively') 
                                  ? 'bg-green-500/20 text-green-300' 
                                  : (enterprise.hiringStatus || 'Recently Hired').includes('Recently')
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-gray-500/20 text-gray-300'
                              }`}>
                                {enterprise.hiringStatus || 'Actively Hiring IT Staff'}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-white text-xs">
                              <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300">
                                {enterprise.compliance || 'HIPAA'}
                              </span>
                            </td>
                            
                            {showEnriched ? (
                              <>
                                <td className="px-2 py-2 text-white text-xs">{enterprise.licenseRenewal || 'Microsoft 365'}</td>
                                <td className="px-2 py-2 text-white text-xs">{enterprise.rmmTool || 'No RMM Tool'}</td>
                                <td className="px-2 py-2 text-white text-xs">
                                                                     <div className="flex flex-wrap gap-1">
                                     {(enterprise.techStackGaps || ['Security', 'Backup']).slice(0, 2).map((gap: string, idx: number) => (
                                       <span key={idx} className="px-1 py-0.5 rounded text-xs bg-red-500/20 text-red-300">{gap}</span>
                                     ))}
                                     {(enterprise.techStackGaps || []).length > 2 && (
                                       <span className="text-xs text-white/50">+{(enterprise.techStackGaps || []).length - 2}</span>
                                     )}
                                   </div>
                                </td>
                                <td className="px-2 py-2 text-white text-xs">
                                  <div className="flex items-center">
                                    <span className={`font-medium ${
                                      (enterprise.opportunityScore || 8.5) >= 8 ? 'text-green-400' :
                                      (enterprise.opportunityScore || 8.5) >= 7 ? 'text-yellow-400' : 'text-red-400'
                                    }`}>
                                      {(enterprise.opportunityScore || 8.5).toFixed(1)}
                                    </span>
                                    <span className="text-white/50 ml-1">/10</span>
                                  </div>
                                </td>
                                <td className="px-2 py-2 text-white text-xs">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    enterprise.hasCurrentMSP ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                  }`}>
                                    {enterprise.hasCurrentMSP ? 'Yes' : 'No'}
                                  </span>
                                </td>
                                <td className="px-2 py-2 text-white text-xs">{enterprise.lastContactAttempt || '2024-01-15'}</td>
                                                                 <td className="px-2 py-2 text-white text-xs">
                                   <div className="flex items-center gap-1">
                                     {enterprise.emails && <MdOutlineEmail className="text-[#10ba82]" size={12} />}
                                     {enterprise.phoneNumbers && <MdOutlinePhone className="text-[#10ba82]" size={12} />}
                                   </div>
                                 </td>
                                <td className="px-2 py-2 text-xs">
                                  <button 
                                    className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white rounded-lg px-2 py-1 text-xs font-medium hover:from-[#0c9a6c] hover:to-[#0a8a5c] transition-all"
                                    onClick={() => handleViewEnterprise(enterprise.id)}
                                  >
                                    View
                                  </button>
                                </td>
                              </>
                            ) : (
                              <td colSpan={7} className="px-2 py-2 text-white/50 text-xs">
                                <div className="flex items-center gap-1">
                                  <MdOutlineWarning size={12} />
                                  <span>ProCloud enriched data not yet displayed</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add pagination */}
              <div className="flex justify-between items-center mt-6 mb-8">
                <div className="text-white/70">
                  Showing <span className="text-white">1-{selectedEnterprises.length}</span> of <span className="text-white">{totalEnterprisesInDatabase.toLocaleString()}</span> systems
                </div>
                <div className="flex gap-1">
                  <button className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all">Previous</button>
                  <button className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white px-3 py-1 rounded-md hover:from-[#0c9a6c] hover:to-[#0a8a5c] transition-all">1</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">2</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">3</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">...</button>
                  <button className="bg-white/10 text-white px-3 py-1 rounded-md hover:bg-white/20 transition-all">554</button>
                  <button className="bg-white/10 text-white/70 px-3 py-1 rounded-md hover:bg-white/20 transition-all">Next</button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end items-center gap-4 mt-6 mb-4">
                <button
                  onClick={handleDownloadReport}
                  className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2"
                >
                  <MdDownload size={20} />
                  Download Report
                </button>

                <button
                  onClick={handleContinueToSystemAnalysis}
                  className="bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] hover:from-[#0c9a6c] hover:to-[#0a8a5c] text-white transition-colors px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2"
                >
                  Continue to System Analysis
                  <MdArrowForward size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Visualization Modal */}
      <dialog id="visualization-modal" className="modal modal-bottom sm:modal-middle bg-transparent">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/90 via-[#28292b]/80 to-[rgba(40,41,43,0.7)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#10ba82]/15 p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">MSP System Analysis</h3>
            <button 
              onClick={closeModal}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {selectedEnterpriseForModal && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-lg font-medium text-white mb-2">{selectedEnterpriseForModal.name}</h4>
                    <p className="text-white/70 text-sm mb-1">{selectedEnterpriseForModal.company}</p>
                    <p className="text-white/70 text-sm mb-3">
                      <span className="inline-flex items-center gap-1">
                        <MdLocationOn className="text-[#10ba82]" size={14} />
                        {selectedEnterpriseForModal.location}
                      </span>
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <p className="text-xs text-white/50">System Type</p>
                        <p className="text-sm text-white">{selectedEnterpriseForModal.systemType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">User Count</p>
                        <p className="text-sm text-white">{selectedEnterpriseForModal.userCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Transactions</p>
                        <p className="text-sm text-white">{(selectedEnterpriseForModal.monthlySecurityEvents/1000000).toFixed(2)}M</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/50">Throughput</p>
                        <p className="text-sm text-white">{selectedEnterpriseForModal.securityMetrics.maxThreatCapacity} tps</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white/5 p-4 rounded-xl h-full flex flex-col">
                    <h4 className="text-lg font-medium text-white mb-2">Available Data Visualizations</h4>
                    <ul className="space-y-2 text-white/70 text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-[#10ba82]">•</div>
                        <span>Transaction Performance Analysis: See how MSP processes your workload across different modules and components</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-[#10ba82]">•</div>
                        <span>ROI Calculation Graph: Interactive visualization showing potential cost savings over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-[#10ba82]">•</div>
                        <span>System Efficiency Dashboard: Compare current vs. optimized performance metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-0.5 text-[#10ba82]">•</div>
                        <span>Cost Breakdown Charts: See where your MSP budget is going and how to optimize it</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-[#10ba82]/20 to-[#0c9a6c]/20 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="text-[#10ba82] mt-1">
                    <MdInfoOutline size={24} />
                  </div>
                  <div>
                    <p className="text-white font-medium">See Behind the Scenes Data for {selectedEnterpriseForModal.name}</p>
                    <p className="text-white/70 text-sm mt-1">
                      Go deeper into how we collected and analyzed performance metrics specifically for {selectedEnterpriseForModal.company}. Our visualizations reveal the exact data sources, analysis methods, and optimization potential we've identified for this system.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={goToSystemAnalysis}
                  className="px-6 py-2 bg-gradient-to-r from-[#10ba82] to-[#0c9a6c] text-white rounded-lg hover:from-[#0c9a6c] hover:to-[#0a8a5c] transition-all flex items-center gap-2"
                >
                  <span>View Behind the Scenes Data</span>
                  <MdArrowForward />
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default SignalScanner; 