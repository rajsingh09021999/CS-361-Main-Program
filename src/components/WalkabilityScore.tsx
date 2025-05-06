import React from 'react';
interface WalkabilityScoreProps {
  score: number;
  metric: string;
}
const WalkabilityScore: React.FC<WalkabilityScoreProps> = ({
  score,
  metric
}) => {
  let colorClass = 'bg-gray-200';
  if (score >= 80) {
    colorClass = 'bg-green-500';
  } else if (score >= 60) {
    colorClass = 'bg-green-400';
  } else if (score >= 40) {
    colorClass = 'bg-yellow-400';
  } else if (score >= 20) {
    colorClass = 'bg-orange-400';
  } else {
    colorClass = 'bg-red-500';
  }
  return <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{metric} Score</h3>
      <div className="flex items-center">
        <div className={`rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-xl ${colorClass}`}>
          {score}
        </div>
        <div className="ml-4 flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className={`h-2 rounded-full ${colorClass}`} style={{
            width: `${score}%`
          }} />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>;
};
export default WalkabilityScore;