class Character extends MovableObject {
    height = 400;
    width = 450;
    y = 80;
    speed = 10;

    enemyHit = false;

    offset = {
        top: 140,
        left: 190,
        right: 190,
        bottom: 130
    };

    IMAGES_IDLE = [
        'img/1_character/idle/pirate_idle0.png',
        'img/1_character/idle/pirate_idle1.png',
        'img/1_character/idle/pirate_idle2.png',
        'img/1_character/idle/pirate_idle3.png',
        'img/1_character/idle/pirate_idle4.png'
    ];

    IMAGES_WALKING = [
        'img/1_character/walk/pirate_run1.png',
        'img/1_character/walk/pirate_run2.png',
        'img/1_character/walk/pirate_run3.png',
        'img/1_character/walk/pirate_run4.png',
        'img/1_character/walk/pirate_run5.png',
        'img/1_character/walk/pirate_run6.png',
    ];

    IMAGES_JUMPING = [
        'img/1_character/jump/pirate_jump1.png',
        'img/1_character/jump/pirate_jump2.png'
    ];

    IMAGES_FALLING = [
        'img/1_character/fall/pirate_fall1.png',
        'img/1_character/fall/pirate_fall2.png'
    ];

    IMAGES_LANDING = [
        'img/1_character/landing/pirate_landing1.png',
        'img/1_character/landing/pirate_landing2.png'
    ];

    IMAGES_HURT = [
        'img/1_character/hurt/pirate_hurt1.png',
        'img/1_character/hurt/pirate_hurt2.png',
        'img/1_character/hurt/pirate_hurt3.png'
    ];

    IMAGES_DEAD = [
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead1.png',

        'img/1_character/dead/pirate_dead1.png',
        'img/1_character/dead/pirate_dead2.png',
        'img/1_character/dead/pirate_dead3.png',
        'img/1_character/dead/pirate_dead4.png'
    ];

    IMAGES_GUN_OUT = [
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',
        'img/1_character/gun-out/pirate_gun_out0.png',

        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',
        'img/1_character/gun-out/pirate_gun_out1.png',

        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',
        'img/1_character/gun-out/pirate_gun_out2.png',

        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',
        'img/1_character/gun-out/pirate_gun_out3.png',

        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',
        'img/1_character/gun-out/pirate_gun_out4.png',

        'img/1_character/gun-out/pirate_gun_out5.png',
        'img/1_character/gun-out/pirate_gun_out5.png',
        'img/1_character/gun-out/pirate_gun_out5.png',
        'img/1_character/gun-out/pirate_gun_out5.png'
    ];

    IMAGES_GUN_SHOOT = [
        'img/1_character/gun-shoot/pirate_gun_shoot0.png',
        'img/1_character/gun-shoot/pirate_gun_shoot1.png',
        'img/1_character/gun-shoot/pirate_gun_shoot2.png',
        'img/1_character/gun-shoot/pirate_gun_shoot3.png',
        'img/1_character/gun-shoot/pirate_gun_shoot4.png'
    ];

    IMAGES_SWORD_ATTACK_1 = [
        'img/1_character/sword-attack1/pirate_attack1_0.png',
        'img/1_character/sword-attack1/pirate_attack1_1.png',
        'img/1_character/sword-attack1/pirate_attack1_2.png',
        'img/1_character/sword-attack1/pirate_attack1_3.png',
        'img/1_character/sword-attack1/pirate_attack1_4.png',
        'img/1_character/sword-attack1/pirate_attack1_5.png',
        // ATTACK 2
        'img/1_character/sword-attack2/pirate_attack2_0.png',
        'img/1_character/sword-attack2/pirate_attack2_1.png',
        'img/1_character/sword-attack2/pirate_attack2_2.png',
        'img/1_character/sword-attack2/pirate_attack2_3.png',
        'img/1_character/sword-attack2/pirate_attack2_4.png',
        'img/1_character/sword-attack2/pirate_attack2_5.png',
        // ATTACK 3
        'img/1_character/sword-attack3/pirate_attack3_0.png',
        'img/1_character/sword-attack3/pirate_attack3_1.png',
        'img/1_character/sword-attack3/pirate_attack3_2.png',
        'img/1_character/sword-attack3/pirate_attack3_3.png',
        'img/1_character/sword-attack3/pirate_attack3_4.png',
        'img/1_character/sword-attack3/pirate_attack3_5.png'
    ];

    world;

    walking_sound = new Audio('audio/walk.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    landing_sound = new Audio('audio/landing.mp3');
    shoot_sound = new Audio('audio/shot.mp3');
    sword_sound = new Audio('audio/sword.mp3');
    trigger_sound = new Audio('audio/trigger.mp3');
    loaded_sound = new Audio('audio/load-ammo.mp3');
    coins_sound = new Audio('audio/coins.mp3');
    hurt_sound = new Audio('audio/pirate-hurt.mp3');

    constructor() {
        super().loadImage('img/1_character/walk/pirate_run1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_FALLING);
        this.loadImages(this.IMAGES_LANDING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_GUN_SHOOT);
        this.loadImages(this.IMAGES_SWORD_ATTACK_1);

        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (sound) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft();
                this.otherDirection = true;
                if (sound) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.isLanding = false;
                if (sound) {
                    this.jump_sound.play();
                }
            }
            this.world.camera_x = -this.x - 35;
        }, 1000 / 60)


        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.speed = 0;
                if (this.currentImage > 8) {
                    this.currentImage = 5;
                } else if (this.currentImage < 5 || this.currentImage > 7) {
                    this.currentImage = 5;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (sound) {
                    this.hurt_sound.play();
                }
            } else if (this.world.keyboard.D) {
                if (sound) {
                    this.trigger_sound.play();
                }
                this.playAnimation(this.IMAGES_GUN_SHOOT);
            } else if (this.world.keyboard.F) {
                this.playAnimation(this.IMAGES_SWORD_ATTACK_1);
                if (sound) {
                    this.sword_sound.play();
                }
            } else if (this.isAboveGround()) {
                if (this.speedY > 0) {
                    this.playAnimation(this.IMAGES_JUMPING);
                    if (this.currentImage < 1) {
                        this.currentImage--
                    }
                } else {
                    this.playAnimation(this.IMAGES_FALLING);
                    if (this.currentImage < 1) {
                        this.currentImage--
                        this.isLanding = false;
                    }
                    if (this.y > 50 && !this.isLanding) {
                        this.counter = 1
                        this.playAnimation(this.IMAGES_LANDING);
                        if (sound) {
                            this.landing_sound.play();
                        }
                    }
                }
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 80);

    }

    health() {
        if (this.energy <= 80) {
            this.energy = this.energy + 20;
        } else {
            this.energy = 100;
        }
    }

}