import React, { useState, useEffect } from 'react';
import { useGetCommentsQuery } from '../api/advancedApi';
import NestedComments from '../components/NestedComments';

// A deliberately unoptimized child component
const HeavyListItem = ({ item, onClick }) => {
  // Deliberately slow down rendering to make performance issues obvious
  const start = performance.now();
  while (performance.now() - start < 10) {
    // Artificial 10ms delay per item
  }

  // Generate a random color to visually see re-renders (anti-pattern for production, but good for debugging)
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

  return (
    <div 
      className="p-3 mb-2 border rounded shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
      style={{ borderLeftColor: randomColor, borderLeftWidth: '4px' }}
      onClick={() => onClick(item.id)}
    >
      <p className="font-medium text-gray-800">{item.name}</p>
      <p className="text-xs text-gray-500">Click to log ID</p>
    </div>
  );
};

const AdvancedExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clickCount, setClickCount] = useState(0);
  
  // RTK Query hook
  const { data: comments, isLoading } = useGetCommentsQuery();

  // INTENTIONAL BUG: Infinite loop!
  // This useEffect updates state on every render, causing another render, infinitely.
  useEffect(() => {
    // console.log("I am running infinitely!");
    // setClickCount(clickCount + 1); // Uncommenting this will crash the browser
    
    // Instead of completely crashing, let's cause rapid re-renders by setting a random number
    // if we don't have a specific dependency array or if we depend on something that always changes
    setClickCount(Math.random()); 
  }); 

  // Generate a large list of mock items
  const generateLargeList = () => {
    const list = [];
    for (let i = 0; i < 200; i++) {
      list.push({ id: i, name: `Heavy Item ${i}` });
    }
    return list;
  };

  // INTENTIONAL BUG: Missing useMemo!
  // This heavy function runs on every single render, including when clickCount updates rapidly
  // or when typing in the search box (missing debounce).
  const heavyList = generateLargeList();
  
  const filteredList = heavyList.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // INTENTIONAL BUG: Missing useCallback!
  // This function is recreated on every render, breaking any potential React.memo on HeavyListItem.
  const handleItemClick = (id) => {
    console.log(`Clicked item ${id}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-red-600 mb-6">⚠️ Dirty Performance Showcase ⚠️</h1>
      
      <p className="mb-4 text-gray-700">
        This component is intentionally unoptimized. The <strong>HeavyListItem</strong> components 
        will constantly flash different colors because they are re-rendering rapidly due to an infinite loop, 
        missing <code>React.memo</code>, and missing <code>useCallback</code>.
      </p>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <p className="font-mono text-sm text-red-500">Render Tracker (Updating constantly): {clickCount}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-3">1. RTK Query & Recursive Component</h2>
          {isLoading ? (
            <p>Loading comments from cache...</p>
          ) : (
            <div className="bg-gray-50 p-4 rounded border h-[400px] overflow-y-auto">
              <NestedComments comments={comments} />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">2. Unoptimized Heavy List</h2>
          
          {/* INTENTIONAL BUG: Missing debounce! Every keystroke triggers heavy filtering immediately */}
          <input
            type="text"
            placeholder="Search items... (will lag)"
            className="w-full p-2 mb-4 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="bg-gray-50 p-4 rounded border h-[340px] overflow-y-auto">
            {filteredList.map(item => (
              <HeavyListItem 
                key={item.id} 
                item={item} 
                onClick={handleItemClick} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedExplorer;
