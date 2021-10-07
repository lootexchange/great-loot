import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { id } from "@ethersproject/hash";

const weapons = [
  "Warhammer",
  "Quarterstaff",
  "Maul",
  "Mace",
  "Club",
  "Katana",
  "Falchion",
  "Scimitar",
  "Long Sword",
  "Short Sword",
  "Ghost Wand",
  "Grave Wand",
  "Bone Wand",
  "Wand",
  "Grimoire",
  "Chronicle",
  "Tome",
  "Book",
];

const chestArmor = [
  "Divine Robe",
  "Silk Robe",
  "Linen Robe",
  "Robe",
  "Shirt",
  "Demon Husk",
  "Dragonskin Armor",
  "Studded Leather Armor",
  "Hard Leather Armor",
  "Leather Armor",
  "Holy Chestplate",
  "Ornate Chestplate",
  "Plate Mail",
  "Chain Mail",
  "Ring Mail",
];

const headArmor = [
  "Ancient Helm",
  "Ornate Helm",
  "Great Helm",
  "Full Helm",
  "Helm",
  "Demon Crown",
  "Dragon's Crown",
  "War Cap",
  "Leather Cap",
  "Cap",
  "Crown",
  "Divine Hood",
  "Silk Hood",
  "Linen Hood",
  "Hood",
];

const waistArmor = [
  "Ornate Belt",
  "War Belt",
  "Plated Belt",
  "Mesh Belt",
  "Heavy Belt",
  "Demonhide Belt",
  "Dragonskin Belt",
  "Studded Leather Belt",
  "Hard Leather Belt",
  "Leather Belt",
  "Brightsilk Sash",
  "Silk Sash",
  "Wool Sash",
  "Linen Sash",
  "Sash",
];

const footArmor = [
  "Holy Greaves",
  "Ornate Greaves",
  "Greaves",
  "Chain Boots",
  "Heavy Boots",
  "Demonhide Boots",
  "Dragonskin Boots",
  "Studded Leather Boots",
  "Hard Leather Boots",
  "Leather Boots",
  "Divine Slippers",
  "Silk Slippers",
  "Wool Shoes",
  "Linen Shoes",
  "Shoes",
];

const handArmor = [
  "Holy Gauntlets",
  "Ornate Gauntlets",
  "Gauntlets",
  "Chain Gloves",
  "Heavy Gloves",
  "Demon's Hands",
  "Dragonskin Gloves",
  "Studded Leather Gloves",
  "Hard Leather Gloves",
  "Leather Gloves",
  "Divine Gloves",
  "Silk Gloves",
  "Wool Gloves",
  "Linen Gloves",
  "Gloves",
];

const necklaces = ["Necklace", "Amulet", "Pendant"];

const rings = [
  "Gold Ring",
  "Silver Ring",
  "Bronze Ring",
  "Platinum Ring",
  "Titanium Ring",
];

const suffixes = [
  "of Power",
  "of Giants",
  "of Titans",
  "of Skill",
  "of Perfection",
  "of Brilliance",
  "of Enlightenment",
  "of Protection",
  "of Anger",
  "of Rage",
  "of Fury",
  "of Vitriol",
  "of the Fox",
  "of Detection",
  "of Reflection",
  "of the Twins",
];

const namePrefixes = [
  "Agony",
  "Apocalypse",
  "Armageddon",
  "Beast",
  "Behemoth",
  "Blight",
  "Blood",
  "Bramble",
  "Brimstone",
  "Brood",
  "Carrion",
  "Cataclysm",
  "Chimeric",
  "Corpse",
  "Corruption",
  "Damnation",
  "Death",
  "Demon",
  "Dire",
  "Dragon",
  "Dread",
  "Doom",
  "Dusk",
  "Eagle",
  "Empyrean",
  "Fate",
  "Foe",
  "Gale",
  "Ghoul",
  "Gloom",
  "Glyph",
  "Golem",
  "Grim",
  "Hate",
  "Havoc",
  "Honour",
  "Horror",
  "Hypnotic",
  "Kraken",
  "Loath",
  "Maelstrom",
  "Mind",
  "Miracle",
  "Morbid",
  "Oblivion",
  "Onslaught",
  "Pain",
  "Pandemonium",
  "Phoenix",
  "Plague",
  "Rage",
  "Rapture",
  "Rune",
  "Skull",
  "Sol",
  "Soul",
  "Sorrow",
  "Spirit",
  "Storm",
  "Tempest",
  "Torment",
  "Vengeance",
  "Victory",
  "Viper",
  "Vortex",
  "Woe",
  "Wrath",
  "Light's",
  "Shimmering",
];

const nameSuffixes = [
  "Bane",
  "Root",
  "Bite",
  "Song",
  "Roar",
  "Grasp",
  "Instrument",
  "Glow",
  "Bender",
  "Shadow",
  "Whisper",
  "Shout",
  "Growl",
  "Tear",
  "Peak",
  "Form",
  "Sun",
  "Moon",
];

const random = (input: string) => BigNumber.from(id(input));

const pluck = (
  tokenId: BigNumberish,
  keyPrefix: string,
  sourceArray: string[]
) => {
  tokenId = BigNumber.from(tokenId);
  const rand = random(keyPrefix + tokenId.toString());
  let output = sourceArray[rand.mod(sourceArray.length).toNumber()];
  const greatness = rand.mod(21);
  if (greatness.gt(14)) {
    output = output + " " + suffixes[rand.mod(suffixes.length).toNumber()];
  }
  if (greatness.gte(19)) {
    const name = ["", ""];
    name[0] = namePrefixes[rand.mod(namePrefixes.length).toNumber()];
    name[1] = nameSuffixes[rand.mod(nameSuffixes.length).toNumber()];
    if (greatness.eq(19)) {
      output = '"' + name[0] + " " + name[1] + '" ' + output;
    } else {
      output = '"' + name[0] + " " + name[1] + '" ' + output + " +1";
    }
  }
  return output;
};

const getGreatness = (tokenId: BigNumberish, keyPrefix: string) => {
  const rand = random(keyPrefix + tokenId.toString());
  return rand.mod(21);
};

export const getWeapon = (tokenId: BigNumberish) =>
  pluck(tokenId, "WEAPON", weapons);
export const getChest = (tokenId: BigNumberish) =>
  pluck(tokenId, "CHEST", chestArmor);
export const getHead = (tokenId: BigNumberish) =>
  pluck(tokenId, "HEAD", headArmor);
export const getWaist = (tokenId: BigNumberish) =>
  pluck(tokenId, "WAIST", waistArmor);
export const getFoot = (tokenId: BigNumberish) =>
  pluck(tokenId, "FOOT", footArmor);
export const getHand = (tokenId: BigNumberish) =>
  pluck(tokenId, "HAND", handArmor);
export const getNeck = (tokenId: BigNumberish) =>
  pluck(tokenId, "NECK", necklaces);
export const getRing = (tokenId: BigNumberish) => pluck(tokenId, "RING", rings);

const getWeaponGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "WEAPON");
const getChestGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "CHEST");
const getHeadGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "HEAD");
const getWaistGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "WAIST");
const getFootGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "FOOT");
const getHandGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "HAND");
const getNeckGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "NECK");
const getRingGreatness = (tokenId: BigNumberish) =>
  getGreatness(tokenId, "RING");

export const getTotalGreatness = (tokenId: BigNumberish) =>
  getWeaponGreatness(tokenId)
    .add(getChestGreatness(tokenId))
    .add(getHeadGreatness(tokenId))
    .add(getWaistGreatness(tokenId))
    .add(getFootGreatness(tokenId))
    .add(getHandGreatness(tokenId))
    .add(getNeckGreatness(tokenId))
    .add(getRingGreatness(tokenId));
