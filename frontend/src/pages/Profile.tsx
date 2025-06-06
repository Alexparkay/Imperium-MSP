import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { MdBusiness, MdLocationOn, MdOutlineEmail, MdOutlinePhone, MdStorage, MdCloud, MdSecurity, MdSettings, MdAnalytics, MdCode, MdZoomIn, MdZoomOut } from 'react-icons/md';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoPath } from "d3-geo";
import { 
  mspCompanyData, 
  regions, 
  findCountryRegion, 
  isInSelectedRegions,
  handleRegionToggle as regionToggle,
  handleCountryToggle as countryToggle,
  handleStateChange as stateChange
} from '../utils/profileHelpers';

// Use a more reliable hosted GeoJSON source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedRegions, setSelectedRegions] = useState<string[]>(["North America", "Europe", "Asia Pacific"]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState<{ coordinates: [number, number], zoom: number }>({
    coordinates: [0, 20],
    zoom: 1
  });
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [showStateSelect, setShowStateSelect] = useState(false);
  const [showRegionSelect, setShowRegionSelect] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Log when the component mounts
  useEffect(() => {
    console.log("Profile component mounted");
    console.log("Using GeoJSON URL:", geoUrl);
    
    // Try to fetch the GeoJSON to verify it works
    fetch(geoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("GeoJSON data loaded successfully");
      })
      .catch(error => {
        console.error("Error loading GeoJSON:", error);
        setMapError(error.message);
      });
  }, []);

  // Calculate optimal map position and zoom when selected regions change
  useEffect(() => {
    if (selectedRegions.length === 0) return;
    
    if (selectedRegions.length === 1) {
      // If only one region, use its center and zoom
      const region = selectedRegions[0];
      setPosition({
        coordinates: regions[region].center,
        zoom: regions[region].zoom
      });
    } else {
      // For multiple regions, calculate a centered view that includes all
      // This is a simplified approach - ideally would calculate actual bounding box
      setPosition({
        coordinates: [0, 20], // World centered view
        zoom: selectedRegions.length > 3 ? 1 : 1.5 // Zoom out more when more regions are selected
      });
    }
  }, [selectedRegions]);

  // Helper functions for handling user interactions
  const handleRegionToggle = (region: string) => {
    regionToggle(region, selectedRegions, setSelectedRegions);
  };

  const handleCountryToggle = (country: string) => {
    countryToggle(country, selectedCountries, setSelectedCountries);
  };

  const handleStateChange = (state: string) => {
    stateChange(state, setSelectedState);
  };

  // Check if a country is in selected regions
  const isInSelectedRegions = (countryName: string): boolean => {
    return selectedRegions.some(region => 
      regions[region].countries.includes(countryName)
    );
  };

  // Pro Cloud SaaS company data
  const proCloudCompanyData = {
    companyInfo: {
      name: "Pro Cloud SaaS",
      address: "Rio Verde, Arizona, United States",
      phone: "+1 (480) 555-0123",
      email: "contact@procloudsaas.com",
      website: "www.procloudsaas.com"
    },
    mspServices: {
      implementations: [
        {
          name: "cyberGUARD - Complete Cybersecurity",
          description: "Comprehensive cybersecurity solution with EDR, email security, backup, and user training",
          features: ["Email Security", "Endpoint Detection & Response", "Hardware Backup", "Email Backup", "Security Education", "Keyboard Encryption", "Password Management", "Professional Services"]
        },
        {
          name: "Cloud Migration Services",
          description: "End-to-end cloud adoption and migration for AWS, Azure, Google Cloud, and private environments",
          features: ["Multi-Cloud Strategy", "Infrastructure Assessment", "Vulnerability Identification", "Security-First Migration", "Cost Optimization", "Scalability Planning"]
        },
        {
          name: "Physical Security Integration",
          description: "SaaS-based access control systems with open API frameworks and identity integration",
          features: ["Keyless Access", "Contactless Systems", "Video Management", "Wireless Locking", "Identity Services", "UL 294 Certified", "SOC2 Compliant"]
        }
      ],
      solutions: [
        {
          name: "CMMC Compliance Solutions",
          description: "Specialized cybersecurity services for defense contractors and DoD supply chain",
          features: ["CMMC 2.0 Framework", "Controlled Unclassified Information", "Defense Industrial Base", "Compliance Assessment", "Gap Analysis", "Remediation Planning"]
        },
        {
          name: "Managed IT Services",
          description: "Comprehensive IT management including business continuity, compliance, and automation",
          features: ["Business Continuity", "Data Loss Prevention", "Identity Management", "Network Management", "VOIP & Connectivity", "CCTV Monitoring"]
        },
        {
          name: "Enterprise Applications",
          description: "Business application integration and management for improved productivity",
          features: ["CRM Integration", "Call Center Solutions", "Mobile Device Management", "Marketing Automation", "Collaboration Tools", "Output Management"]
        }
      ]
    },
    expertise: {
      maxProjectSize: "Global Enterprise",
      typicalProjectSize: "Mid-Market to Enterprise",
      serviceTypes: ["Cybersecurity", "Cloud Migration", "Physical Security", "Managed IT", "CMMC Compliance", "Business Applications"],
      certifications: ["AWS Certified", "Microsoft Azure Partner", "Google Cloud Partner", "UL 294", "SOC2", "CCPA Compliant", "CMMC Framework Specialist"],
      serviceArea: ["North America", "Europe", "Asia Pacific", "South America", "Africa"]
    },
    performance: {
      completedProjects: 150,
      totalClients: 85,
      averageImplementation: "3-6 months",
      customerSatisfaction: 4.8
    }
  };

  return (
    <div className="w-full px-24 py-12 bg-[#020305] min-h-screen min-w-full relative">
      {/* Background gradient orbs */}
      <div className="fixed top-20 right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-70 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-60 pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">MSP Partner Profile</h2>
        <button
          onClick={() => navigate('/profile/edit')}
          className="btn bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 text-white border-none hover:shadow-lg hover:shadow-emerald-500/20"
        >
          <HiOutlinePencil className="text-lg" /> Edit Profile
        </button>
      </div>

      {/* Main Content with Centered Map */}
      <div className="relative w-full min-h-[calc(100vh-12rem)] flex items-center justify-center">
        {/* Central Interactive Map - Larger size */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div ref={mapRef} className="relative w-[1100px] h-[1100px] bg-[#020305]/50 backdrop-blur-md rounded-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Fallback div to ensure some content is visible */}
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-emerald-500/50 p-4 text-center">
                {mapError && (
                  <div className="text-red-400 text-sm max-w-md">
                    Error loading map: {mapError}
                  </div>
                )}
              </div>
              
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 150,
                  center: [0, 0]
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent"
                }}
              >
                <ZoomableGroup
                  center={position.coordinates}
                  zoom={position.zoom}
                  onMoveEnd={(position) => setPosition(position)}
                  maxZoom={8}
                  minZoom={1}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        // For world-atlas TopoJSON format
                        const countryName = geo.properties.name || "";
                        const countryRegion = findCountryRegion(countryName);
                        const isSelected = selectedCountries.includes(countryName) || 
                                         (selectedCountries.length === 0 && isInSelectedRegions(countryName));
                        const fillColor = countryRegion 
                          ? regions[countryRegion].color 
                          : "#2A2A2A";
                        const isHovered = hoveredCountry === countryName;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => countryRegion && handleCountryToggle(countryName)}
                            onMouseEnter={() => {
                              setTooltipContent(countryName);
                              setHoveredCountry(countryName);
                            }}
                            onMouseLeave={() => {
                              setTooltipContent("");
                              setHoveredCountry("");
                            }}
                            style={{
                              default: {
                                fill: isSelected ? fillColor : "#2A2A2A",
                                stroke: "#1A1A1A",
                                strokeWidth: 0.5,
                                outline: "none",
                                opacity: countryRegion ? (isSelected ? 1 : 0.3) : 0.2
                              },
                              hover: {
                                fill: countryRegion ? fillColor : "#3A3A3A",
                                stroke: "#1A1A1A",
                                strokeWidth: 0.5,
                                outline: "none",
                                opacity: 1,
                                cursor: countryRegion ? "pointer" : "default"
                              },
                              pressed: {
                                fill: countryRegion ? fillColor : "#3A3A3A",
                                stroke: "#1A1A1A",
                                strokeWidth: 0.5,
                                outline: "none"
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
            
            {/* Map tooltip */}
            {tooltipContent && (
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-[#28292b]/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-sm pointer-events-none border border-emerald-500/20">
                {tooltipContent}
              </div>
            )}
            
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020305]/10 to-[#020305] opacity-30 pointer-events-none"></div>
          </div>
        </div>

        {/* Content Layout Container */}
        <div className="relative w-full h-full z-10 grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-1 space-y-6">
            {/* Company Info Card */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-3">
                <MdBusiness className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">{proCloudCompanyData.companyInfo.name}</h3>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="text-emerald-400" />
                  <span className="text-white/80">{proCloudCompanyData.companyInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlinePhone className="text-emerald-400" />
                  <span className="text-white/80">{proCloudCompanyData.companyInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEmail className="text-emerald-400" />
                  <span className="text-white/80">{proCloudCompanyData.companyInfo.email}</span>
                </div>
                <div className="text-white/80 mt-2">
                  <span className="text-white/60">Website:</span>
                  <span className="ml-2">{proCloudCompanyData.companyInfo.website}</span>
                </div>
                <div className="text-white/80 mt-2">
                  <span className="text-white/60">Founded:</span>
                  <span className="ml-2">2020</span>
                </div>
                <div className="text-white/80">
                  <span className="text-white/60">Company Size:</span>
                  <span className="ml-2">11-50 employees</span>
                </div>
              </div>
            </div>

            {/* Security Solutions */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-3">
                <MdSecurity className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">Security Solutions</h3>
              </div>
              <div>
                {proCloudCompanyData.mspServices.implementations.map((impl, index) => (
                  <div key={index} className="text-sm space-y-2 mb-4 last:mb-0 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                    <div className="font-semibold text-white">{impl.name}</div>
                    <div className="text-white/80 text-xs">{impl.description}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {impl.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-sm text-xs border border-emerald-500/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Regions - Updated to match country selection style */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-3">
                <MdStorage className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">Global Service Coverage</h3>
              </div>
              
              {/* Selected regions display */}
              <div className="text-sm space-y-2 mb-4 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                <div className="font-semibold text-white">Active Service Regions</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedRegions.map((region) => (
                    <span 
                      key={region} 
                      className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-sm text-xs border border-emerald-500/20 flex items-center gap-1"
                    >
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ 
                          backgroundColor: regions[region].color,
                          boxShadow: `0 0 6px ${regions[region].color}`
                        }}
                      />
                      {region}
                    </span>
                  ))}
                  {selectedRegions.length === 0 && (
                    <span className="text-white/60 text-xs">No regions selected</span>
                  )}
                </div>
              </div>

              {/* Pro Cloud Office Locations */}
              <div className="text-sm space-y-2 mb-4 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                <div className="font-semibold text-white">Global Office Locations</div>
                <div className="grid grid-cols-2 gap-1 text-xs text-white/80">
                  <div>🇺🇸 United States</div>
                  <div>🇬🇧 United Kingdom</div>
                  <div>🇦🇺 Australia</div>
                  <div>🇮🇳 India</div>
                  <div>🇳🇬 Nigeria</div>
                  <div>🇲🇽 Mexico</div>
                  <div>🇧🇷 Brazil</div>
                  <div>🇧🇪 Belgium</div>
                </div>
              </div>

              {/* Region Selection - dropdown style matching countries */}
              <div className="mt-4">
                <button
                  onClick={() => setShowRegionSelect(!showRegionSelect)}
                  className="w-full px-3 py-2 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 transition-all hover:bg-emerald-500/20 flex justify-between items-center"
                >
                  <span className="text-sm font-medium">Select Regions</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${showRegionSelect ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {showRegionSelect && (
                  <div className="mt-2 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10 max-h-48 overflow-y-auto">
                    <div className="space-y-1">
                      {Object.keys(regions).map((region) => (
                        <label 
                          key={region} 
                          className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-emerald-500/10"
                        >
                          <input 
                            type="checkbox" 
                            className="checkbox checkbox-xs checkbox-success bg-[#28292b]/60" 
                            checked={selectedRegions.includes(region)}
                            onChange={() => handleRegionToggle(region)}
                          />
                          <span className="text-white/80 text-sm">{region}</span>
                          <div 
                            className="ml-auto w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: regions[region].color,
                              boxShadow: selectedRegions.includes(region) ? `0 0 8px ${regions[region].color}` : 'none'
                            }}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected countries display */}
              {selectedRegions.length > 0 && (
                <div className="text-sm space-y-2 mt-4 pt-4 border-t border-emerald-500/10 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                  <div className="font-semibold text-white">Selected Countries</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCountries.length > 0 ? (
                      selectedCountries.map((country) => {
                        const countryRegion = findCountryRegion(country);
                        return (
                          <span 
                            key={country} 
                            className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-sm text-xs border border-emerald-500/20 flex items-center gap-1"
                          >
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ 
                                backgroundColor: countryRegion ? regions[countryRegion].color : "#10B981",
                                boxShadow: `0 0 6px ${countryRegion ? regions[countryRegion].color : "#10B981"}`
                              }}
                            />
                            {country}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-white/60 text-xs">No countries selected</span>
                    )}
                  </div>
                </div>
              )}

              {/* Country Selection - toggle dropdown */}
              {selectedRegions.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowCountrySelect(!showCountrySelect)}
                    className="w-full px-3 py-2 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 transition-all hover:bg-emerald-500/20 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">Select Countries</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showCountrySelect ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {showCountrySelect && (
                    <div className="mt-2 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10 max-h-48 overflow-y-auto">
                      <div className="space-y-1">
                        {selectedRegions.flatMap(regionName => 
                          regions[regionName].countries.map((country) => (
                            <label 
                              key={`${regionName}-${country}`} 
                              className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-emerald-500/10"
                            >
                              <input 
                                type="checkbox" 
                                className="checkbox checkbox-xs checkbox-success bg-[#28292b]/60" 
                                checked={selectedCountries.includes(country)}
                                onChange={() => handleCountryToggle(country)}
                              />
                              <span className="text-white/80 text-sm">{country}</span>
                              <div 
                                className="ml-auto w-2 h-2 rounded-full" 
                                style={{ 
                                  backgroundColor: regions[findCountryRegion(country) || ""].color,
                                  boxShadow: selectedCountries.includes(country) ? `0 0 6px ${regions[findCountryRegion(country) || ""].color}` : 'none'
                                }}
                              />
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* State Selection - only for USA/UK */}
              {selectedCountries.some(c => c === "United States of America" || c === "United Kingdom") && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowStateSelect(!showStateSelect)}
                    className="w-full px-3 py-2 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 transition-all hover:bg-emerald-500/20 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">Select States/Regions</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showStateSelect ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {showStateSelect && (
                    <div className="mt-2 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10 max-h-48 overflow-y-auto">
                      {selectedCountries.includes("United States of America") && (
                        <div>
                          <div className="font-medium text-white/80 mb-1 text-sm">United States of America</div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            {["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"].map((state) => (
                              <div key={state} className="flex items-center">
                                <label 
                                  className="flex items-center gap-2 cursor-pointer py-1 text-xs"
                                >
                                  <input 
                                    type="radio" 
                                    className="radio radio-xs radio-success" 
                                    checked={selectedState === state}
                                    onChange={() => handleStateChange(state)}
                                    name="us-state"
                                  />
                                  <span className="text-white/80 text-xs">{state}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedCountries.includes("United Kingdom") && (
                        <div className={selectedCountries.includes("United States of America") ? "mt-3" : ""}>
                          <div className="font-medium text-white/80 mb-1 text-sm">United Kingdom</div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            {["England", "Scotland", "Wales", "Northern Ireland"].map((region) => (
                              <div key={region} className="flex items-center">
                                <label 
                                  className="flex items-center gap-2 cursor-pointer py-1 text-xs"
                                >
                                  <input 
                                    type="radio" 
                                    className="radio radio-xs radio-success" 
                                    checked={selectedState === region}
                                    onChange={() => handleStateChange(region)}
                                    name="uk-region"
                                  />
                                  <span className="text-white/80 text-xs">{region}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center Column - Empty for Map */}
          <div className="col-span-1"></div>

          {/* Right Column */}
          <div className="col-span-1 space-y-6">
            {/* Performance Metrics */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-3">
                <MdAnalytics className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">Performance</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/60 text-sm">Projects</p>
                  <p className="text-xl font-bold text-white">{proCloudCompanyData.performance.completedProjects}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total Clients</p>
                  <p className="text-xl font-bold text-white">{proCloudCompanyData.performance.totalClients}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Implementation</p>
                  <p className="text-xl font-bold text-white">{proCloudCompanyData.performance.averageImplementation}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Satisfaction</p>
                  <p className="text-xl font-bold text-white">{proCloudCompanyData.performance.customerSatisfaction}/5.0</p>
                </div>
              </div>
            </div>

            {/* Service Types with Certifications */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-4">
                <MdSettings className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">MSP Service Types</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {proCloudCompanyData.expertise.serviceTypes.map((type, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded text-xs border border-emerald-500/20">
                    {type}
                  </span>
                ))}
              </div>
              
              {/* Certifications section inside service types */}
              <div className="mt-6 pt-6 border-t border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <MdSecurity className="text-2xl text-emerald-500" />
                  <h3 className="text-lg font-semibold text-white">Certifications & Partnerships</h3>
                </div>
                <div>
                  {proCloudCompanyData.expertise.certifications.map((cert, index) => (
                    <div key={index} className="text-sm mb-3 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                      <span className="text-white/90">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MSP Solutions - Moved to right column */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-[#28292b]/80 via-[#28292b]/50 to-[rgba(40,41,43,0.2)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-emerald-500/15 p-4">
              <div className="flex items-center gap-3 mb-3">
                <MdCloud className="text-2xl text-emerald-500" />
                <h3 className="text-lg font-semibold text-white">Managed Solutions</h3>
              </div>
              <div>
                {proCloudCompanyData.mspServices.solutions.map((solution, index) => (
                  <div key={index} className="text-sm space-y-2 mb-4 last:mb-0 bg-[#28292b]/40 backdrop-blur-md rounded-lg p-3 border border-emerald-500/10">
                    <div className="font-semibold text-white">{solution.name}</div>
                    <div className="text-white/80 text-xs">{solution.description}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {solution.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded-sm text-xs border border-emerald-500/20">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;