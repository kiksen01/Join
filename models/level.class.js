class Level{

    /* These lines are declaring instance variables for the `Level` class. Each variable represents a
    different aspect of the level: */
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    endBoss;

    

    /**
     * The constructor function takes in parameters for enemies, clouds, background objects, bottles,
     * and coins and assigns them to the corresponding properties of the object.
     * @param enemies - An array of enemy objects in the game. These objects could represent different
     * types of enemies with their own properties and behaviors.
     * @param clouds - An array of cloud objects that will be displayed in the game's background. These
     * clouds are typically used to create a sense of depth and movement in the game's visuals.
     * @param backgroundObjects - An array of objects representing the background elements in the game,
     * such as trees, rocks, or buildings.
     * @param bottles - An array of bottle objects in the game.
     * @param coins - The "coins" parameter is used to store the number of coins in the game.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds =  backgroundObjects;
        this.bottles =  bottles;
        this.coins = coins;
    }
}