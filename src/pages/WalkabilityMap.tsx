import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, AlertCircleIcon, XIcon, SlidersIcon, UndoIcon, InfoIcon, RefreshCwIcon } from 'lucide-react';
import Map from '../components/Map';
import Select from '../components/Select';
import Button from '../components/Button';
import WalkabilityScore from '../components/WalkabilityScore';

const WalkabilityMap = () => {
  const [metric, setMetric] = useState('overall');
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    scores: true,
    legend: false,
    filters: false
  });
  const [detailLevel, setDetailLevel] = useState<'simple' | 'detailed'>('simple');
  const [history, setHistory] = useState<{ metric: string, showSidebar: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoadAttempts, setMapLoadAttempts] = useState(0);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Track history for undo functionality
  useEffect(() => {
    setHistory(prev => [...prev.slice(-10), { metric, showSidebar }]);
  }, [metric, showSidebar]);

  const handleUndo = () => {
    if (history.length > 1) {
      const previousState = history[history.length - 2];
      setMetric(previousState.metric);
      setShowSidebar(previousState.showSidebar);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const metricOptions = [{
    value: 'overall',
    label: 'Overall Walkability'
  }, {
    value: 'safety',
    label: 'Safety'
  }, {
    value: 'amenities',
    label: 'Amenities'
  }, {
    value: 'connectivity',
    label: 'Connectivity'
  }, {
    value: 'comfort',
    label: 'Comfort'
  }];

  const scores = {
    overall: 78,
    safety: 82,
    amenities: 65,
    connectivity: 90,
    comfort: 75
  };

  // Additional filters for map data
  const filterOptions = [
    { id: 'sidewalks', label: 'Sidewalks' },
    { id: 'crosswalks', label: 'Crosswalks' },
    { id: 'lighting', label: 'Street Lighting' },
    { id: 'traffic', label: 'Traffic Density' },
    { id: 'speed_limits', label: 'Speed Limits' },
    { id: 'public_transit', label: 'Public Transit' },
    { id: 'bike_lanes', label: 'Bike Lanes' },
    { id: 'accessibility', label: 'Accessibility Features' }
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleDetailLevel = () => {
    setDetailLevel(prev => prev === 'simple' ? 'detailed' : 'simple');
  };

  // Simulate map loading with reliability mechanisms
  const loadMapData = useCallback(async () => {
    setIsLoading(true);
    setMapError(null);
    
    try {
      // Simulate API call to load map data
      await new Promise((resolve, reject) => {
        const shouldFail = Math.random() < 0.05; // 5% failure rate simulation
        
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error('Failed to load map data'));
          } else {
            resolve('success');
          }
        }, 800); // Simulate network delay
      });
      
      setIsLoading(false);
      setMapLoadAttempts(0);
    } catch (error) {
      console.error('Map loading error:', error);
      setMapError('Failed to load map data. Please try again.');
      setIsLoading(false);
      
      // Auto-retry if under threshold (implements reliability)
      if (mapLoadAttempts < 2) {
        setMapLoadAttempts(prev => prev + 1);
        setTimeout(() => {
          loadMapData();
        }, 1000);
      }
    }
  }, [mapLoadAttempts]);
  
  // Initial load and metric change handler
  useEffect(() => {
    loadMapData();
  }, [metric, loadMapData]);

  return <div className="relative flex flex-col h-full">
      <div className="p-4 bg-white shadow-sm z-20 flex justify-between items-center">
        <div className="flex-1">
          <Select 
            options={metricOptions} 
            value={metric} 
            onChange={setMetric} 
            label="Select Walkability Metric" 
            className="w-full md:w-64" 
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDetailLevel}
            className="p-2 rounded-full hover:bg-gray-100 text-teal-600 flex items-center text-sm"
            aria-label="Toggle detail level"
            title="Toggle between simple and detailed view"
          >
            <SlidersIcon className="h-5 w-5 mr-1" />
            <span className="hidden md:inline">{detailLevel === 'simple' ? 'Detailed view' : 'Simple view'}</span>
          </button>
          {history.length > 1 && (
            <button
              onClick={handleUndo}
              className="p-2 rounded-full hover:bg-gray-100 text-teal-600"
              aria-label="Undo last action"
              title="Undo last change"
            >
              <UndoIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-40">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-3"></div>
              <p>Loading map data...</p>
            </div>
          </div>
        )}
        
        {mapError && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-700 px-4 py-3 rounded-lg shadow-md z-40 flex items-center">
            <AlertCircleIcon className="h-5 w-5 mr-2" />
            <p>{mapError}</p>
            <button 
              onClick={loadMapData}
              className="ml-3 bg-red-100 p-1 rounded-full hover:bg-red-200"
              aria-label="Retry loading map"
            >
              <RefreshCwIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        
        <Map className="w-full h-full" />

        {/* Information tooltip */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md z-20 p-3 text-sm max-w-xs">
          <button className="absolute top-1 right-1 p-1 hover:bg-gray-100 rounded-full text-gray-500" onClick={() => {}}>
            <XIcon className="h-4 w-4" />
          </button>
          <div className="flex items-start">
            <InfoIcon className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
            <p>
              You're viewing the {metricOptions.find(option => option.value === metric)?.label} map. 
              {detailLevel === 'detailed' ? ' All details are shown.' : ' Switch to detailed view for more information.'}
              <button className="text-teal-600 hover:underline ml-1" onClick={() => {}}>
                Don't show again
              </button>
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-20">
          <Link to="/record-route">
            <Button variant="primary" icon={<div className="h-5 w-5" />} className="px-6">
              Record Route
            </Button>
          </Link>
          <Link to="/report-issue">
            <Button variant="secondary" icon={<AlertCircleIcon className="h-5 w-5" />} className="px-6">
              Report Issue
            </Button>
          </Link>
        </div>

        {/* Sidebar */}
        <div className={`absolute top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} w-72 z-30`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Walkability Data
              </h2>
              <button onClick={() => setShowSidebar(false)} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close sidebar">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Display settings */}
            <div className="mb-4 bg-gray-50 rounded-lg p-3 text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Information Display</span>
                <button 
                  onClick={toggleDetailLevel}
                  className="text-teal-600 text-xs hover:underline"
                >
                  {detailLevel === 'simple' ? 'Show all details' : 'Simplify view'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <button 
                  onClick={() => setExpandedSections(prev => ({
                    ...prev,
                    scores: !prev.scores
                  }))} 
                  className="flex justify-between items-center w-full p-2 hover:bg-gray-50 rounded"
                >
                  <span className="font-medium">Walkability Scores</span>
                  <span className="text-sm text-teal-600">
                    {expandedSections.scores ? 'Hide' : 'Show'}
                  </span>
                </button>
                
                {expandedSections.scores && <div className="mt-2">
                  <WalkabilityScore 
                    score={scores[metric as keyof typeof scores]} 
                    metric={metricOptions.find(option => option.value === metric)?.label || 'Overall'} 
                  />
                  
                  {detailLevel === 'detailed' && (
                    <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <p>This score is calculated based on:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Pedestrian infrastructure</li>
                        <li>Street connectivity</li>
                        <li>Traffic safety data</li>
                        {metric === 'overall' && <li>Multiple additional factors</li>}
                      </ul>
                    </div>
                  )}
                </div>}
              </div>

              <div>
                <button 
                  onClick={() => setExpandedSections(prev => ({
                    ...prev,
                    legend: !prev.legend
                  }))} 
                  className="flex justify-between items-center w-full p-2 hover:bg-gray-50 rounded"
                >
                  <span className="font-medium">Score Legend</span>
                  <span className="text-sm text-teal-600">
                    {expandedSections.legend ? 'Hide' : 'Show'}
                  </span>
                </button>
                
                {expandedSections.legend && <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-4 bg-green-500 mr-2 rounded"></div>
                    <span className="text-sm">Excellent (80-100)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-4 bg-yellow-400 mr-2 rounded"></div>
                    <span className="text-sm">Good (60-79)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-4 bg-orange-400 mr-2 rounded"></div>
                    <span className="text-sm">Fair (40-59)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-4 bg-red-500 mr-2 rounded"></div>
                    <span className="text-sm">Poor (0-39)</span>
                  </div>
                </div>}
              </div>

              {/* Map Filters - Added for flexibility quality attribute */}
              <div>
                <button 
                  onClick={() => setExpandedSections(prev => ({
                    ...prev,
                    filters: !prev.filters
                  }))} 
                  className="flex justify-between items-center w-full p-2 hover:bg-gray-50 rounded"
                >
                  <span className="font-medium">Map Filters</span>
                  <span className="text-sm text-teal-600">
                    {expandedSections.filters ? 'Hide' : 'Show'}
                  </span>
                </button>
                
                {expandedSections.filters && <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600 mb-2">Show or hide map elements:</p>
                  
                  {filterOptions.map(filter => (
                    <div key={filter.id} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`filter-${filter.id}`} 
                        checked={activeFilters.includes(filter.id)}
                        onChange={() => toggleFilter(filter.id)}
                        className="h-4 w-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <label htmlFor={`filter-${filter.id}`} className="ml-2 text-sm">
                        {filter.label}
                      </label>
                    </div>
                  ))}
                </div>}
              </div>

              {/* Data reliability information */}
              <div className="bg-blue-50 p-3 rounded-lg text-sm">
                <div className="flex items-start">
                  <InfoIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium">Data Reliability</p>
                    <p className="text-blue-600 mt-1">
                      Map data is updated daily with 99% reliability. Last update: {new Date().toLocaleDateString()}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar toggle button */}
        {!showSidebar && (
          <button 
            onClick={() => setShowSidebar(true)} 
            className="absolute top-20 right-0 bg-teal-600 text-white p-2 rounded-l-md shadow-md"
            aria-label="Open sidebar"
          >
            <SlidersIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>;
};

export default WalkabilityMap;