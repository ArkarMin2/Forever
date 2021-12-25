//scrollspy
document.querySelectorAll('.scrollLink').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
  });
});


//pagination
function getPageList(totalPages, page ,maxLength){
  function range(start , end){
      return Array.from(Array(end - start + 1),(_, i) => i + start);
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

  if(totalPages <= maxLength){
  return range(1, totalPages);
  }

  if(page <= maxLength - sideWidth - 1 - rightWidth){
  return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
  }

  if(page >= totalPages - sideWidth - 1 - rightWidth){
  return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
  }

  return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function(){
  var numberOfItems = $(".card-content .card").length;
  var limitPerPage = 12; //How many card items visible per a page
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 7; //How many page elements visible in the pagination
  var currentPage;
  
  function showPage(whichPage){
  if(whichPage < 1 || whichPage > totalPages) return false;
  
  currentPage = whichPage;
  
  $(".card-content .card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
  
  $(".pagination li").slice(1, -1).remove();
  
  getPageList(totalPages, currentPage, paginationSize).forEach(item => {
  $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
  .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
  .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
  });
  
  $(".previous-page").toggleClass("disable", currentPage === 1);
  $(".next-page").toggleClass("disable", currentPage === totalPages);
  return true;
  }
  
  $(".pagination").append(
  $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
  $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))
  );
  
  $(".card-content").show();
  showPage(1);
  
  $(document).on("click", ".pagination li.current-page:not(.active)", function(){
  return showPage(+$(this).text());
  });
  
  $(".next-page").on("click", function(){
  return showPage(currentPage + 1);
  });
  
  $(".previous-page").on("click", function(){
  return showPage(currentPage - 1);
  });
});

//scroll animation
window.onscroll = function() {myFunction()};

const whatwedoSection = document.querySelector('#whatwedo-section');
const whatwedo = document.querySelector('#whatwedo-section h3');
const whatwedoWrapper1 = document.querySelector('.whatwedo-wrapper1');
const whatwedoWrapper2 = document.querySelector('.whatwedo-wrapper2');

function myFunction() {
  if (window.pageYOffset = whatwedoSection.offsetTop) {
    whatwedo.classList.add("animation")
    whatwedoWrapper1.classList.add("animation")
    whatwedoWrapper2.classList.add("animation")
  }
  if (window.pageYOffset = whatwedoSection.offsetBottom) {
    whatwedo.classList.add("animation")
    whatwedoWrapper1.classList.add("animation")
    whatwedoWrapper2.classList.add("animation")
  }
}

//img loop
const cardContent = document.querySelector('.card-content');

for(let i= 1; i < 64; i++){
  const imgTag = document.createElement("img");//create img tag
  imgTag.src = `Saved Pictures/img${i}.jpg`;
  imgTag.classList.add("card");//add class="card"
  cardContent.append(imgTag)
}

//sideBar
const sideBar = document.querySelector(".sideBar");
const openBtn = document.querySelector(".openBtn");
const closeBtn = document.querySelector(".closeBtn");
const aTag = document.querySelectorAll(".sideBar a");
const overlay = document.querySelector(".overlay");

openBtn.addEventListener("click", ()=>{
  sideBar.classList.toggle("open");
  overlay.style.display = 'block';

});

closeBtn.addEventListener("click", ()=>{
  sideBar.classList.toggle("open");
  overlay.style.display = 'none';
});

aTag.forEach((anchor)=>{
  anchor.addEventListener("click", ()=>{
    sideBar.classList.remove("open");
    overlay.style.display = 'none';
  });
})

