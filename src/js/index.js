/**
 * @author: Saul Neri
 */

import { updateLimits, clearEntrys, hideButtonSection, showButtonSection, darkMode } from './utils.js';
import Storage from './Storage.js';

const storage = new Storage();

const $addNoteModal  = document.getElementById('add-note-modal'),
	  $editNoteModal = document.getElementById('edit-note-modal'),
	  $noteContainer = document.getElementById('notes-container'),
	  $showMarkedNotesButton = document.getElementById('show-marked-notes-btn'),
	  $showAllNotesButton = document.getElementById('show-all-notes-btn'),
	  $notesMarkedContainer = document.getElementById('notes-marked-container');

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('ask-again') != 'false')
	  document.querySelector('.enable-theme-panel').classList.toggle('is-active');
	
	storage.loadNotes();
	
	document.querySelector('.enable-theme-panel').addEventListener('click', e => {
		if (e.target.matches('.yes-btn')) {
			darkMode();
			document.querySelector('.enable-theme-panel').classList.toggle('is-active');
		}
		if (e.target.matches('.no-btn')) {
			document.querySelector('.enable-theme-panel').classList.toggle('is-active');
		}
		if (e.target.matches('.dontask-again-btn')) {
		  localStorage.setItem('ask-again', 'false');
		  document.querySelector('.enable-theme-panel').classList.toggle('is-active');
		}
	});
});


// When save_note_btn is pressed... [ New note save operation ]
$addNoteModal.querySelector('#save-note-btn').onclick = function() { 
	const note_title =  $addNoteModal.querySelector('#new-note-title').value,
		  note_desc  =  $addNoteModal.querySelector('#new-note-desc').value;

	storage.evaluateNote(note_title, note_desc, (title, desc, date) => {

		const data_obj = {
			"title":title, 
			"desc":desc, 
			"date":date, 
			"isMarked":false
		};
		
		storage.all_notes.push(data_obj);   // appends the new data obj on 'all_notes' array
		storage.save();					    // Save the 'all_notes' array and it will be 'Stringified' and loaded on local storage
		storage.loadNotes();			    // Load all the notes from 'all_notes' array
		clearEntrys();						// Clear the 'add_note_modal' inputs
		
		$('#add-note-modal').modal('hide'); // The modal will be hide
	});
};


// When 'edit-note-btn' is pressed... [Edit note operation]
$editNoteModal.querySelector("#save-changes-btn").onclick = function() {
	const note_title   = $editNoteModal.querySelector('#edit-note-title').value,
		  note_desc    = $editNoteModal.querySelector('#edit-note-desc').value,
		  note_in_edit = parseInt(document.getElementById('note-in-edit').innerHTML); // return the ID 
	
	storage.evaluateNote(note_title, note_desc, () => {
		storage.all_notes[note_in_edit].title = note_title;
		storage.all_notes[note_in_edit].desc  = note_desc;
		
		storage.save();
		storage.loadNotes();
		clearEntrys();

		$('#edit-note-modal').modal('hide'); // The modal will be hide
	});
}


/* filters section */
$showAllNotesButton.onclick = function() {
  $noteContainer.childNodes.forEach(child => showButtonSection(child));
  // Show all notes, hide notes marked
  $noteContainer.style.display = "block";
  $notesMarkedContainer.style.display = "none";
  document.body.querySelector('header').innerText = "Notes";
}

$showMarkedNotesButton.onclick = function() {
  $notesMarkedContainer.childNodes.forEach(child => hideButtonSection(child));
  // show marked notes, hide all notes
  $noteContainer.style.display = "none";
  $notesMarkedContainer.style.display = "block";
  document.body.querySelector('header').innerText = "Marked Notes";
}


updateLimits();
