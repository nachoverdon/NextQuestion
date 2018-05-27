import NextQuestion from "./NextQuestion";
import NQQuestion from './NQQuestion';


export default class NQAnswer {
    private question: NQQuestion;
	private parent: NextQuestion;
    private data: any;
	private next: string;
    private branches: Map<string, any>;

	constructor(question: NQQuestion, data = {}, next?: string) {
		this.question = question;
		this.parent = question.getParent();
		this.data = data;
		this.next = next;
	}

	getQuestion(): NQQuestion {
		return this.question;
	}

	getParent(): NextQuestion {
		return this.parent;
	}

	getData() {
        if (this.branches) {
            let branches = this.parent.getBranches();

			for (let [id, data] of this.branches.entries())
                if (branches.hasOwnProperty(id)) return data;
        }

		return this.data;
	}

	getNext(): string {
		// Has branch with next? use that
		// Elseif default answer? use that
		// else question.next
		let next = this.next;

		if (!next) {
			let qNext = this.question.getNext();

			if (!qNext) return;

			next = qNext;
		}

		let parent = this.question.getParent();
		parent.setActual(parent.getQuestion(next));

		return next;
	}

	select(): NQAnswer {
        this.question.select(this);
        
        return this;
	}

	deselect(): NQAnswer {
        this.question.deselect(this);
        
        return this;
    }

    getIndex(): number {
	    return this.question.getIndexOf(this);
    }


	isSelected(): boolean {
	    return this.question.isAnswerSelected(this);
    }

}