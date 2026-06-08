const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorBox = document.getElementById("colorBox");
const colorInfo = document.getElementById("colorInfo");

let img = new Image();

// Load image
upload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }

    reader.readAsDataURL(file);
});

// Pick color on click
canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1);

    colorBox.style.background = rgb;
    colorInfo.innerHTML = `HEX: ${hex} <br> RGB: ${rgb}`;
});