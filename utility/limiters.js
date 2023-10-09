export function limitDelete(selection, textArea){
    
    if(selection.anchorNode.nodeName == 'DIV') {
        let newRange = document.createRange();
        let newParagraph = document.createElement('p');
        newParagraph.innerHTML = '&nbsp;';
        textArea.append(newParagraph);
        newRange.selectNodeContents(newParagraph);
        console.log(newRange.anchorNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}