
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% SongBuilder Class %%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// The SongBuilder class is used specifically to manage
// note compositions, tracks, and other details and merge
// them into "songs" (midis).  It uses components from 
// smidigen and scribbletune in order to actually build
// the files, but incorporates it's own section managment,
// error correction, and track management code.

// gather deps
var 
{
    fs,
    custom_utils,
    note_utils,
    path,
    child_process
} = process.deps;

// songbuilder class
class SongBuilder
{

    // class constructor
    constructor(params)
    {

        // song name
        this.song_name   = params.song_name;

        // set song directory and tracks directory
        this.song_dir   = params.song_dir;
        this.tracks_dir = params.tracks_dir;

        // track information
        this.track_count  = 0;
        this.tracks       = {};
        this.bottom_track = null;

        // create file
	    this.song_file = new process.deps.jsmidgen.File();

        // current number of channels added
        this.curr_channel_added = 0;
     
        // after files are generated, this holds their paths
        this.generated_midi_file = null;
        this.generated_wav_file  = null;

    }

    // easily add all track parts
	async addAllTrackParts(params)
	{

        // check instrumentes
        if(Array.isArray(params.instruments) !== true)
            return false;

        // iterate through instruments and create one track for each
        for(var idx = 0; idx < params.instruments.length; idx++)
        {

            // gather instrument
            var instrument = params.instruments[idx];

            // set track name
            var track_name = params.track_name + "-" + idx;
            
            // gather the arrangement
            var section_arangement = params.section_arangement;

            // gather the level
            var track_level = params.track_level;

            // gather the notes file
            var notes_file = params.notes_file;

            // check if this is the bottom track
            var is_bottom_track     = params.is_bottom_track;
            if(is_bottom_track !== true)
                is_bottom_track = false;

            // add the track
            this.addTrack(track_name, instrument, is_bottom_track);
            
            // set notes file
            this.tracks[track_name].notes_file = notes_file;


            // load notes from file
            var notes = null;
            if(is_bottom_track === true)
            {

                // if this is our bottom track, then just compare to ourselves when loading
                notes = await note_utils.importNotesFromFile(notes_file, notes_file);

            }
            else
            {

                // if this is not the bottom track, compare this track with the bottom track to fill
                // in any missing gaps.
                notes = await note_utils.importNotesFromFile(notes_file, this.bottom_track.notes_file);

            }


            // add bars to the track
            this.tracks[track_name].addBars(notes);

            // generate sections in order via the arangement
            this.tracks[track_name].generateSections(section_arangement);

            // add the track to your output file
            this.addTrackToOutputFile(track_name, track_level);

            // set tracks
            if(is_bottom_track === true)
            if(custom_utils.isEmpty(this.bottom_track) === true)
                this.bottom_track = this.tracks[track_name];

        }

        // return indicating success
        return true;

	}

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Manipulate Tracks %%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	// add a track to this composition
	addTrack(track_name, instrument, is_bottom_track = false)
	{

		// create our new track
		var new_track = new process.deps.SongTrack
		(
			track_name, 
			this.track_count, 
			instrument, 
			is_bottom_track
		);

		// set track
		this.tracks[track_name] = new_track;

		// increment the track count		
		this.track_count++;

		// return the new track
		return new_track;

	}

	// retrieve the track
	getTrack(track_name)
	{
		return this.tracks[track_name];
	}


	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Track Builders %%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
	// add track to output file
	addTrackToOutputFile(track_name, set_level = -1)
	{

		// set channel
		var chan = this.curr_channel_added;

		// this.song_file
		var track = this.tracks[track_name];
		if(typeof track !== "object")
			return false;

		// ensure we have a track arrangement
		if(track.final_track_arrangement === null)
			return false;

		// create new jsmidgen track
		var jsmidgen_track = new process.deps.jsmidgen.Track();

		// add new track to file
		this.song_file.addTrack(jsmidgen_track);
		jsmidgen_track.setInstrument(chan, track.instrument);

		// synchronously add tracks (requires synchronosity)
		for
		(
			var iter = 0; 
			iter < track.final_track_arrangement.length; 
			iter++
		)
		{

			// set note object 
			var noteObj = track.final_track_arrangement[iter];

			// set note volume level
			let level = noteObj.level || 127;

			// set the level
			if(set_level !== -1)
				level = set_level;

			// While writing chords (multiple notes per tick)
			// only the first noteOn (or noteOff) needs the complete arity of the function call
			// subsequent calls need only the first 2 args (channel and note)
			if (noteObj.note) 
			{

				// Transpose the note to the correct middle C (in case middle C was changed)
				noteObj.note = process.deps.transpose.transposeNote(noteObj.note);

				if (typeof noteObj.note === 'string') 
				{
                    
					// add note to track
					jsmidgen_track.noteOn(0, noteObj.note, noteObj.length, level); 
					jsmidgen_track.noteOff(0, noteObj.note, noteObj.length, level);
				} 
				else 
				{

                    // add chord to track
					jsmidgen_track.addChord(chan, noteObj.note, noteObj.length, level);

				}

			} 
			else 
			{
				jsmidgen_track.noteOff(chan, '', noteObj.length);
			}

		}
		
		// this.song_file
		this.curr_channel_added++;

		// return indicating success
		return true;

	}

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Generate File Output %%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	// this will attempt to generate the final file
	generateMidiFile(full_file_path = null)
	{

        // check full file path
        if(custom_utils.isEmpty(full_file_path) === true)
        {
            full_file_path = path.join(process.paths.top_dir, this.song_name + ".mid");
        }

        // write file
		process.deps.fs.writeFileSync
        (
            full_file_path, 
            this.song_file.toBytes(), 
            'binary'
        );

        // set the generated midi file
        this.generated_midi_file = full_file_path;

        // return indicating success
        return true;

	}

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// %%% Play File %%%%%%%%%%%%%%%%%%%%%%%
	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // generate wav from midi
    async generateWavFromMidi()
    {

        // set self reference
        var song_ref = this;

        // ensure we have a midi file
        if(custom_utils.isEmpty(this.generated_midi_file) === true)
            return false;
        if(fs.existsSync(this.generated_midi_file) !== true)
            return false;

        // Generate wav file
		await new Promise(function(resolve, reject)
		{

            // spawn timidity
            var child = child_process.spawn("timidity", 
            [
                "--output-24bit",
                "-A120",
                song_ref.generated_midi_file,
                "-Ow",
                "-o",
                song_ref.generated_midi_file + ".wav"
            ]);

            // display stdout
            child.stdout.on('data', function(data) 
            {
                console.log('stdout: ' + data);
            });

            // display stderr
            child.stderr.on('data', function(data) 
            {
                console.log('stderr: ' + data);
            });

            // exit process
            child.on('close', function(code)
            {

                // set the generated wav file
                song_ref.generated_wav_file = song_ref.generated_midi_file + ".wav";
                resolve(true);

            });
			
		});

        // return indicating success
        return true;

    }

	// play the generated midi file
	async playMidi()
	{

        // set self reference
        var song_ref = this;

        // ensure we have a midi file
        if(custom_utils.isEmpty(this.generated_midi_file) === true)
            return false;
        if(fs.existsSync(this.generated_midi_file) !== true)
            return false;

        // display the midi message
		custom_utils.notice("playMidi: Starting to generate wav file from midi file.");

        // Generate wav file
		await new Promise(function(resolve, reject)
		{

            // spawn timidity
            var child = child_process.spawn("timidity", 
            [
                "--output-stereo",
                song_ref.generated_midi_file
            ]);

            // display stdout
            child.stdout.on('data', function(data) 
            {
                console.log('stdout: ' + data);
            });

            // display stderr
            child.stderr.on('data', function(data) 
            {
                console.log('stderr: ' + data);
            });

            // exit process
            child.on('close', function(code)
            {
                resolve(true);
            });
			
		});
        
		// return after we've played the song
		return true;

	}

    // play wav file
    async playWav(params)
    {

        // set self reference
        var song_ref = this;
        
        // ensure we have a wav file
        if(custom_utils.isEmpty(this.generated_wav_file) === true)
            return false;
        if(fs.existsSync(this.generated_wav_file) !== true)
            return false;

        // display the midi message
		custom_utils.notice("playWav: Playing wav file.");

        // Generate wav file
		await new Promise(function(resolve, reject)
		{

            // spawn timidity
            var child = child_process.spawn("play", 
            [
                song_ref.generated_wav_file
            ]);

            // display stdout
            child.stdout.on('data', function(data) 
            {
                console.log('stdout: ' + data);
            });

            // display stderr
            child.stderr.on('data', function(data) 
            {
                console.log('stderr: ' + data);
            });

            // exit process
            child.on('close', function(code)
            {
                resolve(true);
            });
			
		});
        
		// return after we've played the song
		return true;

    }

}

// export songbuilder class
module.exports.SongBuilder = SongBuilder;