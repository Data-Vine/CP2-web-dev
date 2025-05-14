let imagens =[
    'src/assets/images/c3.webp',
    'src/assets/images/camry.webp',
    'src/assets/images/GTR.webp',
    'src/assets/images/DB12.webp',
]
let i=0;
let tempo = 2000;

function slideshow(){
    document.getElementById('image').src=imagens[i];
    i++;
    if(i == imagens.length){
        i = 0;
    }
    setTimeout("slideshow()", tempo);
}
slideshow();