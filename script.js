import { selectionHandling } from './logic/selectionFun.js';
import { limitDelete } from './utility/limiters.js';
import { utilityFunction, showNodes } from './utility/util.js';
import { Selector } from './logic/selection_manipulation.js';

const textArea = document.getElementById('textArea');
const htmlArea = document.getElementById('htmlArea');
const nodeArea = document.getElementById('nodeArea');

const buttons = document.querySelectorAll('[data-style]');

textArea.focus();

textArea.addEventListener('keyup', () =>{
    let selection = document.getSelection();
    limitDelete(selection, textArea);
    htmlArea.innerText = textArea.innerHTML;
    showNodes(textArea, nodeArea);
});

buttons.forEach(button => {
    button.addEventListener('click', () =>{

        switch(button.name){
            case 'bold':{
                selectionHandling();
                htmlArea.innerText = textArea.innerHTML;
                showNodes(textArea, nodeArea);
                break;
            }
            case 'italic':{
                document.execCommand('italic', false);
                htmlArea.innerText = textArea.innerHTML;
                showNodes(textArea, nodeArea);
                break;
            }
            case 'underline':{
                document.execCommand('underline', false);
                htmlArea.innerText = textArea.innerHTML;
                showNodes(textArea, nodeArea);
                break;
            }
            case 'util':{
                utilityFunction();
                htmlArea.innerText = textArea.innerHTML;
                showNodes(textArea, nodeArea);
                break;
            }
            case 'selector':{
                let sel = new Selector();
                if(sel.commonContainer == 'I'){
                    sel.replaceRange('span');
                }else{
                    sel.replaceRange('i');    
                }
                htmlArea.innerText = textArea.innerHTML;
                showNodes(textArea, nodeArea);
                break;
            }
        }

    });
});