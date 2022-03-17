CREATE TABLE characters(
    cid integer primary key autoincrement not null,
    name text not null,
    class text not null,
    subclass text not null,
    race text not null,
    alignment text not null,
    charLvl integer not null,
    str integer not null,
    dex integer not null,
    con integer not null,
    int integer not null,
    wis integer not null,
    cha integer not null,
    maxHp integer not null,
    wears text not null,
    foreign key (wears) references armor(armorName)
);