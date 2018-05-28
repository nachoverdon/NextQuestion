class NextQuestion {
	private _questions: NQQuestion[];
	private _actual: NQQuestion = null;
	private _branches: string[];

	constructor(questions: NQQuestion[] = []) {
		this._questions = questions;

		this._actual = null;
		this._branches = [];
	}

	get questions(): NQQuestion[] {
		return this._questions;
	}

	get actual(): NQQuestion {
		return this._actual;
	}

	get branches(): string[] {
		return this._branches;
	}

	fromArray(questions: any[]): NextQuestion {
		for (const q of questions) {
			const nqQuestion = new NQQuestion(
				q.id, this, [], q.data, q.next, q.multiselect
			);

			for (const a of q.answers) {
				nqQuestion.addAnswer(new NQAnswer(
					nqQuestion, a.data, a.next, a.branch, a.branches
				));
			}

			this._questions.push(nqQuestion);
		}

		return this;
	}

	// fromJson(json: Map<string, any[]>[]): NextQuestion {
	// }

	hasQuestions(): boolean {
		return this._questions.length > 0;
	}

	isEmpty(): boolean {
		return !this.hasQuestions();
	}

	isOutOfBounds(index: number): boolean {
		return index >= this._questions.length || index < 0;
	}

	hasBranches(): boolean {
		return this._branches.length > 0;
	}

	hasBranch(id: string): boolean {
		return this._branches.indexOf(id) !== -1;
	}

	addBranch(id: string): NextQuestion {
		if (!this.hasBranch(id)) this._branches.push(id);

		return this;
	}

	removeBranch(id: string): NextQuestion {
		if (this.hasBranch(id))
			this._branches.splice(this._branches.indexOf(id), 1);

		return this;
	}

	getIndexOf(question: NQQuestion): number {
		if (this.isEmpty()) return -1;
	}

	getQuestionAt(index: number): NQQuestion {
		if (this.isEmpty() || this.isOutOfBounds(index)) return;

		return this.questions[index];
	}

	getQuestion(id: string): NQQuestion {
		for (const question of this._questions)
			if (question.id === id) return question;
	}

	getPrevious(): NQQuestion {
		return this.getQuestionAt(this.getIndexOf(this._actual) - 1);
	}

	getNext(): NQQuestion {
		return this.getQuestionAt(this.getIndexOf(this._actual) + 1);
	}

	getFirst(): NQQuestion {
		if (this.isEmpty()) return;

		return this._questions[0];
	}

	getLast(): NQQuestion {
		if (this.isEmpty()) return;

		const last = this._questions.length - 1;

		return last !== -1 ? this._questions[last] : null;
	}

	setActual(question: NQQuestion): NextQuestion {
		this._actual = question;

		return this;
	}

}