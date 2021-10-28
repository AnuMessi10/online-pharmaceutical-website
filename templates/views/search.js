const searchBar = document.querySelector(".searchbar input")

const optionsList = document.querySelectorAll(".medicineList");

searchBar.addEventListener("keyup", function (ev) {
    filterList(ev.target.value);
})

const filterList = searchTerm => {
    searchTerm = searchTerm.toLowerCase();

    optionsList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();

        if (label.indexOf(searchTerm) != -1) {
            option.style.display = "block";
        }
        else {
            option.display.style = "none";
        }
    })
}