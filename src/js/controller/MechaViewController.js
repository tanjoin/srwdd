class MechaViewController {
    constructor(mecha) {
        this.mecha = mecha;
        this.mechaView = new MechaView(mecha);
    }

    show(element, type) {
        this.mechaView.render(element, type);
    }
}