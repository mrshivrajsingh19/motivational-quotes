import React from 'react';

function QuotesList({ displayQuotes, likedQuotes, toggleLike }) {
  return (
    <div className="quotes-list">
      {displayQuotes.length === 0 ? (
        <p className="empty-message">
          😴 Nothing saved yet. Explore and 💾 your favorites!
        </p>
      ) : (
        displayQuotes.map((item, idx) => {
          const liked = likedQuotes.some(q => q.quote === item.quote);
          return (
            <div key={idx} className="quote-item">
              <div className="quote-item-text">
                <strong>"{item.quote}"</strong>
                <br />
                <em style={{ color: '#718096' }}>— {item.author}</em>
              </div>
              <button
                className={liked ? 'motivation-btn like' : 'motivation-btn unlike'}
                onClick={() => toggleLike(item.quote, item.author)}
              >
                {liked ? '❤️' : '🤍'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default QuotesList;
