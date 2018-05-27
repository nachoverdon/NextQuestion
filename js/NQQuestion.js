class NQQuestion {
    constructor(id, parent, answers = [], data = {}, next = null, multiselect = false) {
        this._id = id;
        this._parent = parent;
        this._answers = answers;
        this._data = data;
        this._next = next;
        this._multiselect = multiselect;
        this._selected = [];
    }
    get id() {
        return this._id;
    }
    get parent() {
        return this._parent;
    }
    get answers() {
        return this._answers;
    }
    get data() {
        return this._data;
    }
    get next() {
        return this._next;
    }
    get multiselect() {
        return this._multiselect;
    }
    get selected() {
        return this._selected;
    }
    addAnswer(answer) {
        this._answers.push(answer);
        return this;
    }
    select(answer) {
        this._selected.push(answer);
        return this;
    }
    deselect(answer) {
        const index = this._selected.indexOf(answer);
        if (index !== -1)
            this._selected.splice(index, 1);
        return this;
    }
    getAnswer(index) {
        return this._answers[index];
    }
    getIndexOf(answer) {
        return this._answers.indexOf(answer);
    }
    hasSelected() {
        return this._selected.length > 0;
    }
    isAnswerSelected(answer) {
        return answer === this._selected.find(selected => selected === answer);
    }
    emptySelected() {
        this._selected = [];
        return this;
    }
}
