/**
 * Custom function for calculating water properties
 */

//Reference constants

const r = 0.461526;                 // R = 0.461 526 kJ kg^-1 K^-1
// const tempCritical = 647.096;       // Tc = 647.096 K
// const pressureCritical = 22.064     // pc = 22.064 MPa
// const densiteCritical = 322         // dC = 322 kg m^-3

const p_a_region1 = 16.53
const t_a_region1 = 1386

/**
 * Numerical values of the coefficients and exponents of the dimensionless Gibbs free energy
 * for region 1, defined as an array of arrays in the form of [[I1, J1, n1]...[I34, J34, n34]]
 * 
 * region 1 covers the following range of
 * temperature and pressure; 273.15 K <= T <= 623.15 K  ps(T) <= p <= 100 MPa . 
 */

const region1Coefficients = [

    [0, -2, 0.14632971213167],
    [0, -1, -0.84548187169114],
    [0, 0, -0.37563603672040*(10**(1))],
    [0, 1, 0.338551691683850*(10**(1))],
    [0, 2, -0.95791963387872],
    [0, 3, 0.15772038513228],
    [0, 4, -0.16616417199501*(10**(-1))],
    [0, 5, 0.81214629983568*(10**(-3))],
    [1, -9, 0.28319080123804*(10**(-3))],
    [1, -7, -0.60706301565874*(10**(-3))],
    [1, -1, -0.18990068218419*(10**(-1))],
    [1, 0, -0.32529748770505*(10**(-1))],
    [1, 1, -0.21841717175414*(10**(-1))],
    [1, 3, -0.52838357969930*(10**(-4))],
    [2, -3, -0.47184321073267*(10**(-3))],
    [2, 0, -0.30001780793026*(10**(-3))],
    [2, 1, 0.47661393906987*(10**(-4))],
    [2, 3, -0.44141845330846*(10**(-5))],
    [2, 17, -0.72694996297594*(10**(-15))],
    [3, -4, -0.31679644845054*(10**(-4))],
    [3, 0, -0.28270797985312*(10**(-5))],
    [3, 6, -0.85205128120103*(10**(-9))],
    [4, -5, -0.22425281908000*(10**(-5))], 
    [4, -2, -0.65171222895601*(10**(-6))],
    [4, 10, -0.14341729937924*(10**(-12))],
    [5, -8, -0.40516996860117*(10**(-6))], 
    [8, -11, -0.12734301741641*(10**(-8))],
    [8, -6, -0.17424871230634*(10**(-9))],
    [21, -29, -0.68762131295531*(10**(-18))], 
    [23, -31, 0.14478307828521*(10**(-19))],
    [29, -38, 0.26335781662795*(10**(-22))],
    [30, -39, -0.11947622640071*(10**(-22))],
    [31, -40, 0.18228094581404*(10**(-23))],
    [32, -41, -0.93537087292458*(10**(-25))]
]

//test input
let t = 500;
let p = 3;

// console.log(enthalpyRegion1(t, p));

function enthalpyRegion1(t, p) {

    let pS = p/p_a_region1;
    let tau = t_a_region1/t;

    //Equation for free energy
    gibbsFreeEnergy = 0;
    for (let i = 0; i < region1Coefficients.length; i++) {
        gibbsFreeEnergy += region1Coefficients[i][2]*((7.1-pS)**region1Coefficients[i][0])*region1Coefficients[i][1]*((tau-1.222)**(region1Coefficients[i][1]-1))
    }

    return tau * gibbsFreeEnergy * r * t
}

/**
 * Custom function for calculating enthalpy change in gas mixtures
 */

// const N2_CP_COEFFICIENTS = [0.029, 0.2199*(10**-5), 0.5723*(10**-8), -2.871*(10**-12)]

const N2_CP_COEFFICIENTS = {
    range0_500K: [28.9864, 1.85398, -9.64746, 16.6354, 0.00012],
    range500_2000K: [],
    range2000_6000K: []
}


function celsiusToKelvin(t) {
    return t + 273.15
}

function enthalpyN2Calc(temp, reftemp) {
    
    t = celsiusToKelvin(temp)
    tr = celsiusToKelvin(temp)

    let enthalpyN2atT = 0;
    let enthalpyN2atTr = 0;
    
    
    //return integrated enhalpy based on the derivative a +bT + cT^2 + dT^3
    // let enthalpyN2 = N2_CP_COEFFICIENTS[0]*(temperature) + N2_CP_COEFFICIENTS[1]*(temperature)/2 + N2_CP_COEFFICIENTS[2]*(temperature)/3 + N2_CP_COEFFICIENTS[3]*(temperature)/4
    let enthalpyN2 = 0;
    for (let i = 0; i < N2_CP_COEFFICIENTS.length; i++) {
        //kJ/mol
        enthalpyN2 += (t**(i+1)) * N2_CP_COEFFICIENTS[i]/(i+1)
    }
    console.log(enthalpyN2, "kJ/mol")

}

const N2_CP_COEFFICIENTS2 = [0.029, 0.2199*(10**-5), 0.5723*(10**-8), -2.871*(10**-12)]

enthalpyN2Calc(500)