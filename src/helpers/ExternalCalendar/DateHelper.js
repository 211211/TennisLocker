export const refactoringDate = oldDate => {
    const regExp = /\(([^)]+)\)/;
    const date = new Date(Number(regExp.exec(oldDate)[1]));
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const datestring =
        formattedDate +
        ' at ' +
        (date.getHours() < 10 ? '0' : '') +
        date.getHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes();
    return datestring;
};
