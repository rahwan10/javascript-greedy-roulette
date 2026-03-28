export default function getRouletteColor() {
    const ColorNum = Math.floor(Math.random() * 40) + 1;
    let Color;
    if (ColorNum <= 21) {
        Color = "YELLOW";
    } else if (ColorNum <= 31) {
        Color = "GREEN";
    } else if (ColorNum <= 37) {
        Color = "BLUE";
    } else if (ColorNum <= 39) {
        Color = "PURPLE";
    } else {
        Color = "RED";
    }
    return Color;
}