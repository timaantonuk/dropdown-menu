class CustomSelect {
  #id;
  #options;
  #currentSelectedOption;
  constructor(id, options) {
    this.#id = id;
    this.#options = options;
  }

  getOptionByIndex(index) {
    return this.#options[index];
  }

  getOptions() {
    return this.#options;
  }

  getCurrentSelectedOption() {
    return this.#currentSelectedOption;
  }

  setCurrentSelectedOption(option) {
    this.#currentSelectedOption = option;
  }

  render(container) {
    const div = document.createElement('div');
    div.classList.add('select-dropdown', `select-dropdown--${this.#id}`);

    const btn = document.createElement('button');
    btn.classList.add(
      'select-dropdown__button',
      `select-dropdown__button--${this.#id}`
    );

    const span = document.createElement('span');
    span.classList.add(
      'select-dropdown__text',
      `select-dropdown__text--${this.#id}`
    );

    const ul = document.createElement('ul');
    ul.classList.add(
      'select-dropdown__list',
      `select-dropdown__list--${this.#id}`
    );

    for (let i = 0; i <= 4; i++) {
      const option = this.getOptionByIndex(i);

      const li = document.createElement('li');
      li.classList.add('select-dropdown__list-item');
      li.setAttribute('data-value', option.value);
      li.textContent = option.text;

      ul.append(li);
    }

    container.append(div);
    div.append(btn);
    btn.append(span);
    div.append(ul);

    const selectDropdownButton = document.querySelector(
      '.select-dropdown__button'
    );
    selectDropdownButton.addEventListener('click', () => {
      const list = document.querySelector('.select-dropdown__list');
      list.classList.toggle('active');
    });

    ul.addEventListener('click', (event) => {
      const { target } = event;
      const options = this.getOptions();

      this.setCurrentSelectedOption(
        options.find((el) => el.value == target.dataset.value)
      );
      span.textContent = this.getCurrentSelectedOption().text;

      document
        .querySelectorAll('li')
        .forEach((li) => li.classList.remove('selected'));

      target.classList.add('selected');

      console.log(this.getCurrentSelectedOption());
    });
  }
}

const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' },
];

const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);
