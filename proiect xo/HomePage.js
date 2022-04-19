var snakeboard;
var snakeboard_ctx;
let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
let dx = 10;  
let dy = 0;
var i = 0;
let score = [];
var scornumber = 0;
let changing_direction = false;
let food_x, food_y;

document.addEventListener("keydown", change_direction);
document.addEventListener("keydown", shortcut);


window.requestAnimationFrame(main);
window.requestAnimationFrame(gen_food);
function drawSnakePart(snakePart) {
    snakeboard_ctx.fillStyle = "blue";
    snakeboard_ctx.strokestyle = "blue";
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}
function drawFood()
{
    snakeboard_ctx.fillStyle = "green";
    snakeboard_ctx.strokestyle = "green";
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
function main() {

     snakeboard = document.getElementById("snakeboard");
    snakeboard_ctx = snakeboard.getContext("2d");
    changing_direction = false;
    if (has_game_ended()) {
        snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
        dx = 10;
        dy = 0;
        score.push(scornumber);
        sessionStorage.setItem('score', score);
        localStorage.setItem('score', score);
        document.getElementById('lastscore').innerHTML = score[i];
        i++;
        document.getElementById('scorecurrent').innerHTML = 0;
        confirm("Ai atins bordura!");

        scornumber = 0;
    }

    setTimeout(onTick, 100);


}

function onTick() {
    clear_board();
    drawFood();
    drawSnake();
    move_snake();
    shortcut();
    main();
}

function restart() {
    snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, { x: 180, y: 200 }];
    dx = 10;
    dy = 0;   
    gen_food();
    
    score.push(scornumber);
    scornumber = 0;
    sessionStorage.setItem('score', score);
    localStorage.setItem('score', score);
    console.log(score);
    document.getElementById('lastscore').innerHTML = score[i];
    i++;
    document.getElementById('scorecurrent').innerHTML = 0;
}

function shortcut(event) {
    const pause = 80; //P
    const eventrestart = 82; //R
    if (event) {
        const eventshortcut = event.keyCode;
        if (eventshortcut == pause) {
            confirm("PAUSE");
        }
        else if (eventshortcut == eventrestart) {
            restart();
        }
    }

}
function move_snake() {
    const head = { x: snake[0].x + dx , y: snake[0].y +dy };
    snake.unshift(head);  // actualizare sarpe: cap nou
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        scornumber += 10;
        document.getElementById('scorecurrent').innerHTML = scornumber;
        gen_food();
    } else {
       snake.pop();  // actualizare sarpe: eliminare ultimul element
    }
}

function clear_board() {   // refrash canvas
    snakeboard_ctx.fillStyle = "white";
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
}

function change_direction(event) {
    const KeyA = 65;
    const KeyD = 68;
    const KeyW = 87;
    const KeyS = 83;

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;

    const goingUp = dy === -10 ;
    const goingDown = dy === 10 ;
    const goingRight = dx === 10 ;
    const goingLeft = dx === -10 ;

    if (keyPressed === KeyA && !goingRight) {
        dx = -10;
        dy = 0 ;

    }

    if (keyPressed === KeyW && !goingDown) {
        dx = 0 ;
        dy = -10 ;

    }

    if (keyPressed === KeyD && !goingLeft) {
        dx = 10 ;
        dy = 0;

    }

    if (keyPressed === KeyS && !goingUp) {
        dx = 0 ;
        dy = 10;

    }
}

function has_game_ended() {
    for (let i = 1; i < snake.length; i++) {
        const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (has_collided) {
            return true;
        }
    }
    const hitLeftWall = snake[0].x < -10;
    const hitRightWall = snake[0].x > snakeboard.width+1;
      const hitToptWall = snake[0].y < -10;
    const hitBottomWall = snake[0].y > snakeboard.height+1;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {

    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) {     
            gen_food();
        }
    });
}
