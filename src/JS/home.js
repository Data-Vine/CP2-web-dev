let imagens =[
    'src/assets/images/image1.jpg',
    'src/assets/images/image2.jpg',
    'src/assets/images/image3.jpg',
    'src/assets/images/image4.jpg',
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