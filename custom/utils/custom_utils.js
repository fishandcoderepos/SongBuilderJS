// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Custom Utilities %%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// This file just holds a partial set of useful utilities 
// that are common to many of my projects.  I typically 
// always include a custom utilities file in each project 
// so that I can share these utilities as needed.

var
{
    StackTrace,
    json_decycle
} = process.deps;


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Validation Utilities %%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// checks if object, string, or array is empty.  (true/false)
//   empty types:
//           undefined
//           null
//           zero length array
//           zero length string
//           object with no keys
var isEmpty = function(test_if_this_is_empty)
{

    // undefined values are considered empty
    if(typeof test_if_this_is_empty === "undefined")
        return true;

    // null values are considered empty
    if(test_if_this_is_empty === null)
        return true;

    // null values are considered empty
    if(test_if_this_is_empty == null)
        return true;

    // zero length arrays are considered empty
    if(Array.isArray(test_if_this_is_empty) === true)
    {
        if(test_if_this_is_empty.length === 0)
            return true;
    }

    // zero length strings are considered empty
    if(typeof test_if_this_is_empty === "string")
    {
        if(test_if_this_is_empty.length === 0)
            return true;
    }

    // object with no keys is considered empty
    if(typeof test_if_this_is_empty === "object")
    {
        
        // first check if the object is a date (has the getMonth property set)
        if(typeof test_if_this_is_empty.getMonth === 'function')
        {
            return false;
        }
        else if(Object.keys(test_if_this_is_empty).length === 0)
        {
            return true;
        }
    }

    
    // the object is not empty
    return false;

}

// checks if an array of values are "empty" using the isEmpty routine.
//   empty types:
//           undefined
//           null
//           zero length array
//           zero length string
//           object with no keys
var valuesAreEmpty = function(array_of_values_to_check)
{

    // ensure it's an array
    if(Array.isArray(array_of_values_to_check) !== true)
        return true;
    
    // iterate through values
    for(var array_idx in array_of_values_to_check)
    {
        if(isEmpty(array_of_values_to_check[array_idx]) !== true)
            return false;
    }

    // return indicating success
    return true;

}

// checks that all values provided are not empty
var valuesAreNotEmpty = function(array_of_values_to_check)
{
    // ensure it's an array
    if(Array.isArray(array_of_values_to_check) === false)
        return false;

    // iterate through values
    for(var array_idx in array_of_values_to_check)
    {
        if(isEmpty(array_of_values_to_check[array_idx]) === true)
            return false;
    }

    // return indicating success
    return true;
}

try
{
    // export empty check
    module.exports.isEmpty           = isEmpty;
    module.exports.valuesAreEmpty    = valuesAreEmpty;
    module.exports.valuesAreNotEmpty = valuesAreNotEmpty;
} catch(err){}


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% Logging/Warn/ Error Utilities %%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// notice
var notice = async function(message, trace_depth_start = 1, log_level = 1)
{
    
    // create stacktrace (required for)
    var stacktrace = StackTrace.getSync();

    // type data
    var type_data = typeof message;

    // convert message if necessary
    if(typeof message === "object" || Array.isArray(message) === true)
    {
        message = JSON.stringify(message, json_decycle(), 2);
    }

    if(typeof stacktrace === "object" && stacktrace !== null)
    {
        var err_trace = JSON.stringify(stacktrace, null, 2);


        // set function name if necessary
        if(typeof stacktrace[trace_depth_start] === "undefined")
            trace_depth_start = 0;
        else if(typeof stacktrace[trace_depth_start] === "undefined")
        {
            console.log("CRITICAL ERROR:".red + " Stacktrace was empty.");
            return false;
        }
        else if(typeof stacktrace[trace_depth_start].functionName === "undefined")
            stacktrace[trace_depth_start].functionName = "undefined/anonymous function";
        

        // add file/class/line number
        var log_info = "\n[Notice]-> ".green + stacktrace[trace_depth_start].fileName + ":" + stacktrace[trace_depth_start].lineNumber + "\n" +
        stacktrace[trace_depth_start].functionName.underline  + ": "+ type_data + "\n" +
        message + "\n" +  "[Notice Above]-> ".green + stacktrace[trace_depth_start].fileName + ":" + stacktrace[trace_depth_start].lineNumber + "\n";

    }
    else
    {
        log_info = "\n[Notice]-> ".green + ": " + message + "\n" +  "[Notice Above]-> ".green + stacktrace[trace_depth_start].fileName + ":" + stacktrace[trace_depth_start].lineNumber + "\n";
    }

    // display the message
    console.log(log_info);
    
}

// log an error
var err = async function(message, exit_process_on_error = false, trace_depth_start = 1, log_level = 1)
{

    exit_process_on_error = false;

    // create stacktrace (required for)
    var stacktrace = StackTrace.getSync();

    // type data
    var type_data = typeof message;
    
    // convert message if necessary
    if(typeof message === "object" || Array.isArray(message) === true)
    {
        message = JSON.stringify(message, json_decycle(), 2);
    }

    // this holds log information    
    var log_info = null;

    // process stack trace
    if(typeof stacktrace === "object" && stacktrace !== null)
    {

        // stringify the trace
        var err_trace = JSON.stringify(stacktrace, null, 2);

        // set function name if necessary
        if(typeof stacktrace[trace_depth_start] === "undefined")
            trace_depth_start = 0;
        else if(typeof stacktrace[trace_depth_start] === "undefined")
        {
            console.log("CRITICAL ERROR:".red + " Stacktrace was empty.");
            return false;
        }
        else if(typeof stacktrace[trace_depth_start].functionName === "undefined")
            stacktrace[trace_depth_start].functionName = "undefined/anonymous function";

    
        // add file/class/line number
        log_info = "\n[Err]-> ".red + stacktrace[trace_depth_start].fileName + ":" + stacktrace[trace_depth_start].lineNumber + "\n" +
        stacktrace[trace_depth_start].functionName.underline  + ": "+ type_data + "\n" +
        message + "\n\n"+
        "  Stack Trace:".red;

        // add full trace
        for(var trace_idx in stacktrace)
        {
            var trace_iter = stacktrace[trace_idx];
            log_info += "\n    "+trace_iter.functionName + ": "+trace_iter.fileName+ ":" + trace_iter.lineNumber;
        }

        // set log info
        log_info += "\n";

    }
    else
    {
        log_info = "\n[Err]-> ".red + ": " + message + "\n";
    }

    // add process exit on failure
    if(exit_process_on_error === true)
    {
        log_info += "\n[!!] Exiting process due to error. (exit_process_on_error === true)".red;
    }

    // display the message
    console.log(log_info);

    // exit process if configured to do so
    if(exit_process_on_error === true)
        process.exit(1);

}

// log a warning
var warn = async function(message, trace_depth_start = 1, log_level = 1)
{

    // create stacktrace (required for)
    var stacktrace = StackTrace.getSync();

    // type data
    var type_data = typeof message;
    
    // convert message if necessary
    if(typeof message === "object" || Array.isArray(message) === true)
    {
        message = JSON.stringify(message, json_decycle(), 2);
    }

    if(typeof stacktrace === "object" && stacktrace !== null)
    {
        var err_trace = JSON.stringify(stacktrace, null, 2);

        // set function name if necessary
        if(typeof stacktrace[trace_depth_start] === "undefined")
            trace_depth_start = 0;
        else if(typeof stacktrace[trace_depth_start] === "undefined")
        {
            console.log("CRITICAL ERROR:".red + " Stacktrace was empty.");
            return false;
        }
        else if(typeof stacktrace[trace_depth_start].functionName === "undefined")
            stacktrace[trace_depth_start].functionName = "undefined/anonymous function";

        
        // add file/class/line number
        var log_info = "\n[Warn]-> ".yellow + stacktrace[trace_depth_start].fileName + 
                        ":" + 
                        stacktrace[trace_depth_start].lineNumber + 
                        "\n" +
                        stacktrace[trace_depth_start].functionName.underline  + 
                        ": "+ 
                        type_data + 
                        "\n" +
                        message + "\n";

    }
    else
    {
        log_info = "\n[Warn]-> ".yellow + ": " + message + "\n";
    }
    
    // display the message
    console.log(log_info);

}

// log a notice
var log = async function(message, trace_depth_start = 1, log_level = 1)
{

    // create stacktrace (required for)
    var stacktrace = StackTrace.getSync();

    // type data
    var type_data = typeof message;

    // convert message if necessary
    if(typeof message === "object" || Array.isArray(message) === true)
    {
        message = JSON.stringify(message, json_decycle(), 2);
    }


    if(typeof stacktrace === "object" && stacktrace !== null)
    {
        var err_trace = JSON.stringify(stacktrace, null, 2);


        // set function name if necessary
        if(typeof stacktrace[trace_depth_start] === "undefined")
            trace_depth_start = 0;
        else if(typeof stacktrace[trace_depth_start] === "undefined")
        {
            console.log("CRITICAL ERROR:".red + " Stacktrace was empty.");
            return false;
        }
        else if(typeof stacktrace[trace_depth_start].functionName === "undefined")
            stacktrace[trace_depth_start].functionName = "undefined/anonymous function";
        

        // add file/class/line number
        var log_info = "\n[Log]-> ".green + stacktrace[trace_depth_start].fileName + ":" + stacktrace[trace_depth_start].lineNumber + "\n" +
        stacktrace[trace_depth_start].functionName.underline  + ": "+ type_data + "\n" +
        message + "\n";

    }
    else
    {
        log_info = "\n[Log]-> ".green + ": " + message + "\n";
    }

    // display the message
    console.log(log_info);
    

}

try
{
    // error warning and log utilities
    module.exports.err    = err;
    module.exports.warn   = warn;
    module.exports.log    = log;
    module.exports.notice = notice;
} catch(err){}