class BabyChicken extends MovableObject {
    // Baby Chicken Measurements
    height = 55;
    width = 60;
    y = 370;

    //Hitbox Offsets
    offset = {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }

    //Walking Animations
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    //Chicken death bool
    isChickenDead = false;
    chickenDied;

    //Baby Chicken Death Animation
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]


    /**
     * The constructor function initializes a chicken enemy object with random position, speed, and
     * animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.CHICKEN_DEAD);
        this.x = 350 + Math.random() * 3200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.chickenDied = false;
    }


    /**
     * The `animate()` function sets up two intervals to control the movement and animation of a
     * chicken in a game, with the ability to pause the game.
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
                else if(this.chickenDied) { this.loadImage(this.CHICKEN_DEAD); this.chickenDied = false;}
            }
        }, 1000 / 10);
    }
}