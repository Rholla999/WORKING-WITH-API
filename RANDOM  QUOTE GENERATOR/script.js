const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuote');


newQuoteBtn.addEventListener('click', () => {
    generateQuote();    
    console.log('clicked');
});

async function generateQuote() {
    
   try {

        let urlApi = await fetch("https://api.quotable.io/random");

        if (!urlApi.ok) {
            throw new Error(`HTTP error! status: ${urlApi.status} `);
        }

        let data = await urlApi.json();
        console.log(data);
            if (data && data.content && data.author) {
                quoteEl.innerHTML = `"${data.content}"`;
                authorEl.innerHTML = `"${data.author}"`;
            } else {
                quoteEl.innerText = "An error occurred while fetching the quote.";
                authorEl.innerText = "";
                console.log('Error fetching quote:', data);
            } 
    } catch (error) {
        quoteEl.innerText = "An error occurred while fetching the quote.";
        authorEl.innerText = "";
        console.log('Error fetching quote:', error);
    } 
}

setInterval(generateQuote, 10000);