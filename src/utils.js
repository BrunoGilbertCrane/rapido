/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Create operation list.
 *
 * @param table
 * @returns {*[]}
 */
export const creeOperations = (table) => {
    let ops = [];
    for (let i = 0; i <= table; i++) {
        for (let j = 0; j <= table; j++) {
            if (i + j <= table) {
                ops.push({
                    op1: i,
                    op2: j,
                    key: `${i}+${j}`,
                    operation: "+"
                })
            }
        }
        for (let j = 0; j <= i; j++) {
            ops.push({
                op1: i,
                op2: j,
                key: `${i}-${j}`,
                operation: "-"
            })
        }
    }
    return shuffle(ops).slice(0, 20);
}