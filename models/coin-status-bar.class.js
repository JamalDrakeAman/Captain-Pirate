class CoinStatusBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.itemCount);
    }
}