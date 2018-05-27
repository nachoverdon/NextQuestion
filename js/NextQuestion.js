class NextQuestion {
    constructor(questions = []) {
        this._actual = null;
        this._questions = questions;
        this._actual = null;
        this._branches = [];
    }
    get questions() {
        return this._questions;
    }
    get actual() {
        return this._actual;
    }
    get branches() {
        return this._branches;
    }
    fromArray(questions) {
        for (const q of questions) {
            const nqQuestion = new NQQuestion(q.id, this, [], q.data, q.next, q.multiselect);
            for (const a of q.answers) {
                nqQuestion.addAnswer(new NQAnswer(nqQuestion, a.data, a.next, a.branches));
            }
            this._questions.push(nqQuestion);
        }
        return this;
    }
    // fromJson(json: Map<string, any[]>[]): NextQuestion {
    // }
    hasQuestions() {
        return this._questions.length > 0;
    }
    isEmpty() {
        return !this.hasQuestions();
    }
    isOutOfBounds(index) {
        return index >= this._questions.length || index < 0;
    }
    hasBranch(id) {
        return this._branches.indexOf(id) !== -1;
    }
    addBranch(id) {
        if (!this.hasBranch(id))
            this._branches.push(id);
        return this;
    }
    removeBranch(id) {
        if (this.hasBranch(id))
            this._branches.splice(this._branches.indexOf(id), 1);
        return this;
    }
    getIndexOf(question) {
        if (this.isEmpty())
            return -1;
    }
    getQuestionAt(index) {
        if (this.isEmpty() || this.isOutOfBounds(index))
            return;
        return this.questions[index];
    }
    getQuestion(id) {
        for (const question of this._questions)
            if (question.id === id)
                return question;
    }
    getPrevious() {
        return this.getQuestionAt(this.getIndexOf(this._actual) - 1);
    }
    getNext() {
        return this.getQuestionAt(this.getIndexOf(this._actual) + 1);
    }
    getFirst() {
        if (this.isEmpty())
            return;
        return this._questions[0];
    }
    getLast() {
        if (this.isEmpty())
            return;
        const last = this._questions.length - 1;
        return last !== -1 ? this._questions[last] : null;
    }
    setActual(question) {
        this._actual = question;
        return this;
    }
}
