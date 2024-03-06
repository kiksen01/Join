class Chicken extends MovableObject {

    /* The code block `height = 70; width = 70; y = 355; offset = { top: 0, right: 10, left: -15,
    bottom: 0 }` is initializing properties for the Chicken class. */
    height = 70;
    width = 70;
    y = 355;
    offset = {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
    isChickenDead = false;
    chickenDied;


    /* The `IMAGES_WALKING` array is storing the paths to the images that will be used for the walking
    animation of the Chicken object. Each image represents a different frame of the animation. */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];



    /* The `CHICKEN_DEAD` variable is an array that stores the path to an image representing a dead
    chicken. This image will be used when the chicken object is dead. */
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]



    /**
     * The constructor function initializes a chicken enemy object with random position, speed, and
     * animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.CHICKEN_DEAD);
        this.x = 350 + Math.random() * 3200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.chickenDied = false;
    }

    

    /**
     * The `animate` function sets up two intervals to control the movement and animation of a chicken
     * in a game, with the ability to pause the game.
     */
    animate() {
        setStoppableInterval(() => {
            if (!isGamePaused) {
                if (!this.isChickenDead) { this.moveLeft(); }
                else return;
            }
        }, 1000 / 60);
        setStoppableInterval(() => {
            if (!isGamePaused) {
                if (!this.isChickenDead) { this.playAnimation(this.IMAGES_WALKING, 'true'); this.chickenDied = true; }
                else if(this.chickenDied) { this.loadImage(this.CHICKEN_DEAD); this.chickenDied = false; }
            }
        }, 1000 / 10);
    }
}
