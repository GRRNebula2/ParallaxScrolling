async function main() {
    const canvas = document.getElementById("gameCanvas");
    const c = canvas.getContext("2d");
    c.imageSmoothingEnabled = false;

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
}

main();

