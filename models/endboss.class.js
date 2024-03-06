class Endboss extends MovableObject {
    /* The code block `x = 3700; y = 70; width = 360; height = 380; isWalking = false; isAttacking =
    false; isHurt = false; isDeath = false; isAlert = false; isHurtTimer = 0; offset = { top: 50,
    right: 40, left: 10, bottom: 0 }` is initializing the properties of the `Endboss` class. */
    x = 3700;
    y = 70;
    width = 360;
    height = 380;
    isWalking = false;
    isAttacking = false;
    isHurt = false;
    isDeath = false;
    isAlert = false;
    isHurtTimer = 0;
    offset = {
        top: 50,
        right: 40,
        left: 10,
        bottom: 0
    }



    /* The `IMAGES_WALKING` array is storing the file paths of the images that will be used to animate
    the boss character when it is in a walking state. These images will be loaded and displayed in
    sequence to create the animation effect. */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];



    /* The `IMAGES_HURT` array is storing the file paths of the images that will be used to animate the
    boss character when it is in a hurt state. These images will be loaded and displayed in sequence
    to create the animation effect. */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]



    /* The `IMAGES_ATTACK` array is storing the file paths of the images that will be used to animate
    the boss character when it is in an attack state. These images will be loaded and displayed in
    sequence to create the animation effect. */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]



    /* The `IMAGES_ALERT` array is storing the file paths of the images that will be used to animate
    the boss character when it is in an alert state. These images will be loaded and displayed in
    sequence to create the animation effect. */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]



    /* The `IMAGES_DEAD` array is storing the file paths of the images that will be used to animate the
    boss character when it is in a dead state. These images will be loaded and displayed in sequence
    to create the animation effect. */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]



    /**
     * The constructor function initializes various properties and loads images for a character in a
     * game.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.bossHP = 100;
        this.speed = 0.35 + Math.random() * 0.5;
    }



    /**
     * The `animate` function sets a stoppable interval that calls the `manageBossAnimations` function
     * every 200 milliseconds.
     */
    animate() {
        setStoppableInterval(() => {
            this.manageBossAnimations();
        }, 200);
    }
}