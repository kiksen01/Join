class StatusBarHealth extends DrawableObject{

/* The `IMGAES_HEALTH` is an array that contains the paths to different images representing the health
status of the status bar. Each image represents a different percentage of health, ranging from 0% to
100%. These images are used to visually represent the current health percentage of the status bar. */
IMGAES_HEALTH = [

    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
]



    /**
     * The constructor function initializes the properties of an object, including loading images,
     * setting a percentage, and defining the position and dimensions.
     */
    constructor(){
        super();
        this.loadImages(this.IMGAES_HEALTH);
        this.setPercentage(100);
        this.x = 0;
        this.y = -20;
        this.width = 210;
        this.height = 60;
    }
    


    /**
     * The function sets the percentage property and updates the image based on the new percentage
     * value.
     * @param percentage - The `percentage` parameter is a value that represents a percentage. It is
     * used in the `setPercentage` function to update the `percentage` property of an object.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMGAES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}