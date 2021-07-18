export class Modal {
    
    constructor(title, result, message) {
        this.title = title;
        this.result = result;
        this.message = message;
    }  
    
    log() {
       return alert("test");
    }
}