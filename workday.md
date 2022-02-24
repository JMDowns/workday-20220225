# Workday 

You're a developer who's just been moved to work on an [existing project](https://stackblitz.com/run?file=src/app/hero.service.ts) in the company database, documented [here](https://angular.io/tutorial). The original developers for this project have all left, but management wants you to build on the project and add some new functionality. Thankfully, they've already given you a mockup and a style sheet that you can use, though the mockup has some complications.

Management's message to you is as follows:
"We will be adding a list of villains to our hero list to start work on a combat project. The villains list should work just like the heroes list, except the url should '/villains'. The villains list should look like the mockup. There should also be a button next to the heroes button labeled 'villains' that takes you to the villains list. Again, like the mockup. Finally, the dashboard should have the top four villains under the heroes. Again, consult the mockup."

"The heroes and villains should also have a number representing how many of the opposite side they've defeated (i.e. how many villains has a hero defeated), and a power level for combat reasons."

"Finally, there should be a battle page where you can search for a hero and villain and 'simulate' a battle. Whoever has the higher power level should win, and whoever wins should have their number of defeated opponents increase by 1."

"Consult the mockup for how things 'should look'. We've lost the HTML for the mockup but we have a few images that should cover all of the cases."

DEV NOTES:
1. To begin, download VS Code. 
1. Once that is done, open VS Code and click on extensions.
1. Download ESLint, Angular Language Service (Angular),Angular Snippets (Version 12+) (John Papa), Nx Console (nrwl), and Bracket Pair Colorizer 2 (CoenraadS)
1. Once that is done, download the code from [github](https://github.com/JMDowns/workday-20220225) or from Canvas and open the ```tour_of_heroes_and_villains``` folder in VSCode.
1. The images for the mockup should be stored under ```images``` in the root directory, and the css file used in the app should be in the root directory.
1. In the terminal in VS Code, run ```npm install``` to install all the dependencies you need.
1. Get coding! To run your service, run ```ng serve``` in the terminal.