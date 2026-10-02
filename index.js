let links = document.querySelectorAll("nav .part2 ul li a");

getNews();

let oldCategoryInput = "",
  oldSearchInput = "",
  currentPage = "";

$("form").submit(function (e) {
  e.preventDefault();

  let categoryInput = $("#Category").val(),
    searchInput = $("#Search").val();
  if (categoryInput == oldCategoryInput && searchInput == oldSearchInput) {
    return;
  } else {
    getNews(categoryInput, searchInput);
    oldCategoryInput = categoryInput;
    oldSearchInput = searchInput;
  }

  let currentActive = document.querySelector("nav .part2 ul li a.active"),
    newActive = document.querySelector(
      `nav .part2 ul li a[data-category-name="${categoryInput}"]`,
    );
  currentActive.classList.remove("active");
  newActive.classList.add("active");
});

links.forEach(function (link) {
  link.addEventListener("click", function () {
    let currentActive = document.querySelector("nav .part2 ul li a.active");
    currentActive.classList.remove("active");
    link.classList.add("active");

    let categorySelected = link.getAttribute("data-category-name");
    $("#Category").val(categorySelected);
  });
});
