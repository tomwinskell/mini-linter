let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually' ];

main();

// word count function
function wordCount(string) {
  let count = [].reduce.call(string, (sum, current) => {
    if (current === " ") sum++;
    return sum;
  }, 0)

  const finalChar = story.slice(story.length - 1);
  const regex = /\?+|\.+|\!+/g;
  if (finalChar.match(regex)) {
    count++;
  }
  return count;
};

// count sentences
function sentenceCount(string) {
  const regex = /\?+|\.+|\!+/g;
  const punctuation = string.match(regex);
  return punctuation.length;
};

// replace all with words from array
function replaceWords(string, array) {
  const regex = /(?<=[.?!])/g;

  // replace double spaces with single
  string = string.replaceAll('  ', ' ');

  // string and array to lowercase
  string = string.toLowerCase();
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].toLowerCase(); 
  };

  // remove words in array from string
  const outputString = array.reduce((struct, current) => {
    struct = struct.replaceAll(` ${current}`, '');
    struct = struct.replaceAll(`${current}`, '');
    return struct;
  }, string);

  // toUpperCase words at beginning of sentences
  const arrayOfSentences = outputString.split(regex);
  for (let i = 0; i < arrayOfSentences.length; i++) {
    let newString = arrayOfSentences[i];
    if (newString.charAt(0) === ' ') {
      newString = newString.slice(1);
    }
    let firstLetter = newString.charAt(0).toUpperCase();
    newString = firstLetter + newString.slice(1);
    array[i] = newString;
  };

  // join array of words and return
  const output = array.join(' ');
  return output.replaceAll(' i ', ' I ');
};

function main() {
  console.log(`Words before were: ${wordCount(story)}`);

  let newStory = replaceWords(story, overusedWords);
  console.log(`Story after removing overused words: ${newStory}`);
  console.log(`New word count is: ${wordCount(newStory)}. Removed ${wordCount(story) - wordCount(newStory)} words.`)
  
  newStory = replaceWords(newStory, unnecessaryWords);
  console.log(`Removed unnecessary words: ${newStory}`);
  console.log(`New word count is: ${wordCount(newStory)}. Removed ${wordCount(story) - wordCount(newStory)} words.`)
};