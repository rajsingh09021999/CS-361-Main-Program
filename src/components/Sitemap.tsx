import React from 'react';
const Sitemap = () => {
  return <div className="w-full h-full bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sitemap</h1>
          <h2 className="text-2xl text-gray-600">High-level structure</h2>
        </div>
        {/* Diagram */}
        <div className="relative py-8">
          {/* Main flow */}
          <div className="flex flex-col items-center">
            {/* Home Screen */}
            <div className="relative">
              <div className="border-2 border-gray-300 rounded p-4 w-64 text-center bg-gray-100">
                <p className="text-lg">(1) Walkability Map</p>
                <p className="text-sm text-gray-600">(Home)</p>
              </div>
              {/* Vertical line from home to branches */}
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[60px] bg-gray-400 -mb-[60px]"></div>
            </div>
            {/* Spacer */}
            <div className="h-[60px]"></div>
            {/* Main screens container */}
            <div className="flex justify-between w-full max-w-3xl relative">
              {/* Horizontal connecting line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gray-400"></div>
              {/* Left vertical line */}
              <div className="absolute top-0 left-1/4 w-[2px] h-[20px] bg-gray-400"></div>
              {/* Right vertical line */}
              <div className="absolute top-0 right-1/4 w-[2px] h-[20px] bg-gray-400"></div>
              {/* Route Recording */}
              <div className="border-2 border-gray-300 rounded p-4 w-64 text-center bg-gray-100 mt-[20px]">
                <p className="text-lg">(2) Route Recording</p>
              </div>
              {/* Issue Reporting */}
              <div className="border-2 border-gray-300 rounded p-4 w-64 text-center bg-gray-100 mt-[20px]">
                <p className="text-lg">(3) Issue Reporting</p>
              </div>
            </div>
            {/* Return arrows */}
            <div className="relative w-full max-w-3xl mt-8">
              {/* Bottom horizontal line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gray-400"></div>
              {/* Left return vertical line */}
              <div className="absolute top-0 left-1/4 w-[2px] h-[40px] bg-gray-400"></div>
              {/* Right return vertical line */}
              <div className="absolute top-0 right-1/4 w-[2px] h-[40px] bg-gray-400"></div>
              {/* Return label */}
              <div className="absolute top-[40px] left-0 right-0 flex justify-center">
                <div className="border-2 border-gray-300 rounded px-4 py-2 bg-white text-sm text-gray-600">
                  Return to Map after submission
                </div>
              </div>
            </div>
            {/* Bottom spacing for return label */}
            <div className="h-[80px]"></div>
          </div>
        </div>
        {/* Legend */}
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Navigation Notes:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• All screens accessible via header navigation</li>
            <li>• Direct navigation buttons from Map to other screens</li>
            <li>• Automatic return to Map after form submissions</li>
          </ul>
        </div>
      </div>
    </div>;
};
export default Sitemap;