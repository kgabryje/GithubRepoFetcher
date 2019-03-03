export const findNextPageUrl = (linkHeader) =>
    linkHeader.split(', ')
        .find(link => link.split('; rel=')[1] === "\"next\"")
        .split(';')[0]
        .slice(1, -1);