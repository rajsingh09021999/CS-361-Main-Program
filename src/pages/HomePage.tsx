import React from 'react';
import { Link } from 'react-router-dom';
import { MapIcon, Route as RouteIcon, AlertCircleIcon, InfoIcon, ArrowRightIcon } from 'lucide-react';
import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Hero section */}
      <div className="bg-teal-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">WalkCity</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Discover, record, and improve walkability in your community
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/map">
            <Button variant="primary" className="bg-transparent text-white hover:bg-white hover:bg-opacity-20 border-2 border-white px-6 py-3 font-bold text-lg">
              Get Started
            </Button>
          </Link>
          <a href="#how-it-works" onClick={(e) => {
            e.preventDefault();
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Button variant="secondary" className="bg-transparent text-white hover:bg-white hover:bg-opacity-20 border-2 border-white px-6 py-3 font-bold text-lg">
              Learn How It Works
            </Button>
          </a>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Walkability Map */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <MapIcon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold ml-4">Walkability Map</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Explore walkability scores across your city with detailed metrics on safety, 
              accessibility, and connectivity.
            </p>
            <Link to="/map" className="text-teal-600 flex items-center font-medium hover:text-teal-800">
              View Map <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {/* Route Recording */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <RouteIcon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold ml-4">Route Recording</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Record your walking routes to contribute to community data and discover 
              the best paths in your neighborhood.
            </p>
            <Link to="/record-route" className="text-teal-600 flex items-center font-medium hover:text-teal-800">
              Record Route <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {/* Issue Reporting */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <AlertCircleIcon className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold ml-4">Issue Reporting</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Report walkability issues like broken sidewalks or poor lighting to help 
              improve infrastructure in your community.
            </p>
            <Link to="/report-issue" className="text-teal-600 flex items-center font-medium hover:text-teal-800">
              Report Issue <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div id="how-it-works" className="bg-gray-50 py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">How WalkCity Works</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">For Pedestrians</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                  <span>Explore walkability scores across different neighborhoods</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                  <span>Record your walking routes to share with the community</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                  <span>Report infrastructure issues to improve your community</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">For Communities</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                  <span>Aggregate walking data to identify popular routes</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                  <span>Track reported issues and improvements to infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-teal-600 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                  <span>Use data to advocate for better pedestrian infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Get started section */}
      <div className="bg-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-teal-50 rounded-lg p-8 shadow-sm">
            <InfoIcon className="h-10 w-10 text-teal-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Ready to improve your community?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Join thousands of community members already using WalkCity to make their neighborhoods more walkable.
            </p>
            <Link to="/map">
              <Button variant="primary" className="bg-teal-600 text-white hover:bg-teal-700 border-2 border-teal-700 px-6 py-3 font-bold text-lg shadow-md">
                Get Started with the Map
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">WalkCity</h3>
            <p className="text-sm">Making cities more walkable, one step at a time.</p>
          </div>
          
          <div className="flex space-x-8">
            <div>
              <h4 className="font-bold mb-2">Features</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/map" className="hover:text-white">Walkability Map</Link></li>
                <li><Link to="/record-route" className="hover:text-white">Route Recording</Link></li>
                <li><Link to="/report-issue" className="hover:text-white">Issue Reporting</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">About</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} WalkCity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 