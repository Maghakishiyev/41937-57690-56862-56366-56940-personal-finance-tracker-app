export const shortenString = (arg: string, start: number, end: number) => {
    return [arg.slice(0, start), arg.slice(arg.length - end)].join('...');
};
