
export default (state = "#81d3ee", action) => {
    switch(action.type) {
        case 'GREEN':
            return 'green';
        default:
            return state;
    }
}