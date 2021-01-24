Scrabble Solver Service
Author: Edgar Gabriel Martinez Gonzalez

# Instructions

1. Install latest LTS Node.js on your development environment (https://nodejs.org/en/download/).

2. Install TypeScript with following command npm install -g typescript

3. Install project dependencies running following command npm run clean

4. To build and start up the project please run following command npm start

5. To start up automated tests for this project please run following command npm run test

6. To review Swagger API documentation please go to http://localhost:8080/swagger/

7. To review TypeDoc documentation please open the index.html file inside of the generated
docs folder on a browser.

Note: Make sure to have installed ts-node-dev ver. 1.1.1 (using ts-node ver. 9.1.1, typescript ver. 4.1.3).
For any other question please send me an email at edgar_martinez@epam.com, thanks!

# Short analysis of the memory usage and time complexity of implemented algorithm

The implemented solution for the Scrabble Solver Service in this project consists of two
different services. The first one, "AnagramSolverService", which returns the unsorted result
of the scrabble words for the given letters. This service only loops once through the dictionary
and get all the possible found words for the given letters, this approach avoid permutations, 
however, inside the only dictionary loop there's a nested loop making the measure of memory and time
complexity the equivalent of O(n^2) in Big O Notation.

The second service, "ScrabbleSortingService" returns the sorted list of words by scrabble scoring.
This service makes use of 3 nested loops, making the measure of memory and time
complexity the equivalent of O(n^3) in Big O Notation.

