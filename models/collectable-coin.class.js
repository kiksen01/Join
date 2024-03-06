class Coin extends MovableObject {

    /* The `offset` object is defining the distances between the edges of the `Coin` object and its
    bounding box. It specifies the top, right, left, and bottom offsets in pixels. These offsets are
    used to calculate collision detection and determine the boundaries within which the `Coin`
    object can move. */
    offset = {
        top: 50,
        right: 80,
        left: 80,
        bottom: 170
    }



    /* The `COIN_IMAGES` variable is an array that stores the file paths of two images. These images are
    used to animate the `Coin` object. The `Coin` object will cycle through these images to create
    the appearance of animation. */
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]



    /**
     * The constructor function initializes the properties of a coin object and sets its initial
     * position and image.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.height = 220;
        this.width = 220;
        this.x = 300 + Math.random() * 3000;
        this.y = 300 - Math.random() * 300;
        this.animate();
    }



    /**
     * The `animate` function repeatedly plays a coin animation every 300 milliseconds as long as the
     * game is not paused.
     */
    animate() {
        setStoppableInterval(() => {
            if (!isGamePaused) { this.playAnimation(this.COIN_IMAGES, 'true'); }
        }, 300);
    }
}