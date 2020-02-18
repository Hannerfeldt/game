$(document).ready(function () {

    let northbtn = $('<div>');
    northbtn.insertBefore($('#map'))
        .addClass("button")
        .html("go north")
        .on("click", function () {
            if (you.ypos == 9) {

            }
            else {
                you.ypos++;
                you.movePos();
                westbtn.css("display", "none");
                northbtn.css("display", "none");
                eastbtn.css("display", "none");
                southbtn.css("display", "none");
                $(window).off();
            }
        });

    let eastbtn = $('<div>');
    eastbtn.insertBefore($('#map'))
        .addClass("button")
        .html("go east")
        .on("click", function () {
            if (you.xpos == 9) {

            }
            else {
                you.xpos++;
                you.movePos();
                westbtn.css("display", "none");
                northbtn.css("display", "none");
                eastbtn.css("display", "none");
                southbtn.css("display", "none");
                $(window).off();
            }
        });

    let southbtn = $('<div>');
    southbtn.insertBefore($('#map'))
        .addClass("button")
        .html("go south")
        .on("click", function () {
            if (you.ypos == 0) {

            }
            else {
                you.ypos--;
                you.movePos();
                westbtn.css("display", "none");
                northbtn.css("display", "none");
                eastbtn.css("display", "none");
                southbtn.css("display", "none");
                $(window).off();
            }
        });

    let westbtn = $('<div>');
    westbtn.insertBefore($('#map'))
        .addClass("button")
        .html("go west")
        .on("click", function () {
            if (you.xpos == 0) {

            }
            else {
                you.xpos--;
                you.movePos();
                westbtn.css("display", "none");
                northbtn.css("display", "none");
                eastbtn.css("display", "none");
                southbtn.css("display", "none");
                $(window).off();
            }
        });

    let options = $('<div>');
    options.appendTo($('#container'))
        .addClass("option");

    let yes = $('<div>');
    yes.appendTo($('.option'))
        .addClass("yes")
        .html("yes")
        .on("click", function () {

            loot = grid[you.xpos][you.ypos].enemy.loot.constructor.name;
            switch (loot) {
                case "Head":
                    you.armor -= you.head.armor;
                    you.str -= you.head.strength;
                    you.agi -= you.head.agility;
                    you.int -= you.head.intellect;
                    $('#player').children()[0].src = "img/head/" + grid[you.xpos][you.ypos].enemy.loot.name + ".png";
                    you.head = grid[you.xpos][you.ypos].enemy.loot;
                    you.armor += grid[you.xpos][you.ypos].enemy.loot.armor;
                    you.str += grid[you.xpos][you.ypos].enemy.loot.strength;
                    you.agi += grid[you.xpos][you.ypos].enemy.loot.agility;
                    you.int += grid[you.xpos][you.ypos].enemy.loot.intellect;
                    $('#headtxt').html("head: " + grid[you.xpos][you.ypos].enemy.loot.name);
                    $('#headstats').html("armor: " + grid[you.xpos][you.ypos].enemy.loot.armor +
                        " str: " + grid[you.xpos][you.ypos].enemy.loot.strength +
                        " agi: " + grid[you.xpos][you.ypos].enemy.loot.agility +
                        " int: " + grid[you.xpos][you.ypos].enemy.loot.intellect);
                    break;
                case "Chest":
                    you.armor -= you.chest.armor;
                    you.str -= you.chest.strength;
                    you.agi -= you.chest.agility;
                    you.int -= you.chest.intellect;
                    $('#player').children()[1].src = "img/chest/" + grid[you.xpos][you.ypos].enemy.loot.name + ".png";
                    you.chest = grid[you.xpos][you.ypos].enemy.loot;
                    you.armor += grid[you.xpos][you.ypos].enemy.loot.armor;
                    you.str += grid[you.xpos][you.ypos].enemy.loot.strength;
                    you.agi += grid[you.xpos][you.ypos].enemy.loot.agility;
                    you.int += grid[you.xpos][you.ypos].enemy.loot.intellect;
                    $('#chesttxt').html("chest: " + grid[you.xpos][you.ypos].enemy.loot.name);
                    $('#cheststats').html("armor: " + grid[you.xpos][you.ypos].enemy.loot.armor +
                        " str: " + grid[you.xpos][you.ypos].enemy.loot.strength +
                        " agi: " + grid[you.xpos][you.ypos].enemy.loot.agility +
                        " int: " + grid[you.xpos][you.ypos].enemy.loot.intellect);
                    break;
                case "Weapon":
                    you.weapon = grid[you.xpos][you.ypos].enemy.loot;
                    $('#player').css("background-image", "url(img/player/" + you.weapon.name + "/player1.png");
                    $('#weapontxt').html("weapon: " + you.weapon.name);

                    $('#weapondmg').html("damage: " + you.weapon.damage);
                    $('#durtxt').html("durabilitiy: " + you.weapon.durability);
                    break;

            }
            $('#buff-one').html("Str: " + you.str);
            $('#buff-two').html("Agi: " + you.agi);
            $('#buff-three').html("Int: " + you.int);

            if (you.health >= you.maxhealthadd()) {
                you.health = you.maxhealthadd();
            }


            let hpPercent = you.health / you.maxhealthadd();
            hpPercent = hpPercent * 100;

            $('#health').css("width", hpPercent + "%");

            $('#healthtxt').html(you.health + "/" + you.maxhealthadd() + " hp");

            options.css("display", "none");
            westbtn.css("display", "block");
            northbtn.css("display", "block");
            eastbtn.css("display", "block");
            southbtn.css("display", "block");
            controlls(you);
        });

    let no = $('<div>');
    no.appendTo($('.option'))
        .addClass("no")
        .html("no")
        .on("click", function () {
            options.css("display", "none");
            westbtn.css("display", "block");
            northbtn.css("display", "block");
            eastbtn.css("display", "block");
            southbtn.css("display", "block");
            controlls(you);
        });

    let dropname = $('<span>');
    dropname.appendTo($('.option'))
        .addClass("dropname");


    let Weapon = function (n, d, m) {
        this.name = n;
        this.damage = d;
        this.durability = 0;
        this.magic = m;
        this.imgurl = "";
    }

    let listOfWeapon = [

        ["Quicksilver", 3, 0],
        ["Pole", 3, 2],
        ["Shortsword", 4, 0],
        ["Torch", 4, 1],
        ["Swiftblade", 5, 0],
        ["Battlescythe", 6, 0],
        ["Enlightenment", 7, 3],
        ["Chopper", 7, 0],
        ["Fleshrender", 8, 0],
        ["Basher", 9, 0],
        ["Spellbinder", 10, 4],
        ["Greataxe", 10, 0],
        ["Ironbark", 11, 0],
        ["Giantslayer", 12, 0],
        ["Betrayer", 13, 5],
        ["Battlestar", 13, 0],
        ["Lionheart", 14, 0],
        ["Icebreaker", 15, 0],
        ["Prideful", 16, 0],
        ["Serpent", 17, 2],
        ["Skullcrusher", 17, 0],
        ["Sunflower", 18, 2],
        ["Echo", 18, 0],
        ["Thorn", 19, 0],
        ["Oblivion", 20, 0],
        ["Spiritstaff", 20, 6]

    ];

    let Head = function (n, a, t) {
        this.name = n;
        this.armor = a;
        this.agility = 0;
        this.strength = 0;
        this.intellect = 0;
        this.imgurl = "";
        this.type = t;
    }

    let listOfHead = [

        ["Prophecies", 0, 1],
        ["Bandana", 1, 2],
        ["Headguard", 2, 3],
        ["Crown", 2, 1],
        ["Cap", 2, 2],
        ["Riddles", 3, 2],
        ["Greathelm", 4, 3],
        ["Divine", 3, 1],
        ["Facemask", 4, 2],
        ["Sunfire", 5, 3]

    ];

    let Chest = function (n, a, t) {
        this.name = n;
        this.armor = a;
        this.agility = 0;
        this.strength = 0;
        this.intellect = 0;
        this.imgurl = "";
        this.type = t;
    }

    let listOfChest = [

        ["Rags", 1, 2],
        ["Cloth", 1, 1],
        ["Breastplate", 2, 3],
        ["Fortune", 2, 2],
        ["Chestguard", 3, 3],
        ["Peacekeeper", 4, 3],
        ["Challenger", 5, 1],
        ["Reckoning", 6, 1],
        ["Prophet", 6, 2],
        ["Sunstorm", 7, 3],
        ["Timeworn", 8, 1]

    ];

    let Enemy = function (n, d, di) {
        this.name = n;
        this.damage = d;
        this.dialog = di;
        this.health = 0;
        this.loot = "";
        this.expgive = 0;
        this.imgurl = "";
        this.fullenemyhealth;
    }

    let Tile = function (n, e) {
        this.number = n;
        this.enemy = e;
    }


    let listOfEnemy = [

        ["Goblin", 4, "Uh?"],
        ["Imp", 5, "HAHA!"],
        ["Skeleton", 8, "..."],
        ["Barbarian", 16, "I've got you now!"],
        ["Bear", 20, "RAWR"],
        ["Troll", 25, "HEHE"],
        ["Werewolf", 30, "AAARH!"],
        ["Wizard", 38, "HOHO"],
        ["Giant", 45, "SMASH!"],
        ["Slime", 50, "..."]

    ];

    let grid = [];

    let World = function () {

        this.createWorld = function (r) {
            let disFromSpawn = 0;
            let maxDisFromSpawn = 0;
            let chanceList = [];
            let chance = 1;
            let divBy = 0;
            let numerator = 0;
            let decimal = 0;
            let d = 0;
            let extra = 0;
            let total = 0;
            let rng = 0;

            for (j = 0; j < r; j++) {
                let row = [];
                for (i = 0; i < r; i++) {
                    let h = (j + 1) + r * i;

                    disFromSpawn = (i) + (j);
                    let typeOfLoot;
                    let loot;
                    maxDisFromSpawn = r * 2 - 1;

                    let u = ((disFromSpawn + 1) / maxDisFromSpawn);
                    u = Math.round(listOfEnemy.length * u);
                    u -= 2;


                    let rand = (Math.floor(Math.random() * (3 - 0)) + 0) + u;

                    if (rand > 9) {
                        rand = 9;
                    }
                    else if (rand < 0) {
                        rand = 0;
                    }
                    let typeOfEnemy = listOfEnemy[rand];
                    let enemy = new Enemy(typeOfEnemy[0], typeOfEnemy[1], typeOfEnemy[2]);

                    enemy.health = (Math.floor(Math.random() * (10 - 5)) + 5) + (disFromSpawn * 10);
                    enemy.fullenemyhealth = enemy.health;
                    let lootType = (Math.floor(Math.random() * (4 - 1)) + 1);



                    switch (lootType) {

                        case 1:

                            maxDisFromSpawn = r * 2 - 1;

                            chanceTable = listOfWeapon.length / maxDisFromSpawn;

                            chanceTable = chanceTable * (disFromSpawn + 1);

                            chanceTable = Math.round(chanceTable);

                            if (chanceTable <= 0) {
                                chanceTable = 1;
                            }

                            chanceList = [];

                            chance = 1;
                            divBy = 0;
                            numerator = 0;
                            decimal = 0;
                            d = 0;
                            if (chanceTable < (listOfWeapon.length - chanceTable) + 1) {
                                for (c = -1; c < chanceTable - 1; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = listOfWeapon.length - chanceTable;
                                divBy = 2 / Math.pow(2, divBy);
                                numerator = divBy / Math.pow(2, (chanceTable - 1));
                                decimal = numerator / divBy;

                                chance = chance + decimal;

                            }
                            else {
                                d = listOfWeapon.length - chanceTable;
                                for (c = -1; c < d; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = chanceTable - 1;
                                divBy = 2 / Math.pow(2, divBy);

                                numerator = divBy / Math.pow(2, (listOfWeapon.length - chanceTable));
                                decimal = numerator / divBy;
                                chance = chance + decimal;

                            }


                            chance = 100 / chance;
                            total = 0;
                            for (let o = 0; o < listOfWeapon.length; o++) {
                                total += Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));
                                chanceList[o] = Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));



                            }
                            extra = 0;
                            if (total < 100) {
                                extra = 100 - total;
                                chanceList[chanceTable - 1] += extra;
                            }
                            else if (total > 100) {
                                extra = total - 100;
                                chanceList[chanceTable - 1] -= extra;
                            }

                            rng = (Math.floor(Math.random() * (100 - 1)) + 1);
                            for (let k = 0; k < chanceList.length; k++) {
                                if (k > 0) {
                                    chanceList[k] = chanceList[k] + chanceList[k - 1];
                                }
                                if (rng <= chanceList[k]) {

                                    typeOfLoot = listOfWeapon[k];
                                    loot = new Weapon(typeOfLoot[0], typeOfLoot[1], typeOfLoot[2]);
                                    loot.durability = Math.floor(Math.random() * (40 - 20)) + 20;
                                    enemy.loot = loot;
                                    k = chanceList.length - 1;
                                }
                            }

                            break;
                        case 2:

                            maxDisFromSpawn = r * 2 - 1;

                            chanceTable = listOfHead.length / maxDisFromSpawn;

                            chanceTable = chanceTable * (disFromSpawn + 1);


                            chanceTable = Math.round(chanceTable);

                            if (chanceTable <= 0) {
                                chanceTable = 1;
                            }
                            chanceList = [];



                            chance = 1;
                            divBy = 0;
                            numerator = 0;
                            decimal = 0;
                            d = 0;

                            if (chanceTable < (listOfHead.length - chanceTable) + 1) {
                                for (c = -1; c < chanceTable - 1; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = listOfHead.length - chanceTable;
                                divBy = 2 / Math.pow(2, divBy);
                                numerator = divBy / Math.pow(2, (chanceTable - 1));
                                decimal = numerator / divBy;

                                chance = chance + decimal;

                            }
                            else {
                                d = listOfHead.length - chanceTable;
                                for (c = -1; c < d; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = chanceTable - 1;
                                divBy = 2 / Math.pow(2, divBy);

                                numerator = divBy / Math.pow(2, (listOfHead.length - chanceTable));
                                decimal = numerator / divBy;
                                chance = chance + decimal;

                            }


                            chance = 100 / chance;
                            total = 0;
                            for (let o = 0; o < listOfHead.length; o++) {
                                total += Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));
                                chanceList[o] = Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));

                            }
                            extra = 0;
                            if (total < 100) {
                                extra = 100 - total;
                                chanceList[chanceTable - 1] += extra;
                            }
                            else if (total > 100) {
                                extra = total - 100;
                                chanceList[chanceTable - 1] -= extra;
                            }

                            rng = (Math.floor(Math.random() * (100 - 1)) + 1);

                            for (let k = 0; k < chanceList.length; k++) {

                                if (k > 0) {
                                    chanceList[k] = chanceList[k] + chanceList[k - 1];

                                }
                                if (rng <= chanceList[k]) {

                                    typeOfLoot = listOfHead[k];
                                    loot = new Head(typeOfLoot[0], typeOfLoot[1], typeOfLoot[2]);
                                    switch (loot.type) {
                                        case 0:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (3 - 0)) + 0)) / 2);
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (3 - 0)) + 0)) / 2);
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (3 - 0)) + 0)) / 2);

                                            break;
                                        case 1:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.intellect = (Math.floor(Math.random() * (4 - 0)) + 0) + k;

                                            break;
                                        case 2:
                                            loot.agility = (Math.floor(Math.random() * (4 - 0)) + 0) + k;
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);

                                            break;
                                        case 3:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.strength = (Math.floor(Math.random() * (4 - 0)) + 0) + k;
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);

                                            break;
                                    }

                                    enemy.loot = loot;
                                    k = chanceList.length - 1;
                                }
                            }

                            break;
                        case 3:

                            maxDisFromSpawn = r * 2 - 1;

                            chanceTable = listOfChest.length / maxDisFromSpawn;

                            chanceTable = chanceTable * (disFromSpawn + 1);

                            chanceTable = Math.round(chanceTable);
                            if (chanceTable <= 0) {
                                chanceTable = 1;
                            }
                            chanceList = [];

                            chance = 1;
                            divBy = 0;
                            numerator = 0;
                            decimal = 0;
                            d = 0;
                            if (chanceTable < (listOfChest.length - chanceTable) + 1) {
                                for (c = -1; c < chanceTable - 1; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = listOfChest.length - chanceTable;
                                divBy = 2 / Math.pow(2, divBy);
                                numerator = divBy / Math.pow(2, (chanceTable - 1));
                                decimal = numerator / divBy;

                                chance = chance + decimal;

                            }
                            else {
                                d = listOfChest.length - chanceTable;
                                for (c = -1; c < d; c++) {
                                    if (c >= 0) {
                                        chance = chance + 1 / Math.pow(2, c);
                                    }
                                }
                                divBy = chanceTable - 1;
                                divBy = 2 / Math.pow(2, divBy);
                                numerator = divBy / Math.pow(2, (listOfChest.length - chanceTable));
                                decimal = numerator / divBy;
                                chance = chance + decimal;
                            }
                            chance = 100 / chance;
                            total = 0;
                            for (let o = 0; o < listOfChest.length; o++) {
                                total += Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));
                                chanceList[o] = Math.round(chance / Math.pow(2, Math.abs(chanceTable - (o + 1))));
                            }
                            extra = 0;
                            if (total < 100) {
                                extra = 100 - total;
                                chanceList[chanceTable - 1] += extra;
                            }
                            else if (total > 100) {
                                extra = total - 100;
                                chanceList[chanceTable - 1] -= extra;
                            }

                            rng = (Math.floor(Math.random() * (100 - 1)) + 1);
                            for (let k = 0; k < chanceList.length; k++) {
                                if (k > 0) {
                                    chanceList[k] = chanceList[k] + chanceList[k - 1];
                                }
                                if (rng <= chanceList[k]) {

                                    typeOfLoot = listOfChest[k];
                                    loot = new Chest(typeOfLoot[0], typeOfLoot[1], typeOfLoot[2]);
                                    switch (loot.type) {
                                        case 0:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (3 - 1)) + 1)) / 2);
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (3 - 1)) + 1)) / 2);
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (3 - 1)) + 1)) / 2);

                                            break;
                                        case 1:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.intellect = (Math.floor(Math.random() * (4 - 0)) + 0) + k;

                                            break;
                                        case 2:
                                            loot.agility = (Math.floor(Math.random() * (4 - 0)) + 0) + k;
                                            loot.strength = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);

                                            break;
                                        case 3:
                                            loot.agility = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);
                                            loot.strength = (Math.floor(Math.random() * (4 - 0)) + 0) + k;
                                            loot.intellect = Math.round((k * (Math.floor(Math.random() * (2 - 0)) + 0)) / 2);

                                            break;
                                    }
                                    enemy.loot = loot;
                                    k = chanceList.length - 1;
                                }
                            }
                            break;
                    }

                    let exp = (Math.floor(Math.random() * (50 - 25)) + 25) * (disFromSpawn + 1);
                    exp = Math.round(exp);
                    enemy.expgive = exp;
                    let tile = new Tile(h, enemy);

                    row.push(tile);
                }
                grid.push(row);
            }
        }
    }

    let newworld = new World();

    newworld.createWorld(10);

    for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
            let dot = $('<div>');

            switch (grid[x][y].enemy.loot.constructor.name) {
                case "Chest":
                    dot.addClass('chest ' + x + y)
                        .css("grid-column", x + 1)
                        .css("grid-row", (10 - y))
                        .appendTo($('#map'));

                    break;
                case "Head":
                    dot.addClass('head ' + x + y)
                        .css("grid-column", x + 1)
                        .css("grid-row", (10 - y))
                        .appendTo($('#map'));

                    break;
                case "Weapon":
                    dot.addClass('weapon ' + x + y)
                        .css("grid-column", x + 1)
                        .css("grid-row", (10 - y))
                        .appendTo($('#map'));

                    break;
            }


        }
    }
    let circle = $('<div>');
    circle.addClass('circle')
        .appendTo($('#map'));

    console.log(grid);

    let Player = function () {
        this.xpos = 0;
        this.ypos = 0;



        this.health = 100;
        this.weapon = { name: "stick", damage: 2, durability: 90, magic: 0 };
        this.head = { armor: 0, strength: 0, agility: 0, intellect: 0 };
        this.chest = { armor: 0, strength: 0, agility: 0, intellect: 0 };
        this.exp = 0;
        this.level = 1;

        this.armor = 0;
        this.agi = 0;
        this.str = 0;
        this.int = 0;


        this.crit = function () {
            return (this.agi) * 1.25;
        }
        this.dodge = function () {
            return (this.agi) * 1.5;
        }
        this.maxhealth = 100;

        this.maxhealthadd = function () {

            return this.maxhealth + (this.str * 5);
        }


        this.combo = 0;

        this.movePos = function () {
            let pos = grid[this.xpos][this.ypos];

            let npc = $('#npc').children()[0];

            if (pos.enemy.health > 0) {
                let dot = $('.' + this.xpos + "" + this.ypos);
                dot.css("background-color", "black")
                    .css("width", "50%")
                    .css("height", "50%")
                    .css("border-radius", "50%");
            }

            $('#npcname').html(pos.enemy.name);
            $('#npchealthtxt').html(pos.enemy.health);
            $('.circle').css("grid-column", (this.xpos + 1))
                .css("grid-row", (10 - this.ypos));

            if (pos.enemy.health <= 0) {
                npc.src = "img/" + pos.enemy.name + "3.png";
                $('.button')[0].css("display", "block");
            }
            else {
                npc.src = "img/" + pos.enemy.name + "1.png";
                combat(grid, you);
            }

        }

        this.levelup = function () {
            console.log("levelup");
            this.exp = this.exp - (this.level * 150);
            this.level++;

            let lvltxt = $('<span>');
            lvltxt.html("level: " + this.level)
                .addClass('leveluptxt')
                .appendTo('#content');

            setTimeout(function () {
                lvltxt.remove();
            }, 5000)

            let percentage = this.exp / (this.level * 150);
            percentage = percentage * 100;

            $('#exp').css("width", percentage + "%");

            $('#lvl').html("LVL: " + this.level);


            // let hpPercent = this.health/this.maxhealthadd();
            // hpPercent = hpPercent*100;

            // $('#health').css("width", hpPercent + "%");

            this.health = this.maxhealthadd();

            $('#healthtxt').html(this.health + "/" + this.maxhealthadd() + " hp");
            $('#health').css("width", "100%");

            $('#talent-container').css("display", "flex");
        }
    }

    let you = new Player();

    you.movePos();

    $('.one').on("click", function () {
        you.str += 1;

        $('#talent-container').css("display", "none");

        $('#buff-one').html("Str: " + you.str);

        you.health = you.maxhealthadd();

        $('#healthtxt').html(you.health + "/" + you.maxhealthadd() + " hp");
        $('#health').css("width", "100%");
    })
    $('.two').on("click", function () {
        you.agi += 1;

        $('#talent-container').css("display", "none");

        $('#buff-two').html("Agi: " + you.agi);

    })
    $('.three').on("click", function () {
        you.int += 1;

        $('#talent-container').css("display", "none");

        $('#buff-three').html("Int: " + you.int);
    })
})

function combat(grid, you) {

    let pos = grid[you.xpos][you.ypos];

    let dia = $("<div>");
    dia.html(pos.enemy.dialog)
        .appendTo($('#content'))
        .addClass("npcdialog");
    setTimeout(function () {
        dia.remove();
    }, 2000)


    $('#npchealth').css("width", "100%");

    enemyAttack(pos, you);
}

function enemyAttack(pos, you) {
    let randDodge = Math.floor(Math.random() * (100 - 1)) + 1;

    if (randDodge <= you.dodge()) {
        $('#player').addClass('dodge');
        $('#npc').children()[0].src = "img/" + pos.enemy.name + "2.png";
        $('#npc').css("right", "70%");
        setTimeout(function () {
            $('#npc').children()[0].src = "img/" + pos.enemy.name + "1.png";
            $('#npc').css("right", "0%");
            $('#player').removeClass('dodge');
        }, 500)
        $('#npcdmg').css("background-image", "url(img/dodgebub.png)");
        $('#npcdmg').css("display", "block");
        $('#npcdmgtxt').html("");
        setTimeout(function () {
            $('#npcdmg').css("display", "none");
        }, 1000)

    }
    else {
        let dmg = pos.enemy.damage - you.armor;
        if (dmg <= 0) {
            dmg = 0;

            $('#npcdmg').css("background-image", "url(img/armorbub.png)");
        }
        else {
            $('#npcdmg').css("background-image", "url(img/dmgbub.png)");
        }
        you.health -= dmg;
        $('#npc').children()[0].src = "img/" + pos.enemy.name + "2.png";
        $('#npc').css("right", "70%");
        setTimeout(function () {
            $('#npc').children()[0].src = "img/" + pos.enemy.name + "1.png";
            $('#npc').css("right", "0%");
            $('#player').removeClass('hurt');
        }, 500)

        let hpPercent = you.health / you.maxhealthadd();
        hpPercent = hpPercent * 100;
        $('#health').css("width", hpPercent + "%");
        $('#healthtxt').html(you.health + "/" + you.maxhealthadd() + " hp");
        $('#npcdmg').css("display", "block");
        $('#npcdmgtxt').html(dmg)
            .css("display", "block");

        $('#player').addClass('hurt');

        setTimeout(function () {
            $('#npcdmg').css("display", "none");
        }, 1000)
    }
    setTimeout(function () {
        if (you.health <= 0) {
            youDead();

        }
        else {
            youPower(pos, you);
        }
    }, 1000)

}

function youPower(pos, you) {

    let amp = 0;
    let dir = true;
    let s = 0;
    let ms = 0;
    $(window).on("keydown", function (e) {
        if (e.which == 32) {
            $(window).off();
            clearInterval(power);
            youAttack(pos, you, amp);
        }
    })
    let start = Math.floor(Math.random() * (9 - 0)) + 0;

    amp = 12.5 * start;
    $("#marker").css("right", amp + "%");

    let power = setInterval(function () {
        ms += 5;
        if (ms >= 100) {
            s++;
            ms = 0;
        }
        if (s == 2) {
            $(window).off();
            clearInterval(power);
            amp = 0;
            youAttack(pos, you, amp);
        }
        $('#time').html(s + ":" + ms);
        if (dir == true) {
            amp += 12.5;

            $("#marker").css("right", amp + "%");

            if (amp >= 100) {
                dir = false;
            }
        }
        else {
            amp -= 12.5;

            $("#marker").css("right", amp + "%");

            if (amp == 0) {
                dir = true;
            }
        }
    }, 50)


}


function youAttack(pos, you, amp) {
    let playerdmg;

    if (amp == 50) {
        $('#marker').css("background-color", "yellow");
        setTimeout(function () {
            $('#marker').css("background-color", "black");
        }, 2000);

        you.combo = you.combo + 1;
        playerdmg = 1;
        $('#combo').html("+" + you.combo);
    }
    else {

        you.combo = 0;
        playerdmg = 0;
        $('#combo').html("");
    }
    if (amp >= 50) {
        amp = ((100 - amp) / 12.5) / 4;
    }
    else {
        amp = (amp / 12.5) / 4;
    }
    if (you.weapon.magic > 0) {
        playerdmg += you.weapon.damage + you.int;

        playerdmg = playerdmg + you.combo;
        playerdmg = Math.round(playerdmg * amp)
        $('#spell').css("opacity", "1");
        $('#spell').css("background-image", "url(img/spell" + you.weapon.magic + ".png)")
            .css("left", "80%");
        setTimeout(function () {
            $('#spell').css("opacity", "0");
            $('#spell').css("left", "70px");
        }, 500)
    }
    else {
        playerdmg += you.weapon.damage + (you.str / 2);

        playerdmg = playerdmg + you.combo;

        playerdmg = Math.round(playerdmg * amp);
        $('#player').css("left", "70%");
    }
    if (playerdmg < 0) {
        playerdmg = 0;
    }
    let randCrit = Math.floor(Math.random() * (100 - 1)) + 1;
    if (randCrit <= you.crit()) {
        playerdmg = playerdmg * 2;
        $('#playerdmg').css("display", "block")
            .css("background-image", "url(img/critbub.png)");
        $('#playerdmgtxt').html(playerdmg)
            .css("display", "block");
        setTimeout(function () {
            $('#playerdmg').css("display", "none");
        }, 1000)
    }
    else if (playerdmg == 0) {
        $('#playerdmg').css("display", "block")
            .css("background-image", "url(img/armorbub.png)");
        $('#playerdmgtxt').html(playerdmg)
            .css("display", "block");
        setTimeout(function () {
            $('#playerdmg').css("display", "none");
        }, 1000)
    }
    else {
        $('#playerdmg').css("display", "block")
            .css("background-image", "url(img/dmgbub.png)");
        $('#playerdmgtxt').html(playerdmg)
            .css("display", "block");
        setTimeout(function () {
            $('#playerdmg').css("display", "none");
        }, 1000)
    }
    pos.enemy.health = pos.enemy.health - playerdmg;
    $('#player').css("background-image", "url(img/player/" + you.weapon.name + "/player2.png");
    $('#npc').addClass('hurt');
    setTimeout(function () {
        $('#player').css("background-image", "url(img/player/" + you.weapon.name + "/player1.png");
        $('#player').css("left", "0%");
        $('#npc').removeClass('hurt');
    }, 500)
    let percentage = pos.enemy.health / pos.enemy.fullenemyhealth;
    percentage = percentage * 100
    $('#npchealth').css("width", percentage + "%");
    $('#npchealthtxt').html(pos.enemy.health + "/" + pos.enemy.fullenemyhealth + "hp");
    if (you.weapon.name != "fist") {
        you.weapon.durability--;
        $('#durtxt').html("durability: " + you.weapon.durability);
    }
    if (you.weapon.durability == 0) {
        you.weapon = { name: "fist", damage: 1, durability: NaN }
        $('#player').css("background-image", "url(img/player/" + you.weapon.name + "/player1.png");
        $('#weapontxt').html("weapon: " + you.weapon.name);
        $('#durtxt').html("durabilitiy: infinite");
        $('#weapondmg').html("damage: " + you.weapon.damage);
    }
    setTimeout(function () {
        if (pos.enemy.health <= 0) {
            enemyDead(pos, you);
        }
        else {
            enemyAttack(pos, you);
        }
    }, 1000)
}

function youDead() {
    $('#player').css("background-image", "url(img/player3.png");
    setTimeout(function () {
        let blackSrc = $('<div>');
        blackSrc.appendTo('body')
            .addClass('blacksrc')
            .html("Game Over");
        let restart = $('<div>');
        restart.appendTo(blackSrc)
            .addClass('restart')
            .html("Restart")
            .on("click", function () {
                location.reload();
            });
        $('#npcdmg').css("display", "none");
    }, 1000)

}

function enemyDead(pos, you) {
    $('#npc').children()[0].src = "img/" + pos.enemy.name + "3.png";

    you.exp += Math.round((pos.enemy.expgive) * (1 + (0.1 * you.int)));

    if (you.exp >= you.level * 150) {

        $('#exp').css("width", "100%");
        $('#player').addClass("ding");

        setTimeout(function () {
            you.levelup();
            $('#player').removeClass("ding");
            $('.talent').on("click", function () {
                drop(pos);
            })
        }, 2000);
    }
    else {
        let percentage2 = you.exp / (you.level * 150);
        percentage2 = percentage2 * 100;
        $('#exp').css("width", percentage2 + "%");
        drop(pos);
    }

    let dot = $('.' + you.xpos + "" + you.ypos);
    dot.css("background-color", "red");

}

function drop(pos) {
    $(".option").css("display", "grid");
    let type = pos.enemy.loot;
    let quality;

    if (type.constructor.name == "Chest") {
        quality = pos.enemy.loot.armor + pos.enemy.loot.agility + pos.enemy.loot.strength + pos.enemy.loot.intellect;

        $('.dropname').html(pos.enemy.name + " dropped <em>" + pos.enemy.loot.name + "</em> with<br/> <strong>" + pos.enemy.loot.armor + " armor</strong> <strong>" + pos.enemy.loot.strength + " str</strong> <strong>" + pos.enemy.loot.agility + " agi</strong>  <strong>" + pos.enemy.loot.intellect + " int</strong>. <br/>Do you wanna loot it?");

        switch (true) {
            case (quality < 12):
                $('.dropname').children()[0].style = "color: gray";
                break;
            case (quality < 15):
                $('.dropname').children()[0].style = "color: blue";
                break;
            case (quality < 23):
                $('.dropname').children()[0].style = "color: purple";
                break;
            case (quality < 26):
                $('.dropname').children()[0].style = "color: orange";
                break;
            default:
                break;
        }
    }
    else if (type.constructor.name == "Head") {
        quality = pos.enemy.loot.armor + pos.enemy.loot.agility + pos.enemy.loot.strength + pos.enemy.loot.intellect;

        $('.dropname').html(pos.enemy.name + " dropped <em>" + pos.enemy.loot.name + "</em> with<br/> <strong>" + pos.enemy.loot.armor + " armor</strong> <strong>" + pos.enemy.loot.strength + " str</strong> <strong>" + pos.enemy.loot.agility + " agi</strong> <strong>" + pos.enemy.loot.intellect + " int</strong>. <br/>Do you wanna loot it?");

        switch (true) {
            case (quality < 12):
                $('.dropname').children()[0].style = "color: gray";
                break;
            case (quality < 15):
                $('.dropname').children()[0].style = "color: blue";
                break;
            case (quality < 23):
                $('.dropname').children()[0].style = "color: purple";
                break;
            case (quality < 26):
                $('.dropname').children()[0].style = "color: orange";
                break;
            default:
                break;
        }
    }
    else if (type.constructor.name == "Weapon") {
        quality = pos.enemy.loot.damage + pos.enemy.loot.durability;

        $('.dropname').html(pos.enemy.name + " dropped <em>" + pos.enemy.loot.name + "</em> with<br/> <strong>" + pos.enemy.loot.damage + "</strong> damage and <strong>" + pos.enemy.loot.durability + "</strong> durability." + "<br/>Do you wanna loot it?");

        switch (true) {
            case (quality < 35):
                $('.dropname').children()[0].style = "color: gray";
                break;
            case (quality < 43):
                $('.dropname').children()[0].style = "color: blue";
                break;
            case (quality < 50):
                $('.dropname').children()[0].style = "color: purple";
                break;
            case (quality < 59):
                $('.dropname').children()[0].style = "color: orange";
                break;
            default:
                break;
        }
    }

}


function controlls(you) {
    $(window).on("keydown", function (e) {

        switch (e.which) {
            case 37:
                if (you.xpos == 0) {

                }
                else {
                    you.xpos--;
                    you.movePos();
                    $('.button').css("display", "none");
                    $(window).off();
                }
                break;
            case 38:
                if (you.xpos == 9) {

                }
                else {
                    you.ypos++;
                    you.movePos();
                    $('.button').css("display", "none");
                    $(window).off();
                }
                break;
            case 39:
                if (you.xpos == 9) {

                }
                else {
                    you.xpos++;
                    you.movePos();
                    $('.button').css("display", "none");
                    $(window).off();
                }
                break;
            case 40:
                if (you.ypos == 0) {

                }
                else {
                    you.ypos--;
                    you.movePos();
                    $('.button').css("display", "none");
                    $(window).off();
                }
                break;
        }
    })
}