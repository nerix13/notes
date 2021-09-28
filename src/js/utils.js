/**
 * @author: Saul Neri
 */

const $desc_entry    = document.getElementById('new-note-desc'),
	  $title_entry     = document.getElementById('new-note-title'),
	  $new_title_entry = document.getElementById('edit-note-title'),
	  $new_desc_entry  = document.getElementById('edit-note-desc');


export function hideButtonSection(notecard) {
	notecard.querySelector('.btn-section').style.display = "none";
	notecard.querySelector('.note-card-title').style.paddingTop = "1rem";
}


export function showButtonSection(notecard) {
	notecard.querySelector('.btn-section').style.display = "block";
	notecard.querySelector('.note-card-title').style.paddingTop = "";
}

export function darkMode() {
	// set the dark-theme
	document.body.setAttribute('data-theme', 'dark');
	const modals = document.querySelectorAll('.modal-content');
	
	// adds the "dark-theme" to each modal
	modals.forEach(m => {
		m.classList.toggle('bg-dark');
		m.classList.toggle('text-white');
		m.querySelector('input').classList.toggle('bg-dark');
		m.querySelector('input').classList.toggle('text-white');
		m.querySelector('textarea').classList.toggle('bg-dark');
		m.querySelector('textarea').classList.toggle('text-white');
	});
}


export function parsedDate() {		
		// Date vars
		let d = new Date(),
			hour  = 0,			// Hour
			min   = 0,			// Min
			day   = 0,          // Day
			month = 0,		   	// Month
			year  = d.getFullYear(),   // Year
			parsed_date = "";			

		// If the hour or minute are lower tha 10, if is true, will parse this on a string and will put a "0"
		// before of the hour or minute number, to get a "date apareance"
		(d.getHours() < 10) ? hour  = (`0` +(d.getHours() + 1))  : hour  =  (d.getHours());     // Hour
		(d.getMinutes()<10) ? min   = (`0` +(d.getMinutes() +1)) : min   =  (d.getMinutes());  // Min
		(d.getDate()  < 10) ? day   = (`0` + (d.getDate() + 1))  : day   =  (d.getDate() + 1);  // Day
		(d.getDate()  < 10) ? day   = (`0` + (d.getDate() + 1))  : day   =  (d.getDate() + 1);  // Day
		(d.getMonth() < 10) ? month = (`0`+(d.getMonth() + 1))   : month =  (d.getMonth() + 1);  // Month
				
		parsed_date = `${hour}:${min} ${day}/${month}/${year}`;

		return parsed_date;
}

export function updateLimits() {
  window.onkeydown = function() {
	document.querySelector('#title_limiter')
	  .innerText = `${$title_entry.value.length}/${$title_entry.getAttribute('maxlength')}`;
	document.querySelector('#desc_limiter')
	  .innerText = `${$desc_entry.value.length}/${$desc_entry.getAttribute('maxlength')}`;
	document.querySelector('#edit-title-limiter')
	  .innerText = `${$new_title_entry.value.length}/${$title_entry.getAttribute('maxlength')}`;
	document.querySelector('#edit-desc-limiter')
	  .innerText = `${$new_desc_entry.value.length}/${$desc_entry.getAttribute('maxlength')}`;
  }
}

export function clearEntrys() {
  $title_entry.value = "";
  $desc_entry.value  = "";
  document.getElementById('edit-note-modal').querySelector('#edit-note-title').value = "";
  document.getElementById('edit-note-modal').querySelector('#edit-note-desc').value  = "";
  updateLimits();
}








