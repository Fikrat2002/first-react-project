import React, { useState, useEffect } from 'react';

function Quote() {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [error, setError] = useState(null);

    const handleQuote = () => {
        const api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

        fetch(api)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(results => {
                console.log('API Response:', results); // Log the response for debugging
                if (results.quotes && results.quotes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * results.quotes.length);
                    setQuote(results.quotes[randomIndex]);
                } else {
                    setError('No quotes found in the response.');
                }
            })
            .catch(error => {
                setError(error.message);
                console.error('Error fetching the quote:', error);
            });
    };

    useEffect(() => {
        handleQuote();
    }, []);

    // Shares the current quote on Twitter
    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" — ${quote.author}`)}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div className="container">
            <h1>Quote of the Day</h1>
            {error ? (
                <p className="error">Error: {error}</p>
            ) : (
                <>
                    <i className="fa-solid fa-quote-left"></i>
                    <p className="quote-content">“{quote.quote}”</p>
                    <p className="author">--- {quote.author}</p>
                </>
            )}
            <div className="button-position">
                <button onClick={handleQuote}>New Quote</button>
            </div>
            <div className="twitter-share">
                <button onClick={shareOnTwitter} className="twitter-share-button">
                    <i className="fab fa-twitter"></i></button>
            </div>
        </div>
    );
}

export default Quote;






