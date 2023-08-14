import inquirer from "inquirer";   // import modules
import chalk from "chalk";


function setNum(min: number, max: number): number { // set the minimum and maximum limit for guessing th number
    const randomFraction: number = Math.random();   // produce a random number
    const randomNumber: number = min + (randomFraction * (max - min));
    return randomNumber;
}

async function startGame() {
    let inq1 = await inquirer.prompt(
        [
            {
                type: "input",
                message: chalk.bold.blueBright("Enter lower limit: "),// user will enter lower limit
                name: "lowerLimit",
            },
            {
                type: "input",
                message: chalk.bold.blueBright("Enter Upper Limit: "),// user will enter upper limit
                name: "upperLimit",
            },

        ]
    )


    const lowerLimit: number = parseInt(inq1.lowerLimit); //convert string into integer
    // console.log(lowerLimit)

    const upperLimit: number = parseInt(inq1.upperLimit); //convert string into integer
    // console.log(upperLimit);
    console.log(chalk.bold.green(`Guess a number between/including ${chalk.bold.redBright(lowerLimit)} and ${chalk.bold.redBright(upperLimit)}.`)); //ask user to guess the number


    const numSecret = parseInt(setNum(upperLimit, lowerLimit).toFixed()) //set the number to be guessed
    // console.log(numSecret);
    // console.log(typeof(numSecret));


    const maxGuesses = Math.ceil(Math.log2(upperLimit - lowerLimit + 1));
    console.log(chalk.bold.green(`You have ${chalk.bold.redBright(maxGuesses)} guess to find out the number`)); // set the maximum chanes to guess the number

    for (let index = 1; index < maxGuesses + 1; index++) {
        //console.log(index);
        let inq2 = await inquirer.prompt(
            [
                {
                    type: "input",
                    message: chalk.bold.blueBright("Guess the number:"), // user input for guess
                    name: "guess"
                }
            ]
        )

        const guess: number = parseInt(inq2.guess)
        // console.log(guess);
        // console.log(numSecret.toFixed());

        console.log(chalk.bold.green(`You are left with ${chalk.bold.redBright(maxGuesses - index)} chance out of ${chalk.bold.redBright(maxGuesses)}.`)); // displaying the remaining chances
        if (guess > numSecret) {
            console.log(chalk.bold.red("You guess too High"));
        } else if (guess < numSecret) {
            console.log(chalk.bold.blue("You guess too Low"));
        } else if (guess == numSecret) {
            console.log(chalk.bold.bgRedBright(`Congratulation you guess the number in ${chalk.bold.redBright(index)} chances.`));
            break;
        }
    }
}
startGame();
