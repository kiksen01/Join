class Clouds extends MovableObject {

    /* The lines `height = 250`, `width = 500`, and `x = 600` are setting the initial values for the
    height, width, and x-coordinate properties of the Clouds class. These values determine the size
    and starting position of the clouds object. */
    height = 250
    width = 500;
    x = 600;



    /**
     * The constructor function loads an image, sets the initial y position randomly, and calls the
     * animate function.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.y = 0 + Math.random() * 20;
        this.animate();
    }


    /**
     * The animate function moves an object to the left.
     */
    animate(){
        this.moveLeft();
    }

   
}