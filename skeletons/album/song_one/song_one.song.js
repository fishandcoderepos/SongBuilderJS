// create dependency references
var 
{
    path
} = process.deps;

// define song
module.exports.song = async function(params)
{

    // gather album handle from parameter
    var album = params.album;

    // create new song
    var test_song = album.newSong
    ({
        song_name:  "Song One",
        song_dir:   __dirname,
        tracks_dir: path.join(__dirname, "tracks")
    });

    // define the arrangement to use
    var section_arangement = 
    [
        "verse1_1",
        "verse1_1",
        "bridge1_1",
        "chorus1_1",
        "chorus1_2",
        "verse1_1",
        "verse1_1",
        "bridge1_1",
        "bridge1_2",
        "chorus1_2",
        "verse1_2"
    ];
   
    // ---- BOTTOM TRACK ---------------

    // add bottom (hum) track
    await test_song.addAllTrackParts
    ({
        track_name: "track1",
        instruments:
        [
            "synth_bass_organ", 
            "deep_muffled_bass_guitar"
        ],
        notes_file:         path.join(__dirname, "tracks", "bottom.track.js"),
        section_arangement: section_arangement,
        track_level:        50,
        is_bottom_track:    true
    });

    // ---- LOW TRACK ---------------

    // add low track
    await test_song.addAllTrackParts
    ({
        track_name: "track2",
        instruments:        
        [
            "synth_glass_reverb_bass", 
            "low_breathy_rum_jug_wind"
        ],
        notes_file:         path.join(__dirname, "tracks", "low.track.js"),
        section_arangement: section_arangement,
        track_level:        30,
        is_bottom_track:    false
    });

    // ---- MID TRACK ---------------

    // add mid track
    await test_song.addAllTrackParts
    ({
        track_name: "track4",
        instruments:        
        [
            "indian_reverb_twangy_instrument", 
            "xylophone_rattling_low_very_cool_bass"
        ],
        notes_file:         path.join(__dirname, "tracks", "mid.track.js"),
        section_arangement: section_arangement,
        track_level:        30,
        is_bottom_track:    false
    });


    // ---- DRUM TRACKS ---------------

    // add first drum track
    await test_song.addAllTrackParts
    ({
        track_name: "track6",
        instruments:        
        [
            "giant_deep_awesome_sounding_drum"
        ],
        notes_file:         path.join(__dirname, "tracks", "drums1.track.js"),
        section_arangement: section_arangement,
        track_level:        110,
        is_bottom_track:    false
    });

    // add second drum track
    await test_song.addAllTrackParts
    ({
        track_name: "track7",
        instruments:        
        [
            "heavy_huge_drums"
        ],
        notes_file:         path.join(__dirname, "tracks", "drums2.track.js"),
        section_arangement: section_arangement,
        track_level:        70,
        is_bottom_track:    false
    });

    // add third drum track
    await test_song.addAllTrackParts
    ({
        track_name: "track8",
        instruments:        
        [
            "nice_clean_heavy_kick_drums"
        ],
        notes_file:         path.join(__dirname, "tracks", "drums3.track.js"),
        section_arangement: section_arangement,
        track_level:        50,
        is_bottom_track:    false
    });

};