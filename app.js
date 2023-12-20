const accesskey = "dd9bmKMx4wHj8RCZUj2dnhTlzq3ZMy1Pmpg85eFyvKg";
const searchform = document.querySelector("form");
const imagescontainer=document.querySelector(".images-container");
const searchinput=document.querySelector(".search-input");
const showmore=document.querySelector(".show-more-button");
let page=1;

const fetchimage=async (query,pageno)=> {
    if(pageno===1){
        imagescontainer.innerHTML='';
    }
    const url = `https://api.unsplash.com/search/photos?&query=${query}&per_page=28&page=${pageno}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(data.results.length>0){
        data.results.forEach(photo => {
            const imageElement = document.createElement("div");
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`;
            const overlayElement=document.createElement("div");
            overlayElement.classList.add('overlay');
            imageElement.appendChild(overlayElement);
            imagescontainer.appendChild(imageElement);
        });
    }else{
        imagescontainer.innerHTML=`<h2>No images to show</h2>`;
        showmore.style.display="none";
    }
}

searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputText=searchinput.value.trim();
    if(inputText!==' '){
        fetchimage(inputText);
    }else{
        imagescontainer.innerHTML=`<h2>Please enter a search query</h2>`;
    }
});

showmore.addEventListener('click',()=>{
    fetchimage(searchinput.value.trim(),++page);
})