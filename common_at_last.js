// button 涟漪效果
(function () {
    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.pageX - button.offsetLeft - radius}px`;

        let offsetTop = button.offsetTop
        let eventY = (function () {
            let difPageY = Math.abs(event.pageY - offsetTop)
            let difClientY = Math.abs(event.clientY - offsetTop)
            return difPageY > difClientY ? event.clientY : event.pageY;
        })()

        circle.style.top = `${eventY - offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.addEventListener("click", createRipple);
    }
})()