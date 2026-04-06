export function loadSprite(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
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
        tail: makeSprite(c, sprite, {x: pos.x + sprite.width * scale, y: pos.y}, scale)
    }
}

export function makeInfiniteScroll(dt, layer, speed) {
    if (layer.head.pos.x + layer.head.width * layer.head.scale < 0) {
        layer.head.pos.x = layer.tail.pos.x + layer.tail.width * layer.tail.scale;
    }

    if (layer.tail.pos.x + layer.tail.width * layer.head.scale < 0) {
        layer.tail.pos.x = layer.head.pos.x + layer.head.width * layer.tail.scale;
    }

    layer.head.pos.x += speed * dt;
    layer.head.draw();
    layer.tail.pos.x += speed * dt;
    layer.tail.draw();
}