let walking_sound = new Audio('audio/walking.mp3');
let background_music = new Audio('audio/desert-ambience.mp3')
class Character extends MovableObject {

    /* These lines of code are initializing the properties of the `Character` class. */
    world;
    height = 280;
    width = 140;
    x = 50;
    y = 140;
    isDeath;
    isAwake;
    isSleeping = false;
    gotHurt = false;
    throwRight = true;
    energy = 100;
    speed = 5;
    offset = {
        top: 0,
        right: 45,
        left: 45,
        bottom: 0
    }

    /* The `IMAGES_WALKING` array is storing the file paths of the images that will be used for the
    walking animation of the character. Each image represents a frame of the animation, and the
    array stores the paths to all the frames in the correct order. */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];



    /* The `IMAGES_JUMPING` array is storing the file paths of the images that will be used for the
    jumping animation of the character. Each image represents a frame of the animation, and the
    array stores the paths to all the frames in the correct order. */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]



    /* The `IMAGES_DEATH` array is storing the file paths of the images that will be used for the death
    animation of the character. Each image represents a frame of the animation, and the array stores
    the paths to all the frames in the correct order. */
    IMAGES_DEATH = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',

    ]

    /* The `IMAGES_HURT` array is storing the file paths of the images that will be used for the hurt
    animation of the character. Each image represents a frame of the animation, and the array stores
    the paths to all the frames in the correct order. */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]



    /* The `IMAGES_IDLE` array is storing the file paths of the images that will be used for the idle
    animation of the character. Each image represents a frame of the animation, and the array stores
    the paths to all the frames in the correct order. */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]



    /* The `IMAGES_SLEEPING` array is storing the file paths of the images that will be used for the
    sleeping animation of the character. Each image represents a frame of the animation, and the
    array stores the paths to all the frames in the correct order. */
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    


    /**
     * The constructor function loads various images and applies gravity to the character, then starts
     * the animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }



    //All Audios
    jumping_sound = new Audio('audio/jumping.mp3');
    chicken_death = new Audio('audio/chicken_death.mp3');
    coin_pickup = new Audio('audio/coin_pickup.mp3');
    bottle_pickup = new Audio('audio/bottle_pickup.mp3');
    item_throw = new Audio('audio/item_throw.mp3');
    bottle_break = new Audio('audio/bottle_break.mp3');
    player_hurt = new Audio('audio/player_damage.mp3');
    boss_hurt = new Audio('audio/bossScream.mp3');


    
    /**
     * The `animate` function sets up two intervals to apply character physics and sounds and manage
     * character animations, respectively, while checking if the game is paused.
     */
    animate() {
        setStoppableInterval(() => {
            if (!isGamePaused) {
                this.applyCharacterPhysicsAndSounds();
            }
        }, 1000 / 60);
        setStoppableInterval(() => {
            if (!isGamePaused) {
                this.manageCharacterAnimations();
            }
        }, 1000 / 10);
    }
}



