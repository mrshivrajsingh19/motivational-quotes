import React, { useState, useEffect } from 'react';
import QuoteCard from './components/QuoteCard';
import FilterButtons from './components/FilterButtons';
import QuotesList from './components/QuotesList';
import './App.css';

function App() {
  // state
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [seenQuotes, setSeenQuotes] = useState([]);
  const [filter, setFilter] = useState('all');

  // fetch a random quote
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      console.error('fetch error', err);
    }
    setLoading(false);
  };

  // initial load
  useEffect(() => {
    fetchQuote();
  }, []);

  // remember seen quotes
  useEffect(() => {
    if (!quote) return;
    if (!seenQuotes.some(q => q.quote === quote)) {
      setSeenQuotes(prev => [...prev, { quote, author }]);
    }
  }, [quote, author, seenQuotes]);

  // like / unlike toggle
  const toggleLike = (qText, qAuthor) => {
    setLikedQuotes(prev => {
      const exists = prev.some(q => q.quote === qText);
      if (exists) {
        return prev.filter(q => q.quote !== qText);
      } else {
        return [...prev, { quote: qText, author: qAuthor }];
      }
    });
  };

  const isLiked = likedQuotes.some(q => q.quote === quote);

  // determine which quotes to display based on filter
  let displayQuotes = [];
  if (filter === 'liked') displayQuotes = likedQuotes;
  else if (filter === 'unliked')
    displayQuotes = seenQuotes.filter(
      q => !likedQuotes.some(l => l.quote === q.quote)
    );
  else displayQuotes = seenQuotes;

  return (
    <div className="motivation-container">
      <h1 className="motivation-title">✨ Daily Motivation</h1>
      <p className="motivation-subtitle">
        It’s time to feel inspired! 🌟
      </p>
      <h3 className="motivation-count">
        💖 You’ve liked {likedQuotes.length} quote{likedQuotes.length !== 1 ? 's' : ''}
      </h3>

      <QuoteCard
        quote={quote}
        author={author}
        loading={loading}
        isLiked={isLiked}
        toggleLike={toggleLike}
        fetchQuote={fetchQuote}
      />

      <FilterButtons filter={filter} setFilter={setFilter} />

      <QuotesList
        displayQuotes={displayQuotes}
        likedQuotes={likedQuotes}
        toggleLike={toggleLike}
      />
    </div>
  );
}

export default App;
