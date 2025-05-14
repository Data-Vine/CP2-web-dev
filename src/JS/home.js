let imagens =[
    'src/assets/imagem1.jpg',
    'src/assets/imagem2.jpg',
    'src/assets/imagem3.jpg',
    'src/assets/imagem4.jpg',
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
