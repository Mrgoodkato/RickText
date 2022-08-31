function selectionHandling(){
    
    let selection = document.getSelection();
    let sel = selection.getRangeAt(0);

    console.log(sel.startContainer.parentNode);
    console.log(sel.endContainer.parentNode);

    checkForTags(sel);

}

function checkForTags(sel){

    if(sel.startContainer.parentNode.nodeName === 'I' || sel.endContainer.parentNode.nodeName === 'I') return true;
 
    let rng = new Range();

    rng.setStart(sel.startContainer, sel.startOffset);
    rng.setEnd(sel.endContainer, sel.endOffset);

    let children = rng.extractContents().childNodes;
    let newNode = document.createElement('i');

    rng.insertNode(internalCheck(children, newNode));

}


function internalCheck(children, newNode){

    let arr = Array.from(children);

    if(arr.length === 1){
        newNode.appendChild(arr[0]);
        return newNode;

    }

    console.log(arr);


    for(let i = 0; i < arr.length; i++){

        console.log(arr[i]);
        

        if(arr[i].hasChildNodes()) {

            if(arr[i].nodeName === 'I') {
                console.log('got here to I');
                newNode.appendChild(replaceNode(arr[i]));
            }

            internalCheck(arr[i].childNodes, newNode.childNodes[i]);
        }else newNode.appendChild(arr[i]);
        
    }

    console.log(newNode);

    newNode.normalize();

    return newNode;

}

function replaceNode(node){

    console.log('The node I: ', node);
    let newNode = node.firstChild;
    console.log('Replacing the node I: ', newNode);
    return newNode;

}


export default selectionHandling;