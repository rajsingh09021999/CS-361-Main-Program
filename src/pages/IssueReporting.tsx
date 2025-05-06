import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, UploadIcon, ChevronLeftIcon, InfoIcon, CheckIcon, XIcon, RotateCcwIcon } from 'lucide-react';
import Map from '../components/Map';
import Select from '../components/Select';
import Button from '../components/Button';

interface FormState {
  issueType: string;
  description: string;
  photoFile: File | null;
  location: [number, number];
}

const IssueReporting = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<[number, number]>([40.7128, -74.006]);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showGuide, setShowGuide] = useState(true);
  const [showCosts, setShowCosts] = useState(true);
  const [formHistory, setFormHistory] = useState<FormState[]>([]);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const issueTypes = [{
    value: 'broken_sidewalk',
    label: 'Broken Sidewalk'
  }, {
    value: 'missing_crosswalk',
    label: 'Missing Crosswalk'
  }, {
    value: 'poor_lighting',
    label: 'Poor Lighting'
  }, {
    value: 'accessibility_barrier',
    label: 'Accessibility Barrier'
  }, {
    value: 'other',
    label: 'Other Issue'
  }];

  const handleMapClick = (e: any) => { // Using any type for demonstration
    setLocation([e.latlng.lat, e.latlng.lng]);
    // Save state to history for undo
    saveStateToHistory();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      saveStateToHistory();
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission of the issue report
    alert(`Issue reported: ${issueType} at ${location[0]}, ${location[1]}`);
    navigate('/');
  };

  const saveStateToHistory = () => {
    const currentState = {
      issueType,
      description,
      photoFile,
      location
    };
    setFormHistory(prev => [...prev.slice(-9), currentState]);
  };

  const handleUndo = () => {
    if (formHistory.length > 0) {
      const previousState = formHistory[formHistory.length - 1];
      setIssueType(previousState.issueType);
      setDescription(previousState.description);
      setPhotoFile(previousState.photoFile);
      setLocation(previousState.location);
      setFormHistory(prev => prev.slice(0, -1));
    }
  };

  const nextStep = () => {
    saveStateToHistory();
    setCurrentStep(prev => prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev);
  };

  const handleCancel = () => {
    if (issueType || description || photoFile) {
      setShowConfirmCancel(true);
    } else {
      navigate('/');
    }
  };

  // Guide text for each step
  const stepGuide = {
    1: "Select a location on the map where the issue is located. Be as precise as possible to help maintenance crews find the spot.",
    2: "Select the type of issue and provide a detailed description. More details help prioritize fixes.",
    3: "Add a photo if possible (optional). Photos greatly increase the chance and speed of resolution."
  };

  // Cost info for this feature
  const costInfo = {
    title: "What you should know:",
    items: [
      "Your report will be publicly visible (your name remains private)",
      "Photos are compressed to max 5MB to save your data usage",
      "Reports are shared with local authorities",
      "Typical response time: 1-4 weeks depending on severity"
    ]
  };

  return <div className="flex flex-col h-full">
      {/* Confirm cancel dialog */}
      {showConfirmCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Cancel Report?</h3>
            <p className="mb-6">Your current report will be discarded. Are you sure you want to exit?</p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowConfirmCancel(false)}
              >
                Continue Editing
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

      {/* Step 1: Map Location */}
      {currentStep === 1 && (
        <div className="relative flex-1">
          <Map 
            className="w-full h-full" 
            center={location} 
            zoom={16} 
            onClick={handleMapClick} 
          />
          
          {/* Back button */}
          <button 
            onClick={handleCancel}
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-20 hover:bg-gray-100"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>

          {/* Step indicator */}
          <div className="absolute top-4 left-16 bg-white px-4 py-2 rounded-lg shadow-md z-20">
            <div className="flex items-center space-x-2">
              <span className="h-6 w-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">1</span>
              <span className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">2</span>
              <span className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm">3</span>
            </div>
          </div>
          
          {/* Undo button */}
          {formHistory.length > 0 && (
            <button 
              onClick={handleUndo}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-20 hover:bg-gray-100"
              aria-label="Undo last action"
              title="Undo last change"
            >
              <RotateCcwIcon className="h-5 w-5 text-gray-600" />
            </button>
          )}

          {/* Guide box */}
          {showGuide && (
            <div className="absolute top-20 left-4 bg-white rounded-lg shadow-md z-20 p-3 text-sm max-w-xs">
              <button 
                className="absolute top-1 right-1 p-1 hover:bg-gray-100 rounded-full text-gray-500" 
                onClick={() => setShowGuide(false)}
              >
                <XIcon className="h-4 w-4" />
              </button>
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                <p>{stepGuide[1]}</p>
              </div>
            </div>
          )}

          {/* Pin marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <MapPinIcon className="h-8 w-8 text-red-600" />
          </div>

          {/* Next button - Repositioned to avoid overlap with Help & Features */}
          <div className="fixed bottom-24 right-8 z-50">
            <Button 
              onClick={nextStep} 
              variant="primary" 
              className="px-6 py-3 text-lg font-bold shadow-lg"
            >
              Next: Issue Details
            </Button>
          </div>
        </div>
      )}
      
      {/* Steps 2-3: Form */}
      {currentStep > 1 && (
        <div className="bg-white flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={prevStep}
                  className="mr-4 p-2 rounded-full hover:bg-gray-100"
                  aria-label="Go back"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-bold">Report an Issue</h1>
              </div>
              
              {/* Step indicator */}
              <div className="flex items-center space-x-2">
                <span className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className={`h-6 w-6 rounded-full ${currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm`}>
                  {currentStep > 2 ? <CheckIcon className="h-4 w-4" /> : 2}
                </span>
                <span className={`h-6 w-6 rounded-full ${currentStep === 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center text-sm`}>
                  3
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              {/* Guide box */}
              {showGuide && (
                <div className="mb-6 bg-gray-50 rounded-lg p-3 text-sm">
                  <div className="flex items-start">
                    <InfoIcon className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p>{stepGuide[currentStep]}</p>
                      <button 
                        className="text-teal-600 text-xs hover:underline mt-2" 
                        onClick={() => setShowGuide(false)}
                      >
                        Don't show these tips
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <>
                  <div className="mb-6">
                    <Select 
                      options={issueTypes} 
                      value={issueType} 
                      onChange={(value) => {
                        saveStateToHistory();
                        setIssueType(value);
                      }} 
                      label="Issue Type" 
                      placeholder="Select an issue type" 
                      className="mb-4" 
                    />
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea 
                        id="description" 
                        rows={4} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
                        placeholder="Describe the issue in detail. What makes it dangerous or problematic?" 
                        value={description} 
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }} 
                        onBlur={saveStateToHistory}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Be specific to help maintenance crews</span>
                        <span>{description.length > 0 ? `${description.length} characters` : 'No description yet'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      variant="primary" 
                      onClick={nextStep}
                      disabled={!issueType || !description}
                    >
                      Next: Add Photo
                    </Button>
                  </div>
                </>
              )}
              
              {currentStep === 3 && (
                <>
                  <div className="mb-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Photo (Optional but Recommended)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        {photoFile ? (
                          <div className="w-full h-full flex items-center justify-center relative">
                            <img 
                              src={URL.createObjectURL(photoFile)} 
                              alt="Preview" 
                              className="max-h-full max-w-full object-contain"
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                saveStateToHistory();
                                setPhotoFile(null);
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                            >
                              <XIcon className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadIcon className="w-8 h-8 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span>{' '}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG or JPEG (max. 5MB)
                            </p>
                          </div>
                        )}
                        <input 
                          id="photo-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileChange} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* Cost information */}
                  {showCosts && (
                    <div className="mb-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <InfoIcon className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-700">{costInfo.title}</h3>
                          <ul className="mt-2 space-y-1 text-sm text-gray-600">
                            {costInfo.items.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <button 
                            className="text-teal-600 text-xs hover:underline mt-2" 
                            onClick={() => setShowCosts(false)}
                          >
                            Got it
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Submit Report
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>;
};

export default IssueReporting;