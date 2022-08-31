import selectionHandling from './selectionFun.js';

const textArea = document.getElementById('textArea');
const htmlArea = document.getElementById('htmlArea');

const buttons = document.querySelectorAll('[data-style]');

textArea.focus();

textArea.addEventListener('keyup', () =>{

    htmlArea.innerText = textArea.innerHTML;

});

buttons.forEach(button => {
    button.addEventListener('click', () =>{

        switch(button.name){
            case 'bold':{
                selectionHandling();
                htmlArea.innerText = textArea.innerHTML;
                break;
            }
            case 'italic':{
                document.execCommand('italic', false);
                htmlArea.innerText = textArea.innerHTML;
                break;
            }
            case 'underline':{
                document.execCommand('underline', false);
                htmlArea.innerText = textArea.innerHTML;
                break;
            }
        }

    });
});

