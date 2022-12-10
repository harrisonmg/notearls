const fractionRegex = /(\d+)\/(\d+)/

const addDrink = (section, name, content) => {
  const drink = document.createElement('div');
  drink.classList.add('drink');

  const drinkName = document.createElement('p');
  drinkName.classList.add('drink-name');
  drinkName.textContent = name;
  drink.appendChild(drinkName);

  const table = document.createElement('table');
  for (const item of content) {
    const row = document.createElement('tr');

    const amount = document.createElement('td');
    let amountString = "";
    if (item.length > 1) {
      amountString = item[0];
      const match = amountString.match(fractionRegex);
      if (match !== null) {
        amountString = amountString.replace(fractionRegex, '');
        amountString += `<sup class="frac">${match[1]}</sup>&frasl;<span class="frac">${match[2]}</span>`;
      }
    }
    amount.innerHTML = amountString;
    row.appendChild(amount);

    const ingredient = document.createElement('td');
    ingredient.innerText = item.pop();
    row.appendChild(ingredient);

    table.appendChild(row);
  }
  drink.appendChild(table);

  document.getElementById(section).appendChild(drink);
}

fetch('./drinks.json')
    .then((response) => response.json())
    .then((drinks) => {
      for (let section of Object.keys(drinks)) {
        let i = 0;
        for (const drink of drinks[section]) {
          if (i >= 4 && section === 'cocktails') {
            section = 'cocktails-2';
          }
          addDrink(section, drink[0], drink.slice(1));
          i += 1;
        }
      }
    });
