export const color = (r, g, b) => {
    return `\x1b[38;2;${r};${g};${b}m`;
}

export const fechaActual = () => {
    let now = new Date();
    return  now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2) + " " +
        ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
}