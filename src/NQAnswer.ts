class NQAnswer {
    private _question: NQQuestion;
	private _parent: NextQuestion;
    private _data: any;
	private _next: string;
	private _branch: string;
    private _branches: Map<string, any>;

	constructor(question: NQQuestion, data = {}, next?: string, branch?: string,
		branches?: Map<string, any>) {
		this._question = question;
		this._data = data;
		this._next = next;
		this._branch = branch;
		this._branches = branches;

		this._parent = question.parent;
	}

	get question(): NQQuestion {
		return this._question;
	}

	get parent(): NextQuestion {
		return this._parent;
	}

	get branch(): string {
		return this._branch;
	}

	get branches(): Map<string, any> {
		return this._branches;
	}

	get data(): any {
		var data;

		this.doIfHasBranch((id, branch) => data = branch.data);

		if (data) return data;

		return this._data;
	}

	// Uses the first 'next' that finds, following this order:
	// First it checks the branches, then the answer and then the question
	// If it founds something, it sets the actual question to the next and
	// returns its value.
	// If none is found, returns undefined.
	get next(): string {
		var next: string;

		this.doIfHasBranch((id, branch) => next = branch.next);


		if (!next) {
			if (this._next) next = this._next;

			else {
				if (!this._parent.hasBranches()) return;

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

	select(): NQAnswer {
		this._question.select(this);

		if (this._branch) this._parent.addBranch(this._branch);

		console.log('branch', this._branch)
		console.log('parent.branches', this._parent.branches);

        return this;
	}

	deselect(): NQAnswer {
		this._question.deselect(this);

		if (this._branch) this._parent.removeBranch(this._branch);

        return this;
    }

    getIndex(): number {
	    return this._question.getIndexOf(this);
    }


	isSelected(): boolean {
	    return this._question.isAnswerSelected(this);
    }


	doIfHasBranch(func: Function): void {
		if (!this._branches) return;


		for (const [id, branch] of this._branches.entries()) {
			if (this._parent.hasBranch(id)) {
				func(id, branch);
				return;
			}
		}

	}

	setActual(questionId: string) {
		this._parent.setActual(this._parent.getQuestion(questionId));
	}
}