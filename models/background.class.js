class Background extends MovableObject{

    //Background Height and Width
    height = 480;
    width = 1440;


    /**
     * The constructor function initializes an object with an image path and x-coordinate, and sets the
     * y-coordinate based on the height of the image.
     * @param imagePath - The imagePath parameter is a string that represents the path to the image
     * file that will be loaded. It should be the file path or URL of the image that you want to use
     * for the object.
     * @param x - The x parameter represents the x-coordinate of the object's position on the screen.
     */
    constructor(imagePath,x){
        super().loadImage(imagePath);
        this.x = x
        this.y = 480 - this.height;
    }
}