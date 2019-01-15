export default (state, action) => {
    switch(action.type) {
        case 'NAME':
            return 'Rylan Deck';
        default:
            return 'Name';
    }
}