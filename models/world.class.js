class World extends MovableObject {

    //Instances
    character = new Character();
    statusHealth = new StatusBarHealth();
    statusCoin = new StatusBarCoin();
    statusBottle = new StatusBarBottle();
    statusBoss = new StatusBarBoss();
    endBoss = new Endboss();
    throwableObjects = [];
    level = level1;
    keyboard;
    canvas;
    ctx;

    //Booleans
    hasEnteredBossArea = false;
    bottleThrowInterupt = false;
    oneTimeExecute = false;
    chickenJumped = false;
    bossDied = false;

    //Endboss Array
    endBossArray = [];

    //Camera X Coordinate
    camera_x = 0;

    //Timer Variables
    lastThrow = 300;
    alertTimer = 0;
    timeBeforeBreak = 0;
    bossColliderTimer = 0;
    bossAttackCooldown = 0;



    /**
     * The constructor function initializes the properties of an object and sets up the canvas,
     * keyboard, and world for the game.
     * @param canvas - The canvas parameter is the HTML canvas element on which the game will be
     * rendered. It is used to get the 2D rendering context (ctx) for drawing on the canvas.
     * @param keyboard - The `keyboard` parameter is an object that represents the keyboard input. It
     * is used to handle user input and control the game.
     */
    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.throwableObjects.splice(0, 1);
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }



    /**
     * The function "setWorld" sets the "world" property of the "character" object to the current
     * object.
     */
    setWorld() {
        this.character.world = this;
    }



    /**
     * The `run()` function runs a game loop that checks for various game conditions and performs
     * corresponding actions.
     */
    run() {
        this.createBoss();
        background_music.loop = true;
        setStoppableInterval(() => {
            if (!isGamePaused) {
                if (isSoundMuted) { background_music.pause(); }
                else { background_music.play(); }
                endBossX = this.endBoss.x
                this.manageObjectCollisionsAndPause();
                if (this.endBoss.bossHP > 0) {
                    this.checkOnEndBossCollision(); this.onBossAttackRange();
                    if (!this.oneTimeExecute) { this.onEnterBossfight(); }
                } else if (this.endBoss.bossHP <= 0 && !this.bossDied) { this.onBossDeath(); }
            }
        }, 1000 / 60);
    }



    /**
     * The function manages object collisions, checks for pause, enemy collision, bottle collection,
     * coin collection, and triggers actions when a bottle is thrown.
     */
    manageObjectCollisionsAndPause() {
        this.checkOnPause();
        this.checkEnemyCollision();
        this.checkOnBottleCollect();
        this.checkOnCoinCollect();
        this.onBottleThrow();
    }

    /**
     * The createBoss function adds the endBoss object to the endBossArray.
     */
    createBoss() {
        this.endBossArray.push(this.endBoss);
    }



    /**
     * The function sets the walking and attacking properties of the endBoss object based on the
     * boolean values passed as arguments.
     * @param bool1 - A boolean value indicating whether the boss is currently walking or not.
     * @param bool2 - The bool2 parameter is a boolean value that determines whether the end boss is
     * attacking or not.
     */
    returnBossAttackRangeValues(bool1, bool2) {
        this.endBoss.isWalking = bool1;
        this.endBoss.isAttacking = bool2;
    }



    /**
     * The function checks if the character is within the attack range of the boss and returns values
     * based on the conditions.
     */
    onBossAttackRange() {
        if (this.endBoss.x - this.character.x < 80 && !this.endBoss.isHurt) { this.returnBossAttackRangeValues(false, true); }
        else if (this.oneTimeExecute && !this.endBoss.isHurt) { this.returnBossAttackRangeValues(true, false); }
    }



    /**
     * The function "onBossDeath" sets various properties of the "endBoss" object to false or true,
     * indicating its state after death.
     */
    onBossDeath() {
        this.endBoss.isAlert = false;
        this.endBoss.isWalking = false;
        this.endBoss.isAttacking = false;
        this.endBoss.isHurt = false;
        this.endBoss.currentImage = 0;
        this.endBoss.isDeath = true;
        this.bossDied = true;
    }



    /**
     * The function checks if the "P" key is pressed and if so, sets the isGamePaused variable to true
     * and calls the onPause function with the argument 'remove'.
     */
    checkOnPause() {
        if (this.keyboard.P) {
            isGamePaused = true;
            background_music.pause();
            onPause('remove');
        }
    }



    /**
     * The function starts the alert behavior for a boss, incrementing a timer and setting certain
     * flags based on conditions.
     */
    startBossAlertBehaviour() {
        this.alertTimer++;
        if (this.alertTimer >= 130 && this.hasEnteredBossArea && !this.bottleThrowInterupt) {
            this.endBoss.isWalking = true;
            this.hasEnteredBossArea = true;
            this.oneTimeExecute = true;
        }
        else if (this.bottleThrowInterupt) {
            this.oneTimeExecute = true;
        }
    }



    /**
     * The function checks if the character's x-coordinate is greater than 3050 and if the boss area
     * has not been entered, then it calls the EnteredBossArea() function; otherwise, if the boss area
     * has been entered, it calls the startBossAlertBehaviour() function.
     */
    onEnterBossfight() {
        if (this.character.x > 3050 && !this.hasEnteredBossArea) {
            this.EnteredBossArea();
            this.addToMap(this.statusBoss);
        } else if (this.hasEnteredBossArea) { this.startBossAlertBehaviour(); }
    }



    /**
     * The function "EnteredBossArea" sets a flag indicating that the player has entered the boss area
     * and alerts the boss.
     */
    EnteredBossArea() {
        this.endBoss.isAlert = true;
        this.hasEnteredBossArea = true;
        this.addToMap(this.statusBoss);
        let self = this; requestAnimationFrame(function () { self.EnteredBossArea(); });
    }



    /**
     * The function `throwBottleRight` throws a bottle to the right, updates various properties and
     * animations, and decreases the percentage of a status bar.
     * @param bottle - The "bottle" parameter is an object representing a bottle that can be thrown.
     */
    throwBottleRight(bottle) {
        this.throwableObjects.push(bottle);
        this.throwableObjects[0].bottleBroke = true;
        bottle.throw(this.character.x, this.character.y);
        if (!isSoundMuted) { this.character.item_throw.play(); }
        bottle.animate();
        this.throwableObjects[0].timer = 0;
        this.lastThrow = 0;
        this.character.timer = 0;
        this.character.currentImage = 0;
        this.character.isSleeping = false;
        this.statusBottle.setPercentage(this.statusBottle.percentage -= 20);
        this.character.collectedBottles -= 1;
    }



    /**
     * The function `onBottleThrow` handles the throwing of bottles by the character in a game,
     * checking for conditions such as key press, available bottles, and direction of throw.
     */
    onBottleThrow() {
        if (this.keyboard.F && this.lastThrow >= 140 && this.character.throwRight && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObj(this.character.x, this.character.y);
            this.throwBottleRight(bottle); this.character.isAwake = true;
        } else if (this.keyboard.F && this.lastThrow >= 140 && !this.character.throwRight && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObj(this.character.x, this.character.y);
            this.throwBottleLeft(bottle); this.character.isAwake = true;

        } if (this.lastThrow <= 140) { this.lastThrow++; }
        this.onBottleRollAndBreak();
    }



    /**
     * The function checks if a throwable object has rolled and broken, and performs certain actions
     * based on the time before the break.
     */
    onBottleRollAndBreak() {
        for (let I = 0; I < this.throwableObjects.length; I++) { if (this.throwableObjects[I].y > 320) { this.timeBeforeBreak++; }
            if (this.timeBeforeBreak > 45 && this.timeBeforeBreak < 60) {
                this.throwableObjects[0].currentImage = 0;
                this.throwableObjects[0].bottleBroke = false;
                this.throwableObjects[0].animate();
            } if (this.timeBeforeBreak > 50 && this.timeBeforeBreak < 65 && this.throwableObjects.length == 1) { if (!isSoundMuted) { this.character.bottle_break.play(); } }
            if (this.timeBeforeBreak >= 65) {
                this.timeBeforeBreak = 0;
                for (let I = 0; I < this.throwableObjects.length; I++) {
                    this.checkBottleThrow(this.throwableObjects[I]); this.throwableObjects[I].currentImage = 0;
                    this.character.bottle_break.pause();}
            }
        }
    }



    /**
     * The function checks for collisions between the character and enemies, and performs actions based
     * on the collision.
     */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingOnTop(enemy) && !this.character.isHurt() && !this.chickenJumped && this.character.speedY < 10) {
                this.onEnemyCollisionOnHead(enemy);
            }
            else if (this.character.isColliding(enemy) && !this.character.isHurt() && !this.chickenJumped) {
                this.character.hit();
                this.onEnemyCollisionWithPlayer();
            }
        });
    }



    /**
     * The function "onEnemyCollisionOnHead" handles the collision between the character and an enemy,
     * causing the character to jump, play sound effects, and check if the enemy is killed.
     * @param enemy - The "enemy" parameter is the object representing the enemy that the character
     * collided with.
     */
    onEnemyCollisionOnHead(enemy) {
        this.character.speedY = 25;
        this.character.currentImage = 1;
        this.checkChickenKill(enemy);
        if (!isSoundMuted) {
            this.character.chicken_death.play();
            this.character.jumping_sound.play();
        }
    }



    /**
     * The function decreases the player's health by 20% and plays a sound effect if sound is not
     * muted.
     */
    onEnemyCollisionWithPlayer() {
        this.statusHealth.setPercentage(this.statusHealth.percentage -= 20);
        if (!isSoundMuted) { this.character.player_hurt.play(); }
    }


    /**
     * The function `throwBottleLeft` throws a bottle to the left, updates various properties of the
     * character and bottle, and decreases the percentage of the status bottle by 20.
     * @param bottle - The "bottle" parameter is an object representing the bottle that is being
     * thrown.
     */
    throwBottleLeft(bottle) {
        this.character.collectedBottles -= 1;
        this.throwableObjects.push(bottle);
        bottle.throwLeft(this.character.x, this.character.y);
        bottle.animate();
        if (!isSoundMuted) { this.character.item_throw.play(); }
        this.lastThrow = 0;
        this.character.timer = 0;
        this.character.currentImage = 0;
        this.character.isSleeping = false;
        this.statusBottle.setPercentage(this.statusBottle.percentage -= 20);
    }



    /**
     * The function checks if the character has collected any coins and updates the status of the
     * collected coins.
     */
    checkOnCoinCollect() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.collectedCoins(coins);
                if (this.statusCoin.percentage < 100) {
                    this.statusCoin.setPercentage(this.statusCoin.percentage += 20);
                }
            }
        });
    }



    /**
     * The function "onBottleHitsBoss" handles the logic when a bottle hits the boss in a game,
     * including updating the boss's health and checking for bottle throw.
     */
    onBottleHitsBoss() {
        this.throwableObjects[0].bottleBroke = false;
        this.endBoss.isHurt = true;
        this.bottleThrowInterupt = true;
        this.endBoss.isWalking = false;
        this.throwableObjects[0].animate();
        this.bossColliderTimer++;
        if (!isSoundMuted) { this.character.bottle_break.play(); }
        if (this.bossColliderTimer > 10) {
            this.onHitBoss();
        }
    }



    /**
     * The function "onHitBoss" decreases the boss's health percentage by 20, plays a sound effect if
     * sound is not muted, decreases the boss's HP by 20, checks if a throwable object is thrown, and
     * resets the boss collider timer.
     */
    onHitBoss() {
        this.statusBoss.setPercentage(this.statusBoss.percentage -= 20);
        if (!isSoundMuted) { this.character.boss_hurt.play(); }
        this.endBoss.bossHP -= 20;
        this.checkBottleThrow(this.throwableObjects[0]);
        this.bossColliderTimer = 0;
    }



    /**
     * The function checks for collision between the character and the end boss, and reduces the
     * character's health if a collision occurs.
     */
    checkOnEndBossCollision() {
        this.endBossArray.forEach((boss) => {
            if (this.character.isColliding(boss) && !this.character.isHurt()) {
                this.character.hit();
                if (!isSoundMuted) { this.character.player_hurt.play(); }
                this.statusHealth.setPercentage(this.statusHealth.percentage -= 20);
            }
            try {
                if (this.throwableObjects[0].isColliding(boss)) {
                    this.onBottleHitsBoss();
                }
            } catch (error) { return; }
        });
    }



    /**
     * The function "collectedBottle" removes a specified bottle from an array and plays a sound if the
     * sound is not muted.
     * @param bottle - The parameter "bottle" is an object representing a bottle in the game.
     */
    collectedBottle(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        if (!isSoundMuted) { this.character.bottle_pickup.play(); }
        this.level.bottles.splice(i, 1);
    }



    /**
        * The function checks if the character is colliding with any bottles, and if so, it collects the
        * bottle, increments the character's collectedBottles count, and increases the percentage of the
        * statusBottle by 20.
        */
    checkOnBottleCollect() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectedBottle(bottle);
                this.character.collectedBottles += 1;
                if (this.statusBottle.percentage < 160) {
                    this.statusBottle.setPercentage(this.statusBottle.percentage += 20);
                }
            }
        });
    }



    /**
     * The function "collectedCoins" removes a specific coin from the level's coins array and plays a
     * sound effect if the sound is not muted.
     * @param coins - The `coins` parameter is an object representing the coins that have been
     * collected.
     */
    collectedCoins(coins) {
        let i = this.level.coins.indexOf(coins);
        if (!isSoundMuted) { this.character.coin_pickup.play(); }
        this.level.coins.splice(i, 1);
    }



    /**
     * The function "checkChickenKill" checks if a chicken enemy has been killed, removes it from the
     * level enemies array after a delay, and updates a variable to indicate if the chicken has jumped.
     * @param chicken - The `chicken` parameter represents an enemy chicken object.
     */
    checkChickenKill(chicken) {
        let i = this.level.enemies.indexOf(chicken);
        this.level.enemies[i].isChickenDead = true;
        this.chickenJumped = true;
        if (this.level.enemies[i].isChickenDead) {
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
                this.chickenJumped = false;
            }, 500);
        }
    }



    /**
     * The function "checkBottleThrow" removes a specified bottle from an array called
     * "throwableObjects".
     * @param bottle - The parameter "bottle" represents the object that is being thrown.
     */
    checkBottleThrow(bottle) {
        let i = this.throwableObjects.indexOf(bottle);
        this.throwableObjects.splice(i, 1);
    }



    /**
     * The draw function is responsible for rendering various objects on a canvas, including
     * backgrounds, enemies, coins, and the main character, while also updating the camera position.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackgroundObjects();
        this.addEnemies();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBar();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this; requestAnimationFrame(function () { self.draw(); });

    }



    /**
     * The function adds various objects to the map, including backgrounds, clouds, bottles, coins, and
     * throwable objects.
     */
    addBackgroundObjects() {
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
    }



    /**
     * The function "addStatusBar" adds three status elements (health, coin, and bottle) to a map.
     */
    addStatusBar() {
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusBottle);
    }



    /**
     * The function adds enemies to the game map.
     */
    addEnemies() {
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.enemies);
    }


    /**
     * The function `addToMap` draws a given object on a canvas and flips the image if necessary.
     * @param mo - The parameter "mo" is an object representing a moving object. It likely has
     * properties such as "otherDirection" which determines whether the object is facing a different
     * direction, and methods such as "draw" which is used to draw the object on a canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        //Only for Developer View Purposes
        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }



    /**
     * The function adds objects to a map.
     * @param objects - An array of objects that you want to add to a map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }



    /**
     * The flipImage function flips an image horizontally using the canvas context.
     * @param mo - The parameter "mo" is likely an object that represents an image or a canvas element.
     * It probably has properties such as "width", "x", and "ctx" (which is likely a reference to a 2D
     * rendering context).
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }



    /**
     * The flipImageBack function flips an image back to its original position.
     * @param mo - The parameter "mo" is likely an object that represents an image or a graphical
     * element. It probably has a property "x" that represents the x-coordinate of the image's
     * position.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}