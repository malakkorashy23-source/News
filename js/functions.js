async function getNews(category = "business", search = "", page = 1) {
  let parameters = new URLSearchParams({
    category: category,
    q: search,
    from: "2026-08-22",
    sortBy: "publishedAt",
    apiKey: "bedde18907cd421b8a8e5537db6600f0",
    pageSize: 10,
    page: page,
  });

  let promise = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);
  let myData = await promise.json();
  showData(myData, page);
}

function showData(data, currentPage) {
  let totalPages = Math.ceil(data.totalResults / 10),
    news = data.articles,
    $dataContainer = $("#Data .row"),
    $lisPagination = $("#Data nav ul");
  $dataContainer.html("");
  if (news.length > 0) {
    for (let item of news) {
      $dataContainer.append(cardComponent(item));
      $lisPagination.html(prepperPagination(currentPage, totalPages));
    }
  }else{
    console.log("error");
  }
}

function cardComponent(item) {
  return `
        <div class="col-lg-4 mb-3">
            <div class="card m-auto" style="width: 18rem;">
                <div class="share">
                    <i class="fas fa-share" onclick="share('${item.url}')"></i>
                </div>
                <img src=" ${item.urlToImage ?? "./images/no image.avif"} " onerror="this.src='./images/no image.avif'" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title?.slice(0, 50)}</h5>
                    <div class="description">
                        <abbr title="Description copy"><i class="far fa-copy" onclick="copy(this)"></i></abbr>
                        <p class="card-text">${item.description?.slice(0, 100)}</p>
                    </div>
                    <a href="${item.url}" target="_blank" class="btn btn-primary">See More</a>
                </div>
            </div>
        </div>
    
    `;
}

function copy(that) {
  that.classList.remove("far", "fa-copy");
  that.classList.add("fas", "fa-copy");
  let abbrText = that.parentElement;
  abbrText.title = "copy";
  let description = abbrText.nextElementSibling.textContent;
  navigator.clipboard.writeText(description);
  setTimeout(function () {
    that.classList.remove("fas", "fa-copy");
    that.classList.add("far", "fa-copy");
    abbrText.title = "Description copy";
  }, 1500);
}

function share(url){
    navigator.share({
        title:"news",
        text:"news.api",
        url:url
    });
}

function prepperPagination(currentPage, totalPages) {
  let lis = `<li class="page-item  ${currentPage == 1 ? "disabled" : ""}"><a class="page-link" onclick="paginate(${currentPage > 1 ? currentPage - 1 : 1})">Previous</a></li>`;
  for (let i = 1; i <= totalPages; i++) {
    lis += `<li class="page-item  ${currentPage == i ? "active" : ""}"><a class="page-link" onclick="paginate(${i})" >${i}</a></li>`;
  }
  lis += `<li class="page-item  ${currentPage == totalPages ? "disabled" : ""}"><a class="page-link" onclick="paginate(${currentPage < totalPages ? currentPage + 1 : totalPages})">Next</a></li>`;
  return lis;
}

function paginate(page) {
  let categoryInput = $("#Category").val(),
    searchInput = $("#Search").val();

  getNews(categoryInput, searchInput, page);
}
