class NQAnswer {
    constructor(question, data = {}, next, branch, branches) {
        this._question = question;
        this._data = data;
        this._next = next;
        this._branch = branch;
        this._branches = branches;
        this._parent = question.parent;
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
        var data;
        this.doIfHasBranch((id, branch) => data = branch.data);
        if (data)
            return data;
        return this._data;
    }
    // Uses the first 'next' that finds, following this order:
    // First it checks the branches, then the answer and then the question
    // If it founds something, it sets the actual question to the next and
    // returns its value.
    // If none is found, returns undefined.
    get next() {
        var next = null;
        this.doIfHasBranch((id, branch) => next = branch.next);
        if (!next) {
            if (this._next)
                next = this._next;
            else if (this._question.next) {
                const qNext = this._question.next;
                if (typeof qNext == 'object') {
                    for (const [id, branch] of this._branches.entries())
                        if (qNext.has(id))
                            next = qNext[id];
                }
                else if (typeof qNext == 'string')
                    next = qNext;
            }
        }
        this.setActual(next);
        return next;
    }
    select() {
        this._question.select(this);
        if (this._branch)
            this._parent.addBranch(this._branch);
        return this;
    }
    deselect() {
        this._question.deselect(this);
        if (this._branch)
            this._parent.removeBranch(this._branch);
        return this;
    }
    getIndex() {
        return this._question.getIndexOf(this);
    }
    isSelected() {
        return this._question.isAnswerSelected(this);
    }
    doIfHasBranch(func) {
        if (!this._branches)
            return;
        for (const [id, branch] of this._branches.entries()) {
            if (this._parent.hasBranch(id)) {
                func(id, branch);
                return;
            }
        }
    }
    setActual(questionId) {
        this._parent.setActual(this._parent.getQuestion(questionId));
    }
}
