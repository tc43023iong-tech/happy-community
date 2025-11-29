import React from 'react';
import { Page } from '../types';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface NavigationProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const pageOrder = [
  Page.INTRO,
  Page.COMMUNITY_PLACES,
  Page.SOCIAL_OBSERVATION,
  Page.PUBLIC_MORALITY,
  Page.STORY_TIME
];

export const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage }) => {
  const currentIndex = pageOrder.indexOf(currentPage);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === pageOrder.length - 1;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t-4 border-sky-300 p-4 flex justify-between items-center z-50">
      <button
        onClick={() => setPage(pageOrder[Math.max(0, currentIndex - 1)])}
        disabled={isFirst}
        className={`retro-btn px-4 py-2 flex items-center gap-2 ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <ChevronLeft size={20} /> 上一頁
      </button>

      <button 
        onClick={() => setPage(Page.INTRO)}
        className="retro-btn p-3 rounded-full bg-yellow-100 border-yellow-400 text-yellow-700 shadow-none hover:bg-yellow-200"
      >
        <Home size={24} />
      </button>

      <button
        onClick={() => setPage(pageOrder[Math.min(pageOrder.length - 1, currentIndex + 1)])}
        disabled={isLast}
        className={`retro-btn px-4 py-2 flex items-center gap-2 ${isLast ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        下一頁 <ChevronRight size={20} />
      </button>
    </div>
  );
};