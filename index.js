const natural = require("natural");

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

const translate = require('translate-google');
const fs = require("fs");

// variable to be analyzed
const tests = [
    { input: "layanannya buruk, produk tidak lengkap, tidak disediakan fasilitas protokol kesehatan" },
    { input: "I love this tutorial" },
    { input: "I hate this tutorial" },
    { input: "This is an average tutorial" },
    { input: "This is the best tutorial ever" },
    { input: "This is the worst tutorial ever" },
  ];

// set classification result
function interpretSentiment(score) {
    if (score > 0.5) return "Strongly Positive";
    if (score > 0) return "Positive";
    if (score === 0) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Strongly Negative";
}

//set output format
let output = {
    "Strongly Positive": [],
    Positive: [],
    Neutral: [],
    Negative: [],
    "Strongly Negative": [],
  };

/* tests.forEach((test, index) => {
    const result = analyzer.getSentiment(test.input.split(" "));
    const humanReadable = interpretSentiment(result);
  
    console.log(`Test ${index + 1} ( ${test.input} ): Score is ${result} - ${humanReadable}`);
  }); */

function terjemah(text) {
    text.forEach((text, index) => {
        //using library natural
        translate(text.input,{from:'id',to:'en'})
        .then(resp => {
            const result = analyzer.getSentiment(resp.split(" "));
            const humanReadable = interpretSentiment(result);

            //store result into output
            output[humanReadable].push(text);
        
            // console.log(`Test ${index + 1} ( ${resp} ): Score is ${result} - ${humanReadable}`);
            /* for (const sentiment in output) {
                console.log(`${sentiment}: ${output[sentiment].length}`);
                fs.writeFileSync(
                    `./output/${sentiment}.json`,
                    JSON.stringify(output[sentiment], null, 2)
                );
            } */
            console.log(output)
        }).catch(err => {
            console.log(err)
        });
    })
}

terjemah(tests);