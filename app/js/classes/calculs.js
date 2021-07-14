export default class Calculs {
    static calcHalfLife(nbre1, nbre2, duree) {
        let Ke = (Math.log(nbre1) - Math.log(nbre2)) / duree;
        let halfLife =  Math.log(2) / Ke;
        return halfLife.toFixed(1);
    }
}
