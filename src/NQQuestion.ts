class NQQuestion {
    private _id: string;
    private _parent: NextQuestion;
    private _answers: NQAnswer[];
    private _data: any;
    private _next: string | Map<string, string>;
    private _multiselect: boolean;
	private _selected: NQAnswer[];

	constructor(id: string, parent: NextQuestion, answers: NQAnswer[] = [],
		data = {}, next: string | Map<string, string> = null, multiselect: boolean = false) {
		this._id = id;
		this._parent = parent;
		this._answers = answers;
		this._data = data;
		this._next = next;
		this._multiselect = multiselect;

		this._selected = [];
	}

	get id(): string {
		return this._id;
	}

	get parent(): NextQuestion {
		return this._parent;
	}

	get answers(): NQAnswer[] {
		return this._answers;
	}

	get data() {
		return this._data;
	}

	get next(): string | Map<string, string> {
		return this._next;
	}

	get multiselect(): boolean {
		return this._multiselect;
	}

	get selected(): NQAnswer[] {
		return this._selected;
	}

	addAnswer(answer: NQAnswer): NQQuestion {
		this._answers.push(answer);

		return this;
	}

	select(answer: NQAnswer): NQQuestion {
        this._selected.push(answer);

        return this;
	}

	deselect(answer: NQAnswer): NQQuestion {
		const index = this._selected.indexOf(answer);

        if (index !== -1) this._selected.splice(index, 1);

        return this;
	}

	getAnswer(index: number): NQAnswer {
	    return this._answers[index];
    }

    getIndexOf(answer: NQAnswer): number {
	    return this._answers.indexOf(answer);
    }

	hasSelected(): boolean {
	    return this._selected.length > 0;
    }

	isAnswerSelected(answer: NQAnswer): boolean {
	    return answer === this._selected.find(
            selected => selected === answer
        );
    }

    emptySelected(): NQQuestion {
        this._selected = [];

        return this;
    }

}