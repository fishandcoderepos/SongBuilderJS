// require note utilities
var note_utils = process.deps.note_utils;

// note generator function
module.exports.notes = async function(params)
{

	// this will hold our returned notes
	var notes = [];

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Verse 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	var note_length = "1/16";
	var accent_map = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 127, 127, 127];
	notes.push
	(
		{
			section:    "verse1_1",
			notes:      ['a2'],
			pattern:    "x____________________",
			noteLength: note_length,
			accentMap:  accent_map
		},
		{
			notes: ['c3#'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['f3#'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['a2'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);

	notes.push
	(
		{
			section: "verse1_2",
			notes: ['a2'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c3#'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['f3#'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['a2'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);


	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Bridges %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "bridge1_1",
			notes: ['a2'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['g3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['b3'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);

	notes.push
	(
		{
			section: "bridge1_2",
			notes: ['a2'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['g3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['b3'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);


	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Chorus 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "chorus1_1",
			notes: ['e3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['g3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c3#'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['f3'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);

	notes.push
	(
		{
			section: "chorus1_2",
			notes: ['e3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['a3'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4'],
			pattern: "x____________________",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['e4'],
			pattern: "x_______________",
			noteLength: note_length,
			accentMap: accent_map
		}
	);

	return notes;
}