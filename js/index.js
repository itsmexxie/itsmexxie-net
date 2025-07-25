let theme = 0; // 0 - dark, 1 - light

document.addEventListener("scrollend", (event) => {
    let closestEl;
    let minOffset = Infinity;

    document.querySelectorAll(".section").forEach(element => {
        let offsetTopFromBottom = element.offsetTop - (window.scrollY + window.innerHeight);
        let offsetBottomFromTop = (element.offsetTop + element.offsetHeight) - window.scrollY;

        console.log(offsetTopFromBottom, offsetBottomFromTop);

        if (offsetTopFromBottom < 0 && Math.abs(offsetTopFromBottom) < minOffset) {
            closestEl = element;
            minOffset = Math.abs(offsetTopFromBottom);
        }

        if (offsetBottomFromTop > 0 && Math.abs(offsetBottomFromTop) < minOffset) {
            closestEl = element;
            minOffset = Math.abs(offsetBottomFromTop);
        }
    });

    window.scrollTo({ top: closestEl.offsetTop, behavior: "smooth" });
});
