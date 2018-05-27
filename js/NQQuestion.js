export default class NQQuestion {
    constructor(id, parent, answers = [], data = {}, next = null, multiselect = false, branch = null) {
        this.id = id;
        this.parent = parent;
        this.answers = answers;
        this.data = data;
        this.next = next;
        this.multiselect = multiselect;
        this.branch = branch;
        this.selected = [];
    }
    getId() {
        return this.id;
    }
    getParent() {
        return this.parent;
    }
    getAnswers() {
        return this.answers;
    }
    getData() {
        return this.data;
    }
    getNext() {
        return this.next;
    }
    getMultiselect() {
        return this.multiselect;
    }
    getSelected() {
        return this.selected;
    }
    getBranch() {
        return this.branch;
    }
    addAnswer(answer) {
        this.answers.push(answer);
        return this;
    }
    select(answer) {
        this.selected.push(answer);
        return this;
    }
    deselect(answer) {
        let index = this.selected.indexOf(answer);
        if (index !== -1)
            this.selected.splice(index, 1);
        return this;
    }
    getAnswer(index) {
        return this.answers[index];
    }
    getIndexOf(answer) {
        return this.answers.indexOf(answer);
    }
    hasSelected() {
        return this.selected.length > 0;
    }
    isAnswerSelected(answer) {
        return answer === this.selected.find(selected => selected === answer);
    }
    emptySelected() {
        this.selected = [];
        return this;
    }
}
