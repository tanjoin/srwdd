class Mecha {
    constructor(name, status, size, type, area, normalWeapon, specialSkill) {
        this.name = name;
        this.status = status;
        this.size = size;
        this.type = type;
        this.area = area;
        this.normalWeapon = normalWeapon;
        this.specialSkill = specialSkill;
    }

    hpString() {
        return `HP: ${this.status.hp}`;
    }

    atkString() {
        return `攻撃力: ${this.status.atk}`;
    }

    defString() {
        return `防御力: ${this.status.def}`;
    }

    sightString() {
        return `照準値: ${this.status.sight}`;
    }

    agiString() {
        return `運動性: ${this.status.agi}`;
    }

    movString() {
        return `移動力: ${this.status.mov}`;
    }

    spdString() {
        return `スピード: ${this.status.spd}`;
    }

    statusString() {
        return `${this.hpString()} ${this.atkString()} ${this.defString()} ${this.sightString()} ${this.agiString()} ${this.movString()} ${this.spdString()}`;
    }

    typeString() {
        return this.type.join('&');
    }

    airString() {
        return `空: ${this.area.air}`;
    }

    grdString() {
        return `地: ${this.area.grd}`;
    }

    wtrString() {
        return `海: ${this.area.wtr}`;
    }

    spcString() {
        return `宇: ${this.area.spc}`;
    }

    areaString() {
        return `${this.airString()} ${this.grdString()} ${this.wtrString()} ${this.spcString()}`;
    }

    normalWeaponNameString() {
        return `${this.normalWeapon.name}`;
    }

    normalWeaponTypeString() {
        return `${this.normalWeapon.type}`;
    }

    normalWeaponRangeString() {
        return `射程: ${this.normalWeapon.range.min}-${this.normalWeapon.range.max}`;
    }

    normalWeaponString() {
        return `${this.normalWeaponNameString()} [${this.normalWeaponTypeString()}] ${this.normalWeaponRangeString()}`;
    }

    specialSkillNameString() {
        return `${this.specialSkill.name}`;
    }

    specialSkillLevelString() {
        return `Lv.${this.specialSkill.level}`;
    }

    specialSkillStatusString(type) {
        let texts = [];
        if (this.specialSkill.status.hp) {
            texts.push(`HP: ${this.specialSkill.status.hp}`);
        }
        if (this.specialSkill.status.atk) {
            texts.push(`攻撃力: ${this.specialSkill.status.atk}`);
        }
        if (this.specialSkill.status.def) {
            texts.push(`防御力: ${this.specialSkill.status.def}`);
        }
        if (this.specialSkill.status.sight) {
            texts.push(`照準値: ${this.specialSkill.status.sight}`);
        }
        if (this.specialSkill.status.agi) {
            texts.push(`運動性: ${this.specialSkill.status.agi}`);
        }
        if (this.specialSkill.status.mov) {
            texts.push(`移動力: ${this.specialSkill.status.mov}`);
        }
        if (this.specialSkill.status.spd) {
            texts.push(`スピード: ${this.specialSkill.status.spd}`);
        }
        if (this.specialSkill.status.give) {
            if (this.specialSkill.status.give?.type === type) {
                texts.push(`与ダメージ: ${this.specialSkill.status.give.value}`);
            }
        }
        if (this.specialSkill.status.received) {
            if (this.specialSkill.status.received?.type === type) {
                texts.push(`被ダメージ: ${this.specialSkill.status.received.value}`);
            }
        }
        return texts.join(' ');
    }

    specialSkillString(type) {
        return `${this.specialSkillNameString()} ${this.specialSkillLevelString()} ${this.specialSkillStatusString(type)}`;
    }
}