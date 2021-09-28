/**
 * @author: Saul Neri
 */ 

import { updateLimits, parsedDate } from './utils.js';
import { Note } from './note.js';

export default class Storage {
	constructor() {
		this.notes_storage = localStorage.getItem('notes');
		this.all_notes = JSON.parse(this.notes_storage);
		this.$notes_container = document.getElementById('notes-container');
		this.$noNotesAlert = document.getElementById('no-notes-found');   
		this.$notes_marked_container = document.getElementById('notes-marked-container');
		
		if (!this.all_notes || this.notes_storage == null) {
			localStorage.setItem('notes', JSON.stringify([]));
		}
	}
	
	reload() {
		this.save();
		this.loadNotes();
	}

	loadNotes() {
		const $note_in_edit = document.getElementById('note-in-edit');
		
		this.$notes_container.querySelectorAll('*').forEach(note => note.remove()); // clear the note container
		this.$notes_marked_container.querySelectorAll('*').forEach(note => note.remove()); // clear the note marked ontainer
		
		try {
			if (this.all_notes.length > 0) {
				this.$noNotesAlert.style.display = "none";

				let note_id_counter = 0;  // index of the 'all_notes' array
				
				this.all_notes.forEach(n => {
					let all_right = (n.title && n.desc && n.date);
				
					if (all_right) {
						const note = new Note({
							title: n.title,
							desc:  n.desc,
							date:  n.date,
							id:    note_id_counter
						});
					
						note.show();
					
						if (n.isMarked) {
							const $note_clon = note.template.cloneNode(true);
							note.mark();
							this.$notes_marked_container.appendChild($note_clon);
						}
					
						// [ Note delete button listener ]
						note.template.querySelector('#note-card-remove-btn').addEventListener('click', () => this.removeNote(note.template, note.id));
					
						// [ Note edit button listener ]
						note.template.querySelector('#note-card-edit-btn').addEventListener('click', () => {
							$note_in_edit.innerText = `${note.id}`;   // Save the 'note in edit id' in this element
						
							// set note.title and note.desc as "edit entrys" value
							document.getElementById('edit-note-title').value = note.title;  
							document.getElementById('edit-note-desc').value  = note.desc;
						
							updateLimits();
						});
					

						// [ Note mark button listener ]
						note.template.querySelector('#note-card-mark-btn').addEventListener('click', () => {
							// I have a html p element with the ID "note-in-edit" and this element contain the note index (Integer), is used 
						    // to specify which of the notes have been selected, when this btn detect a click, 
							// gets the content of the element, and the content is the note number that have been selected.
							// So... with this "key", we can access to the note and can change this.

							$note_in_edit.innerText = `${note.id}`;	
							
							const note_to_mark = parseInt($note_in_edit.innerText),
								$note_mark_icon = document.querySelector('#note-' + note_to_mark).querySelector('#mark-btn-icon'),
								note_obj  = this.all_notes[note_to_mark];
									
							(note_obj.isMarked) ? this.all_notes[note_to_mark].isMarked = false : this.all_notes[note_to_mark].isMarked = true;
							$note_mark_icon.classList.toggle('highlight');
							this.reload();
						});

						this.$notes_container.appendChild(note.template);
					} 
					note_id_counter++;
				});
			} else { this.$noNotesAlert.style.display = "block" }
		} catch(e) {window.location.reload()};
	}


	save() {
		localStorage.setItem('notes', JSON.stringify(this.all_notes));
	}
	
	
	removeNote(note_card, note_number_id) {
		this.all_notes.splice(note_number_id, 1);
		note_card.remove();
		this.reload();
	}

	evaluateNote(note_title, note_desc, callback) {	
		let title_is_valid = false,
			desc_is_valid = false,
			note_date = parsedDate();

		// Evaluate if the inputs isn't empty	
		if (note_title.trim() != "" && note_desc.trim() != "")
			title_is_valid = true, desc_is_valid = true;		

		// Evaluate if will be saved or not
		if (title_is_valid && desc_is_valid)
			callback(note_title, note_desc, note_date);
	}
}
