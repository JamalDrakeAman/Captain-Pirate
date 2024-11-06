class World {
    character = new Character();

    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];

    clouds = [
        new Cloud()
    ];

    backgroundObjects = [
        new BackgroundObject('imgs/game_background_4/layers/sky.png', 0),
        new BackgroundObject('imgs/game_background_4/layers/sun.png', 0),
        new BackgroundObject('imgs/game_background_4/layers/sea.png', 0),
        new BackgroundObject('imgs/game_background_4/layers/cloud.png', 0),
        new BackgroundObject('imgs/game_background_4/layers/decor.png', 0),
        new BackgroundObject('imgs/game_background_4/layers/land.png', 0),
        
        
    ];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0)


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }


}