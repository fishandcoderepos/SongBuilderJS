// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Album Class %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// The album class simply acts as a manager class for 
// multiple songs.

// load dependencies
var 
{
    path,
    fs,
    custom_utils
} = process.deps;

// Album class
class Album
{

    // class constructor
    constructor(params)
    {
        this.album_name = params.album_name;
        this.songs = {};
        this.output_dir = params.output_dir;
        this.album_dir  = params.album_dir;
    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Song Utilities %%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    // create new song
    newSong(params)
    {
        this.songs[params.song_name] = new process.deps.SongBuilder
        ({
            song_name: "Test Song"
        });
        return this.songs[params.song_name];
    }

    // add a song to the album
    addSong(params)
    {
        this.songs[params.song.song_name] = params.song;
    }

    // load song from file
    async loadSongFromFile(params)
    {

        // gather song handle
        var song_handle = require(params.file_path).song;

        // load the song into the album
        await song_handle({album: this});

        // return indicating success
        return true;

    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Generate Album %%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // generate the album
    async generate(params)
    {

        // check if the output directory exists
        if(fs.existsSync(this.output_dir) !== true)
        {
            fs.mkdirSync(this.output_dir);
        }

        // ensure the output dir is there
        if(fs.existsSync(this.output_dir) !== true)
            return false;

        // gather song names
        var song_names = Object.keys(this.songs);

        // iterate through song names and generate midi files
        for(var idx = 0; idx < song_names.length; idx++)
        {

            // await this.playSong({song_name: song_names[idx]});
            var song_name = song_names[idx];

            // output file
            var output_file = path.join(this.output_dir, song_name+".mid");

            // generate the midi file
            await this.songs[song_name].generateMidiFile(output_file);

            // generate wav from midi
            if(params.generate_wav === true)
                await this.songs[song_name].generateWavFromMidi();

        }

        // return indicating success
        return true;

    }

    // generate a song by name
    async generateSongByName(params)
    {

        // check if the output directory exists
        if(fs.existsSync(this.output_dir) !== true)
        {
            fs.mkdirSync(this.output_dir);
        }

        // ensure the output dir is there
        if(fs.existsSync(this.output_dir) !== true)
            return false;
            
        // output file
        var output_file = path.join(this.output_dir, params.song_name+".mid");

        // generate the midi file
        await this.songs[params.song_name].generateMidiFile(output_file);

        // generate wav from midi
        if(params.generate_wav === true)
            await this.songs[params.song_name].generateWavFromMidi();

        // return indicating success
        return true;

    }

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Play Utilities %%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // attempt to play a song in the album
    async playSong(params)
    {

        // play song depending on type
        switch(params.type)
        {

            // play midi file
            case "midi":
                await this.songs[params.song_name].playMidi();
                break;

            // play wav file
            case "wav":
                await this.songs[params.song_name].playWav();
                break;

            // default
            default:
                break;
        }
        
        // return indicating success
        return true;

    }


    // play the entire album
    async playAlbum(params)
    {
        var song_names = Object.keys(this.songs);
        for(var idx = 0; idx < song_names.length; idx++)
        {
            await this.playSong
            ({
                type:      params.type,
                song_name: song_names[idx]
            });
        }
        return true;
    }

    // check if song is playing
    songIsPlaying(params)
    {
        return this.songs[params.song_name].song_is_playing;
    }

}

// export Album class
try
{
    module.exports.Album = Album;
} catch(err){}