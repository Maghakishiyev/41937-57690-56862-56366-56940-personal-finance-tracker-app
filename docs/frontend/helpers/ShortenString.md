### Helper Functions

### shortenString
A helper function to shorten a string to a specified length, appending an ellipsis (...) in the middle.


export const shortenString = (arg: string, start: number, end: number) => {
    return [arg.slice(0, start), arg.slice(arg.length - end)].join('...');
};