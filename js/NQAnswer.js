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
        console.log(data);
        if (data)
            return data;
        console.log(this._data);
        return this._data;
    }
    // Uses the first 'next' that finds, following this order:
    // First it checks the branches, then the answer and then the question
    // If it founds something, it sets the actual question to the next and
    // returns its value.
    // If none is found, returns undefined.
    get next() {
        var next;
        this.doIfHasBranch((id, branch) => next = branch.next);
        if (!next) {
            if (this._next)
                next = this._next;
            else {
                if (!this._parent.hasBranches())
                    return;
                for (const branchId of this._parent.branches) {
                    if (this._question.getNext(branchId)) {
                        next = this._question.getNext(branchId);
                        break;
                    }
                }
            }
        }
        this.setActual(next);
        return next;
    }
    select() {
        this._question.select(this);
        if (this._branch)
            this._parent.addBranch(this._branch);
        console.log('branch', this._branch);
        console.log('parent.branches', this._parent.branches);
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
        for (const id in this._branches) {
            if (this._branches.hasOwnProperty(id)
                && this._parent.hasBranch(id)) {
                func(id, this._branches[id]);
                return;
            }
        }
    }
    setActual(questionId) {
        this._parent.setActual(this._parent.getQuestion(questionId));
    }
}
