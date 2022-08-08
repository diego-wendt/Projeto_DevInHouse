import { initialPopulate } from './initialCards.js'

const miniCardTotalEl = document.getElementById('miniCardTotal');
const miniCardFrontEndEl = document.getElementById('miniCardFrontEnd');
const miniCardBackEndEl = document.getElementById('miniCardBackEnd');
const miniCardFullStackEl = document.getElementById('miniCardFullStack');
const miniCardSoftSkillEl = document.getElementById('miniCardSoftSkill');

const btnClearEl = document.getElementById('btnClear');
const btnSaveEl = document.getElementById('btnSave');

const inputSearchEl = document.getElementById('inputSearch');
const btnSearchEl = document.getElementById('btnSearch');
const btnCancelEl = document.getElementById('btnCancel');
const areaCards = document.getElementById('areaCards');



btnSaveEl.addEventListener('click', saveForm)

btnClearEl.addEventListener('click', clearForm);

btnCancelEl.addEventListener('click', clearSearchBar);

btnSearchEl.addEventListener('click', filterCards);

function saveForm() {

    const newTitle = document.getElementById('formTitle');
    const newSkill = document.getElementById('formSkill');
    const newCategory = document.getElementById('formCategory');
    const newDescription = document.getElementById('formDescription');
    const newLink = document.getElementById('formLink');

    const verificacao = checkErrors();
    if (verificacao == false) {
        return
    }

    let allCards = getLocalStorage();

    let nextId = !allCards.length ? 1 : allCards[allCards.length - 1].id + 1;

    const newCard = {
        id: idHiden ? idHiden : nextId,
        title: newTitle.value,
        skill: newSkill.value,
        category: newCategory.value,
        description: newDescription.value,
        link: !newLink.value ? "" : newLink.value,
    }

    // rotina para salvar card editado
    if (idHiden) {
        allCards.forEach(card => {
            if (card.id == newCard.id) {
                card.title = newTitle.value;
                card.skill = newSkill.value;
                card.category = newCategory.value;
                card.description = newDescription.value;
                card.link = !newLink.value ? "" : newLink.value;
            }
        });

        // foi necessário incluir este trecho renderizar lista de cards e manter a lista de cards pesquisados
        listCards.forEach(card => {
            if (card.id == newCard.id) {
                card.title = newTitle.value;
                card.skill = newSkill.value;
                card.category = newCategory.value;
                card.description = newDescription.value;
                card.link = !newLink.value ? "" : newLink.value;
            }
        });

        removeRenderCards();
        renderAllCards(listCards);
        window.alert("Card editado com sucesso");

    } else {
        allCards.push(newCard)
        renderCards(newCard);
        window.alert("Card salvo com sucesso");
    }

    setLocalStorage(allCards);

    cancelEdit()
    clearForm();
    populateMiniCards();
}

function checkErrors() {

    const newTitleVL = document.getElementById('formTitle').value.length
    const newSkillVL = document.getElementById('formSkill').value.length
    const newCategory = document.getElementById('formCategory');
    const newDescriptionVL = document.getElementById('formDescription').value.length;
    const newLink = document.getElementById('formLink');

    let errorMsg = "Erro no cadastro do Card:";

    if (!newTitleVL || newTitleVL < 8 || newTitleVL > 64) {
        errorMsg += "\nO campo Título deve ter entre 8 ou 64 caracteres."
    }
    if (!newSkillVL || newSkillVL < 4 || newSkillVL > 16) {
        errorMsg += "\nO campo Linguagem/Skill deve ter entre 4 ou 16 caracteres."
    }
    if (!newDescriptionVL || newDescriptionVL < 32 || newDescriptionVL > 512) {
        errorMsg += "\nO campo Descrição deve ter entre 32 ou 512 caracteres."
    }
    if (newCategory.value === "Vazio") {
        errorMsg += "\nO campo Categoria deve ser selecionado."
    }
    if (newLink.value.length > 0) {
        if (!newLink.value.includes('youtu')) {
            errorMsg += "\nO campo Link deve ficar em branco ou ser preenchido com link do Youtube válido."
        }
    }

    if (errorMsg.length > 26) {
        window.alert(errorMsg);
        return false;
    }
}

function populateMiniCards() {

    const allCards = getLocalStorage()

    miniCardTotalEl.textContent = allCards.length;

    let total = listCards.length;
    let frontEnd = 0, backEnd = 0, fullStack = 0, softSkill = 0;

    listCards.forEach(listCards => {
        switch (listCards.category) {
            case "FrontEnd":
                frontEnd += 1
                break;
            case "BackEnd":
                backEnd += 1
                break;
            case "FullStack":
                fullStack += 1
                break;
            case "SoftSkill":
                softSkill += 1
                break;
            default:
                break;
        }
    });

    miniCardTotalEl.textContent = total
    miniCardFrontEndEl.textContent = frontEnd
    miniCardBackEndEl.textContent = backEnd
    miniCardFullStackEl.textContent = fullStack
    miniCardSoftSkillEl.textContent = softSkill
}

function clearForm() {
    document.getElementById('formTitle').value = '';
    document.getElementById('formSkill').value = '';
    document.getElementById('formCategory').value = 'Vazio';
    document.getElementById('formDescription').value = '';
    document.getElementById('formLink').value = '';
    cancelEdit();
}

function clearSearchBar() {
    cancelEdit();
    inputSearchEl.value = "";
    removeRenderCards()
    listCards = getLocalStorage()
    renderAllCards(listCards);
}

function renderCards(listCards) {

    const li = document.createElement('li');
    li.classList.add('cards');
    li.id = listCards.id;
    const article = document.createElement('article');
    article.classList.add('mainCardContent');

    const cardTitle = document.createElement('h3');
    cardTitle.id = 'cardTitle';
    cardTitle.classList.add('cardTitle');
    cardTitle.innerText = listCards.title;

    const areaGrupo1 = document.createElement('div');
    areaGrupo1.classList.add('areaGroup');

    const cardSubTitle1 = document.createElement('h4');
    cardSubTitle1.classList.add('cardSubTitle');
    cardSubTitle1.innerText = 'Linguagem: ';

    const skillText = document.createElement('span');
    skillText.id = 'skillText';
    skillText.classList.add('cardText');
    skillText.innerText = listCards.skill;

    const areaGrupo2 = document.createElement('div');
    areaGrupo2.classList.add('areaGroup');

    const cardSubTitle2 = document.createElement('h4');
    cardSubTitle2.classList.add('cardSubTitle');
    cardSubTitle2.innerText = 'Categoria: ';

    const categoryText = document.createElement('span');
    categoryText.id = 'categoryText';
    categoryText.classList.add('cardText');
    categoryText.innerText = listCards.category;

    const descriptionText = document.createElement('span');
    descriptionText.id = 'descriptionText';
    descriptionText.classList.add('descriptionText');
    descriptionText.innerText = listCards.description;

    const cardButtonsArea = document.createElement('div');
    cardButtonsArea.classList.add('cardButtonsArea');

    const imgDelete = document.createElement('img');
    imgDelete.classList.add('cardButtons');
    imgDelete.src = './src/img/delete.png';
    imgDelete.alt = 'Deletar';
    imgDelete.height = 35;

    const imgEdit = document.createElement('img');
    imgEdit.classList.add('cardButtons');
    imgEdit.src = './src/img/edit.png';
    imgEdit.alt = 'Edit';
    imgEdit.height = 35;

    const imgOpen = document.createElement('img');
    imgOpen.classList.add('cardButtons');
    imgOpen.src = './src/img/open.png';
    imgOpen.alt = 'Abrir';
    imgOpen.height = 35;

    areaCards.appendChild(li);
    li.appendChild(article);
    article.appendChild(cardTitle);
    article.appendChild(areaGrupo1);
    areaGrupo1.appendChild(cardSubTitle1);
    areaGrupo1.appendChild(skillText);
    article.appendChild(areaGrupo2);
    areaGrupo2.appendChild(cardSubTitle2);
    areaGrupo2.appendChild(categoryText);
    article.appendChild(descriptionText);
    article.appendChild(cardButtonsArea);
    cardButtonsArea.appendChild(imgDelete);
    cardButtonsArea.appendChild(imgEdit);

    if (!listCards.link == "") {
        cardButtonsArea.appendChild(imgOpen);
    };


    imgDelete.addEventListener('click', function () {
        deleteCards(listCards);
    });

    imgEdit.addEventListener('click', function () {
        editCards(listCards);
    });

    imgOpen.addEventListener('click', function () {
        openCards(listCards);
    });

}

function deleteCards(card) {

    cancelEdit()
    if (!confirm('Você tem certeza de que deseja excluir este card?')) {
        return
    }
    document.getElementById(card.id).remove()

    const removedCard = card;
    let listCards = getLocalStorage();
    let newList = listCards.filter(card => card.id != removedCard.id);

    setLocalStorage(newList);
    populateMiniCards();

    window.alert("Card excluido com sucesso");

}

function editCards(card) {

    if (!confirm('Você tem certeza de que deseja editar este card?')) {
        return
    }
    idHiden = card.id;
    document.getElementById('formTitle').value = card.title
    document.getElementById('formSkill').value = card.skill
    document.getElementById('formCategory').value = card.category
    document.getElementById('formDescription').value = card.description
    document.getElementById('formLink').value = card.link
    btnClearEl.innerText = 'Cancelar';

    window.alert("Após a alteração, clique em salvar para confirmar a edição ou em limpar para cancelar a edição.");

}

// ainda falta implementar
function openCards(card) {
    window.open(card.link);
}

function filterCards() {

    cancelEdit();

    let txtSearch = inputSearchEl.value;
    txtSearch = txtSearch.toLowerCase();

    const allCards = getLocalStorage();
    listCards = allCards.filter(element => element.title.toLowerCase().includes(txtSearch));

    removeRenderCards();
    renderAllCards(listCards);
    // clearSearchBar();
}

function cancelEdit() {
    idHiden = null;
    btnClearEl.innerText = 'Limpar';
}

function removeRenderCards() {
    while (areaCards.firstChild) {
        areaCards.removeChild(areaCards.lastChild);
    }
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('listCards') || '[]');
}

function setLocalStorage(listToSave) {
    localStorage.setItem('listCards', JSON.stringify(listToSave));
}

function renderAllCards(listToRender) {
    listToRender.forEach(list => {
        renderCards(list);
    });
}

let idHiden = null;
let listCards = getLocalStorage();

document.body.onload = function () {
    initialPopulate();
    populateMiniCards();
    listCards = getLocalStorage();
    renderAllCards(listCards);
}