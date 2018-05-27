import NQQuestion from './NQQuestion';
import NQAnswer from './NQAnswer';

export default class NextQuestion {
    private questions: NQQuestion[];
	private actual: NQQuestion = null;
	private branches: string[];

	constructor(questions: NQQuestion[] = []) {
		this.questions = questions;
		this.actual = null;
		this.branches = [];
	}

	getQuestions(): NQQuestion[] {
		return this.questions;
	}

	getActual(): NQQuestion {
		return this.actual;
	}

	getBranches(): string[] {
		return this.branches;
	}

	fromArray(array: NQQuestion[]): NextQuestion {
        for (let nqquestion of array) {
			let next = nqquestion.getNext();
            let question = new NQQuestion(
                nqquestion.getId(), this, [], nqquestion.getData(), next, nqquestion.getMultiselect()
            );

            for (let answer of nqquestion.getAnswers()) {
                question.addAnswer(
					new NQAnswer(question, answer.getData(), answer.getNext())
				);
            }

            this.questions.push(question);
        }

        return this;
    }

    hasQuestions(): boolean {
	    return this.questions.length > 0;
    }

    isEmpty(): boolean {
	    return !this.hasQuestions();
    }

    isOutOfBounds(index: number): boolean {
	    return index >= this.questions.length || index < 0;
    }

    getIndexOf(question: NQQuestion): number {
	    if (this.isEmpty()) return -1;
    }

    getQuestionAt(index: number): NQQuestion {
	    if (this.isEmpty() || this.isOutOfBounds(index)) return;

	    return this.questions[index];
    }

	getQuestion(id: string): NQQuestion {
		for (let question of this.questions)
			if (question.getId() === id) return question;
	}

	getPrevious(): NQQuestion {
	    return this.getQuestionAt(this.getIndexOf(this.actual) - 1);
    }

    getNext(): NQQuestion {
        return this.getQuestionAt(this.getIndexOf(this.actual) + 1);
    }

    getFirst(): NQQuestion {
	    if (this.isEmpty()) return;

	    return this.questions[0];
    }

	getLast(): NQQuestion {
	    if (this.isEmpty()) return;

	    let last = this.questions.length - 1;

		return last !== -1 ? this.questions[last] : null;
	}

	setActual(question: NQQuestion): NextQuestion {
		this.actual = question;

		return this;
	}

	cloneQuestion(id: string, newId: string, next: string): NQQuestion {
		let question = this.getQuestion(id);

		if (!question) return;

		return new NQQuestion(
			newId, question.getParent(), question.getAnswers(), question.getData(),
			next, question.getMultiselect()
		);
	}

}
