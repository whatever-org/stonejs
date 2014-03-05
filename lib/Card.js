function Card(id, name, cost, attack, health, info, effect, isGold){
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.attack = attack;
    this.health = health;
    this.info = info;
    this.effects = effect;
    this.isGold = isGold;
}

module.exports = Card;

function Effect(name, decription){
    this.name = name;
    this.description = description
}
