const personalInfoForm = document.querySelector('#personal-info-form');
const resultModalClose = document.querySelector('.result__modal--close');

resultModalClose.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

personalInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {};

    formData['name'] = e.srcElement[0].value;
    formData['photo'] = e.srcElement[1].value;
    formData['scores'] = [];

    for (let i = 2; i < 12; i++) {
        formData.scores.push(parseInt(e.srcElement[i].value));
    }

    fetch('api/friends', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(formData),
    })
        .then((res) => res.json())
        .then((json) => populateModal(json[0], json[1], json[2]));
});

function populateModal(user, match, dif) {
    const resultModal = document.querySelector('.result');
    resultModal.classList.remove('hide');

    const matchPhoto = document.querySelector('.result__photo');
    matchPhoto.setAttribute('src', match.photo);

    const userName = document.querySelector('.result__user-name');
    userName.textContent = user.name;

    const matchName = document.querySelectorAll('.result__match-name');
    matchName.forEach((inst) => {
        inst.textContent = match.name;
        inst.style.setProperty('--clr', `var(--clr-scale-${Math.floor(dif / 10)})`);
    });

    const langs = ['html', 'css', 'sass-less', 'js', 'react', 'git', 'node', 'php', 'csharp', 'java'];

    for (let i = 0; i < langs.length; i++) {
        document.querySelector(`.result__user-${langs[i]}`).textContent = user.scores[i];
        document.querySelector(`.result__match-${langs[i]}`).textContent = match.scores[i];

        document
            .querySelector(`.result__match-${langs[i]}`)
            .style.setProperty('--clr', `var(--clr-scale-${Math.abs(user.scores[i] - match.scores[i])})`);
    }
}

function closeModal() {
    const resultModal = document.querySelector('.result');
    resultModal.classList.add('hide');
}

function outsideClick(e) {
    const resultModal = document.querySelector('.result');

    if (e.target === resultModal) {
        closeModal();
    }
}
