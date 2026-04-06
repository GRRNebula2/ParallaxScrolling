export function loadSprite(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.load = () => resolve(img);
        img.onerror = (err) => reject();
    })
}