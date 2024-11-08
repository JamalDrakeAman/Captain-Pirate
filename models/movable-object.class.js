class MovableObject {
    x = 120;
    y = 160;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 120;
    }


    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('imge') <img id="image" src>
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.pgn', 'img/image1.pgn', ....]
     */
    loadImages(arr) {

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }


    moveRight() {
        console.log('Moving right');

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}