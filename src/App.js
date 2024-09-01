import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteDBurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.")
  const [author, setAuthor] = useState("Mae Jemison")
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes) //based on the DB
    console.log(parsedJSON)
  }

  //Continue from here please!
  useEffect(() => {
    fetchQuotes(quoteDBurl)
  }, [quoteDBurl])

  const getRandomQuote = () => {
    let RandomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(RandomInteger)
    setAccentColor(COLORS_ARRAY[RandomInteger])
    setQuote(quotesArray[RandomInteger].quote)
    setAuthor(quotesArray[RandomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <div class="button">
            <a 
              id="tweet-quote" 
              href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)} 
              target='_blank' 
              style={{backgroundColor: accentColor}}
            ><FontAwesomeIcon icon={faTwitter} />
            </a>
            <button 
              id="new-quote" 
              onClick={() => getRandomQuote()} 
              style={{backgroundColor: accentColor}}
              >Generate a Random Quote
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
// use encodeURI to avoid unsafe character. exapmle: “#”

export default App;
