// require note utilities
var note_utils = process.deps.note_utils;

// note generator function
module.exports.notes = async function(params)
{

	var notes = [];

	// specify note length
	var note_length = "1/16";


	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Verse 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "verse1_1",
			notes: ['a2', 'a2'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['c3#', 'c3#'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['f3#', 'f3#'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['a2', 'a2'],
			pattern: "x_________x_____",
			noteLength: note_length
		}
	);

	notes.push
	(
		{
			section: "verse1_2",
			notes: ['a2', 'a2'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['c3#', 'c3#'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['f3#', 'f3#'],
			pattern: "x_________x_________",
			noteLength: note_length
		},
		{
			notes: ['a2', 'a2'],
			pattern: "x_________x_______",
			noteLength: note_length
		}
	);

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Bridges %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


	notes.push
	(
		{
			section: "bridge1_1",
			notes: ['a3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['f3', 'e3'],
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
			section: "bridge1_2",
			notes: ['e4', 'g4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['f4', 'a3'],
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

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Chorus 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	notes.push
	(
		{
			section: "chorus1_1",
			notes: ['a3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['f3', 'e3'],
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
			notes: ['a3', 'c4'],
			pattern: "x_________x_______",
			noteLength: note_length
		},
		{
			notes: ['f3', 'e3'],
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