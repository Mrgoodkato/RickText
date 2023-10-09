export class Selector{

    constructor(){

        this.sel = document.getSelection();
        this.rng = this.sel.getRangeAt(0);
        
        this.commonContainer = this.rng.commonAncestorContainer.parentNode;
        
        this.start = {
            selection: this.sel.anchorNode,
            selOffset: this.sel.anchorOffset,
            container: this.rng.startContainer,
            offset: this.rng.startOffset
        };
        
        this.end = {
            selection: this.sel.focusNode,
            selOffset: this.sel.focusOffset,
            container: this.rng.endContainer,
            offset: this.rng.endOffset
        };
        
    }

    logSelector(){
        console.log(this.sel, this.rng);
    }

    expandSelection(){

        this.rng.setStartBefore(this.iterateUntilDiv(this.start.container));
        this.rng.setEndAfter(this.iterateUntilDiv(this.end.container));
        
        this.sel.removeAllRanges();
        this.sel.addRange(this.rng);

    }

    contractSelection(){
        this.rng.setStart(this.start.container, 0);
        this.rng.setEndAfter(this.end.container);

        this.sel.removeAllRanges();
        this.sel.addRange(this.rng);
    }

    iterateUntilDiv(container){
        if(container.nodeName == 'DIV'){
            return container;
        }
        return this.iterateUntilDiv(container.parentNode);
    }

    replaceRange(nodeElement){
        let docFragRange = this.rng.extractContents();
        let spanNewRange = document.createElement(nodeElement);
        spanNewRange.appendChild(document.createTextNode(docFragRange.textContent));
        let newRange = new Range();
        newRange.setStart(this.sel.anchorNode, this.sel.anchorOffset);
        newRange.setEnd(this.sel.focusNode, this.sel.focusOffset);
        newRange.insertNode(spanNewRange);
        this.sel.removeAllRanges();
        this.sel.addRange(newRange);
    }
}