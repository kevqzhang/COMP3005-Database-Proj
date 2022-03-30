select * from characters
where cid
in (
    select cid from wields
    where weaponName = "Dagger"
);