class NQAnswer {
    constructor(question, data = {}, next, branch, branches) {
        this._question = question;
        this._parent = question.parent;
        this._data = data;
        this._next = next;
        this._branch = branch;
        this._branches = branches;
    }
    get question() {
        return this._question;
    }
    get parent() {
        return this._parent;
    }
    get branch() {
        return this._branch;
    }
    get branches() {
        return this._branches;
    }
    get data() {
        if (this._branches) {
            for (const [id, data] of this._branches.entries())
                if (this._parent.branches.hasOwnProperty(id))
                    return data;
        }
        return this._data;
    }
    get next() {
        // Has branch with next? use that
        // Elseif default answer? use that
        // else question.next
        let next = this._next;
        if (!next && !this._question.next)
            return;
        next = this._question.next;
        this._question.parent.setActual(this._question.parent.getQuestion(next));
        return next;
    }
    select() {
        this._question.select(this);
        return this;
    }
    deselect() {
        this._question.deselect(this);
        return this;
    }
    getIndex() {
        return this._question.getIndexOf(this);
    }
    isSelected() {
        return this._question.isAnswerSelected(this);
    }
}
