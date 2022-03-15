create table casts(
    cid integer not null,
    spellName text not null,
    primary key(cid, spellName),
    foreign key(cid) references characters(cid),
    foreign key(spellName) references spells(spellName)
);