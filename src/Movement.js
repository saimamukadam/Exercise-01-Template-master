class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48,
            frameHeight: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xFACADE) // using facade bc im cool 😎
        // added 'physics' btwn this and add
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)
        // console.log('now in movement scene 👍')
        this.PLAYER_VELOCITY = 350

        cursors = this.input.keyboard.createCursorKeys()

        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10
            })
        })


        this.anims.create({
            key: 'idle-left',
            frameRate: 4,
            repeat: 4, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10
            })
        })


        this.anims.create({
            key: 'idle-right',
            frameRate: 7,
            repeat: -7, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'walk-up',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11
            })
        })

        this.anims.create({
            key: 'walk-left',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5
            })
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 0,
            repeat: -1, // means infinitely
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8
            })
        })

        this.player.play('idle-down')
        this.player.play('idle-up')
        this.player.play('idle-left')
        this.player.play('idle-right')
        this.player.play('walk-down')
        this.player.play('walk-up')
        this.player.play('walk-left')
        this.player.play('walk-right')

        
    }


    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        if(cursors.left.isDown){
            playerVector.x = -1
            playerDirection = 'left'
            //this.player.x -= this.PLAYER_VELOCITY
        } else if(cursors.right.isDown){
            playerVector.x = 1
            playerDirection = 'right'
            //this.player.x += this.PLAYER_VELOCITY
        }

        if(cursors.up.isDown){
            playerVector.y = -1
            playerDirection = 'up'
            //this.player.y -= this.PLAYER_VELOCITY
        } else if(cursors.down.isDown){
            playerVector.y = 1
            playerDirection = 'down'
            //this.player.y += this.PLAYER_VELOCITY
        }

        playerVector.normalize()

        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection)
    }
}