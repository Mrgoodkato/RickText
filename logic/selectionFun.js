
export function selectionHandling(){
    
    let selection = document.getSelection();
    let originalRng = selection.getRangeAt(0);
    let container = originalRng.commonAncestorContainer;
    let nodeSelected = nodeInfo(originalRng);

    console.log(nodeSelected);

    if(nodeSelected.startParent == 'I' || nodeSelected.endParent == 'I' || nodeSelected.startName == 'I' || nodeSelected.endName == 'I'){
        removeStyleSimpleRange(originalRng, selection, container);
    }
    else{
        addStyleSimpleRange(originalRng, selection);
    }
    
}

function addStyleSimpleRange(range, selection){
    
    let newNode = document.createElement('i');
    range.surroundContents(newNode);
    range.selectNodeContents(newNode.firstChild);
    selection.removeAllRanges();
    selection.addRange(range);

}

function removeStyleSimpleRange(range, selection, container){
    
    let paragraph = iterateRange(container, range.startContainer);    
    console.log(paragraph.base.children)

    range.setStart(paragraph.base, 0);
    range.setEnd(paragraph.base, 3);

    selection.removeAllRanges();
    selection.addRange(range);
}

function iterateRange(container, startCont){
    
    if(container.nodeName == 'P') {
        console.log('Returning container');
        console.log(container, startCont);
        return {
            coordStart: startCont,
            coordOffset: startCont.textContent,
            base: container
        };
    }
    if(container.nodeName == 'DIV'){
        return null;
 
    }
    
    console.log('Iteration', container.parentNode);
    return iterateRange(container.parentNode, startCont);
}

function nodeInfo(range){

    let nodeInfo = {
        startParent: range.startContainer.parentNode.nodeName,
        endParent: range.endContainer.parentNode.nodeName,
        startName: range.startContainer.nodeName,
        endName: range.endContainer.nodeName,
        commonContainer: range.commonAncestorContainer.nodeName
    }

    return nodeInfo;

}