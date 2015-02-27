var Button = (function () {
    function Button(path, x, y) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }
    // PUBLIC PROPERTIES
    Button.prototype.setX = function (x) {
        this._x = x;
    };

    Button.prototype.getX = function () {
        return this._x;
    };

    Button.prototype.setY = function (y) {
        this._y = y;
    };

    Button.prototype.getY = function () {
        return this._y;
    };

    Button.prototype.getImage = function () {
        return this._image;
    };

    // PRIVATE EVENT HANDLERS
    Button.prototype._buttonOut = function (event) {
        event.currentTarget.alpha = 1; // 100% Alpha
    };

    Button.prototype._buttonOver = function (event) {
        event.currentTarget.alpha = 0.5;
    };
    return Button;
})();

// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;
var tiles = [];
var reelContainers = [];

// GAME CONSTANTS
var NUM_REELS = 3;

var playerMoney = 1000;
var jackpot = 5000;
var turn = 0;
var betAmount = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var watermelon = 0;
var playerMoneyText;
var betAmountText;
var jackpotAmountText;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betOneButton;
var resetButton;
var quitButton;


// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// GAMELOOP
function gameLoop() {
    stage.update();
}


function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    watermelon = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "Watermelon";
                watermelon++;
                if (watermelon == 3) {

                    alert("You Won the $" + jackpot + " Jackpot!!");
                    playerMoney = playerMoney += jackpot;
                    jackpot = 1000;
                    playerMoneyText.text = "Money: " + playerMoney.toString();
                   
                    jackpotAmountText.text = "Current Jackpot: " +  jackpot.toString();
                }
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                if (grapes == 3){
                playerMoney = playerMoney += betAmount * 10;
                playerMoneyText.text = "Money " + playerMoney.toString();
                console.log("There should be 3 Grapes");
                }
                if (grapes == 2) {
                    playerMoney = playerMoney += betAmount * 2;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 grapes");
                }
                if (grapes == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 grape");
                }
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                if (bananas == 3) {
                    playerMoney = playerMoney += betAmount * 20;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 Bananas");
                }
                
                else if (bananas == 2) {
                    playerMoney = playerMoney += betAmount * 2;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 bananas");
                }
                else if (bananas == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 banana");
                }
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                if (oranges == 3) {
                    playerMoney = playerMoney += betAmount * 30;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 oranges");
                }

                else if (oranges == 2) {
                    playerMoney = playerMoney += betAmount * 3;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 oranges");
                }
                else if (oranges == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 oranges");
                }
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                if (cherries == 3) {
                    playerMoney = playerMoney += betAmount * 40;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 cherries");
                }

                else if (cherries == 2) {
                    playerMoney = playerMoney += betAmount * 4;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 cherries");
                }
                else if (cherries == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 cherry");
                }
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                if (bars == 3) {
                    playerMoney = playerMoney += betAmount * 50;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 bars");
                }

                else if (bars == 2) {
                    playerMoney = playerMoney += betAmount * 5;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 bars");
                }
                else if (bars == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 bar");
                }
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                if (bells == 3) {
                    playerMoney = playerMoney += betAmount * 75;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 bells");
                }

                else if (bells == 2) {
                    playerMoney = playerMoney += betAmount * 10;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 bells");
                }
                else if (bells == 1) {
                    playerMoney = playerMoney += betAmount * 1;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 1 bell");
                }
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                if (sevens == 3) {
                    playerMoney = playerMoney += betAmount * 100;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 3 Sevens");
                }

                else if (sevens == 2) {
                    playerMoney = playerMoney += betAmount * 20;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log("There should be 2 sevens");
                }
                else if (sevens == 1) {
                    playerMoney = playerMoney += betAmount * 5;
                    playerMoneyText.text = "Money " + playerMoney.toString();
                    console.log(" There should be 1 seven");
                }
                break;
        }
    }
    return betLine;
}

// MAIN MEAT of my code goes here
function spinButtonClicked(event) {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
    }

    if (playerMoney <= 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetButtonClicked();
          
        }
    }
 
    else if (betAmount == 0) {
        alert("You didn't bet anything ");
    }
    betAmount -= betAmount;
    betAmountText.text = "Bet Amount: " + betAmount.toString();

    game.addChild(reelContainers[0]);
    game.addChild(reelContainers[1]);
    game.addChild(reelContainers[2]);
}

function betOneButtonClicked() {
    if (betAmount < 1000) {
        playerMoney -= 1;
        betAmount += 1;
        playerMoneyText.text = "Money: " + playerMoney.toString();
        betAmountText.text = "Bet Amount: " + betAmount.toString();
    }
}

function betMaxButtonClicked() {
    if (betAmount < 1000) {
        playerMoney -= 100;
        betAmount += 100;
        playerMoneyText.text = "Money: " + playerMoney.toString();
        betAmountText.text = "Bet Amount: " + betAmount.toString();
    }
    resetFruitTally();
    game.removeChild(reelContainers[0]);
    game.removeChild(reelContainers[1]);
    game.removeChild(reelContainers[2]);
}

function resetButtonClicked() {
    playerMoney = 1000;
    winnings = 0;
    betAmount = 0;
    win = 0;
    jackpot = 0;
    spins = 0;
    playerMoneyText.text = "Money: " + playerMoney.toString();
    betAmountText.text = "Bet Amount: " + betAmount.toString();

    game.removeChild(reelContainers[0]);
    game.removeChild(reelContainers[1]);
    game.removeChild(reelContainers[2]);
}

function quitButtonClicked()
{
    alert("Do you want to quit the game? You will be moved to a blank page.");
    quitGame();
}

function quitGame()
{
    window.location.replace("about:home");
}

function createUI() {
    background = new createjs.Bitmap("assets/images/SlotMachine.png");
    game.addChild(background); // Add the background to the game container
    playerMoneyText = new createjs.Text("Money: " + playerMoney.toString(), "Arial", "#000000");
    playerMoneyText.x = 55;
    playerMoneyText.y = 593;
    game.addChild(playerMoneyText);
    betAmountText = new createjs.Text("Bet Amount: " + betAmount.toString(), "Arial", "#000000");
    betAmountText.x = 55;
    betAmountText.y = 631;
    game.addChild(betAmountText);
    jackpotAmountText = new createjs.Text("Current Jackpot: " + jackpot.toString(), "Arial", "#000000");
    jackpotAmountText.x = 55;
    jackpotAmountText.y = 670;
    game.addChild(jackpotAmountText);

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 88;
    reelContainers[0].y = 270;
    reelContainers[1].x = 242;
    reelContainers[1].y = 270;
    reelContainers[2].x = 393;
    reelContainers[2].y = 270;

    // Spin Button
    spinButton = new Button("assets/images/SpinButton.png", 450, 450);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/BetMax.png", 393.5, 455);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked);

    // Bet One Button
    betOneButton = new Button("assets/images/BetOne.png", 340, 455);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", betOneButtonClicked);

    // Reset Button
    resetButton = new Button("assets/images/ResetButton.png", 115, 455);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Quit Button
    quitButton = new Button("assets/images/QuitButton.png", 55, 455);
    game.addChild(quitButton.getImage());
    quitButton.getImage().addEventListener("click", quitButtonClicked);
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}