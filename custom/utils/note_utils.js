// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Note Utilities %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// The utilities in this file are utilized to fixup and 
// manage various note collections within songs/tracks.

// used to calculate the total length of an arrangement
var calculateTotalArrangementLength = function(notes)
{

    if(Array.isArray(notes)!== true)
        return -1;

    var note_positions = 0;
    // iterate through notes
    notes.forEach(function(note)
    {
        note_positions += note.pattern.length;
    });

    // return the note positions
    return note_positions;

}

// get sections from notes
var getSectionsFromNotes = function(notes)
{

    // sections to return
    var sections = {};

    // current section
    var curr_section = null;

    // iterate through notes
    notes.forEach(function(note)
    {

        // if we have a section marker, create a new section
        if(typeof note.section === "string")
        {

            // create new section
            sections[note.section] = 
            {
                notes: [],
                total_note_length: 0
            }

            // set current section
            curr_section = sections[note.section];

        }

        // ensure current section is set
        if(curr_section === null)
            return false;


        // add section items
        curr_section.total_note_length += note.pattern.length;

        // push note into current section
        curr_section.notes.push(note);

        
    });


    // return sections required
    return sections;

}

// compare sections
var compareSections = function(compare_to, compare_with)
{


    if(typeof compare_to === "undefined")
        return false;
    if(typeof compare_with === "undefined")
        return false;

    // compare messages
    var compare_section_info = 
    {
        has_missing_sections: false,
        missing_sections: [],
        missing_padding:  {}
    };

    var has_missing_sections = false;

    // compare to
    Object.keys(compare_to).forEach(function(compare_to_key)
    {
        if(typeof compare_with[compare_to_key] === "undefined")
        {
            compare_section_info.missing_sections.push(compare_to_key);
            has_missing_sections = true;
            return;
        }

        if(typeof compare_with[compare_to_key] !== "object")
        {
            compare_section_info.missing_sections.push(compare_to_key);
            has_missing_sections = true;
            return;
        }
    });

    // return if we have missing sections
    if(has_missing_sections === true)
    {
        compare_section_info.has_missing_sections = true;
        return compare_section_info;
    }

    // mark
    var has_mismatch = false;

    // compare to
    Object.keys(compare_to).forEach(function(compare_to_key)
    {

        if(typeof compare_with[compare_to_key] === "undefined")
        {
            return;
        }

        // if we have a mismatch, find out why
        if
        (
            compare_to  [compare_to_key].total_note_length 
            !== 
            compare_with[compare_to_key].total_note_length
        )
        {

            // set counter and 
            var mismatch = 0;

            // identify that we have a mismatch
            has_mismatch = true;

            // create entry
            compare_section_info.missing_padding[compare_to_key] = {};


            // if the mismatch is less, decrement
            if
            (
                compare_to  [compare_to_key].total_note_length 
                <
                compare_with[compare_to_key].total_note_length
            ) 
            {
                mismatch = compare_with[compare_to_key].total_note_length -
                compare_to[compare_to_key].total_note_length;
                compare_with[compare_to_key].mismatch = mismatch;
                compare_with[compare_to_key].mismatch_reverse = true;

                // set mismatch
                compare_section_info.missing_padding[compare_to_key].mismatch = mismatch;
                compare_section_info.missing_padding[compare_to_key].mismatch_reverse = true;

            }
            else
            {
                mismatch = compare_to[compare_to_key].total_note_length -
                compare_with[compare_to_key].total_note_length;
                compare_with[compare_to_key].mismatch = mismatch;
                compare_with[compare_to_key].mismatch_forward = true;
                
                // set mismatch
                compare_section_info.missing_padding[compare_to_key].mismatch = mismatch;
                compare_section_info.missing_padding[compare_to_key].mismatch_forward = true;

            }

            
        }
    });

    // mark mismatch status based on loop
    compare_section_info.has_mismatch = has_mismatch;

    // return the compare messages generated
    return compare_section_info;

}

// compare arrangements and find mismatches
var compareArrangementsAndFindMismatches = function(params = null)
{

    // set compare to and compare with
    var compare_to   = params.compare_to;
    var compare_with = params.compare_with;

    // compare sections
    var compare_to_sections   = null;
    var compare_with_sections = null;

    // set mismatch results
    var mismatch_results = 
    {
        compare_to_sections:   compare_to,
        compare_with_sections: compare_with,
        mismatches:            []
    };

    // gather compare_to
    Object.keys(compare_to).forEach(function(compare_to_key)
    {

        // set iterator
        compare_to_iter = compare_to[compare_to_key];
        compare_to_sections = getSectionsFromNotes(compare_to_iter);
       
    });


    // gather compare_to
    Object.keys(compare_with).forEach(function(compare_with_key)
    {

        // set iterator
        compare_with_iter     = compare_with[compare_with_key];
        compare_with_sections = getSectionsFromNotes(compare_with_iter);

        // run compare sections
        var compared_sections = compareSections(compare_to_sections, compare_with_sections);

        compared_sections.track_name = compare_with_key;

        // check if we have a mismatch
        if(compared_sections.has_mismatch === true)
        {

            // check for mismatch
            mismatch_results.has_mismatch = true;
            mismatch_results.compare_with_iter = compare_with_iter;
        }


        // push mismatch result
        mismatch_results.mismatches.push(compared_sections);

    });

    // return the sections
    return mismatch_results;

};

// attempt to fixup notes from mismatch results
var fixupNotesFromMismatchResults = function(track_name, notes, mismatch_results)
{

    // looked up mismatch
    var looked_up_mismatch = null;

    // iterate through mismatches
    mismatch_results.mismatches.forEach(function(mismatch)
    {

        if(mismatch.track_name === track_name)
            looked_up_mismatch = mismatch;
        
    });

    // if there is no mismatch, just return the notes
    if(looked_up_mismatch === null)
    {
        console.log("fixupNotesFromMismatchResults: no looked up mismatch!");
        process.exit(1);
    }
    if(looked_up_mismatch.has_mismatch !== true)
       return notes;

    // provide some notes to add
    var notes_to_add = 
    {
        notes: ['c3'],
        pattern: '-'.repeat(1)
    }

    // missing padding
    if(typeof looked_up_mismatch.missing_padding === "object")
    {
        Object.keys(looked_up_mismatch.missing_padding).forEach(function(section_name)
        {

            // get missing padding
            var missing_padding = looked_up_mismatch.missing_padding[section_name];

            // provide some notes to add
            var notes_to_add = 
            {
                notes: ['c3'],
                pattern: '-'.repeat(missing_padding.mismatch)
            }

            console.log(track_name + "["+section_name+"]: Adding '"+missing_padding.mismatch+"' empty padding notes to end of section for fixup.");

            // create updated notes
            notes.notes = addNotesToSection(section_name, notes, notes_to_add);

        });
    }

    // return the notes
    return notes;

}

// add notes to a section
var addNotesToSection = function(section_name, notes, notes_to_add)
{

    // section identified
    var section_identified = false;

    // splice position
    var splice_position = -1;
    
    // iterate through notes
    for(var note_idx = 0; notes.length > note_idx; note_idx++)
    {

        // get note
        var note = notes[note_idx];

        // section match
        if(section_name === note.section)
        {
            section_identified = true;
            continue;
        }

        // get final count
        if(section_identified === true)
        if(typeof note.section === "string")
        if(section_name !== note.section)
        {

            // set the note index
            splice_position = note_idx;
            break;

        }

        // set last splice position
        if(typeof notes[note_idx+1] === "undefined")
        {
            splice_position = note_idx;
        }

    }

    // splice or push 
    if(splice_position === notes.length-1)
        notes.push(notes_to_add);
    else
        notes.splice(splice_position, 0, notes_to_add);

    // return the spliced notes
    return notes;

}

// note visualizer
var visualizeNotes = function(notes)
{

    var section_header = null;
    for(var note_idx = 0; notes.length > note_idx; note_idx++)
    {
        var note = notes[note_idx];

        if(typeof note.section === "string")
        if(section_header !== note.section)
        {
            console.log(note.section + "");
            section_header = notes.section;
        }

        console.log("\t"+note.pattern);
    }
};

// Easy use function for track note boundary fixups.
var fixupTrackNotes = function(track_name, base_notes, track_notes_to_check_against)
{

    // compare arrangement
    var note_mismatches = compareArrangementsAndFindMismatches
    ({
        compare_to: 
        {
            track_name: base_notes
        },
        compare_with:
        {
            track_notes_to_check_against: track_notes_to_check_against
        }
    });

    // return null if we have a mismatch
    if(typeof note_mismatches !== "object")
        return track_notes_to_check_against;

    // check for note mismatches
    if(typeof note_mismatches === "object")
    if(note_mismatches.mismatches.length > 0)
    {

        // if we have mismatches, note them
        if(Array.isArray(note_mismatches.mismatches) === true)
        {

            // iterate through mismatches
            for
            (
                var mismatch_iter = 0; 
                mismatch_iter < note_mismatches.mismatches.length; 
                mismatch_iter++
            )
            {
                var mismatch = note_mismatches.mismatches[mismatch_iter];
                
                // exit if we're missng sections
                if(mismatch.has_missing_sections === true)
                {
                    console.log("Error: Missing sections detected!");
                    console.log("The notes of track '" + track_name +"' are missing the following sections:");
                    mismatch.missing_sections.forEach(function(section_item)
                    {
                        console.log("\t - '"+section_item+"'")
                    });

                    process.exit(1);
                }

                // run reverse mismatch checks
                if(typeof mismatch.missing_padding === "object")
                {

                    Object.keys(mismatch.missing_padding).forEach(function(missing_padding_key)
                    {

                        // lookup missing padding
                        var missing_padding = mismatch.missing_padding[missing_padding_key];
                        
                        if(missing_padding.mismatch_reverse === true)
                        {
                            console.log("Error: " + track_name + ": Section '"+missing_padding_key + "' is "+missing_padding.mismatch +" chars too long (Cannot be longer than the lowest tracks version of this section.).");
                            process.exit(1);
                        }

                    });

                }

            }

        }

        // --- fixups ---

        // attempt fixups
        var fixed_up_notes = fixupNotesFromMismatchResults("track_notes_to_check_against", track_notes_to_check_against, note_mismatches);


        // console.log("Checking mismatches here?:");
        // console.log(note_mismatches.mismatches[0].missing_padding);

        // return the fixup
        return fixed_up_notes;

    }

    return null;
}

// importe notes from file
var importNotesFromFile = async function(import_file_name, base_notes_file)
{

    // require necessary files
    var notes_gen      = require(import_file_name).notes;
    var base_notes_gen = require(base_notes_file).notes;

    // gather notes from generators
    var notes      = await notes_gen({});
    var base_notes = await base_notes_gen({});

    // verbosity
    console.log("[+] Attempting Section Fixup For: "+import_file_name);
    
    // fixup lower layer tracks (under the hum track)
    notes = fixupTrackNotes
    (
        "notes", 
        base_notes, 
        notes
    );

    if(notes === null)
    {
        console.log("Could not import "+import_file_name+".");
        process.exit(1);
    }

    // return the fixed up notes
    return notes;

}

// export 
try
{
    module.exports.importNotesFromFile                  = importNotesFromFile;
    module.exports.fixupTrackNotes                      = fixupTrackNotes;
    module.exports.calculateTotalArrangementLength      = calculateTotalArrangementLength;
    module.exports.compareArrangementsAndFindMismatches = compareArrangementsAndFindMismatches;
    module.exports.fixupNotesFromMismatchResults        = fixupNotesFromMismatchResults;
    module.exports.visualizeNotes                       = visualizeNotes;
}
catch(err){}