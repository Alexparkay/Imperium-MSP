// Helper functions for the Profile component

// MSP Company Data - Sample/Mock data
export const mspCompanyData = {
  companyInfo: {
    name: "SecureEdge MSP Solutions",
    address: "789 Cyber Defense Boulevard, Security Plaza, TX 75201",
    phone: "+1 (555) 789-0123",
    email: "contact@secureedgemsp.com",
    website: "www.secureedgemsp.com"
  },
  expertise: {
    serviceTypes: [
      "Cybersecurity Services", 
      "Managed SOC", 
      "Cloud Security", 
      "Microsoft 365 Management", 
      "Endpoint Protection",
      "Compliance Management",
      "Penetration Testing",
      "IT Helpdesk & Support"
    ],
    certifications: [
      "CISSP - Certified Information Systems Security Professional",
      "CompTIA Security+ Enterprise Certification",
      "Microsoft 365 Certified: Security Administrator Expert",
      "SOC 2 Type II Compliance Certified",
      "ISO 27001 Information Security Management",
      "CISA - Certified Information Systems Auditor"
    ]
  },
  performance: {
    completedProjects: 245,
    totalClients: 168,
    averageImplementation: "2.8 months",
    customerSatisfaction: 4.9
  },
  mspServices: {
    implementations: [
      {
        name: "24/7 SOC Implementation",
        description: "Complete Security Operations Center setup with real-time threat monitoring and incident response.",
        features: ["Threat Detection", "Incident Response", "SIEM Integration", "24/7 Monitoring"]
      },
      {
        name: "Microsoft 365 Security Suite",
        description: "Comprehensive M365 security implementation including Advanced Threat Protection and compliance setup.",
        features: ["Email Security", "Identity Protection", "Data Loss Prevention", "Compliance Reporting"]
      },
      {
        name: "Zero Trust Architecture",
        description: "Implementation of comprehensive zero trust security framework for modern enterprises.",
        features: ["Identity Verification", "Device Compliance", "Network Segmentation", "Access Controls"]
      }
    ],
    solutions: [
      {
        name: "Endpoint Security Management",
        description: "Advanced endpoint detection and response with automated threat remediation.",
        features: ["EDR Implementation", "Patch Management", "Device Compliance", "Remote Monitoring"]
      },
      {
        name: "Cloud Security Posture",
        description: "Comprehensive cloud security assessment and continuous compliance monitoring.",
        features: ["Cloud Configuration", "Vulnerability Scanning", "Access Management", "Cost Optimization"]
      },
      {
        name: "Backup & Disaster Recovery",
        description: "Enterprise-grade backup solutions with tested disaster recovery procedures.",
        features: ["Automated Backups", "Recovery Testing", "Business Continuity", "Compliance Documentation"]
      }
    ]
  }
};

// Region mappings
export const regions: Record<string, { 
  countries: string[], 
  color: string, 
  center: [number, number], 
  zoom: number 
}> = {
  "North America": { 
    countries: ["United States of America", "Canada", "Mexico"], 
    color: "#047857", // emerald-700
    center: [-100, 45],
    zoom: 2
  },
  "Europe": { 
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain", "Switzerland", "Netherlands", "Belgium", "Sweden", "Norway", "Finland", "Denmark", "Poland", "Austria"],
    color: "#10B981", // emerald-500
    center: [10, 50],
    zoom: 3
  },
  "Asia Pacific": { 
    countries: ["China", "Japan", "South Korea", "India", "Australia", "New Zealand", "Singapore", "Thailand", "Malaysia", "Indonesia", "Philippines", "Vietnam"],
    color: "#34D399", // emerald-400
    center: [115, 35],
    zoom: 2
  },
  "Middle East": { 
    countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Israel", "Egypt", "Turkey", "Oman", "Kuwait", "Bahrain"],
    color: "#065F46", // emerald-800
    center: [45, 30],
    zoom: 3
  }
};

// Find the region a country belongs to
export const findCountryRegion = (countryName: string): string | null => {
  for (const [region, data] of Object.entries(regions)) {
    if (data.countries.includes(countryName)) {
      return region;
    }
  }
  return null;
};

// Check if a country is in one of the selected regions
export const isInSelectedRegions = (countryName: string, selectedRegions: string[] = []): boolean => {
  const countryRegion = findCountryRegion(countryName);
  return countryRegion ? selectedRegions.includes(countryRegion) : false;
};

// Format functions
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const handleStateChange = (state: string, setSelectedState: React.Dispatch<React.SetStateAction<string | null>>) => {
  setSelectedState(state);
};

export const handleRegionToggle = (region: string, selectedRegions: string[], setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>) => {
  if (selectedRegions.includes(region)) {
    setSelectedRegions(selectedRegions.filter(r => r !== region));
  } else {
    setSelectedRegions([...selectedRegions, region]);
  }
};

export const handleCountryToggle = (country: string, selectedCountries: string[], setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>) => {
  if (selectedCountries.includes(country)) {
    setSelectedCountries(selectedCountries.filter(c => c !== country));
  } else {
    setSelectedCountries([...selectedCountries, country]);
  }
}; 