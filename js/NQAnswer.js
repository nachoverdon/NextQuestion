export default class NQAnswer {
    constructor(question, data = {}, next) {
        this.question = question;
        this.parent = question.getParent();
        this.data = data;
        this.next = next;
    }
    getQuestion() {
        return this.question;
    }
    getParent() {
        return this.parent;
    }
    getData() {
        if (this.branches) {
            let branches = this.parent.getBranches();
            for (let [id, data] of this.branches.entries())
                if (branches.hasOwnProperty(id))
                    return data;
        }
        return this.data;
    }
    getNext() {
        // Has branch with next? use that
        // Elseif default answer? use that
        // else question.next
        let next = this.next;
        if (!next) {
            let qNext = this.question.getNext();
            if (!qNext)
                return;
            next = qNext;
        }
        let parent = this.question.getParent();
        parent.setActual(parent.getQuestion(next));
        return next;
    }
    select() {
        this.question.select(this);
        return this;
    }
    deselect() {
        this.question.deselect(this);
        return this;
    }
    getIndex() {
        return this.question.getIndexOf(this);
    }
    isSelected() {
        return this.question.isAnswerSelected(this);
    }
}
