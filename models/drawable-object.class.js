class DrawableObject {

    /* The code snippet `img; imageCache = {}; currentImage = 0; x; y; height; width; energy;
    percentage;` is declaring and initializing instance variables for the `DrawableObject` class in
    JavaScript. */
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y;
    height;
    width;
    energy;
    percentage;

    /**
     * The loadImage function creates a new Image object and sets its source to the specified path.
     * @param path - The path parameter is a string that represents the file path or URL of the image
     * that you want to load.
     */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }



    /**
     * The draw function uses the ctx (canvas context) to draw an image at a specified position and
     * size.
     * @param ctx - The ctx parameter is the 2D rendering context of the canvas element. It is used to
     * draw the image on the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    /**
     * The function `loadImages` takes an array of image paths, creates image objects for each path,
     * and stores them in a cache.
     * @param arr - The `arr` parameter is an array of strings representing the paths to the images
     * that need to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }



    /**
     * The function `resolveImageIndex()` returns an image index based on the value of the `percentage`
     * property.
     * @returns The function `resolveImageIndex()` returns an integer value representing the index of
     * an image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }

    
    /**
     * The function "resolveImageIndexForBottle" returns an image index based on the value of the
     * "percentage" variable.
     * @returns The function `resolveImageIndexForBottle()` returns an integer value representing the
     * index of an image for a bottle based on the value of the `percentage` property.
     */
    resolveImageIndexForBottle() {
        if (this.percentage == 160) {
            return 8;
        }else if (this.percentage == 140) {
            return 7;
        }else if(this.percentage == 120){
            return 6;
        }else if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }

    

    /**
     * The function playAnimation takes an array of images and a repeat parameter, and updates the
     * current image being displayed based on whether repeat is true or false.
     * @param images - The `images` parameter is an array of image paths. Each path represents an image
     * that will be displayed in the animation.
     * @param repeat - The "repeat" parameter is a boolean value that determines whether the animation
     * should repeat or not. If set to "true", the animation will repeat indefinitely. If set to
     * "false", the animation will play only once.
     */
    playAnimation(images, repeat) {
        if (repeat == 'true') {
            let i = this.currentReaptingImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentReaptingImage++;
        }
        else {
            if (this.currentImage < images.length) {
                let i = this.currentImage;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }
    }
}