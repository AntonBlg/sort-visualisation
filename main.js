const ITEMS_COUNT = 10;
const ELEMENT_WIDTH = 35;
const ANIMATION_DURATION = 200; // ms
const VALUE_RANGE = [100, 600];

const items = [];
let itemsI, itemsJ;
let hintElement, buttonSort, itemsWrapper;

const buttonEventHandler = () => {
  startSort();
};

document.addEventListener('DOMContentLoaded', () => {
  hintElement = document.querySelector('.hint-text');
  buttonSort = document.querySelector('.start-sort');
  itemsWrapper = document.querySelector('.items');

  initItems();
  updateItemsPos();
  addItemToPage();

  if (buttonSort) {
    buttonSort.addEventListener('click', buttonEventHandler);
  }
});

function initItems() {
  for (let i = 0; i < ITEMS_COUNT; i ++) {
    items.push({
      value: randomFromRange(VALUE_RANGE)
    });
  }

  items.forEach((item, index) => {
    item.element = createItemElement(item.value);
  });
}

function addItemToPage() {
  if (itemsWrapper) {
    items.forEach(item => {
      itemsWrapper.appendChild(item.element);
    });
  }
}

function createItemElement(value) {
  const element = document.createElement('div');
  element.classList.add('item');
  element.style.height = value + 'px';
  element.innerText = value.toString();

  return element;
}

function itemsSort() {
  itemsI = itemsJ = 0;

  setTimeout(sortStep, ANIMATION_DURATION);
}

function sortStep() {
  if (items[itemsI].value > items[itemsI + 1].value) {
    const temp = items[itemsI];
    items[itemsI] = items[itemsI + 1];
    items[itemsI + 1] = temp;

    updateItemsPos();
  }

  itemsI ++;

  if (itemsI < items.length - 1) {
    setTimeout(sortStep, ANIMATION_DURATION);
  }
  else {
    itemsJ ++;
    itemsI = 0;

    if (itemsJ < items.length - 1) {
      setTimeout(sortStep, ANIMATION_DURATION);
    }
    else {
      finishSort();
    }
  }
}

function setHintText(text) {
  if (hintElement) {
    hintElement.innerText = text;
  }
}

function startSort() {
  buttonSort.setAttribute('disabled', 'disabled');
  buttonSort.removeEventListener('click', buttonEventHandler);

  setHintText('Процесс сортировки...');
  itemsSort();
}

function finishSort() {
  buttonSort.removeAttribute('disabled');
  setHintText('Сортировка завершена');

  itemsWrapper.classList.add('pulse');
  buttonSort.classList.add('pulse');

  setTimeout(() => {
    itemsWrapper.classList.remove('pulse');
    buttonSort.classList.remove('pulse');
  }, 5000);
}

function updateItemsPos() {
  items.forEach((item, index) => {
    item.element.style.transform = `translateX( ${index * ELEMENT_WIDTH}px )`;
  });
}

/* на learn.javascript.ru реализация функции грамотнее,
*  но я оставлю такую, до которой дошёл сам
*  */
function randomFromRange(range) {
  const [min, max] = range;

  const random = Math.random();
  const step = 1 / (max - min);

  return Math.round(random / step) + min;
}