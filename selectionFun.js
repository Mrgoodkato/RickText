function selectionHandling(){
    
    let sel = document.getSelection().getRangeAt(0);
    let rng = new Range();
    let newNode = document.createElement('b');

    rng.setStart(sel.startContainer, sel.startOffset);
    rng.setEnd(sel.endContainer, sel.endOffset);

    //The parents obj defines what the tag for the external nodes is and
    //will define the behavior of the range at the end
    let parents = {in: rng.startContainer.parentElement, out: rng.endContainer.parentElement};

    //RANGE ITERATION AND EXPANSION METHOD ACCORDING TO THE PARENT TAGS

    let nodes = rng.extractContents().childNodes;

    //If there are no coinciding tags in the parent elements, we go through this function to add the tag
    //And remove to inner elements
    rng.insertNode(iterateRange(nodes));
}

function iterateRange(nodes){
    console.log('Entering IterateRange', nodes);
    let newNode = document.createElement('b');

    let arr = Array.from(nodes);

    arr.forEach((node, i) => {
        
        console.log('Foreach in iterateRange', node.nodeName, i);
        if(node.hasChildNodes()) node = iterateNode(node, i);

        console.log('Append child', i, node);
        newNode.appendChild(node);
    });

    return newNode;
}

function iterateNode(node, i){

    console.log('IterateNode', i, node);

    if(node.nodeName === 'B'){
        node = isolateAndReplace(node);
    }

    console.log('IterateNode final Node return: ', node);
    return node;
}

function isolateAndReplace(node){
    console.log('IsolateAndReplace: ', node, node.firstChild);    
    
    let newNode = node.firstChild;

    while(newNode){
        console.log('While newNode init', newNode);
        node = newNode;
        newNode = newNode.nextSibling;
        console.log('While newNode follow', newNode, 'Node value', node);
    }

    return node;
}
