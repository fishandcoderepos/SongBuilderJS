// import dependencies
var
{
    path,
    Album,
} = process.deps;

// export the album
module.exports.album = async function(params)
{    

    // create new test album
    let test_album = new Album
    ({
        album_name:  "Skeleton Album",
        album_dir:   __dirname,
        output_dir:  path.join(__dirname, "output")
    });


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Load Songs %%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // load test song
    console.log("[+] Loading song into album.".green);
    await test_album.loadSongFromFile
    ({
        file_path: path.join(__dirname, "song_one", "song_one.song.js")
    });


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Generate and Play Album %%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // set this to generate whatever you'd like
    var generate = "one";

    // generate and play entire album
    if(generate === "all")
    {
        // generate 
        console.log("[+] Generating all songs in album.".green);
        await test_album.generate
        ({
            generate_wav: true
        });

        // play the album (wav or midi, but wav is generally better for performance)
        console.log("[+] Playing all songs in album.".green);
        await test_album.playAlbum
        ({
            type: "wav"
        });
    }

    // generate a single track
    if(generate === "one")
    {
        
        // generate 
        console.log("[+] Generating song.".green);
        await test_album.generateSongByName
        ({
            song_name:    "Song One",
            generate_wav: true
        });
        
        // play a song
        console.log("[+] Playing song.".green);
        await test_album.playSong
        ({
            song_name: "Song One",
            type:      "wav"
        });

    }

    // simply display exit message
    console.log("[+] Album routine finished.".green);

    // return the test album
    return test_album;

};