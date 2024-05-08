document.addEventListener("DOMContentLoaded", function () {
    var famsiteBtn = document.getElementById("famsite_btn");
    var famsiteMenu = document.querySelector(".famsite_menubar");
    var arrowImg = famsiteBtn.querySelector("img");

    famsiteBtn.addEventListener("click", function () {
        var maxHeight = famsiteMenu.style.maxHeight;

        if (maxHeight === "0px") {
            famsiteMenu.style.maxHeight = "140px";
            famsiteMenu.style.border = "1px solid #cfcfcf";
            arrowImg.style.transform = "rotate(-180deg)";
        } else {
            famsiteMenu.style.maxHeight = "0px";
            famsiteMenu.style.border = "1px solid transparent";
            arrowImg.style.transform = "";
        }
    });
});
