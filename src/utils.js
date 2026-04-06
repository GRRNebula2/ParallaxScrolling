export function loadSprite(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.load = () => resolve(img);
        img.onerror = (err) => reject();
    })
}

export function makeSprite(c, sprite, pos, scale = 1) {
    return {
        width: sprite.width,
        height: sprite.height,
        pos,
        scale,
        draw() {
            c.drawImage(
                sprite,
                this.pos.x,
                this.pos.y,
                this.width * scale,
                this.height * scale
            );
        },
    };
}

export function makeLayer(c, sprite, pos, scale = 1) {
    return {
        head: makeSprite(c, sprite, pos, scale),
        tail: makeSprite(c, sprite, {x: pos.x + sprite.width * scale, y: pos.y})
    }
}