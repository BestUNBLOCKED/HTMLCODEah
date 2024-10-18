let slideCount = 0;

document.getElementById('newSlide').addEventListener('click', () => {
    slideCount++;
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.draggable = true;
    slide.innerText = `Slide ${slideCount}`;
    slide.addEventListener('dragstart', dragStart);
    slide.addEventListener('dragover', dragOver);
    slide.addEventListener('drop', drop);
    document.getElementById('slidesContainer').appendChild(slide);
});

document.getElementById('export').addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    let html = '';
    slides.forEach(slide => {
        html += `<div class="slide">${slide.innerText}</div>\n`;
    });
    console.log(html); // You can also implement a download functionality here
    alert('HTML exported to console. Check your console for the code.');
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.innerText);
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const newSlide = document.createElement('div');
    newSlide.className = 'slide';
    newSlide.innerText = data;
    newSlide.draggable = true;
    newSlide.addEventListener('dragstart', dragStart);
    newSlide.addEventListener('dragover', dragOver);
    newSlide.addEventListener('drop', drop);
    e.target.insertAdjacentElement('afterend', newSlide);
}