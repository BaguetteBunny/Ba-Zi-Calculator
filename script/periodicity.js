function solveDiophantineForPeriodicity(max) {
    const solutions = [];
    for (let w = 0; w <= max; w++) {
        for (let x = 0; x <= max; x++) {
            for (let y = 0; y <= max; y++) {
                for (let z = 0; z <= max; z++) {
                    const lhs = 21900 * w + 60 * x;
                    const rhs = 365 * y + 366 * z;
                    if (lhs === rhs) {
                        const solution = { w, x, y, z };
                        solutions.push(solution);
                    }
                }
            }
        }
    }
    return solutions
}