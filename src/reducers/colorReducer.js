
export default (state = "green", action) => {
    switch(action.type) {
        case 'GREEN':
            return 'green';
        default:
            return state;
    }
}