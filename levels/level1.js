//leve1 Global Variable
let level1;

/**
 * The function "createLevel" creates a level with chickens, baby chickens, clouds, backgrounds,
 * bottles, and coins.
 */
function createLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken()
        ],
        [
            new Clouds()
        ],
        [
            new Background('img/5_background/layers/air.png', -1439),
            new Background('img/5_background/layers/3_third_layer/full.png', -1439),
            new Background('img/5_background/layers/2_second_layer/full.png', -1439),
            new Background('img/5_background/layers/1_first_layer/full.png', -1439),
            new Background('img/5_background/layers/air.png', 0),
            new Background('img/5_background/layers/3_third_layer/full.png', 0),
            new Background('img/5_background/layers/2_second_layer/full.png', 0),
            new Background('img/5_background/layers/1_first_layer/full.png', 0),
            new Background('img/5_background/layers/air.png', 1439),
            new Background('img/5_background/layers/3_third_layer/full.png', 1439),
            new Background('img/5_background/layers/2_second_layer/full.png', 1439),
            new Background('img/5_background/layers/1_first_layer/full.png', 1439),
            new Background('img/5_background/layers/air.png', 2878),
            new Background('img/5_background/layers/3_third_layer/full.png', 2878),
            new Background('img/5_background/layers/2_second_layer/full.png', 2878),
            new Background('img/5_background/layers/1_first_layer/full.png', 2878)

        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
}