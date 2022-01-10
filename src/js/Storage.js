/** @author: Saul Neri */
import { Note } from './Note.js';

/********/ const $ = id => document.querySelector(id);
/********/ HTMLElement.prototype.on = function(e, callback) { this.addEventListener(e, callback) };
/********/ HTMLElement.prototype.attr = function(name) { return this.getAttribute(name) };
/********/ HTMLElement.prototype.html = function(id) { return this.querySelector(id) };
/********/ HTMLElement.prototype.show = function() { this.style.display = "block" };
/********/ HTMLElement.prototype.hide = function() { this.style.display = "none" };
/********/ HTMLElement.prototype.copy = function() { return this.cloneNode(true) };

export default class NoteStorage {
  constructor() {
	this.notesDB = localStorage.getItem('notes-db');
	this.notes = JSON.parse(this.notesDB);
	// check if the Database is empty
	if (!this.notes || this.notesDB == null) {
	  localStorage.setItem('notes-db', '[]');
	}
  }

  reloadStorage() {
	this.notes = JSON.parse(localStorage.getItem('notes-db'));
	const $notesContainer = $('#notes');

	$notesContainer.innerHTML = "";

	if (this.notes.length > 0) {
	  let index_counter = 0;
	  /* checks the notes filter [MARKED] */
	  if ($notesContainer.getAttribute("data-filter") == "marked") {
		const markedNotes = this.notes.filter(n => n.isMarked);
		if (markedNotes.length > 0) {
		  markedNotes.forEach(n_data => { // get notes data obj
			const note = new Note(n_data);
			n_data.id = index_counter;
			note.$template.id = `note-${index_counter}`;
			note.$template.classList.add('is-marked');
			$notesContainer.appendChild(note.$template);
			index_counter++;
		  });
		} else { /* show dialog */
		  const $msg = document.createElement('center');
		  $msg.innerHTML = '<small style="color: var(--text-color);">You have not marked notes...</small>';
		  $msg.style.margin = "20% auto";
		  $notesContainer.appendChild($msg);
		}
	  } else { /* check the notes filter [NORMAL] */
		const notes = this.notes;
		notes.forEach(n_data => {
		  n_data.id = index_counter;
		  const note = new Note(n_data); // get notes data obj
		  if (n_data.isMarked) note.$template.classList.add('is-marked');
		  note.$template.id = `note-${index_counter}`;
		  $notesContainer.appendChild(note.$template);
		  index_counter++;
		});
	  }
	} else { /* show dialog */
	  console.warn('Notes Storage is empty...');
	  const $msg = document.createElement('center');
	  $msg.innerHTML = '<small style="color: var(--text-color);">No notes to show. To make one press + button</small>';
	  $msg.style.margin = "20% auto";
	  $notesContainer.appendChild($msg);
	}
  }

  toggleMarkElement(index) {
	this.notes = JSON.parse(localStorage.getItem('notes-db'));
	const note = this.notes[index];
	(note.isMarked) ? this.notes[index].isMarked = false : this.notes[index].isMarked = true;
	this.save();
  }

  saveElement(note_data) {
	this.notes = JSON.parse(localStorage.getItem('notes-db'));
	this.notes.push(note_data);
	this.save();
	this.reloadStorage();
  }

  editElement(index, data) {
	this.notes = JSON.parse(localStorage.getItem('notes-db'));
	this.notes[index] = data;
	this.save();
	this.reloadStorage();
  }

  removeElement(index) {
	this.notes = JSON.parse(localStorage.getItem('notes-db'));
	this.notes.splice(index, 1);
	this.save();
	this.reloadStorage();
  }

  save() {
	localStorage.setItem('notes-db', JSON.stringify(this.notes));
  }

  /*
  clearAll() {
	this.notes = [];
	this.save();
  }
  */
}
