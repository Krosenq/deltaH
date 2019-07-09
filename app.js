/**
 * Custom functions for thermodynamic gas calculations at constant pressure
 */


// Coefficients for calculating heat capacity and enthalpy for N2. Constants from NIST.gov. Equation is based on integrated form of Cp = A + B*t + C*t^2 + D*t^3 + E/t^2
const N2_CP_COEFFICIENTS = {
    range0_500K: [28.9864, 1.85398, -9.64746, 16.6354, 0.00012],
    range500_2000K: [19.5058, 19.8871, -8.59854, 1.36978, 0.5276],
    range2000_6000K: [35.5187, 1.12873, -0.1961, 0.01466, -4.55376]
}

const MOLAR_WEIGHT_N2 = 28.0134;

const molarVolume = 0.02241 // m3n/mol at standard conditions, 0C

function celsiusToKelvin(t) {
    //converts temperature from celsius to Kelvin (Integer or float)
    return t + 273.15;
}

function enthalpyN2Calc(temp, reftemp, kelvin = false) {

    let t;
    let tr;
    let tempRange;
    let cpmByMass;
    let cpmByVolume;
    let dH;
    
    if (!kelvin) {
        t = celsiusToKelvin(temp)/1000;
        tr = celsiusToKelvin(reftemp)/1000;
    } else {
        t = temp/1000
        tr = reftemp/1000
    }

    if (t === tr) {t += 0.01/1000};

    if (temp < 500 && temp > 6000) {

        return "temperature outside range"
     
    } else if (temp < 500) {

        tempRange = N2_CP_COEFFICIENTS.range0_500K;

    } else if (temp < 2000) {

        tempRange = N2_CP_COEFFICIENTS.range500_2000K;

    } else if (temp <= 6000) {

        tempRange = N2_CP_COEFFICIENTS.range2000_6000K;
        
    } 
    
    //return integrated enhalpy based on base equation Cp = A + B*t + C*t^2 + D*t^3 + E/t^2  
    let enthalpyN2atT = 0;
    let enthalpyN2atTr = 0;
    for (let i = 0; i < tempRange.length-1; i++) {
        //kJ/mol
        enthalpyN2atT += (t**(i+1)) * tempRange[i]/(i+1)
        enthalpyN2atTr += (tr**(i+1)) * tempRange[i]/(i+1)
    }
    enthalpyN2atT -= tempRange[tempRange.length - 1]/t
    enthalpyN2atTr -= tempRange[tempRange.length - 1]/tr
    
    dH = enthalpyN2atT - enthalpyN2atTr

    cpmByMass = (dH/MOLAR_WEIGHT_N2 * 1000) / (t-tr) / 1000
    cpmByVolume = 1/molarVolume * MOLAR_WEIGHT_N2/1000 * cpmByMass;

    return ["dH: " + dH, "cpm by mass: " + cpmByMass, "cpm by volume: " + cpmByVolume]

}

console.log(enthalpyN2Calc(1800, 298.15, true))