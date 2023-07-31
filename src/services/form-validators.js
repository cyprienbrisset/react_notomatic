export class ValidatorService {
    static min(value, min) {
        if(value.length<min) {
            return `Veuillez taper au moins ${min} lettre(s)`
        }
    }

    static max(value, max) {
        if(value.length>max) {
            return `Veuillez taper maximum ${max} lettre(s)`
        }
    }
}