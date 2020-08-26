
// Create a modal element to display the pictures
// appears and disappears with the display property
class Modal {

    // Input: an HTMLElement that will contain the modal and a json with the pictures details
    constructor(element, json) {

        this.element = element;
        this.json = json;
        this.pictures = json.pictures;
        this.currentPicture = 0;
        this.isModalVisible = false;

        this.addModalStructure();
    
        this.next.addEventListener("click", this.moveModalNext.bind(this));
        this.prev.addEventListener("click", this.moveModalPrev.bind(this));
    
        document.onkeydown = (e) => {
    
            if (this.isModalVisible) {
                if (e.keyCode == "39") {this.moveModalNext.bind(this)()}
                if (e.keyCode == "37") {this.moveModalPrev.bind(this)()}
            }
        
        }
    } 

    openModal(index) {
        let source = this.json.folderPath + this.pictures[index].name;
        this.image.src = source;
        this.element.style.display = "block";
        this.isModalVisible = true;
        // for the case where we open the modal from a picture, we need to keep track of where we are
        this.currentPicture = index;
    }

    closeModal() {

        this.element.style.display = "none";
        this.isModalVisible = false;
    }

    addModalStructure() {

        // create all the elements (not visible)
        this.modalContent = document.createElement("div");
        this.modalContent.className = "modalContent";
        this.element.appendChild(this.modalContent);

        this.modalPicture = document.createElement("div");
        this.modalPicture.className = "modalPicture";
        this.modalContent.appendChild(this.modalPicture);

        this.image = document.createElement("img");
        this.modalPicture.appendChild(this.image);

        this.prev = document.createElement("a");
        this.prev.className = "prev";
        this.prev.textContent = '\u276e';
        this.modalContent.appendChild(this.prev);

        this.next = document.createElement("a");
        this.next.className = "next";
        this.next.textContent = '\u276f';
        this.modalContent.appendChild(this.next);

        this.closeButton = document.createElement("span");
        this.closeButton.className = "close cursor";
        this.closeButton.textContent = '\u00d7';
        this.closeButton.addEventListener("click", this.closeModal.bind(this));
        this.element.appendChild(this.closeButton);	

        // add event listener click to all pictures to open modal
        let photos = document.querySelectorAll(".photo");
        
        photos.forEach((photo, i) => {
            photo.addEventListener("click", () => {this.openModal.bind(this)(i)})
        });
    }


    moveModalNext() {
        if (this.currentPicture >= 0 && this.currentPicture < (this.pictures.length - 1)) {
            this.currentPicture ++;
            this.openModal(this.currentPicture);
        }
    }

    moveModalPrev() {
        if (this.currentPicture > 0 && this.currentPicture <= (this.pictures.length - 1)) {
            this.currentPicture --;
            this.openModal(this.currentPicture);
        }
    }
}

export { Modal };