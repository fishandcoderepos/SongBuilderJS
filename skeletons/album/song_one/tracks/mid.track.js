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
			notes: ['b2', 'b3'],
			pattern: "----------x____x____",
			noteLength: note_length
		},
		{
			notes: ['e4', 'e3', 'e5'],
			pattern: "x____x_______x______",
			noteLength: note_length
		},
		{
			notes: ['e4', 'e3', 'e5'],
			pattern: "x____x_______x______",
			noteLength: note_length
		},
		{
			notes: ['a3', 'a4', 'e5'],
			pattern: "x____x_______x_____",
			noteLength: note_length
		}
	);


	notes.push
	(
		{
			section: "verse1_2",
			notes: ['b2', 'b3'],
			pattern: "----------x____x____",
			noteLength: note_length
		},
		{
			notes: ['e4', 'e3', 'e5'],
			pattern: "x____x_______x______",
			noteLength: note_length
		},
		{
			notes: ['e4', 'e3', 'e5'],
			pattern: "x____x_______x______",
			noteLength: note_length
		},
		{
			notes: ['a3', 'a4', 'e6'],
			pattern: "x____x_______x_____",
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
			notes: ['c3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['a3', 'd4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['g3', 'e4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4#', 'b3#'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		}
	);

	notes.push
	(
		{
			section: "bridge1_2",
			notes: ['f4', 'a4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['e4', 'd4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4', 'e4'],
			pattern: "x_________x_______",
			noteLength: note_length,
			accentMap: accent_map
		},
		{
			notes: ['c4#', 'b3#'],
			pattern: "x_________x_______",
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
			notes: ['c3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['a3', 'e4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['g3', 'e4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['c4', 'b3'],
			pattern: "x_________x_______",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_2",
			notes: ['e3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['a3', 'e5'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['b2', 'e4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['a1', 'a2'],
			pattern: "x_________x_______",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_3",
			notes: ['e3'],
			pattern: "-",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "chorus1_4",
			notes: ['e3'],
			pattern: "-",
			noteLength: note_length
		}
	);

	// return generated notes
	return notes;

}