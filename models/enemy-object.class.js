/**
 * Represents an enemy object in the game, inheriting from `MovableObject`.
 */
class EnemyObject extends MovableObject {
    height = 150;
    width = 150;
    y = 240;
    showEnergy = false;
    enemyEnergy = 100;

    IMAGES_WALKING = [
        'img/3_enemies/skeleton/walk/skeleton-walk1.png',
        'img/3_enemies/skeleton/walk/skeleton-walk2.png',
        'img/3_enemies/skeleton/walk/skeleton-walk3.png',
        'img/3_enemies/skeleton/walk/skeleton-walk4.png',
        'img/3_enemies/skeleton/walk/skeleton-walk5.png',
        'img/3_enemies/skeleton/walk/skeleton-walk6.png',
        'img/3_enemies/skeleton/walk/skeleton-walk7.png',
        'img/3_enemies/skeleton/walk/skeleton-walk8.png',
    ];


    /**
     * Animates the enemy, moving it left and playing its walking animation.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = true;
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.otherDirection = true;
        }, 200);
    }


    /**
     * Reduces the enemy's energy when hit by a sword.
     * 
     * @fires lastHit - Updates the time of the last hit if the enemy still has energy.
     */
    swordHit() {
        this.enemyEnergy -= 30;
        if (this.enemyEnergy < 0) {
            this.enemyEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Reduces the enemy's energy when hit by a shot.
     * 
     * @fires lastHit - Updates the time of the last hit if the enemy still has energy.
     */
    shootHit() {
        this.enemyEnergy -= 40;
        if (this.enemyEnergy < 0) {
            this.enemyEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * Reduces the enemy's energy when hit by a jump attack.
    * 
    * @fires lastHit - Updates the time of the last hit if the enemy still has energy.
    */
    jumpHit() {
        this.enemyEnergy -= 50;
        if (this.enemyEnergy < 0) {
            this.enemyEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}