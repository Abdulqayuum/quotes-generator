const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const quoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuote = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// fetch quotes from api url
async function getApiQuotes(){
    loading();
    const apiUrl = "https://abdulqayuum.github.io/quotes-generator/data/qalintech-quotes.json";
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    // console.log(apiQuote);
    newApiQuote();
}

function newApiQuote(){
    loading();
    //choose random quotes from api using math.random and array
    var quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    //check the 'null' author and replace 'unknow'
    if(!quote.author){
        author.textContent = "unknow";
    }else{
        author.textContent = quote.author;        
    }
    
    //check the length of the quotes if axceeds 100 change the size
    if(quote.text.length > 120){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
    complete();
}

//tweet button
function tweetButton(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(tweetUrl, '_blank');
}

twitterButton.addEventListener('click', ()=>{
    tweetButton();
});

//new - quote button
quoteButton.addEventListener('click', ()=>{
    getApiQuotes();
});

//onload
getApiQuotes();