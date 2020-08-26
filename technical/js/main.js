import {Carousel} from "/technical/js/carousel.js";
import {Modal} from "/technical/js/modal.js";

if (document.readyState !== "loading") {
    initCode();
} else {
	document.addEventListener("DOMContentLoaded", function() {
		initCode();
	})
}

// Input: an HTMLElement (container) and a json for options (pictures)
// Add the project description in the element passed as input
function addProjectDescription(element, json) {

	let title = document.createElement("h1");
	title.textContent = json.projectName;
	element.appendChild(title);

	let description = document.createElement("p");
	description.textContent = json.projectDescription;
	element.appendChild(description);
}

// Input: an HTMLElement (container) and a json for options (pictures)
// Insert all pictures listed in json inside the element
function loadImages(element, json) {

	let path = json.folderPath;

	for (let picture of json.pictures) {
		
		let figure = document.createElement("figure");
		let figureCaption = document.createElement("figcaption");
		let img = document.createElement("img");
		
		img.src = path + picture.name;
		img.className = "photo";
		img.title = picture.name;
		
		figureCaption.innerHTML = picture.legend + "<br/><p>" + (picture.legendDetail ?? "") + "<p>";
		
		figure.className = "p_photo";
		
		figure.append(img);
		figure.append(figureCaption);

		element.append(figure);
	}
}

// Input: an HTMLElement (container) and a json for options (pages)
// Create the carousel content and add a carousel
function createCarousel(element, json) {

	fillCarouselContent(element, json);

	let optionsCarousel = {
		slideVisible : 3.5
	};
	new Carousel(element, optionsCarousel);
}

// Create the content (html) of the carousel from json
function fillCarouselContent(element, json) {

	let path = json.folderPath;

	json.pages.forEach(page => {
		
		let carouselItem = document.createElement("div");
		carouselItem.className = "carouselItem";
		element.appendChild(carouselItem);

		let image = document.createElement("img");
		image.src = path + page.picture;
		carouselItem.appendChild(image);

		let caption = document.createElement("div");
		caption.className = "caption";
		carouselItem.appendChild(caption);

		let title = document.createElement("h3");
		title.textContent = page.name;
		caption.appendChild(title);

		let paragraph = document.createElement("p");
		paragraph.textContent = page.subTitle;
		caption.appendChild(paragraph);

		let listUl = document.createElement("ul");
		listUl.className = "actions";
		caption.appendChild(listUl);

		let li = document.createElement("li");
		listUl.appendChild(li);

		let span = document.createElement("span");
		span.className = "button small";
		span. textContent = "Go Go Go";
		li.appendChild(span);

		image.addEventListener("click", () => {
			loadPageByPath(page.path + "/info.json");
		})
	});
}

// Create a new page setput
// Input: path to a json (pages)
function loadPageByPath(path) {

	$.getJSON(path, function(json) {
		
		let divDescription = document.querySelector("#descriptionContainer");
		let divPicture = document.querySelector("#pictureContainer");
	
		divDescription.innerHTML = "";
		divPicture.innerHTML = "";

		window.scrollTo(1, 1);

		addProjectDescription(divDescription, json);

		loadImages(divPicture, json);		

		let divModal = document.querySelector("#modalPictures");
		divModal.innerHTML = "";

		new Modal(divModal, json);
	});
}

function loadCarouselAndMenuByPath(path)
{
	$.getJSON(path, function(json) {

		let carouselCrontainer = document.querySelector("#carouselContainer");

		createCarousel(carouselCrontainer, json);

		loadMenu(json);
	});
}

function loadMenu(json) {

	let boxMenu = document.querySelector(".boxMenu");

	json.pages.forEach(page => {

		let menuLink = document.createElement("div");
		menuLink.className = "menuLink";
		menuLink.textContent = page.name;
		boxMenu.appendChild(menuLink);

		menuLink.addEventListener("click", () => {
			loadPageByPath(page.path + "/info.json")
		})
	});
}

function initCode() {

	// Load the common header
	// carousel and menu are in a callback, since there is a menu in the header
	$("#headerContainer").load("technical/html/header.html", () => {

		loadCarouselAndMenuByPath("photos/carousel/info.json");
		
	});
	
	// Load the various pictures
	loadPageByPath("photos/page1/info.json");
}

