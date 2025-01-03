/**
 * Represents the game world and its components.
 */
class World extends Collisions{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    ammoStatusBar = new AmmoStatusBar();
    throwableObjects = [];
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
    ammo = [new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo(), new Ammo()];
    health = [new Health(), new Health(), new Health()];
    endBoss = this.level.enemies.find(enemie => enemie.boss);
    moveCamera = 0;


    /**
     * Creates an instance of the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Initializes the character's reference to this world.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Continuously checks for various game events and interactions at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkJumpOnEnemy();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkPickupCoins();
            this.checkPickupAmmo();
            this.checkPickupHealth()
            this.checkShootHitEnemys();
            this.checkCollisionsWithSword();
            this.clearDeadEnemys();
            this.checkEnemyDistance();
            this.checkEndBossDistance();
            this.checkCharacterIsDead();
            this.checkEndbossIsDead();
            this.checkCollisionEndbossAttack();
        }, 100)
    }


    /**
     * Checks if throwable objects are being launched by the player.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.ammoStatusBar.itemCount > 0) {
            if (this.character.otherDirection) {
                let ammo = new ThrowableObject(this.character.x - 10, this.character.y + 30, this.character.otherDirection);
                this.throwableObjects.push(ammo);
            } else {
                let ammo = new ThrowableObject(this.character.x + 160, this.character.y + 30);
                this.throwableObjects.push(ammo);
            }
            this.ammoStatusBar.itemCount--;
            setTimeout(() => this.throwableObjects.splice(0, 1), 300)
            characterShootSound.play();
        }
    }


    /**
     * Removes enemies with zero energy from the game.
     */
    clearDeadEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.enemyEnergy == 0) {
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1000)
            }
        });
    }


    /**
     * Checks if the end boss has been defeated and ends the game if so.
     */
    checkEndbossIsDead() {
        if (this.endBoss.enemyEnergy == 0) {
            winGame = true;
            stopGame();
        }
    }


    /**
     * Checks if the character's health is zero and ends the game if so.
     */
    checkCharacterIsDead() {
        if (this.healthStatusBar.percentage == 0) {
            stopGame();
        }
    }


    /**
     * Checks the distance between the character and each enemy, updating their walking direction.
     */
    checkEnemyDistance() {
        this.level.enemies.forEach(enemy => {
            let enemyDistance = enemy.x - this.character.x - 130;
            if (enemyDistance < 400 && enemyDistance > 0) {
                enemy.walkRight = false;
            }
            else if (enemyDistance < 0 && enemyDistance > - 400) {
                enemy.walkRight = true;
            }
        })
    }


    /**
     * Checks the character's position relative to the end boss and updates their behavior.
     */
    checkEndBossDistance() {
        this.isPlayerLeftOfBoss();
        this.isPlayerRightOfBoss();
    }


    /**
     * Handles the scenario when the character is positioned to the left of the end boss.
     * Adjusts the end boss's offset, position, and camera accordingly.
     */
    isPlayerLeftOfBoss() {
        let playerLeftOfEnemy = this.character.x + 200 < this.endBoss.x;
        if (playerLeftOfEnemy && this.endBoss.bossOnTheRight) {
            this.endBoss.offset = {
                top: 120,
                left: 270,
                right: 50,
                bottom: 0
            };
            this.endBoss.x = this.endBoss.x - 200
            this.endBoss.bossOnTheRight = false;
            this.endBoss.otherDirection = false;
            this.cameraPositionLeft();
        }
    }


    /**
     * Handles the scenario when the character is positioned to the right of the end boss.
     * Adjusts the end boss's offset, position, and camera accordingly.
     */
    isPlayerRightOfBoss() {
        let playerRightOfEnemy = this.character.x + 200 > this.endBoss.x + this.endBoss.width;
        if (playerRightOfEnemy && !this.endBoss.bossOnTheRight) {
            this.endBoss.offset = {
                top: 120,
                left: 50,
                right: 270,
                bottom: 0
            };
            this.endBoss.x = this.endBoss.x + 200
            this.endBoss.bossOnTheRight = true;
            this.endBoss.otherDirection = true;
            this.cameraPositionRight();
        }
    }


    /**
     * Moves the camera position to the right.
     */
    cameraPositionRight() {
        let moveRight = setInterval(() => {
            if (this.moveCamera < 250) {
                this.moveCamera += 0.8;
            } else {
                clearInterval(moveRight);
            }
        }, 20)
    }


    /**
     * Moves the camera position to the left.
     */
    cameraPositionLeft() {
        let moveLeft = setInterval(() => {
            if (this.moveCamera > 0) {
                this.moveCamera -= 0.8;
            } else {
                clearInterval(moveLeft);
            }
        }, 20)
    }


    /**
     * Draws all objects in the game world and handles rendering logic.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x + this.moveCamera, 0);
        this.resetShadow();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.enableShadow();
        this.drawGameObjects();
        this.ctx.translate(-this.camera_x - this.moveCamera, 0);
        this.drawStatusbarStatus();
        this.endBossStatus();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Draws the main game objects including the character and items.
     */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.drawStatusBars();
        this.drawItems();
        this.addObjectsToMap(this.level.enemies);
        this.drawEnemyEnergy();
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Draws the status bars for health, coins, and ammunition.
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x - this.moveCamera, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.ammoStatusBar);
        this.ctx.translate(this.camera_x + this.moveCamera, 0);
    }


    /**
     * Draws the energy levels of enemies when visible.
     */
    drawEnemyEnergy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.showEnergy) {
                this.ctx.font = '25px pirates, Arial, Helvetica, sans-serif';
                this.ctx.fillStyle = 'red';
                this.ctx.fillText(`${enemy.enemyEnergy}o`, enemy.x + enemy.width / 2, enemy.y + 45);
            }
        });
    }


    /**
     * Displays the status bar values for coins and ammunition.
     */
    drawStatusbarStatus() {
        this.ctx.font = '40px pirates, Arial, Helvetica, sans-serif';
        this.ctx.fillStyle = '#51bbe8';
        this.ctx.fillText(`${this.coinStatusBar.itemCount}`, 100, 100);
        this.ctx.fillText(`${this.ammoStatusBar.itemCount}`, 100, 155);
    }


    /**
     * Draws collectible items (coins, ammunition, and health).
     */
    drawItems() {
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.ammo);
        this.addObjectsToMap(this.health);
    }


    /**
     * Enables shadow effects for the rendering context.
     */
    enableShadow() {
        this.ctx.shadowColor = '#000000';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
    }


    /**
     * Resets shadow effects in the rendering context.
     */
    resetShadow() {
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }


    /**
     * Displays the energy level of the end boss.
     */
    endBossStatus() {
        let endBossEnergy = this.endBoss.enemyEnergy
        if (endBossEnergy) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`${endBossEnergy}o`, 600, 90);
        }
    }


    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Adds a single movable object to the map.
     * @param {Object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
    * Flips the image of the specified object horizontally for rendering.
    * @param {Object} mo - The object to flip horizontally.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the position of an object after its image has been flipped horizontally.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}