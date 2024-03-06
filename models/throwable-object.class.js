class ThrowableObj extends MovableObject {

    /* The `IMAGES_THROWING_BOTTLE` array is storing the file paths of the images used for the
    animation of a throwing bottle. Each image represents a frame of the animation. */
    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]



    /* The `IMAGES_BREAKING_BOTTLE` array is storing the file paths of the images used for the
    animation of a breaking bottle. Each image represents a frame of the animation. */
    IMAGES_BREAKING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /* The variables `bottleBroke`, `timer`, `bottleSpeed`, and `stopInter` are instance variables of
    the `ThrowableObj` class. */
    bottleBroke;
    timer;
    bottleSpeed;
    stopInter;



    /**
     * The constructor function initializes various properties of a salsa bottle object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.loadImages(this.IMAGES_BREAKING_BOTTLE);
        this.width = 100;
        this.height = 120;
        this.bottleBroke = true;
        this.stopInter = true;
        this.timer = 0;
        this.bottleSpeed = 10;
    }



    /**
     * The function throws an error with the given x and y values, and then performs some calculations
     * and intervals.
     * @param x - The x-coordinate of the starting position of the object being thrown.
     * @param y - The parameter `y` represents the initial vertical position of the object being
     * thrown.
     */
    throw(x, y) {
        this.x = x + 50;
        this.y = y + 80;
        this.speedY = 25;
        this.applyGravity();
        setStoppableInterval(() => {
            if (!isGamePaused) { this.x += this.bottleSpeed; }
        }, 20)
    }



    /**
     * The function `throwLeft` updates the position of an object by subtracting a speed value from its
     * x-coordinate and applying gravity to its y-coordinate.
     * @param x - The x parameter represents the initial x-coordinate of the object being thrown.
     * @param y - The parameter `y` represents the initial vertical position of the object being
     * thrown.
     */
    throwLeft(x, y) {
        this.x = x + 20;
        this.y = y + 80;
        this.speedY = 25;
        this.applyGravity();
        setStoppableInterval(() => {
            if (!isGamePaused) { this.x -= this.bottleSpeed; }
        }, 20)
    }



    /**
     * The `animate()` function is responsible for playing different animations based on certain
     * conditions.
     * @returns In this code snippet, nothing is being explicitly returned. If an error occurs, the
     * catch block will return, but otherwise, the function does not have a return statement.
     */
    animate() {
        try {
            var timer = setStoppableInterval(() => {
                if (!isGamePaused) {
                    if (this.bottleBroke) {
                        this.playAnimation(this.IMAGES_THROWING_BOTTLE, 'true');
                        return;
                    } else if (!this.bottleBroke && this.stopInter) {
                        this.playAnimation(this.IMAGES_BREAKING_BOTTLE, 'false');
                        this.bottleBroke = false;
                        this.timer++;
                        if (this.timer > 100) { this.stopInter = false; this.timer = 0; }
                    } else { clearInterval(timer); }
                }
            }, 1000 / 15);
        } catch (error) { return; }
    }
}
