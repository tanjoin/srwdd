class MechaView {
    constructor(mecha) {
        this.mecha = mecha;
    }

    render(element, type) {
        element.appendChild(this.view(type));
    }

    view(type) {
        const view = document.createElement("div");
        view.classList.add("mecha");
        view.appendChild(this._createNameView());
        view.appendChild(this._createStatusView());
        view.appendChild(this._createSizeView());
        view.appendChild(this._createTypeView());
        view.appendChild(this._createAreaView());
        view.appendChild(this._createNormalWeaponView());
        view.appendChild(this._createSpecialSkillView(type));
        return view;
    }

    _createNameView() {
        const nameView = document.createElement("div");
        nameView.classList.add("mecha-name");
        nameView.innerText = `【機体名】${this.mecha.name}`;
        return nameView;
    }

    _createStatusView() {
        const statusView = document.createElement("div");
        statusView.classList.add("mecha-status");
        statusView.innerText = `【ステータス】${this.mecha.statusString()}}`
        return statusView;
    }

    _createSizeView() {
        const sizeView = document.createElement("div");
        sizeView.classList.add("mecha-size");
        sizeView.innerText = `【サイズ】${this.mecha.size}`;
        return sizeView;
    }

    _createTypeView() {
        const typeView = document.createElement("div");
        typeView.classList.add("mecha-type");
        typeView.innerText = `【タイプ】${this.mecha.typeString()}`;
        return typeView;
    }

    _createAreaView() {
        const areaView = document.createElement("div");
        areaView.classList.add("mecha-area");
        areaView.innerText = `【地形適性】${this.mecha.areaString()}`;
        return areaView;
    }

    _createNormalWeaponView() {
        const normalWeaponView = document.createElement("div");
        normalWeaponView.classList.add("mecha-normal-weapon");
        normalWeaponView.innerText = `【通常攻撃】${this.mecha.normalWeaponString()}`;
        return normalWeaponView;
    }

    _createSpecialSkillView(type) {
        const specialSkillView = document.createElement("div");
        specialSkillView.classList.add("mecha-special-skill");
        specialSkillView.innerText = `【特殊能力】 ${this.mecha.specialSkillString(type)}`;
        return specialSkillView;
    }
}