import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StopCircleIcon, PlayIcon, PauseIcon, XIcon, SaveIcon, ChevronLeftIcon, InfoIcon, DownloadIcon } from 'lucide-react';
import Map from '../components/Map';
import Button from '../components/Button';
import Select from '../components/Select';

interface RecordingStats {
  duration: number;
  distance: number;
  steps: number;
}

const RouteRecording = () => {
  const navigate = useNavigate();
  const [recordingState, setRecordingState] = useState<'recording' | 'paused' | 'stopped'>('recording');
  const [recordingMethod, setRecordingMethod] = useState<'automatic' | 'manual'>('automatic');
  const [description, setDescription] = useState('');
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [showCostInfo, setShowCostInfo] = useState(true);
  const [exportFormat, setExportFormat] = useState<'gpx' | 'kml' | 'geojson'>('gpx');
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Mock route data
  const mockRoute = [[40.7128, -74.006], [40.7138, -74.005], [40.7148, -74.004], [40.7158, -74.003]];
  
  // Mock recording stats
  const recordingStats: RecordingStats = {
    duration: 15, // minutes
    distance: 1.2, // km
    steps: 2150
  };

  const handleStopRecording = () => {
    setRecordingState('stopped');
  };

  const handlePauseRecording = () => {
    setRecordingState('paused');
  };

  const handleResumeRecording = () => {
    setRecordingState('recording');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission of the route
    alert(`Route submitted with description: ${description}`);
    navigate('/');
  };

  const handleCancel = () => {
    if (recordingState !== 'stopped') {
      setShowConfirmExit(true);
    } else {
      navigate('/');
    }
  };

  const toggleRecordingMethod = () => {
    setRecordingMethod(prev => prev === 'automatic' ? 'manual' : 'automatic');
  };

  const isRecording = recordingState === 'recording';

  const handleExportRoute = () => {
    // Here you would convert the route data to the selected format and download it
    let dataString = '';
    let filename = `walkcity-route-${new Date().toISOString().split('T')[0]}`;
    
    switch(exportFormat) {
      case 'gpx':
        // Simple GPX format example
        dataString = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="WalkCity">
  <trk>
    <name>WalkCity Route</name>
    <trkseg>
      ${mockRoute.map(point => `<trkpt lat="${point[0]}" lon="${point[1]}"></trkpt>`).join('\n      ')}
    </trkseg>
  </trk>
</gpx>`;
        filename += '.gpx';
        break;
      
      case 'kml':
        // Simple KML format example
        dataString = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>WalkCity Route</name>
    <Placemark>
      <LineString>
        <coordinates>
          ${mockRoute.map(point => `${point[1]},${point[0]},0`).join('\n          ')}
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;
        filename += '.kml';
        break;
      
      case 'geojson':
        // GeoJSON format
        const geoJson = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: mockRoute.map(point => [point[1], point[0]])
            },
            properties: {
              name: "WalkCity Route",
              description: description || "Recorded route"
            }
          }]
        };
        dataString = JSON.stringify(geoJson, null, 2);
        filename += '.geojson';
        break;
    }
    
    // Create and trigger download
    const blob = new Blob([dataString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Route exported in ${exportFormat.toUpperCase()} format`);
  };

  return <div className="flex flex-col h-full">
      {/* Confirm exit dialog */}
      {showConfirmExit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Cancel Recording?</h3>
            <p className="mb-6">Your current recording will be lost. Are you sure you want to exit?</p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowConfirmExit(false)}
              >
                Continue Recording
              </Button>
              <Button 
                variant="danger" 
                onClick={() => navigate('/')}
              >
                Discard & Exit
              </Button>
            </div>
          </div>
        </div>
      )}

      {recordingState === 'stopped' ? (
        <div className="p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Save Your Route</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Route Description
              </label>
              <textarea 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows={4}
                placeholder="Describe your route (e.g., Morning walk through the park)"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="block text-sm font-medium text-gray-700">Export Options</span>
                <button 
                  type="button"
                  onClick={() => setShowExportOptions(!showExportOptions)} 
                  className="text-sm text-teal-600 hover:text-teal-800"
                >
                  {showExportOptions ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showExportOptions && (
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Export your route to use with other mapping software
                  </p>
                  
                  <div className="flex space-x-2 mb-3">
                    <Select
                      options={[
                        { value: 'gpx', label: 'GPX' },
                        { value: 'kml', label: 'KML' },
                        { value: 'geojson', label: 'GeoJSON' }
                      ]}
                      value={exportFormat}
                      onChange={(value) => setExportFormat(value as 'gpx' | 'kml' | 'geojson')}
                      label="File Format"
                      className="w-40"
                    />
                    
                    <Button
                      variant="secondary"
                      icon={<DownloadIcon className="h-4 w-4" />}
                      onClick={handleExportRoute}
                      type="button"
                    >
                      Export
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p className="mb-1">Format compatibility:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>GPX: Works with most GPS devices and fitness apps</li>
                      <li>KML: Best for Google Earth and Google Maps</li>
                      <li>GeoJSON: Ideal for web mapping and GIS applications</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={() => navigate('/')}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={<SaveIcon className="h-5 w-5" />}
                type="submit"
              >
                Save Route
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative flex-1">
          <Map className="w-full h-full" center={[40.7128, -74.006]} zoom={15} />
          
          {/* Back button */}
          <button 
            onClick={handleCancel}
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-20 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>

          {/* Recording indicator */}
          <div className="absolute top-4 left-16 bg-white px-4 py-2 rounded-full shadow-md flex items-center z-20">
            <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : recordingState === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'} mr-2`}></div>
            <span className="text-sm font-medium">
              {recordingState === 'recording' ? 'Recording' : recordingState === 'paused' ? 'Paused' : 'Recording stopped'}
            </span>
          </div>

          {/* Recording method switch */}
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
            {(recordingState === 'recording' || recordingState === 'paused') && (
              <div className="bg-white rounded-lg shadow-md p-2 text-sm flex items-center">
                <span className="mr-2">Recording mode:</span>
                <button 
                  onClick={toggleRecordingMethod}
                  className={`px-3 py-1 rounded-full text-xs ${recordingMethod === 'automatic' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                >
                  Automatic
                </button>
                <button 
                  onClick={toggleRecordingMethod}
                  className={`px-3 py-1 rounded-full text-xs ${recordingMethod === 'manual' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                >
                  Manual
                </button>
              </div>
            )}
          </div>

          {/* Recording controls */}
          {(recordingState === 'recording' || recordingState === 'paused') && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-20">
              {recordingState === 'recording' ? (
                <Button 
                  onClick={handlePauseRecording} 
                  variant="secondary" 
                  icon={<PauseIcon className="h-5 w-5" />}
                >
                  Pause
                </Button>
              ) : (
                <Button 
                  onClick={handleResumeRecording} 
                  variant="primary" 
                  icon={<PlayIcon className="h-5 w-5" />}
                >
                  Resume
                </Button>
              )}
              <Button 
                onClick={handleStopRecording} 
                variant="danger" 
                icon={<StopCircleIcon className="h-5 w-5" />}
              >
                Stop Recording
              </Button>
            </div>
          )}

          {/* Recording stats */}
          {(recordingState === 'recording' || recordingState === 'paused') && (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center z-20">
              <div className="bg-white rounded-lg shadow-md p-3 flex space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-bold">{recordingStats.duration} min</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Distance</div>
                  <div className="font-bold">{recordingStats.distance} km</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Steps</div>
                  <div className="font-bold">{recordingStats.steps}</div>
                </div>
              </div>
            </div>
          )}
          {/* Resource usage info */}
          {showCostInfo && (recordingState === 'recording' || recordingState === 'paused') && (
            <div className="absolute top-20 right-4 bg-white rounded-lg shadow-md z-20 p-3 text-sm max-w-xs">
              <button 
                className="absolute top-1 right-1 p-1 hover:bg-gray-100 rounded-full text-gray-500" 
                onClick={() => setShowCostInfo(false)}
              >
                <XIcon className="h-4 w-4" />
              </button>
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="mb-1 font-medium">Resource Usage:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• GPS: Active (battery impact medium)</li>
                    <li>• Data Usage: ~{recordingMethod === 'automatic' ? '3MB' : '1MB'}/hour</li>
                    <li>• Storage: Temporary until submitted</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>;
};

export default RouteRecording;