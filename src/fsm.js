class FSM {
	/**
	 * Creates new FSM instance.
	 * @param config
	 */
	constructor(config) {
		this.initial = config.initial;
		this.state = config.initial;
		this.states = config.states;
		this.backwardHistory = [];
		this.forwardHistory = [];
	}

	/**
	 * Returns active state.
	 * @returns {String}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Goes to specified state.
	 * @param state
	 */
	changeState(state) {
		if (this.states[state]) {
			this.backwardHistory.push(this.state)
			this.state = state;
			this.forwardHistory=[];
			return this.state;
		}
		else {
			throwError();
		}
	}

	/**
	 * Changes state according to event transition rules.
	 * @param event
	 */
	trigger(event) {
		if (this.states[this.state].transitions[event]) {
			this.backwardHistory.push(this.state);
			this.state = this.states[this.state].transitions[event];
			this.forwardHistory=[];
			
		} else {
			throwError();
		}

		return this.state;
	}

	/**
	 * Resets FSM state to initial.
	 */
	reset() {
		this.state = this.initial;
	}

	/**
	 * Returns an array of states for which there are specified event transition rules.
	 * Returns all states if argument is undefined.
	 * @param event
	 * @returns {Array}
	 */
	getStates(param) {
		var result = [];
		for (var state in this.states) {
			if (this.states.hasOwnProperty(state)) {
				if (param == undefined) {
					result.push(state);
				}
				for (var event in this.states[state].transitions) {
					if (this.states[state].transitions.hasOwnProperty(event)) {
						if (param == event) {
							result.push(state);
						}
					}
				}
			}
		}
		return result;
	}

	/**
	 * Goes back to previous state.
	 * Returns false if undo is not available.
	 * @returns {Boolean}
	 */
	undo() {
		if (this.backwardHistory.length==0) {
			return false;
		}
		else {
			this.forwardHistory.push(this.state);
			this.state = this.backwardHistory.pop();
			return true;
		}
	}

	/**
	 * Goes redo to state.
	 * Returns false if redo is not available.
	 * @returns {Boolean}
	 */
	redo() {
		if (this.forwardHistory.length==0) {
			return false;
		}else
		this.backwardHistory.push(this.state);
		this.state = this.forwardHistory.pop();
		return true;
	}

	/**
	 * Clears transition history
	 */
	clearHistory() {
		this.forwardHistory = [];
		this.backwardHistory = [];
		this.state = this.initial;
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
