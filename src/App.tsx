import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import WalkabilityMap from './pages/WalkabilityMap';
import RouteRecording from './pages/RouteRecording';
import IssueReporting from './pages/IssueReporting';
import FeatureGuide from './components/FeatureGuide';

export function App() {
  return <BrowserRouter>
      <div className="flex flex-col w-full h-screen bg-gray-50">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<WalkabilityMap />} />
            <Route path="/record-route" element={<RouteRecording />} />
            <Route path="/report-issue" element={<IssueReporting />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <FeatureGuide />
      </div>
    </BrowserRouter>;
}