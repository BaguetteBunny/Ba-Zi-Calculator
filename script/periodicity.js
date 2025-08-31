// https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny#Periodicity_of_Four_Pillars
// Algorithm to solve the iso-Gregorian quadruplet

function solveDiophantineForPeriodicity(max) {
    const solutions = [];
    for (let w = 0; w <= max; w++) {
        for (let x = 0; x <= max; x++) {
            for (let y = 0; y <= max; y++) {
                const n = 21900 * w + 60 * x - 365 * y;
                if (n % 366 === 0) {
                    const z = n / 366;
                    if (z >= 0 && z <= max) {
                        const solution = { w, x, y, z };
                        solutions.push(solution);
                    }
                }
            }
        }
    }
    return solutions.splice(1); // Remove w = x = y = z = 0 because redundant
}

console.log(solveDiophantineForPeriodicity(500))