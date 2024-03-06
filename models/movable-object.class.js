let power = 10;
class MovableObject extends DrawableObject {
    // Variables
    bossHP;
    chickenSpeed;
    world;
    isBottleBroken;
    isDeath;
    otherDirection = false;
    isIdling = true;
    // Time, Speed, lastHit, Img Variables
    currentReaptingImage = 0;
    speed = 10;
    speedY = 0;
    acceleration = 2.5;
    collectedBottles = 0;
    coinsCollected = 0;
    deathTimer = 0;
    lastHit = 0;
    lastBossHit = 0;
    lastThrow = 0;
    timer = 0;

    // Offset
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    }


    /**
     * The function applies gravity to an object by decreasing its vertical position and speed over
     * time.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (!isGamePaused) {

                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 25)
    }



    /**
     * The function checks if an object is above ground based on its y-coordinate.
     * @returns The method isAboveGround() returns a boolean value.
     */
    isAboveGround() {
        if (this instanceof ThrowableObj) {
            return this.y < 330;
        }
        else {
            return this.y < 150;
        }
    }



    /**
     * The hit function decreases the energy of an object by 20 and updates the lastHit property if the
     * energy is not negative.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    /**
     * The function `throwTimer` sets the `lastThrow` property to the current time.
     */
    throwTimer() { this.lastThrow = new Date().getTime(); }



    /**
     * The function "canThrow" checks if enough time has passed since the last throw.
     * @returns a boolean value. It returns true if the time passed since the last throw is greater
     * than 1 second, and false otherwise.
     */
    canThrow() {
        let timePassed = new Date().getTime() - this.lastThrow;
        timePassed = timePassed / 1000;
        return timePassed > 1;
    }



    /**
     * The function checks if the energy level is zero.
     * @returns The method isDead() is returning a boolean value, indicating whether the energy of the
     * object is equal to 0.
     */
    isDead() {
        return this.energy == 0;
    }



    /**
     * The moveRight function increases the x-coordinate of an object by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }



    /**
     * The moveLeft function decreases the x-coordinate of an object by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }



    /**
     * The function "moveBossLeft" moves the boss character to the left by updating its x-coordinate
     * and playing a walking animation.
     */
    moveBossLeft() {
        this.playAnimation(this.IMAGES_WALKING, 'true');
        this.x -= this.speed + 20;
    }



    /**
     * The characterJump function plays a jumping animation and sets the isSleeping flag to false.
     */
    characterJump() {
        this.playAnimation(this.IMAGES_JUMPING, 'false');
        this.isSleeping = false;
        this.timer = 0;
    }



    /**
     * The function characterHurt() plays a hurt animation, sets the gotHurt variable to true, sets the
     * isSleeping variable to false, and resets the timer.
     */
    characterHurt() {
        this.playAnimation(this.IMAGES_HURT, 'true');
        this.gotHurt = true;
        this.isSleeping = false;
        this.timer = 0;
    }



    /**
     * The function `playAnimation` takes an array of images and a repeat parameter, and updates the
     * current image being displayed based on the repeat value.
     * @param images - The `images` parameter is an array of image paths. Each path represents an image
     * that will be displayed in the animation.
     * @param repeat - The "repeat" parameter is a boolean value that determines whether the animation
     * should repeat or not. If set to "true", the animation will repeat indefinitely. If set to
     * "false", the animation will play once and then stop.
     */
    playAnimation(images, repeat) {
        if (repeat == 'true') {
            let i = this.currentReaptingImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentReaptingImage++;
        }
        else {
            if (this.currentImage < images.length) {
                let i = this.currentImage;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }
    }

    /**
    * The function `characterMoveAnimation()` plays a walking animation and resets some variables.
    */
    characterMoveAnimation() {
        this.playAnimation(this.IMAGES_WALKING, 'true');
        this.timer = 0;
        this.isSleeping = false;
        this.gotHurt = false;
    }


    /**
     * The function `characterMove` takes in two boolean values and a function, and assigns the values
     * to properties of the object, then executes the function.
     * @param bool1 - A boolean value indicating whether the character should throw to the right.
     * @param bool2 - The bool2 parameter is a boolean value that determines whether the character
     * should move in the opposite direction.
     * @param funct - The `funct` parameter is a function that will be executed within the
     * `characterMove` function.
     */
    characterMove(bool1, bool2, funct) {
        this.throwRight = bool1;
        this.otherDirection = bool2;
        funct;
    }



    /**
     * The jump function pauses the walking sound, plays the jumping sound if sound is not muted, sets
     * the current image to 0, and sets the speed in the Y direction to 30.
     */
    jump() {
        walking_sound.pause();
        if (!isSoundMuted) {
            this.jumping_sound.play();
        }
        this.currentImage = 0;
        this.speedY = 30;
    }



    /**
     * The function checks if two objects are colliding based on their positions and dimensions.
     * @param mo - The parameter "mo" represents another object that we want to check for collision
     * with the current object.
     * @returns a boolean value indicating whether or not two objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }



    /**
     * The function checks if the time passed since the last hit is less than 1 second.
     * @returns a boolean value indicating whether the time passed since the last hit is less than 1
     * second.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }



    /**
     * The function checks if the object represented by "this" is colliding with another object on the
     * top side.
     * @param mo - The parameter "mo" represents another object that we want to check for collision
     * with.
     * @returns a boolean value indicating whether there is a collision on the top between the object
     * calling the function (referred to as "this") and the object passed as a parameter (referred to
     * as "mo").
     */
    isCollidingOnTop(mo) {
        return this.y + this.height > mo.y &&
            this.y + this.height < mo.y + 50 &&
            this.x + this.width - this.offset.right > mo.x &&
            this.x + this.offset.left < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }



    /**
     * The function applies character physics and plays walking sounds if the character is moving, and
     * also handles jumping and camera movement.
     */
    applyCharacterPhysicsAndSounds() {
        if (!this.isDead()) {
            if (this.returnIsMovingRight("true")) {
                if (!this.isAboveGround() && !isSoundMuted) { walking_sound.play(); }
                else walking_sound.pause();
                this.characterMove(true, false, this.moveRight());
            }
            else if (this.returnIsMovingRight()) {
                if (!this.isAboveGround() && !isSoundMuted) { walking_sound.play(); }
                else walking_sound.pause();
                this.characterMove(false, true, this.moveLeft());
            } else { walking_sound.pause(); }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) { this.jump(); }
            this.world.camera_x = -this.x + 50;
        }
    }



    /**
     * The function manages character animations based on whether the character is alive or dead.
     */
    manageCharacterAnimations() {
        if (!this.isDead()) { this.characterAnimationsWhenAlive(); }
        else { this.characterAnimationsWhenDead(); }
    }



    /**
     * The function controls the character's animations based on its current state.
     */
    characterAnimationsWhenAlive() {
        if (this.isHurt()) { this.characterHurt(); this.isIdling = true; }
        else if (this.isAboveGround() && !this.gotHurt) { this.characterJump(); this.isIdling = true; }
        else if (this.returnIsPlayerAtWorldEnd()) { this.characterMoveAnimation(); this.isIdling = true; }
        else {
            if (this.isIdling) { this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); this.gotHurt = false; this.isIdling = false; }
            else { this.timer++; }
            if (this.timer < 20) { this.currentImage = 0; }
            if (this.timer > 20 && !this.isSleeping) {
                this.playAnimation(this.IMAGES_IDLE, 'false');
                if (this.timer > 30 && !this.isSleeping) { this.isSleeping = true; }
            } else if (this.isSleeping) { this.playAnimation(this.IMAGES_SLEEPING, 'true'); }
            else if (this.isAwake) { this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); this.isAwake = false; }
        }
    }


    /**
    * The function resets the idle image of a character in a game and updates the timer and gotHurt
    * variables.
    */
    characterResetIdleImage() {
        this.timer++;
        this.gotHurt = false;
    }



    /**
     * The function plays a death animation for a character and resets the game after a certain amount
     * of time.
     */
    characterAnimationsWhenDead() {
        this.playAnimation(this.IMAGES_DEATH, 'false');
        this.deathTimer++;
        if (this.deathTimer > 7) {
            this.resetGame('add', 'remove');
            this.deathTimer = 0;
        }
    }



    /**
     * The function returns true if the player is at the end of the world based on keyboard inputs.
     * @returns a boolean value indicating whether the player is at the end of the world.
     */
    returnIsPlayerAtWorldEnd() {
        return this.world.keyboard.RIGHT && this.x < endBossX || this.world.keyboard.LEFT && this.x > 0 || this.world.keyboard.D && this.x < endBossX || this.world.keyboard.A && this.x > 0
    }



    /**
     * The function returns true if the character is moving to the right and false if the character is
     * moving to the left.
     * @param isRight - A boolean value indicating whether the character is moving to the right or not.
     * @returns a boolean value indicating whether the character is moving to the right or left.
     */
    returnIsMovingRight(isRight) {
        if (isRight == "true") {
            return this.world.keyboard.RIGHT && this.x < endBossX || this.world.keyboard.D && this.x < endBossX;
        } else return this.world.keyboard.LEFT && this.x > 0 || this.world.keyboard.A && this.x > 0;
    }






    /**
     * The function bossHit() plays a hurt animation for the boss character and resets its state after
     * a certain number of frames.
     */
    bossHit() {
        this.playAnimation(this.IMAGES_HURT, 'true');
        this.isHurtTimer++;
        if (this.isHurtTimer > 7) {
            this.isHurt = false;
            this.loadImage(this.IMAGES_WALKING[0]);
            this.isHurtTimer = 0;
            this.isWalking = true;
        }
    }



    /**
     * The function manages the animations of a boss character based on its health and game state.
     */
    manageBossAnimations() {
        if (this.bossHP > 0 && !isGamePaused) {
            this.bossAnimationsWhenAlive();
        } else {
            this.bossAnimationsWhenDead();
        }
    }



    /**
     * The function "bossAnimationsWhenAlive" controls the animations of a boss character based on its
     * current state.
     */
    bossAnimationsWhenAlive() {
        if (this.isWalking) { this.moveBossLeft(); }
        else if (this.isAttacking && !this.isHurt) { this.playAnimation(this.IMAGES_ATTACK, 'true'); }
        else if (this.isHurt) { this.bossHit(); }
        else if (this.isAlert) { this.playAnimation(this.IMAGES_ALERT, 'false'); }
    }



    /**
     * The function `bossAnimationsWhenDead()` plays a death animation for a boss character and resets
     * the game after a certain amount of time.
     */
    bossAnimationsWhenDead() {
        if (this.isDeath) {
            isGamePaused = true;
            this.playAnimation(this.IMAGES_DEAD, 'false');
            setStoppableInterval(() => {
                this.y += 5;
                this.deathTimer++;
            }, 1000 / 60);
            if (this.deathTimer > 120) { this.resetGame('remove', 'add'); }
        }
    }



    /**
     * The `resetGame` function pauses the walking sound, hides certain elements on the page, resets a
     * boolean variable, and clears any active intervals.
     * @param param1 - The value of param1 is used as an index to access the classList property of the
     * element with the id 'winScreen'. It determines whether the 'd-none' class should be added or
     * removed from the classList.
     * @param param2 - The parameter `param2` is used to determine whether to add or remove the class
     * `'d-none'` from the element with the id `'loseScreen'`.
     */
    resetGame(param1, param2) {
        walking_sound.pause();
        background_music.pause();
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('winScreen').classList[param1]('d-none');
        document.getElementById('loseScreen').classList[param2]('d-none');
        document.getElementById('mainMenu').classList.add('d-none');
        document.getElementById('buttons').classList.remove('d-none');
        this.isDeath = false;
        intervalIds.forEach(clearInterval);
    }


}
