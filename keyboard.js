export let keys = {};
export let key_pressed = {};  // tracks first frame of press

window.addEventListener("keydown", (e) => {
    if (!keys[e.key]) {
        key_pressed[e.key] = true; // <-- just pressed this frame
    }
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
    key_pressed[e.key] = false;
});

// helpers
export function isDown(key)
{
    return keys[key] === true;
}

export function wasPressed(key)
{
    const pressed = key_pressed[key] === true;
    key_pressed[key] = false;
    return pressed;
}

window.addEventListener("touchstart", e => {
    console.log("touch!", e.touches[0].clientX, e.touches[0].clientY);
});