
import React from "react";

const ChallengeLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin h-10 w-10 border-4 border-skillpurple-400 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default ChallengeLoading;
