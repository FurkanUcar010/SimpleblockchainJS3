const SHA256 = require('crypto-js/SHA256');

class Blok {
    constructor(index, datum, gegevens, vorigeHash = '') {
        // elke blok heeft een index, date, data en vorige hash
        this.index = index;
        this.datum = datum;
        this.gegevens = gegevens;
        this.vorigeHash = vorigeHash;
        this.hash = this.berekenHash;
    }

    berekenHash() {
        return SHA256(this.index + this.vorigeHash + this.datum + JSON.stringify(this.gegevens)).toString();
    }
}

class blockchain {
    constructor() {
        this.chain = [this.maakNieuwBlok()];
    }
    maakNieuwBlok() {
        return new Blok(0, "01/01/2019", "Begin blok", "0");
    }

    getLaatsteBlok(){ 
        return this.chain[this.chain.length - 1];
    }
    voegBlok(nieuwBlok) {
        nieuwBlok.vorigeHash = this.getLaatsteBlok().hash;
        nieuwBlok.hash = nieuwBlok.berekenHash();
        this.chain.push(nieuwBlok);
    }
}

let furkanCoin = new blockchain();
furkanCoin.voegBlok(new Blok(1, "10/01/2019", {aantal: 4}));
furkanCoin.voegBlok(new Blok(10, "15/01/2019", {aantal: 10}));

console.log(JSON.stringify(furkanCoin, null, 4));