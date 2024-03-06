class StatusBarBoss extends DrawableObject {

    /* `IMGAES_BOTTLE` is a constant array that stores the paths to different images of a bottle. Each
    image represents a different percentage of the bottle's status. The images are used to visually
    represent the status of the bottle in the `StatusBarBottle` class. */
    IMGAES_BOSS = [
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
    constructor() {
        super();
        this.loadImages(this.IMGAES_BOSS);
        this.setPercentage(100);
        this.x = 560;
        this.y = 35;
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
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMGAES_BOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

}