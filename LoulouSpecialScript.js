

//on va stocké tout les inputs du form et vérifier pour chacun si les valeurs sont correct
function meavillaSpecialVerifForm(form) {
    const lettres = new RegExp('[^a-zA-Z--]')
    const password = new RegExp('[^a-zA-Z-0-9]')
    const tel = new RegExp('[^0-9]')
    const mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let allInput = []
    // pour ca on va regardé pour tout les enfants du form si ils ont des enfants, si ils en ont il ne peuvent pas être un input, dans ce cas récursivité
    checkChild(form, allInput)
    console.log(allInput);
    Array.from(allInput).forEach(element => {
        element.addEventListener('change', () => {
            if (element.tagName == 'INPUT') {
                let type = element.attributes.type.nodeValue;
                switch (type) {
                    case 'text':
                        if (lettres.test(element.value)) {
                            console.log('false');
                            notValid(element)
                            return false
                        } else {

                            valid(element)
                        }
                        break;
                    case 'email':
                        if (mail.test(element.value)) {
                            valid(element)
                        } else {
                            notValid(element)
                            return false
                        }
                        break;
                    case 'tel':
                        if (tel.test(element.value)) {
                            notValid(element)
                            return false
                        } else {
                            valid(element)

                        }
                        break;
                    case 'password':
                        if (password.test(element.value)) {
                            notValid(element)
                            return false
                        } else {
                            valid(element)

                        }
                        break;
                    case 'submit':
                        break;
                    default:
                        console.log('exception :' + element);
                        break;
                }
            } else if (element.tagName.toLowerCase() == 'textarea') {
                // if (password.test(element.value)) {
                //     console.log('false');
                //     notValid(element)
                //     return false
                // } else {
                //     valid(element)
                // }
            } else {
                console.log('grosse exception :' + element);
            }
        })
    })
}
function checkChild(node, array) {
    Array.from(node).forEach(element => {
        if (element.hasChildNodes()) {
            checkChild(element)
        } else {
            array.push(element)
        }
    });
}
function notValid(element) {
    element.style.color = 'red'
}
function valid(element) {
    element.style.color = 'green'
}