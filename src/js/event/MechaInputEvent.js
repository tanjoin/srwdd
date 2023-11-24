class MechaInputEvent {
    constructor(element, typeElement, view, mechaList) {
        element.addEventListener("input", (event) => this.input(event, typeElement, view, mechaList));
    }

    input(e, typeElement, view, mechaList) {
        let mechas = mechaList
                .filter((mecha) => mecha.name === e.target.value);
        if (mechas.length === 0) {
            console.log("Mecha not found. : " + e.target.value);
            return;
        }
        let viewController = new MechaViewController(mechas[0]);
        viewController.show(view, typeElement.value);
    }
}