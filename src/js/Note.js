/** @author: Saul Neri */

import NoteStorage from './Storage.js';

/*********/ const $ = id => document.querySelector(id);
/*********/ HTMLElement.prototype.on = function(e, callback) { this.addEventListener(e, callback) };
/*********/ HTMLElement.prototype.attr = function(name) { return this.getAttribute(name) };
/*********/ HTMLElement.prototype.html = function(id) { return this.querySelector(id) };
/*********/ HTMLElement.prototype.show = function() { this.style.display = "block" };
/*********/ HTMLElement.prototype.hide = function() { this.style.display = "none" };
/*********/ HTMLElement.prototype.copy = function() { return this.cloneNode(true) };

export class Note {
  constructor(data) {
	this.$template = $('.note').copy();
	this.data = data;
	this.isMarked = false;

	this.$template.id = `note-${this.data.id}`;
	this.$template.html('.note-title').innerText = this.data.title;
	this.$template.html('.note-body').innerText = this.data.desc;

	this.$template.html('.note-body').on('click', () => this.$template.html('.note-body').classList.toggle('expand'));

	/* Note events */
	this.$template.html('#remove-note-btn').on('click', () => {
	  const _storage = new NoteStorage();
	  // update the latest note selected
	  $('#notes').setAttribute('data-note-selected', this.$template.id);
	  /*get the id from #notes.data-note-selected */
	  const note_id = parseInt((($('#notes').attr('data-note-selected').split('note-')))[1]);
	  this.$template.remove(); // remove the note (only from document, not db)
	  _storage.removeElement(note_id);
	});

	this.$template.html('#edit-note-btn').on('click', () => {
	  const _storage = new NoteStorage();
	  /* update the latest note selected */
	  $('#notes').setAttribute('data-note-selected', this.$template.id);
	  /*get the id from #notes.data-note-selected */
	  const note_id = parseInt((($('#notes').attr('data-note-selected').split('note-')))[1]);
	  /* convert the save-note-modal in edit-note-modal */
	  $('#save-note-modal').setAttribute('data-mode', 'edit');
	  $('#save-note-modal').html('.modal-title').innerText = "Edit note";
	  $('#save-note-modal').html('#note-title').value = this.data.title;
	  $('#save-note-modal').html('#note-desc').value = this.data.desc;

	  showModal('#save-note-modal');
	});

	this.$template.html('#mark-note-btn').on('click', () => {
	  const _storage = new NoteStorage();
	  // update the latest note selected
	  $('#notes').setAttribute('data-note-selected', this.$template.id);
	  // gets the id number of note, to find its data in note_storage...
	  const note_id = parseInt((($('#notes').attr('data-note-selected').split('note-')))[1]);
	  this.$template.classList.toggle('is-marked');
	  _storage.toggleMarkElement(note_id);
	});

	this.$template.style.display = "block";
  }
}

