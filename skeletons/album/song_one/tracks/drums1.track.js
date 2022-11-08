
// require note utilities
var note_utils = process.deps.note_utils;

// note generator function
module.exports.notes = async function(params)
{
		
	var notes = [];

	// specify note length
	var note_length = "1/16";

	// set accent map
	var accent_map = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 127, 127, 127];


	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Verse 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


	notes.push
	(
		{
			section: "verse1_1",
			notes: ['e2', 'e3', 'e2', 'e3', 'e2', 'e3', 'e2', 'e3'],
			pattern: "x_________".repeat(7) + "x________",
			noteLength: note_length
		}
	);


	notes.push
	(
		{
			section: "verse1_2",
			notes: ['e2', 'e3', 'e2', 'e3', 'e2', 'e3', 'e2', 'e3'],
			pattern: "x_________".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Bridge 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "bridge1_1",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "bridge1_2",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Chorus 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "chorus1_1",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_2",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_3",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_4",
			notes: ['e3', 'e4', 'e3', 'e4', 'e3', 'e4', 'e3', 'e4'],
			pattern: "x__x__x___".repeat(7) + "x________",
			noteLength: note_length
		}
	);

	// return the notes
	return notes;

}