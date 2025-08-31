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

function solveMinDiophantineForPeriodicity(max) {
    let temp = 0;
    let min_solution = 100000000;
    let min_variables = null;

    for (let w = 1; w <= max; w++) {
        for (let x = 1; x <= max; x++) {
            for (let y = 1; y <= max; y++) {
                const n = 21900 * w + 60 * x - 365 * y;
                if (n % 366 === 0) {
                    const z = n / 366;
                    temp = 365 * y + 366 * z
                    if (z > 0 && z <= max && Math.min(min_solution, temp) === temp) {
                        min_variables = { w, x, y, z };
                        min_solution = temp
                    }
                }
            }
        }
    }
    return [min_variables, min_solution]
}

// Solution for min: w=1, x=7, y=6, z=55 --- 22320 days or ~61.1 years
console.log(solveMinDiophantineForPeriodicity(55))