export function utilityFunction(){

    let selection = document.getSelection();
    let range = selection.getRangeAt(0);

    console.warn('New util function called:')
    console.log('Selection at:', selection);
    console.log('Range at:', range);
    console.log('Start container at:', range.startContainer);
    console.log('End container at:', range.endContainer);
    console.log('Start offset at:', range.startOffset);
    console.log('End offset at:', range.endOffset);
    console.log('Parent ancestor container:', range.commonAncestorContainer.parentNode.nodeName);
    console.log('Start container parent:', range.startContainer.nodeName, range.startContainer.nodeType);
    console.log('End container parent', range.endContainer.nodeName, range.endContainer.nodeType);

}

export function showNodes(textArea, nodeArea){
    
    let txtChildren = textArea.childNodes;

    nodeArea.innerText = '';

    if(txtChildren.length <= 0) return null;

    txtChildren.forEach((child, index) => {
        nodeArea.innerText += 'Node #'+ index + ' ' + child.nodeName + '\n';
        if(child.childNodes.length > 0) {
            let designationNode = 'Subnode #'
            iterateNodes(child, nodeArea, designationNode);
        }
    });

}

function iterateNodes(childNode, nodeArea, designationNode){
    let tabs = '--';
    let newDesigNode = tabs.concat(designationNode);
    childNode.childNodes.forEach((ch, i) => {
        nodeArea.innerText += newDesigNode + i + ' ' + ch.nodeName + '\n';
        if(ch.childNodes.length > 0) iterateNodes(ch, nodeArea, newDesigNode);
    });
    
}