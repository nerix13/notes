/** @author: Saul Neri  */

import NoteStorage from './Storage.js';

const db = new NoteStorage();

/********/ const $ = id => document.querySelector(id);
/********/ HTMLElement.prototype.on = function(e, callback) { this.addEventListener(e, callback) };
/********/ HTMLElement.prototype.attr = function(name) { return this.getAttribute(name) };
/********/ HTMLElement.prototype.html = function(id) { return this.querySelector(id) };
/********/ HTMLElement.prototype.show = function() { this.style.display = "block" };
/********/ HTMLElement.prototype.hide = function() { this.style.display = "none" };
/********/ HTMLElement.prototype.copy = function() { return this.cloneNode(true) };
/********/ HTMLElement.prototype.val = function() {return this.value };

document.addEventListener('DOMContentLoaded', () => {
  db.reloadStorage();
});

$('#save-note-form').on('submit', e => {
  e.preventDefault();
  let re = /[a-zA-Z0-9*-.,]/g; // do not accept only blanks
  
  let valid_title, valid_desc;

  // evaluate note title
  if (re.test($('#save-note-form').elements["note-title"].value)) {  
	$('#save-note-form').elements["note-title"].classList.remove('error');
	$('#save-title-error').style.display = "none";
	valid_title = true;
  } else {
	$('#save-note-form').elements["note-title"].classList.add('error');
	$('#save-title-error').style.display = "block";
	valid_title = false;
  }

  // evaluate note description
  if (re.test($('#save-note-form').elements["note-desc"].value)) {
	$('#save-note-form').elements["note-desc"].classList.remove('error');
	$('#save-desc-error').style.display = "none";
	valid_desc = true;
  } else {
	$('#save-note-form').elements["note-desc"].classList.add('error');
	$('#save-desc-error').style.display = "block";
	valid_desc = false;
  }

  if (valid_title && valid_desc) {
	const last_pos = db.notes.length; // last position index of DB

	let data = {
	  id: last_pos,
	  title: $('#save-note-form').elements["note-title"].val(),
	  desc: $('#save-note-form').elements["note-desc"].val(),
	  isMarked: false,
	};

	if ($('#save-note-modal').attr('data-mode') == 'edit') {
	  const current_id = parseInt((($('#notes').attr('data-note-selected').split('note-')))[1]);
	  db.editElement(current_id, data);
	  $('#save-note-modal').setAttribute('data-mode', 'default');
	} else {
	  db.saveElement(data);
	  $('#save-note-form').reset();
	}

	closeModal('#save-note-modal');
  }
});

/* filter buttons */
$('#show-notes-btn').on('click', () => {
	document.querySelector('#notes').setAttribute('data-filter', 'default');
	db.reloadStorage();
});

$('#show-marked-notes-btn').on('click', () => {
	document.querySelector('#notes').setAttribute('data-filter', 'marked');
	db.reloadStorage();
});

/* search input */
$('#search-input').on('keyup', () => {
  const pattern = $('#search-input').val();
  $('#notes').childNodes.forEach(n => {
	n.html('.note-title').textContent.trim().includes(pattern)
	  ? n.show()
	  : n.hide();
  });
});

