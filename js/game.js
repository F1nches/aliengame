(function (Phaser) {

    var game = new Phaser.Game(
            1280, 720, // The width and height of the game in pixels
            Phaser.AUTO, // The type of graphic rendering to use
            // (AUTO tells Phaser to detect if WebGL is supported.
            //  If not, it will default to Canvas.)
            'phaser', // The parent element of the game
            {
                preload: preload, // The preloading function
                create: create,   // The creation function
                update: update   // The update (game-loop) function
            }
    );

    function preload() {
        // Load the spritesheet 'character.png', telling Phaser each frame is 125x195
        game.load.spritesheet('character', 'assets/alien.png', 125, 195);
        game.load.spritesheet('jumping', 'assets/sprite-jump-v5.png', 300, 300, 8);
    }

    var player; // The player-controller sprite
    var facing = "left"; // Which direction the character is facing (default is 'left')
    var hozMove = 160; // The amount to move horizontally
    var vertMove = -120; // The amount to move vertically (when 'jumping')
    var jumpTimer = 0; // The initial value of the timer

    function create() {

        // Make the background color of the game's stage be white (#FFFFFF)
        game.stage.backgroundColor = '#D3D3D3';

        // Start the physics system ARCADE
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create and add a sprite to the game at the position (2*48 x 6 *48)
        // and using, in this case, the spritesheet 'character'
        player = game.add.sprite(2 * 125, 6 * 48, 'character');

        // By default, sprites do not have a physics 'body'
        // Before we can adjust its physics properties,
        // we need to add a 'body' by enabling
        // (As a second argument, we can specify the
        //  physics system to use too. However, since we
        //  started the Arcade system already, it will
        //  default to that.)
        game.physics.enable(player);

        // We want the player to collide with the bounds of the world
        player.body.collideWorldBounds = true;

        // Set the amount of gravity to apply to the physics body of the 'player' sprite
        player.body.gravity.y = 96;

    }

    function update() {

        // Reset the x (horizontal) velocity
        player.body.velocity.x = 0;

        // Check if the left arrow key is being pressed
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            // Set the 'player' sprite's x velocity to a negative number:
            //  have it move left on the screen.
            player.body.velocity.x = -hozMove;

            // Check if 'facing' is not "left"
            if (facing !== "left")
            {
                // Set 'facing' to "left"
                facing = "left";
            }
        }
        // Check if the right arrow key is being pressed
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            // Set the 'player' sprite's x velocity to a positive number:
            //  have it move right on the screen.
            player.body.velocity.x = hozMove;

            // Check if 'facing' is not "right"
            if (facing !== "right")
            {
                // Set 'facing' to "right"
                facing = "right";
            }
        }

        // Check if the jumpButton (SPACEBAR) is down AND
        //  if the 'player' physics body is onFloor (touching a tile) AND
        //  if the current game.time is greater than the value of 'jumpTimer'
        //  (Here, we need to make sure the player cannot jump while already in the air
        //   AND that jumping takes place while the sprite is colliding with
        //   a tile in order to jump off it.)
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.animations.add('jump', [0,1,2,3,4,5,6,7,8]);
            player.animations.play('jump', 30, true);
            player.loadTexture('jumping', 0, false);
            // Set the 'player' sprite's y velocity to a negative number
            //  (vertMove is -90) and thus have it move up on the screen.
            player.body.velocity.y = vertMove;
            // Add 650 and the current time together and set that value to 'jumpTimer'
            // (The 'jumpTimer' is how long in milliseconds between jumps.
            //   Here, that is 650 ms.)
            jumpTimer = game.time.now + 650;
        }

        if (player.key == 'jumping') {
          player.loadTexture('character');
        }


        // Check if 'facing' is "left"
        if (facing === "left") {
            // Set the 'player' to the second (1) frame
            //  ('facing' is "left")
            player.frame = 0;
        } else {
            // Set the 'player' to the first (0) frame
            //  ('facing' is "right").
            player.frame = 1;
        }

    }

}(Phaser));
