import { loadSprite, makeSprite } from "./utils.js";

const container = document.querySelector(".container");

new ResizeObserver(() => {
    document.documentElement.style.setProperty(
        "--scale",
        Math.min(
            container.parentElement.offsetWidth / container.offsetWidth,
            container.parentElement.offsetHeight / container.offsetHeight
        )
    )
}).observe(container.parentElement);

async function main() {
    const canvas = document.getElementById("gameCanvas");
    const c = canvas.getContext("2d");
    c.imageSmoothingEnabled = false;

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    const [layer1, layer2, layer3, layer4] = await Promise.all([
        loadSprite("./assets/1.png"),
        loadSprite("./assets/2.png"),
        loadSprite("./assets/3.png"),
        loadSprite("./assets/4.png")
    ]);

    const layer1GameObj = makeSprite(c, layer1, {x: 0, y: -100}, 4);
    const layer2GameObj = makeSprite(c, layer2, {x: 0, y: -100}, 4);
    const layer3GameObj = makeSprite(c, layer3, {x: 0, y: -100}, 4);
    const layer4GameObj = makeSprite(c, layer4, {x: 0, y: -100}, 4); 
    
    let dt;
    let oldTimeStamp = 0;
    let fps;
    const debugMode = true;

    function gameLoop(timeStamp) {
        dt = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        fps = Math.round(1 / dt);

        c.clearRect(0, 0, canvas.width, canvas.height);

        if (debugMode) {
            c.font = "128px Arial";
            c.fillStyle = "black";
            c.fillText(fps, 25, 120);
        }

        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop);
}

main();



