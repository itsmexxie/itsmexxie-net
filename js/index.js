let theme = 0; // 0 - dark, 1 - light

document.addEventListener("scrollend", () => {
    let closestEl;
    let closestElValue = Infinity;

    document.querySelectorAll(".section").forEach(element => {
        let currElOffset = Math.abs(element.offsetTop - window.scrollY);
        if (closestElValue > currElOffset) {
            closestEl = element;
            closestElValue = currElOffset;
        }
    });

    window.scrollTo({ top: closestEl.offsetTop, behavior: "smooth" });
});

document.getElementById("theme-switcher").addEventListener("mousedown", () => {

})