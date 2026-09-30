import React from 'react';

// INTENTIONAL BUG: Not using React.memo for a component that renders recursively.
// It will re-render all children whenever the parent re-renders.
const NestedComments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="pl-4 border-l-2 border-gray-200 ml-2 mt-2">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4">
          <div className="bg-white p-3 rounded shadow-sm border border-gray-100">
            <p className="text-gray-800 text-sm">{comment.text}</p>
          </div>
          
          {/* Recursive Call: The component calls itself! */}
          {comment.replies && comment.replies.length > 0 && (
             <NestedComments comments={comment.replies} />
          )}
        </div>
      ))}
    </div>
  );
};

export default NestedComments;
