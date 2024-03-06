class Bottle extends MovableObject{

    /* In the code snippet provided, `IMAGES_BOTTLE` is a constant array that contains the path to an
    image file. The image file is '2_salsa_bottle_on_ground.png' located in the 'img/6_salsa_bottle'
    directory. This array is used to load the image of the bottle object in the `Bottle` class. */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]



    /* The `offset` object is defining the offset values for the boundaries of the `Bottle` object.
    These offset values are used to adjust the collision detection and positioning of the object. */
    offset = {
        top: 0,
        right: 25,
        left: 25,
        bottom:0
    }



    /**
     * The constructor function initializes the properties of a bottle object, including its image,
     * height, width, and position on the canvas.
     */
    constructor(){
        super();
        this.loadImage(this.IMAGES_BOTTLE);
        this.height = 94;
        this.width = 85;
        this.x = 300 + Math.random() * 3000;
        this.y = 340;
    }
}