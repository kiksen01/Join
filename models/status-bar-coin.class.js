class StatusBarCoin extends DrawableObject{

    /* The `IMGAES_COIN` is an array that contains the paths to different images of a coin. Each image
    represents a different percentage of the coin's fill level. The array is used in the
    `setPercentage` method to determine which image to display based on the current percentage
    value. */
    IMGAES_COIN = [

        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]



    /**
     * The constructor function initializes the properties of an object, including loading images,
     * setting a percentage, and defining the position and dimensions.
     */
    constructor(){
        super();
        this.loadImages(this.IMGAES_COIN);
        this.setPercentage(0);
        this.x = 0;
        this.y = 30;
        this.width = 210;
        this.height = 60;
    }


    
    /**
     * The function sets the percentage value and updates the image based on the new percentage.
     * @param percentage - The `percentage` parameter is a value that represents a percentage. It is
     * used in the `setPercentage` function to update the `percentage` property of an object.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMGAES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
