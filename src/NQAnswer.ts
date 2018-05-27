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
		this._parent = question.parent;
		this._data = data;
		this._next = next;
		this._branch = branch;
		this._branches = branches;
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
	
	get data() {
		if (this._branches) {			
			for (const [id, data] of this._branches.entries())
				if (this._parent.branches.hasOwnProperty(id)) return data;
        }
		
		return this._data;
	}
	
	get next(): string {
		// Has branch with next? use that
		// Elseif default answer? use that
		// else question.next
		let next = this._next;
		
		if (!next && !this._question.next) return;
			
		next = this._question.next;
		
		this._question.parent.setActual(
			this._question.parent.getQuestion(next)
		);
		
		return next;
	}
	
	select(): NQAnswer {
        this._question.select(this);
        
        return this;
	}

	deselect(): NQAnswer {
        this._question.deselect(this);
        
        return this;
    }

    getIndex(): number {
	    return this._question.getIndexOf(this);
    }


	isSelected(): boolean {
	    return this._question.isAnswerSelected(this);
    }

}