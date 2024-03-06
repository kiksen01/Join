class StatusBarBottle extends DrawableObject{

    /* `IMGAES_BOTTLE` is a constant array that stores the paths to different images of a bottle. Each
    image represents a different percentage of the bottle's status. The images are used to visually
    represent the status of the bottle in the `StatusBarBottle` class. */
    IMGAES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]



    /**
     * The constructor function initializes the properties of an object, including loading images,
     * setting a percentage, and defining the position and dimensions.
     */
    constructor(){
        super();
        this.loadImages(this.IMGAES_BOTTLE);
        this.setPercentage(0);
        this.x = 0;
        this.y = 80;
        this.width = 210;
        this.height = 60;        

    }



    /**
     * The function sets the percentage property and updates the image based on the new percentage
     * value.
     * @param percentage - The `percentage` parameter is a value that represents the percentage of
     * something. It is used in the `setPercentage` function to update the `percentage` property of an
     * object.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMGAES_BOTTLE[this.resolveImageIndexForBottle()];
        this.img = this.imageCache[path];
    }
   
}

