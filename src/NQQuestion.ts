import NextQuestion from "./NextQuestion";
import NQAnswer from "./NQAnswer";


export default class NQQuestion {
    private id: string;
    private parent: NextQuestion;
    private answers: NQAnswer[];
    private data: any;
    private next: string;
    private multiselect: boolean;
	private selected: NQAnswer[];
	private branch: string;

    constructor(id: string, parent: NextQuestion, answers: NQAnswer[] = [], data = {},
        next: string = null, multiselect: boolean = false, branch: string = null) {
		this.id = id;
		this.parent = parent;
		this.answers = answers;
		this.data = data;
		this.next = next;
		this.multiselect = multiselect;
		this.branch = branch;
		this.selected = [];
	}


	getId(): string {
		return this.id;
	}

	getParent(): NextQuestion {
		return this.parent;
	}

	getAnswers(): NQAnswer[] {
		return this.answers;
	}

	getData() {
		return this.data;
	}

	getNext(): string {
		return this.next;
	}

	getMultiselect(): boolean {
		return this.multiselect;
	}

	getSelected(): NQAnswer[] {
		return this.selected;
	}

	getBranch(): string {
		return this.branch;
	}

	addAnswer(answer: NQAnswer): NQQuestion {
		this.answers.push(answer);

		return this;
	}

	select(answer: NQAnswer): NQQuestion {
        this.selected.push(answer);
        
        return this;
	}

	deselect(answer: NQAnswer): NQQuestion {
		let index = this.selected.indexOf(answer);

        if (index !== -1) this.selected.splice(index, 1);
        
        return this;
	}

	getAnswer(index: number): NQAnswer {
	    return this.answers[index];
    }

    getIndexOf(answer: NQAnswer): number {
	    return this.answers.indexOf(answer);
    }

	hasSelected(): boolean {
	    return this.selected.length > 0;
    }

	isAnswerSelected(answer: NQAnswer): boolean {
	    return answer === this.selected.find(
            selected => selected === answer
        );
    }

    emptySelected(): NQQuestion {
        this.selected = [];

        return this;
    }

}