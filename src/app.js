import { refs } from './refs'
const galleryItems = [{
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];

const tagUl = refs.gallery; //document.querySelector('.js-gallery');
const getTemplate = item =>
    `<li class="gallery__item">
<a
  class="gallery__link"
  href="${item.original}"
>
  <img
    class="gallery__image"
    src="${item.preview}"
    data-source="${item.original}"
    alt="${item.description}"
  />
</a>
</li>`

function createListItemsMarkup(items) {
    return items.map(getTemplate).join('');
}


tagUl.insertAdjacentHTML('afterbegin', createListItemsMarkup(galleryItems));

refs.gallery.addEventListener('click', onOpenModal);
refs.backdrop.addEventListener('click', onBackdrop);
refs.preview.addEventListener('click', onBackdrop);

function onBackdrop(evt) {
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    }
}

function onOpenModal(evt) {
    if (evt.currentTarget === evt.target) {
        return;
    }
    evt.preventDefault();
    refs.lightbox.classList.add('is-open');
    refs.preview.src = evt.target.dataset.source;
    refs.preview.alt = evt.target.alt;

    window.addEventListener('keydown', onEscKeyPress);
    refs.gallery.addEventListener('keydown', onArrowPress);

    refs.buttonModalClose.addEventListener('click', onCloseModal, { once: true });
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.lightbox.classList.remove('is-open');
    refs.preview.src = '';
    refs.preview.alt = '';
}



function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    }

}


function onArrowPress(evt) {
    let currentImage = galleryItems.findIndex(image => image.original === refs.preview.src);
    if (evt.code === 'ArrowRight') {

        currentImage = currentImage < galleryItems.length - 1 ? (currentImage + 1) : 0;
    }

    if (evt.code === 'ArrowLeft') {

        currentImage = currentImage > 0 ? (currentImage - 1) : galleryItems.length - 1;
    }

    refs.preview.src = galleryItems[currentImage].original;
    refs.preview.alt = galleryItems[currentImage].alt;
};