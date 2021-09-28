/**
 * @author: Saul Neri
 */

export class Note {
	constructor(prop_obj) {
		this.template = document.querySelector('.note-card').cloneNode(true);
		this.title = prop_obj.title;
		this.desc  = prop_obj.desc;
		this.date  = prop_obj.date;
		this.id    = prop_obj.id;
	
		this.template.querySelector('.note-card-title').innerText = this.title;
		this.template.querySelector('.note-card-desc').innerText  = this.desc;
		this.template.querySelector('.note-card-date').innerText  = this.date;
		this.template.id = `note-${this.id}`;
	}

	show() {
		this.template.style.display = "block";
	}

	hide() {
		this.template.style.display = "none";
	}

	mark() {
		this.template.querySelector('#mark-btn-icon').style.color = getComputedStyle(document.body).getPropertyValue('--marked-icon-color');		
	}
}
