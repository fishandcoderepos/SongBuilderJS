// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Load Process Dependencies %%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// extend JSON prototype
require('json-decycle').extend(JSON);

// create process dependencies object
process.deps = {};

// import dependencies
process.deps.json_decycle             = require('json-decycle').decycle;
process.deps.json_retrocycle          = require('json-decycle').retrocycle;
process.deps.colors                   = require("colors");
process.deps.path                     = require("path");
process.deps.StackTrace               = require("stacktrace-js");
process.deps.fs                       = require("fs");
process.deps.assert                   = require("assert");
process.deps.jsmidgen                 = require("jsmidgen");
process.deps.scribbletune             = require("scribbletune");
process.deps.child_process            = require("child_process");
process.deps.command_line_usage       = require("command-line-usage");
process.deps.command_line_args        = require("command-line-args");
process.deps.asciify                  = require("asciify");
process.deps.transpose                = require("./deps/third_party/transpose.js");
process.deps.clip                     = require("./deps/third_party/clip.js");
process.deps.custom_utils             = require("./custom/utils/custom_utils.js");
process.deps.note_utils               = require("./custom/utils/note_utils.js");
process.deps.Album                    = require("./custom/classes/Album.class").Album;
process.deps.SongBuilder              = require("./custom/classes/SongBuilder.class").SongBuilder;
process.deps.SongTrack                = require("./custom/classes/SongTrack.class").SongTrack;
process.deps.InstrumentMap_fluidr3_gm = require('./custom/classes/instrument_maps/InstrumentMap_fluidr3_gm.class').InstrumentMap_fluidr3_gm;

// create paths
process.paths = {};
process.paths.top_dir = __dirname;


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Load Application %%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// create local references to dependencies for code clarity
var 
{
    fs,
    path,
    custom_utils,
    command_line_args,
    command_line_usage,
    child_process,
    asciify
} = process.deps;


// checks to see if required binaries are present
var checkBinDep = async function(bin_to_check)
{

    // set binary path
    var bin_path = "";

    // Generate wav file
    await new Promise(function(resolve, reject)
    {

        // spawn timidity
        var child = child_process.spawn("which", [bin_to_check]);

        // gather stdout
        child.stdout.on('data', function(data) 
        {
            bin_path += data;
        });

        // ignore stderr
        child.stderr.on('data', function(data) {});

        // exit process
        child.on('close', function(code)
        {
            resolve(true);
        });
        
    });

    // remove newline
    bin_path =  bin_path.replace(/\r?\n|\r/g, "");

    // if the binary doesn't exist, simply return false
    if(fs.existsSync(bin_path) !== true)
        return false;

    // return indicating that we've found the binary we're looking for
    return true;

}

// define application entry point
var main = async function ()
{

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Check Binary Dependencies %%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // ensure timidity is available
    var timidity_exists = await checkBinDep("timidity");
    if(timidity_exists !== true)
    {
        console.log("[!!] Error: You must have timidity installed to use this software (apt-get install timidity)");
        return;
    }

    // ensure sox play is available
    var play_exists = await checkBinDep("play");
    if(play_exists !== true)
    {
        console.log("[!!] Error: You must have sox installed (specifically the play utility) to use this software (apt-get install sox)");
        return;
    }


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Gather Command Line Options %%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // define options
    const optionDefinitions = 
    [
        { name: 'new_album',  type: String},
        { name: 'load_album', type: String},
        { name: 'help'}
    ];

    // gather options
    var options = command_line_args(optionDefinitions);


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Create Command Line Usage %%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        
    // create header sections
    const sections = [
    {
        header: "",
        content: 'Multi-track javascript midi song creation application, created with developers in mind.'
    },
    {
        header: 'Options',
        optionList: [
        {
            name: 'new_album',
            typeLabel: '{underline directory}',
            description: 'An empty directory to use for creating a new JS music album (will copy skeleton album/song files for you to modify).'
        },
        {
            name: 'load_album',
            typeLabel: '{underline filename}',
            description: 'The filename of the album to load.'
        },
        {
            name: 'help',
            description: 'Print this usage guide.'
        }]
    }];

    // create command line usage
    const usage = command_line_usage(sections)


    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Create New Album If Specified %%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // new album
    if(custom_utils.isEmpty(options["new_album"]) == false)
    {

        // set new album directory
        let new_album_dir = options["new_album"];

        // check that the directory exists
        if(fs.existsSync(new_album_dir) === false)
        {
            console.log("[!!] Error: New album directory provided, was invalid.".red);
            return;
        }

        // check that the directory is empty
        let directory_is_empty = await new Promise(function(resolve,reject)
        {
            fs.readdir(new_album_dir, function(err, files) 
            {
                if (err) 
                {
                    console.log("[!!] Error: Bad album directory provided.".red);
                    resolve(false);
                } 
                else 
                {
                    if (!files.length) 
                    {
                        resolve(true);
                    }
                    else
                    {
                        console.log(`[!!] Error: The provided directory was not empty. (contained ${files.length} items)`.red);
                        resolve(false);
                    }
                }
            });
        });

        // exit if the directory is empty
        if(directory_is_empty === false)
            return;

        // set skeleton path
        var skeleton_path = path.join(__dirname, "skeletons", "album");

        // copy the skeleton files into place
        fs.cpSync(skeleton_path, new_album_dir, {recursive: true});

        // display album creation 
        console.log(`\n[+] New album skeleton files/directories copied to '${new_album_dir}'.\n`.green);

        // return indicating success
        return;

    }

    
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Load Album If Specified %%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // new album
    if(custom_utils.isEmpty(options["load_album"]) == false)
    {

        // gather the album file
        let load_album = options["load_album"];

        // ensure we have a file to load
        if(fs.existsSync(load_album) === false)
        {
            console.log(`\n[!!] Could not load album, file does not exist.\n`);
            return;
        }

        // attempt to run the album
        try
        {
            // import the album handle
            var album_handle = require(load_album);
            await album_handle.album({});
        } 
        catch(err)
        {
            console.log(`\n[!!] Error: Could not load album.`.red);
            console.log(err.message);
        }

        // return indicating success
        return;

    }

    
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%% Display Options %%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    // generate / display header text
    var header_text = await new Promise(function(resolve,reject)
    {
        asciify('SongBuilderJS', {font:'small'}, function(err, res){resolve(res)})
    })
    console.log(header_text.red);

    // process.deps.asciify.getFonts(function (err, fonts) { fonts.forEach( console.log ) })
    console.log(usage)
    return;

}

// run main function
main().then(function()
{
    
});