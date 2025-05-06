import React, { useState } from 'react';
import { HelpCircleIcon, XIcon, MapIcon, AlertTriangleIcon, ArrowLeftIcon, RotateCcwIcon } from 'lucide-react';
import Button from './Button';

interface FeatureInfo {
  title: string;
  benefits: string[];
  costs: string[];
  icon: React.ReactNode;
  tips: string[];
}

const features: FeatureInfo[] = [{
  title: 'Walkability Map',
  benefits: [
    'View walkability scores for your neighborhood', 
    'Make informed decisions about walking routes', 
    'Contribute to community knowledge',
    'Save time by finding the safest and most accessible routes'
  ],
  costs: [
    'Initial loading time for map data (5-10 seconds on slower connections)',
    "May use your device's location (can be disabled in settings)",
    "Zoomed-in views may require more data usage"
  ],
  icon: <MapIcon className="h-6 w-6" />,
  tips: [
    "Use the sidebar toggle to customize the information shown on your map",
    "You can switch between different metrics to find what matters most to you"
  ]
}, {
  title: 'Route Recording',
  benefits: [
    'Track your favorite walking paths', 
    'Help others discover safe routes', 
    'Build a community walking map',
    'Contribute data that helps improve walkability in your area'
  ],
  costs: [
    'Uses GPS and battery power (approximately 5% per hour)',
    'Requires allowing location access (permission can be revoked anytime)',
    'May need to walk route completely to ensure accurate data',
    'GPS accuracy may vary in dense urban areas'
  ],
  icon: <div className="h-6 w-6" />,
  tips: [
    "You can pause and resume recordings if you need a break",
    "Adding details about accessibility helps others with mobility concerns"
  ]
}, {
  title: 'Issue Reporting',
  benefits: [
    'Highlight safety concerns', 
    'Get infrastructure problems fixed', 
    'Make walking safer for everyone',
    'Create accountability for local authorities to address problems'
  ],
  costs: [
    'Photos may use storage space (max 5MB per photo)',
    'Location data is shared publicly (precise location can be hidden)',
    'Response time varies by issue (typically 1-4 weeks)',
    'Follow-up actions may be required for complex issues'
  ],
  icon: <AlertTriangleIcon className="h-6 w-6" />,
  tips: [
    "Add photos to make your reports more effective",
    "You can track the status of your reports in the user dashboard"
  ]
}];

const FeatureGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [showFullInfo, setShowFullInfo] = useState<Record<string, boolean>>({});
  const [previousState, setPreviousState] = useState<{
    expandedFeature: string | null,
    showFullInfo: Record<string, boolean>
  } | null>(null);

  const handleUndo = () => {
    if (previousState) {
      setExpandedFeature(previousState.expandedFeature);
      setShowFullInfo(previousState.showFullInfo);
      setPreviousState(null);
    }
  };

  const toggleFeature = (featureTitle: string) => {
    // Save current state for undo
    setPreviousState({
      expandedFeature,
      showFullInfo: {...showFullInfo}
    });
    
    setExpandedFeature(expandedFeature === featureTitle ? null : featureTitle);
  };

  const toggleInfoDetail = (featureTitle: string) => {
    setShowFullInfo(prev => ({
      ...prev,
      [featureTitle]: !prev[featureTitle]
    }));
  };

  return <>
      {/* Help Button */}
      <Button 
        variant="secondary" 
        className="fixed bottom-4 right-4 z-50 rounded-full" 
        icon={<HelpCircleIcon className="h-5 w-5" />} 
        onClick={() => setIsOpen(true)}
      >
        Help & Features
      </Button>

      {/* Guide Modal */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">WalkCity Features</h2>
                <div className="flex items-center space-x-2">
                  {previousState && (
                    <button 
                      onClick={handleUndo} 
                      className="p-2 hover:bg-gray-100 rounded-full flex items-center text-sm text-gray-600"
                      aria-label="Undo last action"
                    >
                      <RotateCcwIcon className="h-5 w-5 mr-1" />
                      <span>Undo</span>
                    </button>
                  )}
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Close guide"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {features.map(feature => <div key={feature.title} className="border rounded-lg p-4">
                    <button 
                      onClick={() => toggleFeature(feature.title)} 
                      className="w-full flex items-center justify-between"
                      aria-expanded={expandedFeature === feature.title}
                    >
                      <div className="flex items-center space-x-3">
                        {feature.icon}
                        <h3 className="text-lg font-medium">{feature.title}</h3>
                      </div>
                      <span className="text-sm text-teal-600">
                        {expandedFeature === feature.title ? 'Show less' : 'Learn more'}
                      </span>
                    </button>

                    {expandedFeature === feature.title && <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-medium text-teal-600 mb-2">
                            Benefits
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {feature.benefits.slice(0, showFullInfo[feature.title] ? undefined : 2).map((benefit, i) => <li key={i}>{benefit}</li>)}
                          </ul>
                          {feature.benefits.length > 2 && (
                            <button 
                              onClick={() => toggleInfoDetail(feature.title)} 
                              className="text-xs text-teal-600 mt-1 hover:underline"
                            >
                              {showFullInfo[feature.title] ? 'Show less' : `Show ${feature.benefits.length - 2} more benefits`}
                            </button>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-600 mb-2">
                            Things to Consider
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {feature.costs.map((cost, i) => <li key={i}>{cost}</li>)}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-600 mb-2">
                            Tips & Tricks
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {feature.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                          </ul>
                        </div>
                      </div>}
                  </div>)}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Navigation & Controls</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    • Use the sidebar toggle to show/hide walkability scores
                  </li>
                  <li>
                    • You can cancel any action using the "Cancel" or "×"
                    buttons
                  </li>
                  <li>
                    • Try different map views to find what works best for you
                  </li>
                  <li>
                    • All features are accessible through both map buttons and
                    header navigation
                  </li>
                  <li>
                    • Press Escape (Esc) key to close any dialog or cancel current action
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>}
    </>;
};

export default FeatureGuide;