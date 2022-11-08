// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% SongTrack Class %%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// This class represents a single track in a class, and is
// used to hold individual notes, instrument, and section 
// information. 

var 
{
	InstrumentMap_fluidr3_gm,
	scribble,
	clip
} = process.deps;

class SongTrack
{

	// class constructor
    constructor
	(
		track_name, 
		track_number, 
		instrument_name_or_number, 
		is_bottom_track = false
	)
    {

        // gather instrument map for fluidr3 soundfont
        var instruments = new process.deps.InstrumentMap_fluidr3_gm();
        
        // set basic info
        this.instrument_name         = instrument_name_or_number;

        // either set instrument from lookup, or number depending on type
        if(typeof instrument_name_or_number === "string")
            this.instrument = instruments.getInstrumentNumberByName(instrument_name_or_number);
        else
            this.instrument = instrument_name_or_number;

        this.track_number            = track_number;
        this.bars                    = [];
        this.current_bar_count       = 0;
        this.final_track_arrangement = null;
        this.is_bottom_track         = is_bottom_track;

        // set scribble for this track
        this.scribble = scribble;

		// set clip
        this.clip = clip;

    }

    // add a bar to the track
	addBar(add_clip)
	{
		
		// add clip to bars
		this.bars[this.current_bar_count] = 
		{
			section: add_clip.section,
			clip:    this.clip(add_clip)
		};

		// increment the bar count
		this.current_bar_count++;

	}


    // add bars (notes) to track
    addBars(clip_array)
    {

		// set self reference
        var track = this;

		// iterate through clips
		var section_name = null;
		clip_array.forEach(function(clip)
		{

			if(typeof clip.section === "string")
			if(section_name !== clip.section)
				section_name = clip.section;

			// add clip (automatically increments count)
			track.addBar(clip);

		});
		return true;

    }

    // generate all bars
	generateAllBars(repeat_count = 1)
	{

		// first generate all bars
		this.final_track_arrangement = null;
		var final_track_tmp = null;

		// generate all bars and repeat as necessary
		for(var repeat = 0; repeat < repeat_count; repeat++)
		{

			this.bars.forEach(function(bar_obj)
			{
				if(final_track_tmp === null)
				{
					final_track_tmp = bar_obj.clip;
				}
				else
				{
					final_track_tmp = final_track_tmp.concat(bar_obj.clip);
				}
			});

		}

		// set final track
		this.final_track_arrangement = final_track_tmp;

		// if we couldn't generate the track return false
		if(this.final_track_arrangement === null)
			return false;

		// return indicating success
		return true;

	}

    // attempt to generate a single song section
	generateSection(section)
	{

		

		var section_start_pos = -1;
		var section_end_pos   = -1;
		for(var iter = 0; iter < this.bars.length; iter++)
		{

			// set clip
			var bar_obj = this.bars[iter];

			// calculate start position
			if(bar_obj.section === section)
			{
				section_start_pos = iter;
			}

			if(typeof bar_obj.section === "string")
			if(bar_obj.section.length > 0)
			if(bar_obj.section !== section && section_start_pos !== -1)
			{
				section_end_pos = iter-1;
				break;
			}
			
		}

		// set section start position
		if(section_start_pos !== -1)
		{

			// set section end position
			if(section_end_pos === -1)
				section_end_pos = this.bars.length -1;

			// generate the bars
			return this.generateBarsBetween(section_start_pos, section_end_pos, 1, false);
			
		}
		else
		{
			console.log("Error: "+section + " failed to generate.");
			console.log(this.bars);
		}

		// return that we did not generate bars
		return false;

	}

    // generate song sections
	generateSections(sections)
	{

		// check if we have sections
		if(Array.isArray(sections) === false)
			return false;
		if(sections.length <= 0)
			return false;
		
		// iterate through sections
		for(var section_iter = 0; section_iter < sections.length; section_iter++)
		{

			// set section 
			var section = sections[section_iter];

			// generate the specified section
			this.generateSection(section);

		}

		// return true if we could generate things ok
		return true;


	}

    // generate bars between positions
	generateBarsBetween(start_pos = 0, end_pos = 0, repeat_count = 1, destroy_arrangement = true)
	{


		// if we have no start position set the full length remaining
		if(end_pos === -1)
			end_pos = this.bars.length;

		// ensure we have no mismatch
		if(end_pos < start_pos)
			return false;

		// create final song from bars
		if(destroy_arrangement === true)
			this.final_track_arrangement = null;

		for(var iter = start_pos; iter <= end_pos; iter++)
		{

			// set clip
			var bars_obj = this.bars[iter];
			if(typeof bars_obj !== "object")
				return false;

			if(this.final_track_arrangement === null)
			{
				this.final_track_arrangement = bars_obj.clip;
			}
			else
			{
				this.final_track_arrangement = this.final_track_arrangement.concat(bars_obj.clip);
			}
		}
		
		// return true if we could generate things ok
		return true;

	}

}

// export class interface
module.exports.SongTrack = SongTrack;