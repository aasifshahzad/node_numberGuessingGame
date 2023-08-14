import inquirer from "inquirer";
import chalk from "chalk";


function setNum(min: number, max: number): number {
    const randomFraction: number = Math.random();
    const randomNumber: number = min + (randomFraction * (max - min));
    return randomNumber;
}

async function startGame() {
    let inq1 = await inquirer.prompt(
        [
            {
                type: "input",
                message: chalk.bold.blueBright("Enter lower limit: "),
                name: "lowerLimit",
            },
            {
                type: "input",
                message: chalk.bold.blueBright("Enter Upper Limit: "),
                name: "upperLimit",
            },

        ]
    )


    const lowerLimit: number = parseInt(inq1.lowerLimit);
    // console.log(lowerLimit)

    const upperLimit: number = parseInt(inq1.upperLimit);
    // console.log(upperLimit);
    console.log(chalk.bold.green(`Guess a number between/including ${chalk.bold.redBright(lowerLimit)} and ${chalk.bold.redBright(upperLimit)}.`));


    const numSecret = parseInt(setNum(upperLimit, lowerLimit).toFixed())
    // console.log(numSecret);
    // console.log(typeof(numSecret));


    const maxGuesses = Math.ceil(Math.log2(upperLimit - lowerLimit + 1));
    console.log(chalk.bold.green(`You have ${chalk.bold.redBright(maxGuesses)} guess to find out the number`));

    for (let index = 1; index < maxGuesses + 1; index++) {
        //console.log(index);
        let inq2 = await inquirer.prompt(
            [
                {
                    type: "input",
                    message: chalk.bold.blueBright("Guess the number:"),
                    name: "guess"
                }
            ]
        )

        const guess: number = parseInt(inq2.guess)
        // console.log(guess);
        // console.log(numSecret.toFixed());

        console.log(chalk.bold.green(`You are left with ${chalk.bold.redBright(maxGuesses - index)} chance out of ${chalk.bold.redBright(maxGuesses)}.`));
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