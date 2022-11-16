//script ussless, il est juste présent pour répondre à la step 3

const aside = document.querySelector('aside');
const btnShowMore = document.querySelectorAll('.btnMoreInfo')

Array.from(btnShowMore).forEach(element => {
 element.addEventListener('click', ()=> {
    aside.style.visibility = ('visible')
 })
});

