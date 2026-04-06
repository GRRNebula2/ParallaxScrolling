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
}

main();



