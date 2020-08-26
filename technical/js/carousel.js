
// Create a carousel.
// Input a div (HTMLElement) to the constructor.
// Ouptut a carousel div with all the elements from the input div within.
class Carousel {
	
	// Take an HTML element and options
	// Convert element children into carousel items and insert carousel
	// option: slideVisible: number of items visible 
	constructor(element, options) {
		
		this.element = element;
		this.options = options;
		
		// Create carousel and items and append them
		
		this.carousel = document.createElement("carousel");
		this.carousel.className = "carousel";
		
		this.items = []
		Array.from(element.children).forEach((child) => {
			
			let item = document.createElement("div");
			item.className = "carouselItem";
			item.appendChild(child);
			this.items.push(item);
			this.carousel.appendChild(item);
		});
		
		this.element.appendChild(this.carousel);
		
		// add the arrows
		
		this.left = document.createElement("div");
		this.left.className = "carouselLeft";
		this.element.appendChild(this.left);
		
		this.right = document.createElement("div");
		this.right.className = "carouselRight";
		this.element.appendChild(this.right);
		
		// slide everything
		
		// slide by x amount, start 0, usually one slide by one
		this.currentPosition = 0;
		
		// hide arrows when reaching the limits
		this.hideArrow();
		
		this.left.addEventListener("click", this.slideLeft.bind(this));
		this.right.addEventListener("click", this.slideRight.bind(this));
		
		// resize the carousel
		// this div is much larger than 100% and moved with css translate3d
		this.resize();
		
	}
	
	hideArrow() {
		
		if (this.currentPosition === 0) {
			this.left.style.display = "none";
		} else {
			this.left.style.display = "block";
		}
		
		if (this.currentPosition + this.options.slideVisible >= this.items.length ) {
			this.right.style.display = "none";
		} else {
			this.right.style.display = "block";
		}
	}
	
	slideLeft() {
		let amount = Math.min(1, this.currentPosition)
		this.moveTo(this.currentPosition - amount);
	}
	
	slideRight() {
		let amount = Math.min(1, this.items.length - this.currentPosition - this.options.slideVisible)
		this.moveTo(this.currentPosition + amount);
	}
	
	// translate by a certain x amount, usually one slide width
	moveTo(index) {
		let translateX = - 1 / this.items.length;
		this.carousel.style.transform = "translate3d(" + 100 * index * translateX + "% , 0, 0)";
		this.currentPosition = index;
		this.hideArrow();
	}
	
	resize() {
	
		let totalWidth = this.items.length / this.options.slideVisible;
		this.carousel.style.width = 100 * totalWidth + "%";
		this.items.forEach((item) => {
			item.style.width = 100 / this.items.length + "%";
		});
	}
}

export { Carousel };