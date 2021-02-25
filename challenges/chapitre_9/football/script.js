'use strict';

//// coding challenge 1
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//destructuration de palyers
const [players1, players2] = game.players;
console.log(game.players);
//payers1--> le 1er est goal keeper les autres fields players
const [gk, ...fieldPlayers] = players1;
console.log(gk);
//tableau tous les joueurs
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const {
  //on redefinit le odds car renommage de x en draw
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} buts ont été mis`);
};

//si on appelle que avec
//  printGoals(game.scored) on récupère la première valeur;
// passage de tous les noms de scored ...game.scored
printGoals(...game.scored);

team1 < team2 && console.log('team1 gagnante');
team1 > team2 && console.log('team2 gagnante');

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
console.log('CHALLENGE 2');
//1- buts marqués
for (const [i, goal] of Object.entries(game.scored)) {
  console.log(`Goal ${i} : ${goal}`);
}
//2- moyenne des paris
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(`moyenne des paris: ${average}`);

//3- affich moynenes
//on ne peut pas utiliser game.odds.entries()??
for (const [team, value] of Object.entries(game.odds)) {
  console.log(`moyenne de ${team} : ${value}`);
}
//4- bonus
// on crée un objet scores et on y crée un array avec les buteurs
const scores = {};
for (const player of game.scored) {
  // si buteur existe dans le tableau incrément sinon buteur = 1 but
  scores[player] ? scores[player]++ : (scores[player] = 1);
}
console.log(scores);
for(const [player, value] of Object.entries(scores)){
  const but = value > 1 ? 'buts': 'but';
  console.log(`${player} a marqué : ${value} ${but}`);
}
///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


const events = new Set([...gameEvents]);
console.log(events);

events.delete(64);

console.log(`un arret survient en moyenne toute les : ${90/gameEvents.size} minutes`)

//pop sort la dernière valeur du tableau--> fin de match
const time = [...gameEvents.keys()].pop();
console.log(time);

console.log(`dans ce match les arrêts sont arrivés toutes les ${time/gameEvents.size} minutes`)

//recherche de l'event s'il a lieu avant les 45mn de mi-temps
//on destructure le gameEvents pour récupérer 2 variables temps et event
for(const [min, event] of gameEvents){
  const half = min <= 45 ? 'premmière' : 'seconde';
  console.log(`[${half} mi-temps] ${min} mn: ${event}`)
}

