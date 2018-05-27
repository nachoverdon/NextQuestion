import NQQuestion from './NQQuestion';
import NQAnswer from './NQAnswer';
export default class NextQuestion {
    constructor(questions = []) {
        this.actual = null;
        this.questions = questions;
        this.actual = null;
        this.branches = [];
    }
    getQuestions() {
        return this.questions;
    }
    getActual() {
        return this.actual;
    }
    getBranches() {
        return this.branches;
    }
    fromArray(array) {
        for (let nqquestion of array) {
            let next = nqquestion.getNext();
            let question = new NQQuestion(nqquestion.getId(), this, [], nqquestion.getData(), next, nqquestion.getMultiselect());
            for (let answer of nqquestion.getAnswers()) {
                question.addAnswer(new NQAnswer(question, answer.getData(), answer.getNext()));
            }
            this.questions.push(question);
        }
        return this;
    }
    hasQuestions() {
        return this.questions.length > 0;
    }
    isEmpty() {
        return !this.hasQuestions();
    }
    isOutOfBounds(index) {
        return index >= this.questions.length || index < 0;
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
        for (let question of this.questions)
            if (question.getId() === id)
                return question;
    }
    getPrevious() {
        return this.getQuestionAt(this.getIndexOf(this.actual) - 1);
    }
    getNext() {
        return this.getQuestionAt(this.getIndexOf(this.actual) + 1);
    }
    getFirst() {
        if (this.isEmpty())
            return;
        return this.questions[0];
    }
    getLast() {
        if (this.isEmpty())
            return;
        let last = this.questions.length - 1;
        return last !== -1 ? this.questions[last] : null;
    }
    setActual(question) {
        this.actual = question;
        return this;
    }
    cloneQuestion(id, newId, next) {
        let question = this.getQuestion(id);
        if (!question)
            return;
        return new NQQuestion(newId, question.getParent(), question.getAnswers(), question.getData(), next, question.getMultiselect());
    }
}
