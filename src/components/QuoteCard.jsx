import React from 'react';

function QuoteCard({ quote, author, loading, isLiked, toggleLike, fetchQuote }) {
  return (
    <div className="quote-card">
      {loading ? (
        <p className="loading-text">⏳ Fetching your next dose of wisdom...</p>
      ) : (
        <>
          <p className="quote-text">"{quote}"</p>
          <p className="quote-author">— {author}</p>
          <div className="button-group">
            <button
              className={isLiked ? 'motivation-btn like' : 'motivation-btn unlike'}
              onClick={() => toggleLike(quote, author)}
            >
              {isLiked ? '❤️ Unlike' : '🤍 Like'}
            </button>
            <button
              className="motivation-btn new"
              onClick={fetchQuote}
              disabled={loading}
            >
              {loading ? 'Loading...' : '📝 New Quote'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuoteCard;
